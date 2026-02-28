"""
Token Authentication Middleware - Handles token validation and base64 encoding/decoding
Generic middleware that can be reused across different repos
"""
import json
from fastapi import Request, Response, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response as StarletteResponse
from services.middleware.token_mapping import get_project_by_token
from services.middleware.base64_utils import base64_encode, base64_decode


# API route prefixes that require token authentication
API_PREFIXES = ["/api/"]


async def token_auth_middleware(request: Request, call_next):
    """
    Middleware for token authentication and base64 encoding/decoding.
    
    For routes under /api/:
    - Extracts token from Authorization: Bearer header
    - Base64 decodes token
    - Validates token and looks up project mapping
    - Base64 decodes request body
    - Stores project info in request.state
    - Base64 encodes response body
    
    For other routes:
    - Passes through unchanged
    """
    # Check if this is an API route
    is_api_route = any(request.url.path.startswith(prefix) for prefix in API_PREFIXES)
    
    if is_api_route:
        # Extract token from Authorization header
        # Starlette headers are case-insensitive, but check both to be safe
        auth_header = request.headers.get("Authorization") or request.headers.get("authorization")
        if not auth_header:
            return Response(
                content=base64_encode(json.dumps({"error": "Missing or invalid Authorization header"})),
                status_code=401,
                media_type="text/plain"
            )
        
        if not auth_header.startswith("Bearer "):
            return Response(
                content=base64_encode(json.dumps({"error": "Invalid Authorization header format. Expected 'Bearer <token>'"})),
                status_code=401,
                media_type="text/plain"
            )
        
        # Extract and decode token
        try:
            token_b64 = auth_header[7:]  # Remove "Bearer " prefix
            token = base64_decode(token_b64)
        except Exception as e:
            return Response(
                content=base64_encode(json.dumps({"error": f"Invalid token encoding: {str(e)}"})),
                status_code=401,
                media_type="text/plain"
            )
        
        # Look up project mapping
        mapping = get_project_by_token(token)
        if not mapping:
            return Response(
                content=base64_encode(json.dumps({"error": "Invalid token"})),
                status_code=401,
                media_type="text/plain"
            )
        
        # Store project info in request.state
        request.state.project_id = mapping["project_id"]
        request.state.project_slug = mapping["project_slug"]
        request.state.environment = mapping["environment"]
        
        # Decode request body if present
        if request.method in ["POST", "PUT", "PATCH"]:
            try:
                body_bytes = await request.body()
                if body_bytes:
                    decoded_body = base64_decode(body_bytes.decode('utf-8'))
                    request.state.decoded_body = json.loads(decoded_body)
                else:
                    request.state.decoded_body = {}
            except json.JSONDecodeError as e:
                return Response(
                    content=base64_encode(json.dumps({"error": f"Invalid JSON in request body: {str(e)}"})),
                    status_code=400,
                    media_type="text/plain"
                )
            except Exception as e:
                return Response(
                    content=base64_encode(json.dumps({"error": f"Failed to decode request body: {str(e)}"})),
                    status_code=400,
                    media_type="text/plain"
                )
        else:
            request.state.decoded_body = {}
    
    # Process request
    response = await call_next(request)
    
    # Encode response if API route
    if is_api_route:
        try:
            # Get response body
            response_body = b""
            async for chunk in response.body_iterator:
                response_body += chunk
            
            # Encode response body
            if response_body:
                try:
                    decoded_text = response_body.decode('utf-8')
                except UnicodeDecodeError:
                    decoded_text = response_body.decode('utf-8', errors='replace')
                encoded = base64_encode(decoded_text)
            else:
                encoded = base64_encode("{}")
            
            # Convert to bytes
            encoded_bytes = encoded.encode('utf-8')
            
            # Create response with encoded content
            # Don't copy headers - let Starlette handle Content-Length automatically
            # Only preserve non-content headers if needed
            return Response(
                content=encoded_bytes,
                status_code=response.status_code,
                media_type="text/plain"
            )
        except Exception as e:
            # If encoding fails, return error
            error_response = json.dumps({"error": f"Failed to encode response: {str(e)}"})
            encoded_error = base64_encode(error_response)
            return Response(
                content=encoded_error.encode('utf-8'),
                status_code=500,
                media_type="text/plain"
            )
    
    return response


"""
Admin Auth Service - Simple admin authentication utilities
"""
import os
from fastapi import Request, HTTPException


def is_admin_authenticated(request: Request) -> bool:
    """
    Check if request is from authenticated admin.
    Checks X-Admin-Token header against ADMIN_TOKEN environment variable.
    
    Args:
        request: FastAPI request object
    
    Returns:
        True if admin is authenticated, False otherwise
    """
    admin_token = os.getenv("ADMIN_TOKEN")
    if not admin_token:
        return False
    
    request_token = request.headers.get("X-Admin-Token")
    return request_token == admin_token


def require_admin(request: Request) -> None:
    """
    Require admin authentication, raise exception if not authenticated.
    
    Args:
        request: FastAPI request object
    
    Raises:
        HTTPException(401) if not authenticated
    """
    if not is_admin_authenticated(request):
        raise HTTPException(401, "Admin authentication required")


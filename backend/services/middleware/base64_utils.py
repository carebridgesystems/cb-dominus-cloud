"""
Base64 Utilities - Encoding and decoding helpers for external API
"""
import base64


def base64_encode(data: str) -> str:
    """
    Encode a string to base64.
    
    Args:
        data: String to encode
        
    Returns:
        Base64-encoded string
    """
    if not isinstance(data, str):
        data = str(data)
    encoded_bytes = base64.b64encode(data.encode('utf-8'))
    return encoded_bytes.decode('utf-8')


def base64_decode(encoded: str) -> str:
    """
    Decode a base64 string.
    
    Args:
        encoded: Base64-encoded string
        
    Returns:
        Decoded string
        
    Raises:
        ValueError: If the string is not valid base64
    """
    try:
        decoded_bytes = base64.b64decode(encoded.encode('utf-8'))
        return decoded_bytes.decode('utf-8')
    except Exception as e:
        raise ValueError(f"Invalid base64 encoding: {str(e)}") from e


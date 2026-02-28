"""
External API Routes - Token-authenticated routes for external services
These routes use token authentication (not admin auth) and handle base64 encoding/decoding
"""
from fastapi import APIRouter

# Composite router with prefix
router = APIRouter(prefix="/api")

# TODO: Add API sub-routes here
# Example:
# from .example import router as example_router
# router.include_router(example_router, prefix="/example")

__all__ = ["router"]

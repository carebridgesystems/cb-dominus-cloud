"""
Internal Admin Routes - Composite router for all internal admin routes
All routes require admin authentication and are prefixed with /internal
"""
from fastapi import APIRouter

# Composite router with prefix
router = APIRouter(prefix="/internal")

# TODO: Add internal sub-routes here
# Example:
# from .auth import router as auth_router
# router.include_router(auth_router, prefix="/auth")

__all__ = ["router"]


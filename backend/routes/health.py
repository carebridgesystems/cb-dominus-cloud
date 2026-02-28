"""
Health Check Route - Simple unauthenticated health check endpoint
Used by load balancers, monitoring systems, and orchestration platforms
"""
from fastapi import APIRouter
from datetime import datetime

router = APIRouter(tags=["health"])


@router.get("/health")
@router.head("/health")
async def health_check():
    """
    Health check endpoint - supports GET and HEAD for health checks.
    Returns simple status to indicate service is running.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }


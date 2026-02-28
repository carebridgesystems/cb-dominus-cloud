"""
Health Check Route - Simple unauthenticated health check endpoint
Used by load balancers, monitoring systems, and orchestration platforms
"""
from fastapi import APIRouter
from services.infrastructure.sovereign_health import check_readiness

router = APIRouter(tags=["health"])


@router.get("/health")
@router.head("/health")
async def health_check():
    """
    Health check endpoint - supports GET and HEAD for health checks.
    Returns simple status to indicate service is running.
    """
    return {"status": "ok"}


@router.get("/health/ready")
@router.head("/health/ready")
async def readiness_check():
    """
    Readiness check endpoint - supports GET and HEAD for readiness checks.
    
    Performs critical dependency checks to determine if the service can accept requests:
    - Verifies Infisical API connection
    - Validates required configuration
    
    Returns simple ready/not ready status for orchestrators like Dominus.
    """
    ready = await check_readiness()
    return {"ready": ready}


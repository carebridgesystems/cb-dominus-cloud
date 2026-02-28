"""
Dominus Cloud Backend - FastAPI Service
Provides internal admin routes and external API routes
"""
import os
from fastapi import FastAPI
from services.middleware.token_auth import token_auth_middleware
from routes.health import router as health_router
from routes.internal import router as internal_router
from routes.api import router as api_router

app = FastAPI(
    title="Dominus Cloud Backend",
    description="Backend API service for Dominus Cloud",
    version="1.0.0"
)

# Register middleware (applies to /api/* routes)
app.middleware("http")(token_auth_middleware)

# Include routers
app.include_router(health_router)  # Simple health check (/health) - unauthenticated
app.include_router(internal_router)  # Admin routes (/internal/*)
app.include_router(api_router)  # External API routes (/api/*)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "Dominus Cloud Backend",
        "version": "1.0.0",
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)


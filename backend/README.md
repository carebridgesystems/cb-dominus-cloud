# Dominus Cloud Backend

FastAPI backend service following the sovereign-cloud architecture pattern.

## Quick Start

### 1. Setup Python Environment

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate

# Mac/Linux
# source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
# Copy the example env file
copy .env.example .env

# Edit .env and set your ADMIN_TOKEN
```

### 4. Run the Server

```bash
# From backend directory
uvicorn main:app --reload --port 8000

# Or from project root
npm run dev:backend
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## Architecture

### Routes

- `/health` - Unauthenticated health check
- `/internal/*` - Admin routes (requires `X-Admin-Token` header)
- `/api/*` - External API routes (requires base64-encoded Bearer token)

### Base64 Encoding

External `/api/*` routes use base64 encoding for both requests and responses:

1. **Token**: Bearer token must be base64-encoded
2. **Request Body**: POST/PUT/PATCH bodies must be base64-encoded JSON
3. **Response**: All responses are base64-encoded JSON

### Token Mappings

Tokens are managed in `../config/token_mappings.json`. Each token maps to:
- `project_id` - Project identifier
- `project_slug` - Human-readable project name
- `environment` - development, staging, or production

## Adding New Routes

### Internal (Admin) Routes

1. Create route file in `routes/internal/`
2. Import in `routes/internal/__init__.py`
3. Use `require_admin(request)` for authentication

### External (API) Routes

1. Create route file in `routes/api/`
2. Import in `routes/api/__init__.py`
3. Access token data via `request.state.project_id`, `request.state.project_slug`, `request.state.environment`
4. For POST/PUT/PATCH, access decoded body via `request.state.decoded_body`
5. Return normal JSON - middleware handles base64 encoding

## Service Layer

- **infrastructure/** - External integrations, auth, DB clients
- **service_layer/** - Business logic (no HTTP dependencies)
- **middleware/** - Request/response processing, auth, base64 encoding

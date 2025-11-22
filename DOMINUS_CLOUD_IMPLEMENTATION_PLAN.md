# Dominus Cloud Implementation Plan

**Repository:** cb-dominus-cloud  
**Date:** 2025-11-22  
**Status:** 📋 Planning Phase  
**Next.js Version:** 16.0.3  
**Target:** Admin Orchestrator UI for CareBridge Systems

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Phase 1: Cleanup & Foundation](#phase-1-cleanup--foundation)
3. [Phase 2: Neon Database Setup](#phase-2-neon-database-setup)
4. [Phase 3: Better Auth Integration](#phase-3-better-auth-integration)
5. [Phase 4: Sovereign Cloud Integration](#phase-4-sovereign-cloud-integration)
6. [Phase 5: UI Development](#phase-5-ui-development)
7. [Architecture Decisions](#architecture-decisions)
8. [Security Considerations](#security-considerations)
9. [Deployment Updates](#deployment-updates)
10. [Timeline & Milestones](#timeline--milestones)

---

## 🎯 Overview

### Purpose

**cb-dominus-cloud** is the front-end orchestrator UI for CareBridge Systems admin operations. It provides a unified interface to:

- **Sovereign Cloud**: Infisical secret management
- **Quartermaster Cloud**: GitHub + Cloud Run provisioning
- **Other Admin Services**: Future admin operations

### Current State

✅ **Completed:**
- Next.js 16 starter cloned and deployed
- CI/CD pipelines configured (dev/staging/production)
- Cloud Run services created
- Token mappings configured for Infisical integration
- Project registered in Infisical (project ID: `eee53992-e541-43c1-8147-5f7c310df805`)

🔜 **Pending:**
- Remove demo content
- Set up Neon PostgreSQL database
- Integrate Better Auth
- Connect to Sovereign Cloud external API
- Build admin dashboard UI

---

## 🧹 Phase 1: Cleanup & Foundation

### 1.1 Remove Demo Content

**Objective:** Clean the project structure while preserving useful components.

**Actions:**

1. **Remove Demo Pages:**
   - Delete `src/app/(delete-this-and-modify-page.tsx)/` directory
   - Remove demo component files (keep shadcn UI components in `src/registry/`)

2. **Clean Up Components:**
   - Keep: `src/components/` shadcn UI components (accordion, button, card, etc.)
   - Keep: `src/registry/` - shadcn component registry
   - Remove: Demo-specific components (accordion-demo.tsx, alert-demo.tsx, etc.)
   - Keep: Utility components (theme-provider.tsx, mode-toggle.tsx, etc.)

3. **Update Root Page:**
   - Replace `src/app/page.tsx` with a simple landing/redirect page
   - Create new dashboard route structure

4. **Update Layout:**
   - Modify `src/app/layout.tsx` to remove demo-specific imports
   - Keep theme provider and global styles

**Files to Remove:**
```
src/app/(delete-this-and-modify-page.tsx)/
src/components/*-demo.tsx (all demo components)
```

**Files to Keep:**
```
src/components/theme-provider.tsx
src/components/mode-toggle.tsx
src/components/app-sidebar.tsx
src/registry/ (entire directory)
src/lib/utils.ts
```

### 1.2 Create New Project Structure

**New Directory Structure:**
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── secrets/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...better-auth]/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── auth/
│   ├── dashboard/
│   └── sovereign/
├── lib/
│   ├── db/
│   │   ├── client.ts (Neon connection)
│   │   └── schema.ts (Better Auth schema)
│   ├── auth.ts (Better Auth config)
│   ├── api/
│   │   └── sovereign.ts (Sovereign API client)
│   └── utils.ts
└── config/
    └── token_mappings.json (already exists)
```

---

## 🗄️ Phase 2: Neon Database Setup

### 2.1 Provision Neon Database

**Objective:** Set up Neon PostgreSQL with multi-role security model.

**Actions:**

1. **Run Provisioning Script:**
   ```bash
   cd C:/Users/Zacha/OneDrive/Documents/Desktop/CareBridgeSystems/codingroot/config_proposed/neon_service_files
   bash provision_neon_database.sh cb-dominus-cloud carebridgesystems
   ```

2. **Expected Output:**
   - Neon project: `cb-dominus-cloud`
   - 3 branches: `production`, `staging`, `development`
   - 9 database roles (3 per branch: owner, app, hipaa)
   - Database: `core_config` in each branch
   - 21 GitHub secrets added (7 per environment)

3. **Verify Secrets:**
   ```bash
   gh secret list --repo carebridgesystems/cb-dominus-cloud --env development
   gh secret list --repo carebridgesystems/cb-dominus-cloud --env staging
   gh secret list --repo carebridgesystems/cb-dominus-cloud --env production
   ```

### 2.2 Neon Multi-Role Security Model

**Three Database Roles Per Branch:**

| Role | Purpose | Used By | Privileges |
|------|---------|---------|------------|
| **OWNER** | Schema changes | CI/CD migrations, Better Auth setup | DDL (CREATE, ALTER, DROP) |
| **APP** | Application runtime | Next.js app, Better Auth queries | DML (SELECT, INSERT, UPDATE, DELETE) |
| **HIPAA** | Audit/logging | Future audit features | DML on HIPAA tables only |

**Security Principle:** Applications NEVER run with OWNER credentials.

**For Better Auth:**
- **Setup/Migrations**: Use OWNER credentials (via GitHub Actions or local setup)
- **Runtime**: Use APP credentials (via environment variables in Cloud Run)

### 2.3 Database Connection Setup

**Create `src/lib/db/client.ts`:**

```typescript
// Parse PG* format credentials from environment
// Build connection string for Neon
// Export connection pool for Better Auth
```

**Environment Variables (from GitHub Secrets):**
- `CB_APP_USER_CREDENTIALS` - Contains PG* format credentials for APP role
- Format: Multi-line string with `PGHOST=...`, `PGUSER=...`, etc.

**Connection String Format:**
```
postgresql://${user}:${password}@${host}/${database}?sslmode=require&channel_binding=require
```

---

## 🔐 Phase 3: Better Auth Integration

### 3.1 What is Better Auth?

**Better Auth** is a modern, type-safe authentication library for Next.js that:

- ✅ **Works with PostgreSQL/Neon** - Native support
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Next.js 16 Compatible** - App Router support
- ✅ **Multiple Providers** - Email/password, OAuth, etc.
- ✅ **Session Management** - Secure cookie-based sessions
- ✅ **Database Schema** - Auto-generates tables
- ✅ **Middleware Support** - Route protection

**Key Features:**
- Email/password authentication
- OAuth providers (Google, GitHub, etc.)
- Session management with secure cookies
- Password hashing (bcrypt/argon2)
- Email verification
- Password reset flows

### 3.2 Better Auth + Neon Integration

**How Better Auth Works with Neon:**

1. **Database Schema:**
   - Better Auth creates its own tables (users, sessions, accounts, etc.)
   - Tables are created in the `core_config` database
   - Uses standard PostgreSQL, fully compatible with Neon

2. **Connection:**
   - Better Auth uses a PostgreSQL connection string
   - We'll provide the connection string built from Neon APP credentials
   - Connection is pooled for performance

3. **Multi-Role Compatibility:**
   - **Setup Phase**: Use OWNER credentials to run migrations (create tables)
   - **Runtime Phase**: Use APP credentials for all queries (SELECT, INSERT, UPDATE, DELETE)
   - Better Auth only needs DML operations at runtime (no DDL)

4. **Schema Location:**
   - Better Auth tables will be in the `public` schema (default)
   - No conflicts with existing Neon multi-role model
   - APP role has full DML access to `public` schema

### 3.3 Installation & Setup

**1. Install Better Auth:**
```bash
npm install better-auth
npm install @better-auth/prisma-adapter  # Optional: if using Prisma
# OR use direct PostgreSQL adapter
```

**2. Create Better Auth Configuration (`src/lib/auth.ts`):**
```typescript
import { betterAuth } from "better-auth"
import { prismaAdapter } from "@better-auth/prisma-adapter" // OR postgresAdapter
import { db } from "./db/client"

export const auth = betterAuth({
  database: {
    provider: "postgresql",
    url: process.env.DATABASE_URL, // Built from CB_APP_USER_CREDENTIALS
  },
  emailAndPassword: {
    enabled: true,
  },
  // ... other config
})
```

**3. Create API Route (`src/app/api/auth/[...better-auth]/route.ts`):**
```typescript
import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = toNextJsHandler(auth)
```

**4. Create Database Schema:**
- Better Auth will auto-generate schema on first run
- OR use migration tool to create tables upfront
- Run with OWNER credentials for initial setup

### 3.4 Better Auth Tables

**Expected Tables (created by Better Auth):**
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth accounts (if using OAuth)
- `verification` - Email verification tokens
- `password` - Password hashes (if using email/password)

**All tables in `public` schema, accessible by APP role.**

### 3.5 Environment Variables

**Add to GitHub Secrets (per environment):**
- `BETTER_AUTH_SECRET` - Secret key for signing tokens (generate random 32+ char string)
- `BETTER_AUTH_URL` - Base URL of the app (e.g., `https://dominus-cloud-development-...run.app`)
- `DATABASE_URL` - Built from `CB_APP_USER_CREDENTIALS` in workflow

**Local Development:**
- Create `.env.local` with same variables
- Use Neon development branch credentials

### 3.6 Authentication Flow

**1. User Registration/Login:**
   - User submits credentials via form
   - Better Auth validates and creates session
   - Session stored in database + secure HttpOnly cookie

**2. Protected Routes:**
   - Use Better Auth middleware to protect routes
   - Check session on server-side
   - Redirect to login if not authenticated

**3. API Calls:**
   - Include session cookie automatically
   - Better Auth validates session server-side
   - Extract user info from session

---

## 🔌 Phase 4: Sovereign Cloud Integration

### 4.1 Sovereign External API Overview

**Base URL:** `https://sovereign-cloud-development-775398158805.us-east4.run.app`

**External API Endpoints (`/api/*`):**
- `POST /api/secrets/get` - Get secret value
- `POST /api/secrets/upsert` - Create/update secret

**Authentication:**
- Token-based via `Authorization: Bearer <base64-encoded-token>` header
- Token maps to project/environment via `config/token_mappings.json`
- Request/response bodies are Base64-encoded JSON

### 4.2 Token Mapping System

**Current Token Mappings (`config/token_mappings.json`):**
```json
{
  "1f9efd620db8f91dbb97d421c63a30664cc453b30895367bd107dadff7aaa5f4": {
    "project_slug": "cb-dominus-cloud",
    "environment": "development",
    "project_id": "eee53992-e541-43c1-8147-5f7c310df805"
  },
  // ... staging and production tokens
}
```

**How It Works:**
1. Token is SHA256 hash of some secret
2. Sovereign looks up token in mappings
3. Determines which Infisical project/environment to use
4. Returns secrets for that project/environment

### 4.3 Create Sovereign API Client

**Create `src/lib/api/sovereign.ts`:**

```typescript
// Functions:
// - getSecret(key: string, environment: 'development' | 'staging' | 'production')
// - upsertSecret(key: string, value: string, environment: ...)
// - Helper: getTokenForEnvironment(env)
// - Helper: base64Encode/decode for request/response
```

**Implementation Details:**
1. Read token from `config/token_mappings.json` based on environment
2. Base64 encode the token for Authorization header
3. Base64 encode request body JSON
4. Base64 decode response body JSON
5. Handle errors and retries

### 4.4 API Route Wrapper

**Create `src/app/api/sovereign/[...path]/route.ts`:**

- Proxy requests to Sovereign Cloud
- Add authentication headers
- Handle Base64 encoding/decoding
- Forward responses to frontend

**OR**

**Direct Client Usage:**
- Use Sovereign client directly in Server Components
- No API route needed (simpler)

### 4.5 Environment Detection

**Determine Current Environment:**
- From `ENV` environment variable (set by Cloud Run)
- Values: `dev`, `staging`, `prod`
- Map to Sovereign environment: `development`, `staging`, `production`

---

## 🎨 Phase 5: UI Development

### 5.1 Dashboard Layout

**Create `src/app/(dashboard)/layout.tsx`:**
- Sidebar navigation
- Header with user info
- Protected route wrapper (Better Auth)
- Theme provider

### 5.2 Dashboard Pages

**1. Dashboard Home (`/dashboard`):**
   - Overview cards (projects count, secrets count, etc.)
   - Recent activity
   - Quick actions

**2. Projects Page (`/dashboard/projects`):**
   - List Infisical projects
   - Create new project
   - Project details view
   - Uses Sovereign API

**3. Secrets Page (`/dashboard/secrets`):**
   - List secrets for selected project/environment
   - Create/update/delete secrets
   - Environment switcher (dev/staging/prod)
   - Uses Sovereign API

**4. Settings Page (`/dashboard/settings`):**
   - User profile
   - Authentication settings
   - API keys (if needed)

### 5.3 Authentication Pages

**1. Login Page (`/login`):**
   - Email/password form
   - Better Auth login handler
   - Redirect to dashboard on success

**2. Register Page (`/register`):**
   - User registration form
   - Email verification flow
   - Admin approval (if needed)

### 5.4 Components

**Create Component Library:**
- `components/dashboard/` - Dashboard-specific components
- `components/sovereign/` - Sovereign API integration components
- `components/auth/` - Authentication components
- Reuse shadcn UI components from `components/ui/`

---

## 🏗️ Architecture Decisions

### Decision 1: Better Auth vs Custom Auth

**Chosen: Better Auth**

**Reasons:**
- ✅ Modern, type-safe, Next.js 16 compatible
- ✅ Works seamlessly with Neon PostgreSQL
- ✅ Built-in session management
- ✅ Less code to maintain
- ✅ Active development and community

**Alternative Considered:**
- Custom JWT implementation (like agent-api)
- **Rejected:** More code to maintain, Better Auth is purpose-built for Next.js

### Decision 2: Database Schema Location

**Chosen: `public` schema (default)**

**Reasons:**
- ✅ Better Auth default behavior
- ✅ APP role has full DML access
- ✅ No schema conflicts
- ✅ Simple and standard

**Alternative Considered:**
- Separate `auth` schema
- **Rejected:** Unnecessary complexity, APP role can access public schema

### Decision 3: Sovereign API Integration Pattern

**Chosen: Direct Client Usage in Server Components**

**Reasons:**
- ✅ Simpler (no API route proxy needed)
- ✅ Server-side only (secrets never exposed to client)
- ✅ Better performance (direct API calls)
- ✅ Type-safe with TypeScript

**Alternative Considered:**
- API route proxy (`/api/sovereign/*`)
- **Rejected:** Adds unnecessary layer, secrets should never hit client

### Decision 4: Environment Variable Management

**Chosen: GitHub Secrets + Cloud Run Environment Variables**

**Reasons:**
- ✅ Already established pattern in organization
- ✅ Secure (no secrets in code)
- ✅ Environment-specific values
- ✅ Works with existing CI/CD

---

## 🔒 Security Considerations

### 1. Authentication Security

- ✅ Better Auth uses secure password hashing (bcrypt/argon2)
- ✅ Sessions stored in database (not just cookies)
- ✅ HttpOnly cookies (XSS protection)
- ✅ CSRF protection built-in
- ✅ Secure token generation

### 2. API Security

- ✅ Sovereign tokens stored server-side only
- ✅ Never expose tokens to client
- ✅ Base64 encoding for transport (not security, just format)
- ✅ Environment-specific tokens

### 3. Database Security

- ✅ APP role has limited privileges (DML only, no DDL)
- ✅ OWNER credentials only used for migrations
- ✅ SSL/TLS required for all connections
- ✅ Channel binding required

### 4. Deployment Security

- ✅ Secrets in GitHub Secrets (not in code)
- ✅ Environment variables injected at deploy time
- ✅ No secrets in Docker images
- ✅ Production requires manual approval

---

## 🚀 Deployment Updates

### Update GitHub Actions Workflows

**Add to `deploy-development.yml`, `deploy-staging.yml`, `deploy-production.yml`:**

```yaml
# After database credentials step, add:
- name: Build database connection string
  id: db-connection
  run: |
    # Parse CB_APP_USER_CREDENTIALS and build DATABASE_URL
    # Export as DATABASE_URL for Better Auth

# In Deploy to Cloud Run step, add:
--set-env-vars="ENV=dev,
                DATABASE_URL=${{ steps.db-connection.outputs.url }},
                BETTER_AUTH_SECRET=${{ secrets.BETTER_AUTH_SECRET }},
                BETTER_AUTH_URL=${{ secrets.BETTER_AUTH_URL }},
                NODE_ENV=production"
```

**Add GitHub Secrets:**
- `BETTER_AUTH_SECRET` (per environment)
- `BETTER_AUTH_URL` (per environment)

### Neon Database Migration

**Option 1: Auto-migration (Better Auth default)**
- Better Auth creates tables on first run
- Requires OWNER credentials initially
- Then switch to APP credentials

**Option 2: Manual Migration**
- Create migration script
- Run in GitHub Actions with OWNER credentials
- Then deploy app with APP credentials

**Recommended: Option 2 (more control)**

---

## 📅 Timeline & Milestones

### Week 1: Foundation
- [ ] Phase 1: Remove demo content
- [ ] Phase 2: Provision Neon database
- [ ] Phase 3: Install and configure Better Auth
- [ ] Test authentication flow locally

### Week 2: Integration
- [ ] Phase 4: Create Sovereign API client
- [ ] Test Sovereign API integration
- [ ] Phase 5: Build basic dashboard layout
- [ ] Create login/register pages

### Week 3: Features
- [ ] Build projects management page
- [ ] Build secrets management page
- [ ] Add environment switching
- [ ] Polish UI/UX

### Week 4: Deployment & Testing
- [ ] Update deployment workflows
- [ ] Test in development environment
- [ ] Deploy to staging
- [ ] Production deployment (with approval)

---

## 📚 References

### Documentation
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Neon PostgreSQL Guide](https://neon.tech/docs)
- [Sovereign Cloud API](https://sovereign-cloud-development-775398158805.us-east4.run.app/docs)
- [Next.js 16 App Router](https://nextjs.org/docs/app)

### Related Projects
- `cb-sovereign-cloud` - Infisical secret management service
- `cb-quartermaster-cloud` - GitHub + Cloud Run provisioning
- `agent-api` - Custom JWT auth implementation (reference)

### Configuration Files
- `config/token_mappings.json` - Token to project/environment mapping
- `config/LLM-READY-DEPLOYMENT-GUIDE.md` - Deployment guide
- `.github/workflows/deploy-*.yml` - CI/CD workflows

---

## ✅ Next Steps

1. **Review this plan** - Confirm approach and decisions
2. **Start Phase 1** - Remove demo content
3. **Provision Neon** - Run Neon provisioning script
4. **Install Better Auth** - Set up authentication
5. **Build incrementally** - One feature at a time

---

**Last Updated:** 2025-11-22  
**Status:** Ready for Implementation  
**Next Action:** Review plan and begin Phase 1


# Phase 2: Neon Database Setup - Status

**Date:** 2025-11-22  
**Status:** ✅ Partially Complete

---

## ✅ Completed

### 1. Neon Project Created
- **Project ID:** `damp-sunset-05853585`
- **Project Name:** `cb-dominus-cloud`
- **Region:** `aws-us-east-2`

### 2. Branches Created
- ✅ **production** (`br-patient-hill-ae5vuzn2`)
- ✅ **staging** (`br-little-silence-ae8fn1en`)
- ✅ **development** (`br-floral-snow-ae4hy05w`)

### 3. Users Created (Production Branch)
- ✅ **owner_cb_dominus_cloud** - For migrations/schema changes
- ✅ **app_cb_dominus_cloud** - For application runtime (password: `npg_bDehtYZk30BV`)
- ✅ **hipaa_cb_dominus_cloud** - For audit/logging

*Note: Users are inherited by staging and development branches*

### 4. Database Connection Utilities Created
- ✅ `src/lib/db/pg-credentials.ts` - Parse PG* format credentials
- ✅ `src/lib/db/client.ts` - Neon serverless database client
- ✅ `@neondatabase/serverless` package installed

---

## ⚠️ Pending Tasks

### 1. Create `core_config` Database
The `core_config` database needs to be created in each branch. This can be done via:

**Option A: Neon Console**
1. Go to https://console.neon.tech/
2. Select project `cb-dominus-cloud`
3. For each branch (production, staging, development):
   - Go to the branch
   - Click "Databases" → "Create Database"
   - Name: `core_config`
   - Owner: `owner_cb_dominus_cloud`

**Option B: neonctl CLI**
```bash
# Production
neonctl databases create \
  --project-id damp-sunset-05853585 \
  --branch production \
  --name core_config \
  --owner-role owner_cb_dominus_cloud

# Staging
neonctl databases create \
  --project-id damp-sunset-05853585 \
  --branch staging \
  --name core_config \
  --owner-role owner_cb_dominus_cloud

# Development
neonctl databases create \
  --project-id damp-sunset-05853585 \
  --branch development \
  --name core_config \
  --owner-role owner_cb_dominus_cloud
```

### 2. Add GitHub Secrets
GitHub environment secrets need to be added for each environment. The secrets should be in PG* format:

**Required Secrets (7 per environment):**

**Production:**
- `NEON_PROD_PGHOST` - Production endpoint host
- `NEON_PROD_OWNER_USER` - `owner_cb_dominus_cloud`
- `NEON_PROD_OWNER_PASSWORD` - Get from Neon console
- `NEON_PROD_APP_USER` - `app_cb_dominus_cloud`
- `NEON_PROD_APP_PASSWORD` - `npg_bDehtYZk30BV` (known)
- `NEON_PROD_HIPAA_USER` - `hipaa_cb_dominus_cloud`
- `NEON_PROD_HIPAA_PASSWORD` - Get from Neon console

**Staging:**
- `NEON_STG_PGHOST` - Staging endpoint host
- `NEON_STG_OWNER_USER` - `owner_cb_dominus_cloud`
- `NEON_STG_OWNER_PASSWORD` - Get from Neon console
- `NEON_STG_APP_USER` - `app_cb_dominus_cloud`
- `NEON_STG_APP_PASSWORD` - Get from Neon console
- `NEON_STG_HIPAA_USER` - `hipaa_cb_dominus_cloud`
- `NEON_STG_HIPAA_PASSWORD` - Get from Neon console

**Development:**
- `NEON_DEV_PGHOST` - Development endpoint host
- `NEON_DEV_OWNER_USER` - `owner_cb_dominus_cloud`
- `NEON_DEV_OWNER_PASSWORD` - Get from Neon console
- `NEON_DEV_APP_USER` - `app_cb_dominus_cloud`
- `NEON_DEV_APP_PASSWORD` - Get from Neon console
- `NEON_DEV_HIPAA_USER` - `hipaa_cb_dominus_cloud`
- `NEON_DEV_HIPAA_PASSWORD` - Get from Neon console

**To Get Passwords:**
1. Go to Neon Console → Project → Branch → Roles
2. Click on each role to view password
3. Or use `neonctl roles list --project-id damp-sunset-05853585 --branch <branch> --output json`

**To Get Host:**
```bash
neonctl connection-string \
  --project-id damp-sunset-05853585 \
  --branch production \
  --database neondb \
  --role-name owner_cb_dominus_cloud \
  --pooled
```

**Format for GitHub Secrets (PG* format):**
```
PGHOST='ep-xxx.c-2.us-east-2.aws.neon.tech'
PGDATABASE='core_config'
PGUSER='app_cb_dominus_cloud'
PGPASSWORD='npg_xxx'
PGSSLMODE='require'
PGCHANNELBINDING='require'
```

**Add Secret Command:**
```bash
gh secret set CB_APP_USER_CREDENTIALS \
  --repo carebridgesystems/cb-dominus-cloud \
  --env development \
  --body "PGHOST='...'
PGDATABASE='core_config'
PGUSER='app_cb_dominus_cloud'
PGPASSWORD='...'
PGSSLMODE='require'
PGCHANNELBINDING='require'"
```

---

## 📝 Usage

### In Application Code

```typescript
import { getDbClient, query } from '@/lib/db/client';

// Simple query
const users = await query('SELECT * FROM users LIMIT 10');

// With parameters
const user = await query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);

// Direct client access
const sql = getDbClient();
const result = await sql('SELECT version()');
```

### Environment Variables

The application expects `CB_APP_USER_CREDENTIALS` to be set in the environment (from GitHub Secrets in Cloud Run).

---

## 🔍 Verification

### Check Database Connection

```typescript
import { testConnection } from '@/lib/db/client';

const isConnected = await testConnection();
console.log('Database connected:', isConnected);
```

### List All Secrets

```bash
gh secret list --repo carebridgesystems/cb-dominus-cloud --env development
gh secret list --repo carebridgesystems/cb-dominus-cloud --env staging
gh secret list --repo carebridgesystems/cb-dominus-cloud --env production
```

---

## 📚 References

- [Neon Console](https://console.neon.tech/)
- [Neon Serverless Driver](https://github.com/neondatabase/serverless)
- [Neon CLI Documentation](https://neon.tech/docs/reference/neon-cli)


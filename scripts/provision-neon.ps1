# CareBridge Systems - Neon Database Provisioner (PowerShell)
# Provisions Neon project, branches, databases, and users for cb-dominus-cloud
# This is a simplified version for Windows PowerShell

$PROJECT_ID = "damp-sunset-05853585"
$REPO_NAME = "cb-dominus-cloud"
$GITHUB_ORG = "carebridgesystems"
$DATABASE_NAME = "core_config"

Write-Host "=========================================="
Write-Host "CareBridge Systems - Neon Provisioner"
Write-Host "=========================================="
Write-Host "Repository: $REPO_NAME"
Write-Host "GitHub Org: $GITHUB_ORG"
Write-Host "Database: $DATABASE_NAME"
Write-Host "Project ID: $PROJECT_ID"
Write-Host "=========================================="
Write-Host ""

# Step 1: Create Production Branch
Write-Host "[1/5] Creating production branch..."
$prodBranchJson = neonctl branches create --project-id $PROJECT_ID --name production --output json
$prodBranchId = ($prodBranchJson | ConvertFrom-Json).branch.id
Write-Host "  ✓ Created production branch: $prodBranchId"

# Get production host
$prodConnStr = neonctl connection-string --project-id $PROJECT_ID --branch production --database neondb --role neondb_owner --pooled --output json | ConvertFrom-Json
$prodHost = $prodConnStr.connection_string -replace 'postgresql://[^@]+@([^/]+)/.*', '$1'
Write-Host "  ✓ Production host: $prodHost"
Write-Host ""

# Step 2: Create Users in Production
Write-Host "[2/5] Creating users in production branch..."

# Owner user
Write-Host "  • Creating owner_user..."
$ownerUser = neonctl roles create --project-id $PROJECT_ID --branch production --name "owner_$($REPO_NAME -replace '-','_')" --output json | ConvertFrom-Json
$prodOwnerUser = $ownerUser.role.name
$prodOwnerPassword = $ownerUser.role.password
Write-Host "    ✓ User: $prodOwnerUser"

# App user
Write-Host "  • Creating app_user..."
$appUser = neonctl roles create --project-id $PROJECT_ID --branch production --name "app_$($REPO_NAME -replace '-','_')" --output json | ConvertFrom-Json
$prodAppUser = $appUser.role.name
$prodAppPassword = $appUser.role.password
Write-Host "    ✓ User: $prodAppUser"

# HIPAA user
Write-Host "  • Creating hipaa_user..."
$hipaaUser = neonctl roles create --project-id $PROJECT_ID --branch production --name "hipaa_$($REPO_NAME -replace '-','_')" --output json | ConvertFrom-Json
$prodHipaaUser = $hipaaUser.role.name
$prodHipaaPassword = $hipaaUser.role.password
Write-Host "    ✓ User: $prodHipaaUser"
Write-Host ""

# Step 3: Create Database in Production
Write-Host "[3/5] Creating database in production branch..."
neonctl databases create --project-id $PROJECT_ID --branch production --name $DATABASE_NAME --owner $prodOwnerUser | Out-Null
Write-Host "  ✓ Created database: $DATABASE_NAME"
Write-Host "  ✓ Owner: $prodOwnerUser"
Write-Host ""

# Step 4: Create Staging and Development Branches
Write-Host "[4/5] Creating staging and development branches..."

# Staging
Write-Host "  • Creating staging branch..."
$stgBranchJson = neonctl branches create --project-id $PROJECT_ID --name staging --parent production --output json
$stgBranchId = ($stgBranchJson | ConvertFrom-Json).branch.id
$stgConnStr = neonctl connection-string --project-id $PROJECT_ID --branch staging --database neondb --role neondb_owner --pooled --output json | ConvertFrom-Json
$stgHost = $stgConnStr.connection_string -replace 'postgresql://[^@]+@([^/]+)/.*', '$1'
Write-Host "    ✓ Staging branch: $stgBranchId"
Write-Host "    ✓ Staging host: $stgHost"

# Development
Write-Host "  • Creating development branch..."
$devBranchJson = neonctl branches create --project-id $PROJECT_ID --name development --parent production --output json
$devBranchId = ($devBranchJson | ConvertFrom-Json).branch.id
$devConnStr = neonctl connection-string --project-id $PROJECT_ID --branch development --database neondb --role neondb_owner --pooled --output json | ConvertFrom-Json
$devHost = $devConnStr.connection_string -replace 'postgresql://[^@]+@([^/]+)/.*', '$1'
Write-Host "    ✓ Development branch: $devBranchId"
Write-Host "    ✓ Development host: $devHost"
Write-Host ""

# Get passwords for staging and development (they inherit from production)
Write-Host "  • Fetching staging user credentials..."
$stgOwnerRole = neonctl roles show --project-id $PROJECT_ID --branch staging --role $prodOwnerUser --output json 2>$null | ConvertFrom-Json
$stgOwnerPassword = if ($stgOwnerRole.password) { $stgOwnerRole.password } else { $prodOwnerPassword }

$stgAppRole = neonctl roles show --project-id $PROJECT_ID --branch staging --role $prodAppUser --output json 2>$null | ConvertFrom-Json
$stgAppPassword = if ($stgAppRole.password) { $stgAppRole.password } else { $prodAppPassword }

$stgHipaaRole = neonctl roles show --project-id $PROJECT_ID --branch staging --role $prodHipaaUser --output json 2>$null | ConvertFrom-Json
$stgHipaaPassword = if ($stgHipaaRole.password) { $stgHipaaRole.password } else { $prodHipaaPassword }

Write-Host "  • Fetching development user credentials..."
$devOwnerRole = neonctl roles show --project-id $PROJECT_ID --branch development --role $prodOwnerUser --output json 2>$null | ConvertFrom-Json
$devOwnerPassword = if ($devOwnerRole.password) { $devOwnerRole.password } else { $prodOwnerPassword }

$devAppRole = neonctl roles show --project-id $PROJECT_ID --branch development --role $prodAppUser --output json 2>$null | ConvertFrom-Json
$devAppPassword = if ($devAppRole.password) { $devAppRole.password } else { $prodAppPassword }

$devHipaaRole = neonctl roles show --project-id $PROJECT_ID --branch development --role $prodHipaaUser --output json 2>$null | ConvertFrom-Json
$devHipaaPassword = if ($devHipaaRole.password) { $devHipaaRole.password } else { $prodHipaaPassword }

Write-Host "    ✓ Retrieved all credentials"
Write-Host ""

# Step 5: Add GitHub Environment Secrets
Write-Host "[5/5] Adding GitHub environment secrets..."

function Add-Secret {
    param($env, $name, $value)
    gh secret set $name --repo "${GITHUB_ORG}/${REPO_NAME}" --env $env --body $value 2>$null
}

# Production secrets
Write-Host "  • Production environment..."
Add-Secret "production" "NEON_PROD_PGHOST" $prodHost
Add-Secret "production" "NEON_PROD_OWNER_USER" $prodOwnerUser
Add-Secret "production" "NEON_PROD_OWNER_PASSWORD" $prodOwnerPassword
Add-Secret "production" "NEON_PROD_APP_USER" $prodAppUser
Add-Secret "production" "NEON_PROD_APP_PASSWORD" $prodAppPassword
Add-Secret "production" "NEON_PROD_HIPAA_USER" $prodHipaaUser
Add-Secret "production" "NEON_PROD_HIPAA_PASSWORD" $prodHipaaPassword
Write-Host "    ✓ Added 7 secrets"

# Staging secrets
Write-Host "  • Staging environment..."
Add-Secret "staging" "NEON_STG_PGHOST" $stgHost
Add-Secret "staging" "NEON_STG_OWNER_USER" $prodOwnerUser
Add-Secret "staging" "NEON_STG_OWNER_PASSWORD" $stgOwnerPassword
Add-Secret "staging" "NEON_STG_APP_USER" $prodAppUser
Add-Secret "staging" "NEON_STG_APP_PASSWORD" $stgAppPassword
Add-Secret "staging" "NEON_STG_HIPAA_USER" $prodHipaaUser
Add-Secret "staging" "NEON_STG_HIPAA_PASSWORD" $stgHipaaPassword
Write-Host "    ✓ Added 7 secrets"

# Development secrets
Write-Host "  • Development environment..."
Add-Secret "development" "NEON_DEV_PGHOST" $devHost
Add-Secret "development" "NEON_DEV_OWNER_USER" $prodOwnerUser
Add-Secret "development" "NEON_DEV_OWNER_PASSWORD" $devOwnerPassword
Add-Secret "development" "NEON_DEV_APP_USER" $prodAppUser
Add-Secret "development" "NEON_DEV_APP_PASSWORD" $devAppPassword
Add-Secret "development" "NEON_DEV_HIPAA_USER" $prodHipaaUser
Add-Secret "development" "NEON_DEV_HIPAA_PASSWORD" $devHipaaPassword
Write-Host "    ✓ Added 7 secrets"
Write-Host ""

# Summary
Write-Host "=========================================="
Write-Host "✓ NEON PROVISIONING COMPLETE"
Write-Host "=========================================="
Write-Host ""
Write-Host "Project Details:"
Write-Host "  Project ID: $PROJECT_ID"
Write-Host "  Project Name: $REPO_NAME"
Write-Host "  Database: $DATABASE_NAME"
Write-Host ""
Write-Host "Branches Created:"
Write-Host "  • production ($prodBranchId)"
Write-Host "    Host: $prodHost"
Write-Host "  • staging ($stgBranchId)"
Write-Host "    Host: $stgHost"
Write-Host "  • development ($devBranchId)"
Write-Host "    Host: $devHost"
Write-Host ""
Write-Host "Users Created (per branch):"
Write-Host "  • $prodOwnerUser (migrations)"
Write-Host "  • $prodAppUser (application runtime)"
Write-Host "  • $prodHipaaUser (audit/logging)"
Write-Host ""
Write-Host "GitHub Secrets Added:"
Write-Host "  • 21 total secrets across 3 environments"
Write-Host ""


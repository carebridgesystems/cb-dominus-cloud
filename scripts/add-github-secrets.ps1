# Add all 21 GitHub secrets for Neon database credentials

$REPO = "carebridgesystems/cb-dominus-cloud"

# Production credentials
$PROD_HOST = "ep-crimson-resonance-ae8l8636-pooler.c-2.us-east-2.aws.neon.tech"
$PROD_OWNER_USER = "owner_cb_dominus_cloud"
$PROD_OWNER_PASSWORD = "npg_Sxb3hMFQsV6g"
$PROD_APP_USER = "app_cb_dominus_cloud"
$PROD_APP_PASSWORD = "npg_bDehtYZk30BV"
$PROD_HIPAA_USER = "hipaa_cb_dominus_cloud"
$PROD_HIPAA_PASSWORD = "npg_UT0zhFvK3iPa"

# Staging credentials
$STG_HOST = "ep-tiny-grass-aeqsvlrd-pooler.c-2.us-east-2.aws.neon.tech"
$STG_OWNER_USER = "owner_cb_dominus_cloud"
$STG_OWNER_PASSWORD = "npg_Sxb3hMFQsV6g"
$STG_APP_USER = "app_cb_dominus_cloud"
$STG_APP_PASSWORD = "npg_HieTXwn6rQo4"
$STG_HIPAA_USER = "hipaa_cb_dominus_cloud"
$STG_HIPAA_PASSWORD = "npg_UT0zhFvK3iPa"

# Development credentials
$DEV_HOST = "ep-purple-band-aeukja0o-pooler.c-2.us-east-2.aws.neon.tech"
$DEV_OWNER_USER = "owner_cb_dominus_cloud"
$DEV_OWNER_PASSWORD = "npg_Sxb3hMFQsV6g"
$DEV_APP_USER = "app_cb_dominus_cloud"
$DEV_APP_PASSWORD = "npg_dCESg10pFeRn"
$DEV_HIPAA_USER = "hipaa_cb_dominus_cloud"
$DEV_HIPAA_PASSWORD = "npg_UT0zhFvK3iPa"

function Add-Secret {
    param($env, $name, $value)
    Write-Host "Adding $name to $env..."
    $result = gh secret set $name --repo $REPO --env $env --body $value 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Added $name" -ForegroundColor Green
    }
    else {
        Write-Host "  ✗ Failed to add $name" -ForegroundColor Red
    }
}

function Create-PGCredentials {
    param($host, $user, $password)
    $creds = "PGHOST='$host'`nPGDATABASE='core_config'`nPGUSER='$user'`nPGPASSWORD='$password'`nPGSSLMODE='require'`nPGCHANNELBINDING='require'"
    return $creds
}

Write-Host "=========================================="
Write-Host "Adding GitHub Secrets for Neon Database"
Write-Host "=========================================="
Write-Host ""

# Production secrets
Write-Host "Production Environment:" -ForegroundColor Cyan
Add-Secret "production" "NEON_PROD_PGHOST" $PROD_HOST
Add-Secret "production" "NEON_PROD_OWNER_USER" $PROD_OWNER_USER
Add-Secret "production" "NEON_PROD_OWNER_PASSWORD" $PROD_OWNER_PASSWORD
Add-Secret "production" "NEON_PROD_APP_USER" $PROD_APP_USER
Add-Secret "production" "NEON_PROD_APP_PASSWORD" $PROD_APP_PASSWORD
Add-Secret "production" "NEON_PROD_HIPAA_USER" $PROD_HIPAA_USER
Add-Secret "production" "NEON_PROD_HIPAA_PASSWORD" $PROD_HIPAA_PASSWORD

# Add PG* format credentials
$prodOwnerCreds = Create-PGCredentials $PROD_HOST $PROD_OWNER_USER $PROD_OWNER_PASSWORD
$prodAppCreds = Create-PGCredentials $PROD_HOST $PROD_APP_USER $PROD_APP_PASSWORD
$prodHipaaCreds = Create-PGCredentials $PROD_HOST $PROD_HIPAA_USER $PROD_HIPAA_PASSWORD

Add-Secret "production" "CB_OWNER_USER_CREDENTIALS" $prodOwnerCreds
Add-Secret "production" "CB_APP_USER_CREDENTIALS" $prodAppCreds
Add-Secret "production" "CB_HIPAA_USER_CREDENTIALS" $prodHipaaCreds

Write-Host ""

# Staging secrets
Write-Host "Staging Environment:" -ForegroundColor Cyan
Add-Secret "staging" "NEON_STG_PGHOST" $STG_HOST
Add-Secret "staging" "NEON_STG_OWNER_USER" $STG_OWNER_USER
Add-Secret "staging" "NEON_STG_OWNER_PASSWORD" $STG_OWNER_PASSWORD
Add-Secret "staging" "NEON_STG_APP_USER" $STG_APP_USER
Add-Secret "staging" "NEON_STG_APP_PASSWORD" $STG_APP_PASSWORD
Add-Secret "staging" "NEON_STG_HIPAA_USER" $STG_HIPAA_USER
Add-Secret "staging" "NEON_STG_HIPAA_PASSWORD" $STG_HIPAA_PASSWORD

# Add PG* format credentials
$stgOwnerCreds = Create-PGCredentials $STG_HOST $STG_OWNER_USER $STG_OWNER_PASSWORD
$stgAppCreds = Create-PGCredentials $STG_HOST $STG_APP_USER $STG_APP_PASSWORD
$stgHipaaCreds = Create-PGCredentials $STG_HOST $STG_HIPAA_USER $STG_HIPAA_PASSWORD

Add-Secret "staging" "CB_OWNER_USER_CREDENTIALS" $stgOwnerCreds
Add-Secret "staging" "CB_APP_USER_CREDENTIALS" $stgAppCreds
Add-Secret "staging" "CB_HIPAA_USER_CREDENTIALS" $stgHipaaCreds

Write-Host ""

# Development secrets
Write-Host "Development Environment:" -ForegroundColor Cyan
Add-Secret "development" "NEON_DEV_PGHOST" $DEV_HOST
Add-Secret "development" "NEON_DEV_OWNER_USER" $DEV_OWNER_USER
Add-Secret "development" "NEON_DEV_OWNER_PASSWORD" $DEV_OWNER_PASSWORD
Add-Secret "development" "NEON_DEV_APP_USER" $DEV_APP_USER
Add-Secret "development" "NEON_DEV_APP_PASSWORD" $DEV_APP_PASSWORD
Add-Secret "development" "NEON_DEV_HIPAA_USER" $DEV_HIPAA_USER
Add-Secret "development" "NEON_DEV_HIPAA_PASSWORD" $DEV_HIPAA_PASSWORD

# Add PG* format credentials
$devOwnerCreds = Create-PGCredentials $DEV_HOST $DEV_OWNER_USER $DEV_OWNER_PASSWORD
$devAppCreds = Create-PGCredentials $DEV_HOST $DEV_APP_USER $DEV_APP_PASSWORD
$devHipaaCreds = Create-PGCredentials $DEV_HOST $DEV_HIPAA_USER $DEV_HIPAA_PASSWORD

Add-Secret "development" "CB_OWNER_USER_CREDENTIALS" $devOwnerCreds
Add-Secret "development" "CB_APP_USER_CREDENTIALS" $devAppCreds
Add-Secret "development" "CB_HIPAA_USER_CREDENTIALS" $devHipaaCreds

Write-Host ""
Write-Host "=========================================="
Write-Host "✓ All secrets added!" -ForegroundColor Green
Write-Host "=========================================="
Write-Host ""
Write-Host "Total secrets added: 30 (10 per environment)"
Write-Host "  - 7 individual secrets (host, users, passwords)"
Write-Host "  - 3 PG* format credential strings"
Write-Host ""


/**
 * Parse Neon PG* format credentials from environment variables.
 * 
 * Neon provides credentials in PG* format which can be copied directly
 * from the Neon console and stored as secrets.
 * 
 * Format:
 *   PGHOST='ep-royal-dawn-adatines-pooler.c-2.us-east-1.aws.neon.tech'
 *   PGDATABASE='core_config'
 *   PGUSER='app_user'
 *   PGPASSWORD='npg_ZEVBb6euPc9W'
 *   PGSSLMODE='require'
 *   PGCHANNELBINDING='require'
 */

export interface PGCredentials {
  host: string;
  database: string;
  user: string;
  password: string;
  sslmode: string;
  channelBinding?: string;
}

/**
 * Parse PG* format credentials from a multi-line string.
 * 
 * @param credentialString - Multi-line string in PG* format
 * @returns Parsed credentials object
 */
export function parsePGCredentials(credentialString: string): PGCredentials {
  const values: Record<string, string> = {};

  // Parse each line like: PGHOST='value' or PGHOST="value"
  for (const line of credentialString.trim().split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Match pattern: KEY='value' or KEY="value"
    const match = trimmed.match(/^(\w+)=['"]([^'"]+)['"]$/);
    if (match) {
      const key = match[1].toLowerCase();
      const value = match[2];
      values[key] = value;
    }
  }

  return {
    host: values.pghost || '',
    database: values.pgdatabase || '',
    user: values.pguser || '',
    password: values.pgpassword || '',
    sslmode: values.pgsslmode || 'require',
    channelBinding: values.pgchannelbinding,
  };
}

/**
 * Build PostgreSQL connection string (DSN) from credentials.
 * 
 * @param credentials - Parsed PG credentials
 * @param databaseName - Optional database name override (defaults to credentials.database)
 * @returns PostgreSQL connection string
 */
export function buildConnectionString(
  credentials: PGCredentials,
  databaseName?: string
): string {
  const db = databaseName || credentials.database;
  const params = new URLSearchParams({
    sslmode: credentials.sslmode,
  });

  if (credentials.channelBinding) {
    params.append('channel_binding', credentials.channelBinding);
  }

  return `postgresql://${encodeURIComponent(credentials.user)}:${encodeURIComponent(credentials.password)}@${credentials.host}/${db}?${params.toString()}`;
}

/**
 * Load credentials from environment variable.
 * 
 * @param envVarName - Environment variable name (e.g., 'CB_APP_USER_CREDENTIALS')
 * @returns Parsed credentials or null if not found
 */
export function loadCredentialsFromEnv(envVarName: string): PGCredentials | null {
  const credentialString = process.env[envVarName];
  if (!credentialString) {
    return null;
  }
  return parsePGCredentials(credentialString);
}

/**
 * Load APP user credentials for runtime use.
 * Environment variable: CB_APP_USER_CREDENTIALS
 */
export function loadAppCredentials(): PGCredentials | null {
  return loadCredentialsFromEnv('CB_APP_USER_CREDENTIALS');
}

/**
 * Load OWNER user credentials for migrations/setup.
 * Environment variable: CB_OWNER_USER_CREDENTIALS
 */
export function loadOwnerCredentials(): PGCredentials | null {
  return loadCredentialsFromEnv('CB_OWNER_USER_CREDENTIALS');
}

/**
 * Load HIPAA user credentials for audit operations.
 * Environment variable: CB_HIPAA_USER_CREDENTIALS
 */
export function loadHipaaCredentials(): PGCredentials | null {
  return loadCredentialsFromEnv('CB_HIPAA_USER_CREDENTIALS');
}


/**
 * Neon PostgreSQL Database Client
 * 
 * Provides database connection using Neon's serverless driver.
 * Uses APP user credentials for runtime operations.
 * 
 * For migrations/setup, use OWNER credentials instead.
 */

import { neon, neonConfig } from '@neondatabase/serverless';
import { loadAppCredentials, buildConnectionString, type PGCredentials } from './pg-credentials';

let sql: ReturnType<typeof neon> | null = null;

/**
 * Get or create the database client.
 * Uses APP user credentials from CB_APP_USER_CREDENTIALS environment variable.
 * 
 * @returns Neon SQL client instance
 * @throws Error if credentials are not found or invalid
 */
export function getDbClient() {
  if (sql) {
    return sql;
  }

  const credentials = loadAppCredentials();
  if (!credentials) {
    throw new Error(
      'CB_APP_USER_CREDENTIALS environment variable not set. ' +
      'Please configure Neon database credentials.'
    );
  }

  const connectionString = buildConnectionString(credentials);
  sql = neon(connectionString);
  
  return sql;
}

/**
 * Get database client with custom credentials.
 * Useful for using OWNER or HIPAA credentials.
 * 
 * @param credentials - Custom PG credentials
 * @returns Neon SQL client instance
 */
export function getDbClientWithCredentials(credentials: PGCredentials) {
  const connectionString = buildConnectionString(credentials);
  return neon(connectionString);
}

/**
 * Execute a SQL query.
 * 
 * Note: Neon serverless client uses tagged template strings.
 * For parameterized queries, use template literals directly.
 * 
 * @param sqlQuery - SQL query string (will be used as template literal)
 * @param params - Query parameters (optional, for future use)
 * @returns Query result
 */
export async function query<T = unknown>(
  sqlQuery: string,
  params?: unknown[]
): Promise<T[]> {
  const client = getDbClient();
  // Neon client expects template strings, but we can pass a regular string
  // by using it as a template literal with no substitutions
  return (client as any)(sqlQuery) as Promise<T[]>;
}

/**
 * Execute a SQL query with custom credentials.
 * 
 * @param credentials - Custom PG credentials
 * @param sqlQuery - SQL query string
 * @param params - Query parameters (optional, for future use)
 * @returns Query result
 */
export async function queryWithCredentials<T = unknown>(
  credentials: PGCredentials,
  sqlQuery: string,
  params?: unknown[]
): Promise<T[]> {
  const client = getDbClientWithCredentials(credentials);
  return (client as any)(sqlQuery) as Promise<T[]>;
}

/**
 * Test database connection.
 * 
 * @returns true if connection successful, false otherwise
 */
export async function testConnection(): Promise<boolean> {
  try {
    const result = await query<{ version: string }>('SELECT version()');
    return result.length > 0;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}



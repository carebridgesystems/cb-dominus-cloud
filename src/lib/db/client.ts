/**
 * Neon PostgreSQL Database Client
 * 
 * Provides database connection using Neon's serverless driver.
 * Uses APP user credentials for runtime operations.
 * 
 * For migrations/setup, use OWNER credentials instead.
 */

import { neon } from '@neondatabase/serverless';
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
 * @param query - SQL query string
 * @param params - Query parameters (optional)
 * @returns Query result
 */
export async function query<T = unknown>(
  query: string,
  params?: unknown[]
): Promise<T[]> {
  const client = getDbClient();
  return client(query, params) as Promise<T[]>;
}

/**
 * Execute a SQL query with custom credentials.
 * 
 * @param credentials - Custom PG credentials
 * @param query - SQL query string
 * @param params - Query parameters (optional)
 * @returns Query result
 */
export async function queryWithCredentials<T = unknown>(
  credentials: PGCredentials,
  query: string,
  params?: unknown[]
): Promise<T[]> {
  const client = getDbClientWithCredentials(credentials);
  return client(query, params) as Promise<T[]>;
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


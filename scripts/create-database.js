// Script to create core_config database in all Neon branches
const { neon } = require('@neondatabase/serverless');

const PROJECT_ID = 'damp-sunset-05853585';
const BRANCHES = ['production', 'staging', 'development'];
const OWNER_USER = 'owner_cb_dominus_cloud';

// Connection strings (will be filled in)
const connections = {
  production: 'postgresql://owner_cb_dominus_cloud:npg_Sxb3hMFQsV6g@ep-crimson-resonance-ae8l8636-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  staging: '', // Will get from neonctl
  development: '' // Will get from neonctl
};

async function createDatabase(branch, connectionString) {
  try {
    const sql = neon(connectionString);
    
    // Create database
    await sql('CREATE DATABASE core_config;');
    console.log(`✅ Created core_config in ${branch}`);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`ℹ️  core_config already exists in ${branch}`);
    } else {
      console.error(`❌ Error creating database in ${branch}:`, error.message);
      throw error;
    }
  }
}

async function main() {
  console.log('Creating core_config database in all branches...\n');
  
  for (const branch of BRANCHES) {
    if (connections[branch]) {
      await createDatabase(branch, connections[branch]);
    } else {
      console.log(`⚠️  No connection string for ${branch}, skipping...`);
    }
  }
  
  console.log('\n✅ Done!');
}

main().catch(console.error);


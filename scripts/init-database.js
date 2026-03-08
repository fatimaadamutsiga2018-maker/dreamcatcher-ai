require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  console.log('🚀 Connecting to Supabase database...\n');

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Read SQL file
    const sqlFile = path.join(__dirname, '../supabase/init.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('📝 Executing database initialization SQL...\n');

    // Execute the entire SQL script
    await client.query(sql);

    console.log('✅ Database initialization complete!\n');

    // Verify tables were created
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('profiles', 'assessment_sessions', 'hexagram_readings', 'hexagram_templates')
      ORDER BY table_name;
    `);

    console.log('📊 Created tables:');
    result.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });

    // Check hexagram templates count
    const countResult = await client.query('SELECT COUNT(*) FROM hexagram_templates');
    console.log(`\n🎯 Hexagram templates inserted: ${countResult.rows[0].count}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

initDatabase();

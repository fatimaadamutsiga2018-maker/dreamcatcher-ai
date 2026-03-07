require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const fs = require('fs');

async function setupDatabase() {
  // Supabase PostgreSQL connection string
  // Format: postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
  const projectRef = 'lmquoigvthpysvexmfuy';

  console.log('🔍 Please provide your Supabase database password.');
  console.log('You can find it in: Supabase Dashboard > Project Settings > Database > Connection string');
  console.log('\nOr we can use the REST API method instead.\n');

  // For now, let's use a simpler approach with Supabase client
  const { createClient } = require('@supabase/supabase-js');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  );

  console.log('🚀 Starting database setup via Supabase client...\n');

  // Read and execute SQL statements one by one
  const sql = fs.readFileSync('./supabase/init.sql', 'utf8');

  // Split into statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📝 Found ${statements.length} SQL statements\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    console.log(`[${i + 1}/${statements.length}] ${stmt.substring(0, 50)}...`);

    try {
      // Use Supabase's query method
      const { data, error } = await supabase.rpc('exec', { sql: stmt });

      if (error) {
        console.log(`   ❌ Error: ${error.message}`);
        errorCount++;
      } else {
        console.log(`   ✅ Success`);
        successCount++;
      }
    } catch (err) {
      console.log(`   ❌ Exception: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Results: ${successCount} success, ${errorCount} errors`);
}

setupDatabase().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

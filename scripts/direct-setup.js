require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function executeSQLDirectly() {
  const sql = fs.readFileSync('./supabase/init.sql', 'utf8');

  console.log('🚀 Executing SQL via Supabase Management API...\n');

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec`;
  const headers = {
    'apikey': process.env.SUPABASE_SECRET_KEY,
    'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ sql: sql })
    });

    const result = await response.text();
    console.log('Response:', result);

    if (response.ok) {
      console.log('✅ Database setup complete!');
    } else {
      console.log('❌ Error:', response.status, response.statusText);
    }
  } catch (err) {
    console.error('❌ Failed:', err.message);
  }
}

executeSQLDirectly();

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    env[key] = val;
  }
});

const url = env.NEXT_PUBLIC_SMG_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SMG_SUPABASE_ANON_KEY;

console.log("URL:", url);
console.log("KEY:", key ? "Exists" : "Missing");

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase
    .from('site_status')
    .select('*');
  console.log("DATA:", data);
  console.log("ERROR:", error);
}

check();

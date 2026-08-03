const { createClient } = require("@supabase/supabase-js");

async function createTable() {
  const smg = createClient(
    process.env.NEXT_PUBLIC_SMG_SUPABASE_URL,
    process.env.SMG_SUPABASE_SERVICE_ROLE_KEY
  );

  // Use Supabase management API to run raw SQL
  const url = process.env.NEXT_PUBLIC_SMG_SUPABASE_URL.replace("https://", "https://api.") + "/rest/v1/";
  
  // Try inserting a dummy row to test if table exists
  const { error: testErr } = await smg.from("detection_registrations").select("id").limit(1);
  if (!testErr) {
    console.log("Table already exists!");
    return;
  }
  console.log("Table does not exist, error:", testErr.message);
  
  // Use pg directly via SMG_DATABASE_URL
  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.SMG_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  await pool.query(`
    create table if not exists detection_registrations (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      nom text not null,
      prenom text not null,
      sexe text not null,
      date_naissance date not null,
      lieu_naissance text not null,
      telephone text not null,
      email text,
      zone_residence text not null,
      pied_dominant text not null,
      club_actuel text,
      niveau_actuel text not null,
      experience_competitive text not null,
      comment_identifie jsonb not null default '[]'::jsonb,
      parent_nom text not null,
      parent_lien text not null,
      parent_telephone text not null,
      parent_email text,
      urgence_nom text not null,
      urgence_telephone text not null,
      photo_recente_url text,
      numero_detection text
    )
  `);
  console.log("Table created via pg!");
  await pool.end();
}

createTable().catch(console.error);

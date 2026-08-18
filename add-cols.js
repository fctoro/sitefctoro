const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://postgres:Fulmounproduction%232012%2C@db.efyjemzzapcrluqydwzj.supabase.co:5432/postgres'
})

async function run() {
  const client = await pool.connect()
  try {
    console.log('Adding columns to detection_registrations...')
    await client.query(`
      ALTER TABLE detection_registrations 
      ADD COLUMN IF NOT EXISTS ecole TEXT,
      ADD COLUMN IF NOT EXISTS poste_principal TEXT,
      ADD COLUMN IF NOT EXISTS poste_secondaire TEXT,
      ADD COLUMN IF NOT EXISTS club_precedent TEXT,
      ADD COLUMN IF NOT EXISTS annees_pratique TEXT;
    `)
    console.log('Columns added successfully.')
  } catch (err) {
    console.error('Error:', err)
  } finally {
    client.release()
  }
}

run()

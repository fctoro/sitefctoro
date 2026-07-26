const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

async function main() {
  loadEnv()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  try {
    const { data, error } = await client.storage.listBuckets()
    if (error) {
      console.error('Supabase key check failed:')
      console.error(`- name: ${error.name || 'unknown'}`)
      console.error(`- message: ${error.message || 'unknown'}`)
      console.error(`- status: ${error.status || 'n/a'}`)
      console.error(`- code: ${error.code || 'n/a'}`)
      process.exit(1)
    }

    console.log('Supabase key check passed.')
    console.log(`Buckets: ${(data || []).map((bucket) => bucket.name).join(', ') || '(none)'}`)
  } catch (error) {
    console.error('Supabase key check threw an exception:')
    console.error(error)
    process.exit(1)
  }
}

main()

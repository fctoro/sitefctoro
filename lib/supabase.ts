import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
let hasEnsuredVideosBucket = false

const smgSupabaseUrl = process.env.NEXT_PUBLIC_SMG_SUPABASE_URL || ''
const smgSupabaseAnonKey = process.env.NEXT_PUBLIC_SMG_SUPABASE_ANON_KEY || ''
const smgSupabaseServiceRoleKey = process.env.SMG_SUPABASE_SERVICE_ROLE_KEY || ''
let hasEnsuredSmgVideosBucket = false

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Site will use static data only.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : supabase

export const supabaseSmg = createClient(
  smgSupabaseUrl || 'https://placeholder.supabase.co',
  smgSupabaseAnonKey || 'placeholder'
)

export const supabaseSmgAdmin = smgSupabaseServiceRoleKey
  ? createClient(smgSupabaseUrl || 'https://placeholder.supabase.co', smgSupabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : supabaseSmg

export async function ensureVideosBucket() {
  if (hasEnsuredVideosBucket) return
  if (!supabaseServiceRoleKey) return

  const { data, error } = await supabaseAdmin.storage.listBuckets()
  if (error) {
    throw error
  }

  const hasBucket = (data ?? []).some((bucket) => bucket.name === 'videos')
  if (!hasBucket) {
    const { error: createError } = await supabaseAdmin.storage.createBucket('videos', {
      public: true,
    })
    if (createError) {
      throw createError
    }
  }

  hasEnsuredVideosBucket = true
}

export async function ensureSmgVideosBucket() {
  if (hasEnsuredSmgVideosBucket) return
  if (!smgSupabaseServiceRoleKey) return

  const { data, error } = await supabaseSmgAdmin.storage.listBuckets()
  if (error) {
    throw error
  }

  const hasBucket = (data ?? []).some((bucket) => bucket.name === 'videos')
  if (!hasBucket) {
    const { error: createError } = await supabaseSmgAdmin.storage.createBucket('videos', {
      public: true,
    })
    if (createError) {
      throw createError
    }
  }

  hasEnsuredSmgVideosBucket = true
}

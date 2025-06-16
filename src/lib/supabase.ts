import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Enhanced debug logs with error handling
try {
  console.log('Environment Check:', {
    supabaseUrl: supabaseUrl ? '✅ Set' : '❌ Not Set',
    supabaseKey: supabaseAnonKey ? '✅ Set' : '❌ Not Set',
    environment: import.meta.env.MODE,
    urlLength: supabaseUrl?.length || 0,
    keyLength: supabaseAnonKey?.length || 0
  })

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase credentials')
  }
} catch (error) {
  console.error('Supabase initialization error:', error)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Test the connection
const testConnection = async () => {
  try {
    await supabase.from('_test_connection').select('*').limit(1)
    console.log('✅ Supabase connection successful')
  } catch (error: unknown) {
    console.error('❌ Supabase connection failed:', error)
  }
}

testConnection()

// Add beforeunload event listener to handle automatic logout
window.addEventListener('beforeunload', async () => {
  await supabase.auth.signOut()
}) 
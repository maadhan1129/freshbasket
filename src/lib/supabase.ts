import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Detailed environment check
console.log('=== Supabase Configuration Check ===')
console.log('1. Environment Variables:')
console.log('- VITE_SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing')
console.log('- VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing')
console.log('2. Environment Mode:', import.meta.env.MODE)
console.log('3. Full URL:', supabaseUrl)
console.log('4. Key Length:', supabaseAnonKey?.length || 0)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERROR: Missing Supabase credentials')
  throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token',
    storage: window.localStorage,
    flowType: 'pkce'
  }
})

// Test the connection with detailed error handling
const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...')
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1)
    
    if (error) {
      console.error('❌ Supabase Error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
    } else {
      console.log('✅ Supabase connection successful')
    }
  } catch (error: unknown) {
    console.error('❌ Connection Error:', error)
  }
}

// Initialize connection
testConnection()

// Handle page visibility changes
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible') {
    console.log('Page became visible, testing connection...')
    await testConnection()
  }
})

// Add beforeunload event listener to handle automatic logout
window.addEventListener('beforeunload', async () => {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Error during signout:', error)
  }
}) 
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

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}
if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create Supabase client with retry logic
const createSupabaseClient = () => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storageKey: 'supabase.auth.token',
        storage: window.localStorage,
        flowType: 'pkce'
      },
      global: {
        headers: {
          'x-application-name': 'freshbasket'
        }
      }
    })
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    throw error
  }
}

export const supabase = createSupabaseClient()

// Connection test with retry logic
const testConnection = async (retryCount = 0, maxRetries = 3) => {
  try {
    console.log(`Testing Supabase connection (attempt ${retryCount + 1}/${maxRetries + 1})...`)
    
    // First check if we can get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) {
      console.error('Session error:', sessionError)
      throw sessionError
    }
    
    // Then test a simple query
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Query error:', error)
      throw error
    }
    
    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    console.error(`Connection attempt ${retryCount + 1} failed:`, error)
    
    if (retryCount < maxRetries) {
      console.log(`Retrying in 1 second...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      return testConnection(retryCount + 1, maxRetries)
    }
    
    console.error('❌ All connection attempts failed')
    return false
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

// Handle page load
window.addEventListener('load', async () => {
  console.log('Page loaded, testing connection...')
  await testConnection()
})

// Add beforeunload event listener to handle automatic logout
window.addEventListener('beforeunload', async () => {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Error during signout:', error)
  }
}) 
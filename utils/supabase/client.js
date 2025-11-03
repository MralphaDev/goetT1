import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    'https://niaaxmpsmdpjwfuthraa.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pYWF4bXBzbWRwandmdXRocmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMzc4MTYsImV4cCI6MjA0MzgxMzgxNn0.cjhnUkS2kpQoYX7tWB4W6TM4fDaWm61-JIuld5cRnck'
  )
}
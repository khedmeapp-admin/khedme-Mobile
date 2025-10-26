import 'react-native-url-polyfill/auto';   // 👈 adds missing URL, URLSearchParams for Hermes
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utukibvlowayxfemsmct.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dWtpYnZsb3dheXhmZW1zbWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTQ3MTAsImV4cCI6MjA3NjczMDcxMH0.3rPwsS3VWqV32FSpMP4vPFV6M2sVsB3IyBfKle3p_3k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://xrvjaqxiyinmznwbuhwa.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhydmphcXhpeWlubXpud2J1aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNjEwMDIsImV4cCI6MjAxNjkzNzAwMn0.UNsPYdLJcVSQeWIj_cNzxmVIgRNFCC_JhFu6KaSPAdU';
export const supabase = createClient(supabaseUrl, supabaseKey);

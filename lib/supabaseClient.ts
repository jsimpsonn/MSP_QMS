import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzvaqkwzufbrgvzgzqwo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6dmFxa3d6dWZicmd2emd6cXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NjMzMTMsImV4cCI6MjAzMTUzOTMxM30.hhYQvuoZ6i457amDhZCyyWsf1qdyUlsEzi6288yhWgM';
export const supabase = createClient(supabaseUrl, supabaseKey);
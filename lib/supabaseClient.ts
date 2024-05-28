import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpikyajfudhgghgkhysp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaWt5YWpmdWRoZ2doZ2toeXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MjI1ODgsImV4cCI6MjAzMTk5ODU4OH0.iozXb_2HVjGNZvB3oK3zWAvJMixaYRlMnW1sNxyK_F0';
export const supabase = createClient(supabaseUrl, supabaseKey);
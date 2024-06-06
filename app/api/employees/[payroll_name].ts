import { createClient } from '@supabase/supabase-js';

// Replace these values with your actual Supabase URL and public key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function DELETE(req: Request) {
  const payroll_name = req.url.split('/').pop();
  const { error } = await supabase.from('employees').delete().eq('payroll_name', payroll_name);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(null, { status: 204 });
}

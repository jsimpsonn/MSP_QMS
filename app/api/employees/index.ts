import { createClient } from '@supabase/supabase-js';

// Replace these values with your actual Supabase URL and public key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET() {
  const { data, error } = await supabase.from('employees').select('payroll_name, hire_date, rehire_date, job_title_description, obsolete');
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req: Request) {
  const { payroll_name, hire_date, rehire_date, job_title_description, obsolete } = await req.json();
  const { data, error } = await supabase.from('employees').insert([{ payroll_name, hire_date, rehire_date, job_title_description, obsolete }]);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify(data), { status: 201 });
}

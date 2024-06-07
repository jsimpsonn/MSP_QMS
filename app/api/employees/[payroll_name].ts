import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { payroll_name } = req.query;

  if (!payroll_name) {
    return res.status(400).json({ error: 'Missing payroll_name parameter' });
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('payroll_name', payroll_name as string);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

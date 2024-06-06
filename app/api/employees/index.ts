import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { payroll_name, hire_date, rehire_date, job_title_description, obsolete } = req.body;
    const { data, error } = await supabase.from('employees').insert([{ payroll_name, hire_date, rehire_date, job_title_description, obsolete }]);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json(data);
  } else if (req.method === 'DELETE') {
    const { payroll_name } = req.query;
    const { error } = await supabase.from('employees').delete().eq('payroll_name', payroll_name);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const FormSchema = z.object({
  payroll_name: z.string().nonempty({ message: 'Name is required' }),
  hire_date: z.date().optional(),
  rehire_date: z.date().optional(),
  job_title_description: z.string().nonempty({ message: 'Job Title is required' }),
  obsolete: z.boolean().optional(),
});

interface EmployeeFormProps {
  onEmployeeAdded: () => void;
  existingEmployee?: Employee | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onEmployeeAdded, existingEmployee }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      payroll_name: '',
      hire_date: undefined,
      rehire_date: undefined,
      job_title_description: '',
      obsolete: false,
    },
  });

  useEffect(() => {
    if (existingEmployee) {
      reset(existingEmployee);
    } else {
      reset({
        payroll_name: '',
        hire_date: undefined,
        rehire_date: undefined,
        job_title_description: '',
        obsolete: false,
      });
    }
  }, [existingEmployee, reset]);

  const onSubmit = async (data: any) => {
    if (existingEmployee) {
      const { error } = await supabase
        .from('employees')
        .update(data)
        .eq('payroll_name', existingEmployee.payroll_name);

      if (error) {
        console.error('Failed to update employee:', error.message);
      } else {
        onEmployeeAdded();
      }
    } else {
      const { error } = await supabase
        .from('employees')
        .insert([data]);

      if (error) {
        console.error('Failed to add employee:', error.message);
      } else {
        onEmployeeAdded();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <Label htmlFor="payroll_name">Name</Label>
        <Controller
          name="payroll_name"
          control={control}
          render={({ field }) => (
            <Input {...field} id="payroll_name" placeholder="Name" required />
          )}
        />
        {errors.payroll_name && <span>{errors.payroll_name.message}</span>}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="hire_date">Hire Date</Label>
        <Controller
          name="hire_date"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] pl-3 text-left font-normal">
                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.hire_date && <span>{errors.hire_date.message}</span>}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="rehire_date">Rehire Date</Label>
        <Controller
          name="rehire_date"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] pl-3 text-left font-normal">
                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.rehire_date && <span>{errors.rehire_date.message}</span>}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="job_title_description">Job Title</Label>
        <Controller
          name="job_title_description"
          control={control}
          render={({ field }) => (
            <Input {...field} id="job_title_description" placeholder="Job Title" required />
          )}
        />
        {errors.job_title_description && <span>{errors.job_title_description.message}</span>}
      </div>
      <div className="flex items-center">
        <Controller
          name="obsolete"
          control={control}
          render={({ field }) => (
            <>
              <Checkbox {...field} id="obsolete" />
              <Label htmlFor="obsolete" className="ml-2">Obsolete</Label>
            </>
          )}
        />
        {errors.obsolete && <span>{errors.obsolete.message}</span>}
      </div>
      <div className="flex justify-end">
        <Button type="submit">{existingEmployee ? 'Update Employee' : 'Add Employee'}</Button>
      </div>
    </form>
  );
};

export default EmployeeForm;

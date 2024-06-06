"use client";

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { PlusCircle, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/components/ui/toast';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),
  description: z.string().min(1, 'Description is required'),
  rows: z.array(z.object({
    tagNumber: z.string().min(1, 'Tag Number is required'),
    weight: z.string().min(1, 'Weight is required').regex(/^\d{1,3}(,\d{3})*$/, 'Weight must be a number with commas and no decimals'),
    plantLocation: z.string().min(1, 'Plant Location is required'),
  })).min(1, 'At least one row is required'),
});

const OrderEntryForm: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: '',
      description: '',
      rows: Array(10).fill({ tagNumber: '', weight: '', plantLocation: '' }),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'rows',
  });

  const { toast } = useToast();

  const onSubmit = async (values: any) => {
    console.log('Form values:', values); // Debugging log

    const { data, error } = await supabase
      .from('scrap_request')
      .insert([
        {
          customer: values.customer,
          description: values.description,
          rows: values.rows,
        },
      ]);

    if (error) {
      console.error('Error inserting data:', error);
      toast({
        title: 'Error',
        description: 'Scrap request failed.',
        action: <Button onClick={() => {}}>Retry</Button>,
        className: 'toast-error',
      });
    } else {
      console.log('Data inserted successfully:', data);
      form.reset(); // Reset the form after successful submission
      toast({
        title: 'Success',
        description: 'Scrap request submitted successfully.',
        duration: 5000,
        className: 'toast-success',
      });
    }
  };

  const formatWeight = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const isFormValid = form.watch('customer') && form.watch('description') && form.watch('rows').some((row: any) => row.tagNumber && row.weight && row.plantLocation);

  return (
    <>
      <ToastProvider>
        <Form {...form}>
          <Card>
            <div className="flex justify-between items-center p-4">
              <div>
                <CardTitle>Inventory Scrap Request</CardTitle>
                <CardDescription>Enter the details for the scrap request below.</CardDescription>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline">View Log</Button>
                <Button type="submit" disabled={!isFormValid}>Submit</Button>
              </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full p-4">
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="customer" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} className="py-1" />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter description" {...field} className="py-1" />
                    </FormControl>
                  </FormItem>
                )} />
              </div>
              {fields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-3 gap-4 items-center">
                  <FormField control={form.control} name={`rows.${index}.tagNumber`} render={({ field }) => (
                    <FormItem>
                      {index === 0 && <FormLabel>Tag Number</FormLabel>}
                      <FormControl>
                        <Input placeholder="Tag Number" {...field} className="py-1" />
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`rows.${index}.weight`} render={({ field }) => (
                    <FormItem>
                      {index === 0 && <FormLabel>Weight (Lbs.)</FormLabel>}
                      <FormControl>
                        <Input
                          placeholder="Weight"
                          {...field}
                          className="py-1"
                          onChange={(e) => field.onChange(formatWeight(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`rows.${index}.plantLocation`} render={({ field }) => (
                    <FormItem>
                      {index === 0 && <FormLabel>Plant Location</FormLabel>}
                      <FormControl>
                        <Input placeholder="Plant Location" {...field} className="py-1" />
                      </FormControl>
                    </FormItem>
                  )} />
                  {index >= 10 && (
                    <div className="flex items-center justify-center h-full">
                      <Trash className="h-4 w-4 cursor-pointer" onClick={() => remove(index)} />
                    </div>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={() => append({ tagNumber: '', weight: '', plantLocation: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Row
              </Button>
            </form>
          </Card>
        </Form>
        <Toaster />
      </ToastProvider>
    </>
  );
};

export default OrderEntryForm;


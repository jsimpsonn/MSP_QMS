'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { createClient } from '@supabase/supabase-js';
import { ToastProvider } from '@/components/ui/toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';

// Supabase credentials (to be used directly in development)
const SUPABASE_URL = 'https://fpikyajfudhgghgkhysp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaWt5YWpmdWRoZ2doZ2toeXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjQyMjU4OCwiZXhwIjoyMDMxOTk4NTg4fQ.4IhMsq4LwmdKDQx9oX1GFQXiVCg5DpezB8XlKq4_GVE';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface FileOption {
  label: string;
  value: string;
}

const formSchema = z.object({
  documentTitle: z.string().min(1, 'Document title is required'),
  purposeOfChange: z.string().min(1, 'Purpose of change is required'),
  itemsRequiringChange: z.string().min(1, 'Items requiring change is required'),
  areOtherDocumentsAffected: z.boolean(),
  otherDocuments: z.array(z.string()).optional(),
});

interface FormValues {
  documentTitle: string;
  purposeOfChange: string;
  itemsRequiringChange: string;
  areOtherDocumentsAffected: boolean;
  otherDocuments: string[];
}

const ChangeRequestForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentTitle: '',
      purposeOfChange: '',
      itemsRequiringChange: '',
      areOtherDocumentsAffected: false,
      otherDocuments: [],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'otherDocuments',
  });

  const [documentOptions, setDocumentOptions] = useState<FileOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        let allFiles: FileOption[] = [];
        const { data: folders, error: folderError } = await supabase.storage.from('ControlledDocuments').list('', { limit: 100 });

        if (folderError) {
          console.error('Error fetching folders:', folderError);
          return;
        }

        for (const folder of folders || []) {
          const { data: files, error: filesError } = await supabase.storage.from('ControlledDocuments').list(folder.name);
          if (filesError) {
            console.error(`Error fetching files from folder ${folder.name}:`, filesError);
          } else {
            allFiles = [...allFiles, ...files.map((file: any) => ({ label: file.name, value: file.name }))];
          }
        }

        setDocumentOptions(allFiles);
        console.log('Fetched documents:', allFiles);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.storage.from('ControlledDocuments').list('');
        if (error) {
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
      } catch (error) {
        setIsConnected(false);
      }
    };

    fetchDocuments();
    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (values: FormValues) => {
    // Submission logic here
  };

  return (
    <ToastProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full p-4">
          <FormField control={form.control} name="documentTitle" render={({ field }) => (
            <FormItem>
              <FormLabel>Document Title</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue {...field} placeholder="Select a document" />
                  </SelectTrigger>
                  <SelectContent>
                    {loading ? (
                      <SelectItem disabled value="loading">
                        Loading documents...
                      </SelectItem>
                    ) : (
                      documentOptions.length > 0 ? documentOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      )) : (
                        <SelectItem disabled value="no-documents">
                          No documents available
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name="purposeOfChange" render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose of Change</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name="itemsRequiringChange" render={({ field }) => (
            <FormItem>
              <FormLabel>Items Requiring Change</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name="areOtherDocumentsAffected" render={({ field }) => (
            <FormItem>
              <FormLabel>Are Other Controlled Documents Affected by This Revision?</FormLabel>
              <FormControl>
                <Checkbox {...field} />
              </FormControl>
            </FormItem>
          )} />
          {form.watch('areOtherDocumentsAffected') && (
            fields.map((field, index) => (
              <FormField key={field.id} control={form.control} name={`otherDocuments.${index}`} render={({ field }) => (
                <FormItem>
                  <FormLabel>What Other Controlled Documents Require Change?</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue {...field} placeholder="Select a document" />
                      </SelectTrigger>
                      <SelectContent>
                        {loading ? (
                          <SelectItem disabled value="loading">
                            Loading documents...
                          </SelectItem>
                        ) : (
                          documentOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )} />
            ))
          )}
          <Button variant="outline" onClick={() => append('')}>
            Add Document
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <motion.div
        className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
        animate={{
          boxShadow: [
            `0 0 0 0 ${isConnected ? 'rgba(34,197,94,0.7)' : 'rgba(220,38,38,0.7)'}`,
            `0 0 0 5px rgba(0,0,0,0)`,
          ]
        }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
          repeat: Infinity,
        }}
        style={{ position: 'fixed', bottom: '16px', left: '16px' }}
      ></motion.div>
    </ToastProvider>
  );
};

export default ChangeRequestForm;

"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ReloadIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { RxUpload } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { motion } from 'framer-motion';

// Supabase credentials (to be used directly in development)
const SUPABASE_URL = 'https://fpikyajfudhgghgkhysp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaWt5YWpmdWRoZ2doZ2toeXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjQyMjU4OCwiZXhwIjoyMDMxOTk4NTg4fQ.4IhMsq4LwmdKDQx9oX1GFQXiVCg5DpezB8XlKq4_GVE';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface SupabaseFile {
  name: string;
  id: string;
  size: number;
  updated_at: string;
  created_at: string;
}

const FileExplorer = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<SupabaseFile[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    size: true,
    created_at: true,
    updated_at: true,
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection();
    }, 5000); // Check connection every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      await handleUpload(selectedFile);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);

      const filePath = `${currentPath}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from('ControlledDocuments').upload(filePath, file);

      if (error) {
        throw error;
      }

      setMessage('File uploaded successfully!');
      fetchFiles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error uploading file:', error.message);
        setMessage(`Error: ${error.message}`);
      } else {
        console.error('Unknown error', error);
        setMessage('An unknown error occurred.');
      }
    } finally {
      setUploading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage.from('ControlledDocuments').list(currentPath);

      if (error) {
        throw error;
      }

      setFiles(data as SupabaseFile[]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching files:', error.message);
        setMessage(`Error: ${error.message}`);
      } else {
        console.error('Unknown error', error);
        setMessage('An unknown error occurred.');
      }
    }
  };

  const handleFileClick = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage.from('ControlledDocuments').download(`${currentPath}/${fileName}`);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      window.open(url, '_blank');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error downloading file:', error.message);
        setMessage(`Error: ${error.message}`);
      } else {
        console.error('Unknown error', error);
        setMessage('An unknown error occurred.');
      }
    }
  };

  const toggleColumnVisibility = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div className="p-4 h-full flex flex-col relative">
      <div className="flex justify-between mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          {uploading ? (
            <Button disabled className="flex items-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <>
              <RxUpload className="mr-2" /> Upload
            </>
          )}
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.keys(visibleColumns).map((column) => (
              <DropdownMenuCheckboxItem
                key={column}
                className="capitalize"
                checked={visibleColumns[column as keyof typeof visibleColumns]}
                onCheckedChange={() => toggleColumnVisibility(column as keyof typeof visibleColumns)}
              >
                {column.replace('_', ' ')}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-white shadow rounded p-4 flex-grow overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.name && <TableHead>Name</TableHead>}
              {visibleColumns.size && <TableHead>Size</TableHead>}
              {visibleColumns.created_at && <TableHead>Created At</TableHead>}
              {visibleColumns.updated_at && <TableHead>Updated At</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No files found.</TableCell>
              </TableRow>
            ) : (
              files.map((file: SupabaseFile) => (
                <TableRow key={file.id} onClick={() => handleFileClick(file.name)} className="cursor-pointer hover:bg-gray-100">
                  {visibleColumns.name && <TableCell>{file.name}</TableCell>}
                  {visibleColumns.size && <TableCell>{file.size}</TableCell>}
                  {visibleColumns.created_at && <TableCell>{new Date(file.created_at).toLocaleDateString('en-US')}</TableCell>}
                  {visibleColumns.updated_at && <TableCell>{new Date(file.updated_at).toLocaleDateString('en-US')}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {message && <p className="mt-4 text-red-500">{message}</p>}
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
    </div>
  );
};

export default FileExplorer;

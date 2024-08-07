'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmployeeForm from './EmployeeForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash, Pencil, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { createClient } from '@supabase/supabase-js';
import { Toaster } from '@/components/ui/toaster';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Employee {
  payroll_name: string;
  hire_date: string;
  rehire_date: string;
  job_title_description: string;
  obsolete: boolean;
}

interface EmployeeListProps {
  initialData: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ initialData }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialData);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  useEffect(() => {
    setEmployees(initialData);

    const allChangesChannel = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employees' },
        (payload) => {
          console.log('Change received!', payload);
          handleRealtimeChanges(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(allChangesChannel);
    };
  }, [initialData]);

  const handleRealtimeChanges = (payload: any) => {
    const { eventType, new: newEmployee, old: oldEmployee } = payload;

    if (eventType === 'INSERT') {
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    } else if (eventType === 'UPDATE') {
      setEmployees(prevEmployees => 
        prevEmployees.map(emp => emp.payroll_name === newEmployee.payroll_name ? newEmployee : emp)
      );
    } else if (eventType === 'DELETE') {
      setEmployees(prevEmployees => 
        prevEmployees.filter(emp => emp.payroll_name !== oldEmployee.payroll_name)
      );
    }
  };

  const deleteEmployee = async (payroll_name: string) => {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('payroll_name', payroll_name);

    if (error) {
      console.error('Failed to delete employee:', error.message);
    } else {
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.payroll_name !== payroll_name));
    }
  };

  const refreshEmployees = async () => {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) {
      console.error('Failed to fetch employees:', error.message);
    } else {
      setEmployees(data);
    }
  };

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteDialog = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsAlertDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      await deleteEmployee(employeeToDelete.payroll_name);
      setIsAlertDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex items-center justify-end m-2">
        <UserPlus className="h-6 w-6 cursor-pointer" onClick={openAddModal} />
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Rehire Date</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Obsolete</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map(employee => (
              <TableRow key={employee.payroll_name}>
                <TableCell>{employee.payroll_name}</TableCell>
                <TableCell>{employee.hire_date ? new Date(employee.hire_date).toLocaleDateString('en-US') : ''}</TableCell>
                <TableCell>{employee.rehire_date ? new Date(employee.rehire_date).toLocaleDateString('en-US') : ''}</TableCell>
                <TableCell>{employee.job_title_description}</TableCell>
                <TableCell>{employee.obsolete ? 'Yes' : 'No'}</TableCell>
                <TableCell className="flex gap-3">
                  <Pencil className="w-4 h-4 cursor-pointer text-blue-500" onClick={() => openEditModal(employee)} />
                  <Trash className="w-4 h-4 cursor-pointer text-red-500" onClick={() => openDeleteDialog(employee)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <EmployeeForm existingEmployee={selectedEmployee} onEmployeeAdded={refreshEmployees} closeModal={closeModal} />
        </DialogContent>
      </Dialog>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogTrigger asChild>
          <div />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this employee? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel asChild>
              <Button variant="outline" onClick={() => setIsAlertDialogOpen(false)}>Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeList;

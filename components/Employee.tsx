'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmployeeForm from './EmployeeForm';
import { Card } from '@/components/ui/card';
import { Trash, Pencil, UserPlus } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

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

  const deleteEmployee = async (payroll_name: string) => {
    const response = await fetch(`/api/employees/${payroll_name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setEmployees(employees.filter(employee => employee.payroll_name !== payroll_name));
    } else {
      console.error('Failed to delete employee');
    }
  };

  const refreshEmployees = async () => {
    const res = await fetch('/api/employees');
    const newData = await res.json();
    setEmployees(newData);
  };

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  return (
    <div>
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
                <TableCell>{employee.hire_date}</TableCell>
                <TableCell>{employee.rehire_date}</TableCell>
                <TableCell>{employee.job_title_description}</TableCell>
                <TableCell>{employee.obsolete ? 'Yes' : 'No'}</TableCell>
                <TableCell className="flex gap-3">
                  <Pencil className="w-4 h-4 cursor-pointer text-blue-500" onClick={() => openEditModal(employee)} />
                  <Trash className="w-4 h-4 cursor-pointer text-red-500" onClick={() => deleteEmployee(employee.payroll_name)} />
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
          <EmployeeForm existingEmployee={selectedEmployee} onEmployeeAdded={refreshEmployees} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeList;

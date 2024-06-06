'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import EmployeeForm from './EmployeeForm';
import { Card } from '@/components/ui/card';

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

  return (
    <div>
      <EmployeeForm onEmployeeAdded={refreshEmployees} />
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
                <TableCell>
                  <Button onClick={() => deleteEmployee(employee.payroll_name)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default EmployeeList;

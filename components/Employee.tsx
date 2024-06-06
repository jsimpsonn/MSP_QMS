import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface EmployeeListProps {
  data: { payroll_name: string,
        hire_date: string,
        rehire_date: string,
        job_title_description: string,
        obsolete: boolean
   }[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Hire Date</TableHead>
          <TableHead>Rehire Date</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Obsolete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.payroll_name}</TableCell>
            <TableCell>{item.hire_date}</TableCell>
            <TableCell>{item.rehire_date}</TableCell>
            <TableCell>{item.job_title_description}</TableCell>
            <TableCell>{item.obsolete}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeList;

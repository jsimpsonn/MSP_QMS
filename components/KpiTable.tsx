import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface KpiTableProps {
  data: { payroll_name: string }[];
}

const KpiTable: React.FC<KpiTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.payroll_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default KpiTable;

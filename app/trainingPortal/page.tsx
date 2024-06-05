import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import CalendarView from '@/components/Calendar';
import { Separator } from '@/components/ui/separator';

const TrainingPortal = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold pb-4">Training Portal</h1>
      <Tabs defaultValue="Training Records" className="w-full">
        <TabsList className="grid grid-cols-4 gap-1">
          <TabsTrigger value="Training Records">Training Records</TabsTrigger>
          <TabsTrigger value="Employee Records">Employee Records</TabsTrigger>
          <TabsTrigger value="Scheduled Trainings">Scheduled Trainings</TabsTrigger>
          <TabsTrigger value="Training Matrices">Training Matrices</TabsTrigger>
        </TabsList>
        <Separator className="my-4" />
        <TabsContent value="Training Records">
            <Card className="h-auto">
                <Table>
                    <TableHeader>
                        <TableRow>  
                            <TableHead className="w-1/5">Training Date</TableHead>
                            <TableHead className="w-4/5">Training Topic</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </Card>
        </TabsContent>
        <TabsContent value="Employee Records">
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>  
                            <TableHead>Employee Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Hire Date</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </Card>
        </TabsContent>
        <TabsContent value="Scheduled Trainings">
            <CalendarView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingPortal;


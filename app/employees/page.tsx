import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { columns } from './columns';
import { DataTable } from "./data-table";

const EmployeesPage: React.FC = () => {
    // Mock data for demonstration
    const mockEmployeeData = [
        { name: "John Doe", position: "Software Engineer", status: true, hireDate: new Date() },
        { name: "Jane Smith", position: "Project Manager", status: false, hireDate: new Date() }
    ];

    return (
        <>
            <h1 className="text-3xl font-semibold pb-6">Employees</h1>
            <section className="flex-1 p-5 border rounded-lg min-h-[60vh]">
                <div className="flex flex-col lg:flex-row justify-around mt-4">
                    {/* Employee nav*/}
                    <nav
                        className="flex flex-col space-y-2 mr-14 text-md text-muted-foreground"
                    >
                        <Link href="#" className="font-semibold text-primary mt-6">
                            New Training Record
                        </Link>
                        <Link href="#">All Training Records</Link>
                        <Link href="#">Employee Records</Link>
                        <Link href="#">Scheduled Trainings</Link>
                        <Link href="#">Training Matrices</Link>
                    </nav>

                    {/* Employee Records */}
                    <div className="flex-1 min-w-0 min-h-80 m-2 cursor-pointer flex flex-col">
                        <DataTable columns={columns} data={mockEmployeeData} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmployeesPage;


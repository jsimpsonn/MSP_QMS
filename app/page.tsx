"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';

function HomePage() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold">Quality Management System</h1>
      </section>

      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Main Content Section */}
        <section className="flex-1 py-10">
          <div className="flex flex-col lg:flex-row justify-around mt-8">
            {/* Inventory Scrap Request Card */}
            <Card className="flex-1 min-w-0 m-2 cursor-pointer" onClick={() => handleCardClick('/inventory-scrap-request')}>
              <CardHeader>
                <CardTitle>Inventory Scrap Request</CardTitle>
                <CardDescription>Submit Request</CardDescription>
              </CardHeader>
            </Card>

            {/* Training Portal Card */}
            <Card className="flex-1 min-w-0 m-2 cursor-pointer" onClick={() => handleCardClick('/training-portal')}>
              <CardHeader>
                <CardTitle>Training Portal</CardTitle>
                <CardDescription>Update and create training records</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Side Column */}
        <aside className="w-full lg:w-1/4 lg:pl-8 py-10">
          {/* Quick Links Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold">Quick Links</h2>
            <ul className="list-disc list-inside mt-4">
              <li><Link href="/employee-handbook">Employee Handbook</Link></li>
              <li><Link href="/kpi-dashboard">KPI Dashboard</Link></li>
              <li><Link href="/organizational-chart">Organizational Chart</Link></li>
              <li><Link href="/quality-manual">Quality Manual</Link></li>
              <li><Link href="/sanctioned-interpretations">Sanctioned Interpretations</Link></li>
            </ul>
          </section>

          {/* FAQs Section */}
          <section>
            <h2 className="text-2xl font-bold">FAQs</h2>
            <div className="mt-4">
              <details className="mb-2">
                <summary className="cursor-pointer">How does slitting steel differ from cut-to-length processing?</summary>
                <p className="mt-2">Slitting steel involves cutting large rolls of steel into narrower rolls, while cut-to-length processing involves cutting steel into specific lengths.</p>
              </details>
              <details className="mb-2">
                <summary className="cursor-pointer">I don't like a form I use. Can I make changes to it?</summary>
                <p className="mt-2">Yes, you can request changes to forms by contacting the Quality Assurance department.</p>
              </details>
              <details className="mb-2">
                <summary className="cursor-pointer">What are the advantages of being on the same site as SDI?</summary>
                <p className="mt-2">Being on the same site as SDI allows for better coordination and faster response times.</p>
              </details>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading indicator
  }

  return <HomePage />;
}

export default App;
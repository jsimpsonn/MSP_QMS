"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

function HomePage() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container mx-auto px-2 min-h-screen">
      {/* Hero Section */}
      <section className="text-start py-10">
        <h1 className="text-4xl font-bold">Quality Management System</h1>
      </section>

      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Main Content Section */}
        <section className="flex-1 py-10">
          <div className="flex flex-col lg:flex-row justify-around mt-8">
            {/* Inventory Scrap Request Card */}
            <Card className="flex-1 min-w-0 min-h-80 m-2 cursor-pointer flex flex-col justify-end" onClick={() => handleCardClick('/inventory-scrap-request')}>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Inventory Scrap Request</CardTitle>
                <CardDescription>Submit Request</CardDescription>
              </CardHeader>
            </Card>

            {/* Training Portal Card */}
            <Card className="flex-1 min-w-0 min-h-80 m-2 cursor-pointer flex flex-col justify-end" onClick={() => handleCardClick('/training-portal')}>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Training Portal</CardTitle>
                <CardDescription>Update and create training records</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
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
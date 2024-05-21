"use client";

import React from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function HomePage() {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold">Welcome to Our Quality Management System</h1>
        <p className="text-xl mt-4">Manage and streamline your quality processes with ease</p>
      </section>

      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Main Content Section */}
        <section className="flex-1 py-10">
          <div className="flex flex-wrap justify-around mt-8">
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
              <li><a href="/employee-handbook" className="text-blue-500">Employee Handbook</a></li>
              <li><a href="/kpi-dashboard" className="text-blue-500">KPI Dashboard</a></li>
              <li><a href="/organizational-chart" className="text-blue-500">Organizational Chart</a></li>
              <li><a href="/quality-manual" className="text-blue-500">Quality Manual</a></li>
              <li><a href="/sanctioned-interpretations" className="text-blue-500">Sanctioned Interpretations</a></li>
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
                <summary className="cursor-pointer">I dont like a form I use. Can I make changes to it?</summary>
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
  return (
    <Router>
      <HomePage />
    </Router>
  );
}

export default App;


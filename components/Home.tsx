"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
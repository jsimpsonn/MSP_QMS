// components/Home.tsx

"use client";

import React, { useState, useEffect } from 'react';  // Importing React and hooks
import { useRouter } from 'next/navigation';  // Importing useRouter hook from next/navigation
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";  // Importing Card components

// Functional component for the HomePage
function HomePage() {
  const router = useRouter();  // Using useRouter hook for navigation

  // Function to handle card click and navigate to the specified path
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

// Main functional component for the app
function App() {
  const [mounted, setMounted] = useState(false);  // State to track if the component is mounted

  // Effect to set the mounted state to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, render nothing or a loading indicator
  if (!mounted) {
    return null;
  }

  return <HomePage />;  // Render the HomePage component
}

export default App;  // Exporting the App component as default

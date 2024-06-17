// components/Home.tsx

"use client";  // Indicating that this file contains client-side code

import React from 'react';  // Importing React library
import { useRouter } from 'next/navigation';  // Importing useRouter hook from next/navigation for routing
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';  // Importing Breadcrumb components
import PageTitle from '@/components/PageTitle';  // Importing PageTitle component

// Functional component for the HomePage
function HomePage() {
  const router = useRouter();  // Using useRouter hook for navigation

  // Function to handle card click and navigate to the specified path
  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    // Main container for the homepage content with the class 'body-container'
    <div className="body-container">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">/</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <PageTitle title="Home" />
      {/* Your content goes here */}
    </div>
  );
}

export default HomePage;
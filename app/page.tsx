"use client";

import React from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold">Welcome to Our Quality Management System</h1>
        <p className="text-xl mt-4">Manage and streamline your quality processes with ease</p>
      </section>

      {/* Features Section */}
      <section className="py-10">
        <div className="flex flex-wrap justify-around mt-8">
          {/* Card 1 */}
          <div 
            className="flex flex-col space-y-2 flex-1 min-w-0 border rounded-lg p-4 shadow-md m-2 text-center items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-102 hover:shadow-2xl cursor-pointer bg-gray-100 dark:bg-gray-800" 
            onMouseEnter={(e) => e.currentTarget.classList.add('shadow-2xl', 'dark:shadow-2xl-dark')} 
            onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-2xl', 'dark:shadow-2xl-dark')} 
            onClick={() => handleCardClick('/kpi/page')}
          >
            <h3 className="text-xl font-bold">KPIs</h3>
            <p>The Key Performance Indicator (KPI) Dashboard provides an overview of MSPs key metrics, including Customer Concessions, Customer Surveys, Downtime, Lead Times, On-time Delivery, Production, Safety, and Shipping, centralizing performance monitoring across operations.</p>
          </div>

          {/* Card 2 */}
          <div 
            className="flex flex-col space-y-2 flex-1 min-w-0 border rounded-lg p-4 shadow-md m-2 text-center items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-102 hover:shadow-2xl cursor-pointer bg-gray-100 dark:bg-gray-800" 
            onMouseEnter={(e) => e.currentTarget.classList.add('shadow-2xl', 'dark:shadow-2xl-dark')} 
            onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-2xl', 'dark:shadow-2xl-dark')} 
            onClick={() => handleCardClick('/second/page')}
          >
            <h3 className="text-xl font-bold">Second Card</h3>
            <p>Second card description...</p>
          </div>

          {/* Card 3 */}
          <div 
            className="flex flex-col space-y-2 flex-1 min-w-0 border rounded-lg p-4 shadow-md m-2 text-center items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-102 hover:shadow-2xl cursor-pointer bg-gray-100 dark:bg-gray-800" 
            onMouseEnter={(e) => e.currentTarget.classList.add('shadow-2xl', 'dark:shadow-2xl-dark')} 
            onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-2xl', 'dark:shadow-2xl-dark')} 
            onClick={() => handleCardClick('/third/page')}
          >
            <h3 className="text-xl font-bold">Third Card</h3>
            <p>Third card description...</p>
          </div>
        </div>
      </section>
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

"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, FileText, ClipboardList, BarChart, Settings, File, Shield } from 'lucide-react'; // Example icons

const routes = [
  {
    links: [
      { href: '/', name: 'Home', icon: Home },
    ],
  },
  {
    heading: 'Action Items',
    links: [
      { href: '/requests', name: 'Requests', icon: ClipboardList },
      { href: '/notes', name: 'Notes', icon: FileText },
    ],
  },
  {
    heading: 'Documents',
    links: [
      { href: '/documents', name: 'Controlled Documents', icon: File },
      { href: '/claims', name: 'Quality Claims', icon: Shield },
    ],
  },
  {
    heading: 'Key Processes',
    links: [
      { href: '/processes/customerSatisfaction', name: 'Customer Satisfaction', icon: BarChart },
      { href: '/processes/orderEntry', name: 'Order Entry', icon: Settings },
      { href: '/processes/plantOperations', name: 'Plant Operations', icon: Settings },
    ],
  },
  {
    heading: 'Reports',
    links: [
      { href: '/kpi', name: 'KPIs', icon: BarChart },
      { href: '/maintenance', name: 'Maintenance', icon: Settings },
      { href: '/safety', name: 'Safety', icon: Settings },
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 p-4 shadow-lg">
      <nav>
        {routes.map((section, index) => (
          <div key={index} className="mb-6">
            {section.heading && (
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{section.heading}</h2>
            )}
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={link.href} className="flex items-center px-3 py-2 rounded-md text-sm text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                      <link.icon className="mr-2 h-5 w-5" />
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;


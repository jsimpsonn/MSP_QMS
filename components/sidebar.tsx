// components/sidebar.tsx

"use client";

import React from 'react';  // Importing React
import Link from 'next/link';  // Importing Link component from next/link for client-side navigation
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";  // Importing Accordion components
import mspLogo from '@/public/images/logo.png';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { useSession } from 'next-auth/react';


// Defining routes for the sidebar
const routes = [
  {
    links: [
      { href: '/', name: 'Home' },
    ],
  },
  {
    heading: 'Action Items',
    links: [
      { href: '/actionItems/CorrectiveActions', name: 'Corrective Actions' },
      { href: '/actionItems/CI', name: 'Continuous Improvement' },
    ],
  },
  {
    heading: 'Documents',
    links: [
      { href: '/documents', name: 'Controlled Documents' },
      { href: '/documents/changeRequest', name: 'Document Change Request' },
      { href: '/documents/newRequest', name: 'New Document Request' },
    ],
  },
  {
    heading: 'Internal Audits',
    links: [
      { href: '/audits', name: 'Reports' },
      { href: '/audits/schedule', name: 'Schedule' },
    ],
  },
  {
    heading: 'Key Processes',
    links: [
      { href: '/processes/customerSatisfaction', name: 'Customer Satisfaction' },
      { href: '/processes/orderEntry', name: 'Order Entry & Receiving' },
      { href: '/processes/plantOperations', name: 'Plant Operations' },
    ],
  },
  {
    heading: 'Reports',
    links: [
      { href: '/kpi', name: 'KPIs' },
      { href: '/maintenance', name: 'Maintenance' },
      { href: '/safety', name: 'Safety' },
    ],
  },
];

// Functional component for the Sidebar
const Sidebar: React.FC<{ isOpen: boolean, toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  const handleLinkClick = () => {
    toggleSidebar();
  };

  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <aside className={`fixed bg-background dark:bg-dark-secondary dark:text-dark-foreground top-0 left-0 w-[250px] h-[100vh] overflow-y-auto p-4 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transform ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'} transition-transform duration-300 ease-in-out`}>
      <div className="flex justify-between mb-4">
        <Image
          src={mspLogo}
          alt="Logo"
          width={160}
          height={80}
          quality={100}
          layout="intrinsic"
        />
        <button className="xl:hidden text-black dark:text-white" onClick={toggleSidebar}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <Separator />
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center rounded-md transition-colors duration-300 hover:underline font-medium border-b py-4" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
        </ul>
        <Accordion type="single" collapsible>
          {routes.filter(section => section.heading).map((section, index) => {
            const accordionItem = (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionTrigger>{section.heading}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {section.links.map(link => (
                      <li key={link.href}>
                        <Link href={link.href} className="flex items-center px-3 py-2 rounded-md text-sm text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={handleLinkClick}>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );

            if (section.heading === 'Key Processes') {
              return (
                <React.Fragment key={index}>
                  {accordionItem}
                  <ul className="space-y-2">
                    <li>
                      <Link href="/claims" className="flex items-center rounded-md transition-colors duration-300 hover:underline font-medium border-b py-4" onClick={handleLinkClick}>
                        Quality Claims
                      </Link>
                    </li>
                  </ul>
                </React.Fragment>
              );
            }

            return accordionItem;
          })}
        </Accordion>
        <ul className="space-y-2">
          <li>
            <Link href="/trainingPortal" className="flex items-center rounded-md transition-colors duration-300 hover:underline font-medium border-b py-4" onClick={handleLinkClick}>
              Training Portal
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;// components/Header.tsx

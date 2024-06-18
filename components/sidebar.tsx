// components/sidebar.tsx

"use client";

import React from 'react';  // Importing React
import Link from 'next/link';  // Importing Link component from next/link for client-side navigation
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";  // Importing Accordion components
import mspLogo from '@/public/images/MSP.png';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";

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
const Sidebar: React.FC = () => {
  return (
    <aside className="fixed-sidebar">
      <div className="flex justify-center mb-4">
        <Image src={mspLogo} alt="Logo" width={160} height={80} quality={100} />
      </div>
      <Separator />
      <nav>
        {/* Render the Home link separately */}
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center rounded-md transition-colors duration-300 hover:underline font-medium border-b py-4">
              Home
            </Link>
          </li>
        </ul>

        {/* Accordion for other sections */}
        <Accordion type="single" collapsible>
          {routes.filter(section => section.heading).map((section, index) => {
            const accordionItem = (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionTrigger className="accordion-trigger">{section.heading}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {section.links.map(link => (
                      <li key={link.href}>
                        <Link href={link.href} className="flex items-center px-3 py-2 rounded-md text-sm text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );

            // Insert the Quality Claims link between Key Processes and Reports
            if (section.heading === 'Key Processes') {
              return (
                <React.Fragment key={index}>
                  {accordionItem}
                  <ul className="space-y-2">
                    <li>
                      <Link href="/claims" className="flex items-center rounded-md transition-colors duration-300 hover:underline font-medium border-b py-4">
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
            <Link href="/trainingPortal" className="flex items-center rounded-md transition-colors duration-300 hover:underline font-medium border-b py-4">
              Training Portal
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;  // Exporting the Sidebar component as default

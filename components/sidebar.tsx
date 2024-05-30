"use client";

import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const routes = [
  {
    links: [
      { href: '/', name: 'Home' },
    ],
  },
  {
    heading: 'Action Items',
    links: [
      { href: '/carPAR', name: 'Corrective Actions' },
      { href: '/continuousImprovement', name: 'Continuous Improvement' },
      { href: '/audits', name: 'Internal Audits' },
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
      { href: '/processes/orderEntry', name: 'Order Entry' },
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

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed-sidebar">
      <nav>
        {/* Render the Home link separately */}
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-centerrounded-md transition-colors duration-300 hover:underline font-medium 
            border-b py-4">
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
                      <Link href="/claims" className="flex items-centerrounded-md transition-colors duration-300 hover:underline font-medium border-b py-4">
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
                      <Link href="/employees" className="flex items-centerrounded-md transition-colors duration-300 hover:underline font-medium border-b py-4">
                        Training Portal
                      </Link>
                    </li>
                  </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


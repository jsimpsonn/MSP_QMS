"use client";

import React from 'react';
import Link from 'next/link';
import { HomeIcon, MagnifyingGlassIcon, ArchiveIcon, BarChartIcon, Pencil2Icon, CrossCircledIcon, ExclamationTriangleIcon, UpdateIcon, CrumpledPaperIcon, DotFilledIcon, BookmarkIcon, AccessibilityIcon,  } from '@radix-ui/react-icons';

const routes = [
  {
    links: [
      { href: '/', name: 'Home', icon: HomeIcon },
    ],
  },
  {
    heading: 'Action Items',
    links: [
      { href: '/carPAR', name: 'Corrective Actions', icon: ExclamationTriangleIcon },
      { href: '/continuousImprovement', name: 'Continuous Improvement', icon: UpdateIcon },
      { href: '/audits', name: 'Internal Audits', icon: MagnifyingGlassIcon },
    ],
  },
  {
    heading: 'Documents',
    links: [
      { href: '/documents', name: 'Controlled Documents', icon: ArchiveIcon },
      { href: '/documents/changeRequest', name: 'Document Change Request', icon: Pencil2Icon },
      { href: '/documents/newRequest', name: 'New Document Request', icon: CrumpledPaperIcon },
      { href: '/claims', name: 'Quality Claims', icon: CrossCircledIcon },
    ],
  },
  {
    heading: 'Key Processes',
    links: [
      { href: '/processes/customerSatisfaction', name: 'Customer Satisfaction', icon: DotFilledIcon },
      { href: '/processes/orderEntry', name: 'Order Entry', icon: DotFilledIcon },
      { href: '/processes/plantOperations', name: 'Plant Operations', icon: DotFilledIcon },
    ],
  },
  {
    heading: 'Reports',
    links: [
      { href: '/kpi', name: 'KPIs', icon: BarChartIcon },
      { href: '/maintenance', name: 'Maintenance', icon: BookmarkIcon },
      { href: '/safety', name: 'Safety', icon: AccessibilityIcon },
      { href: '/employees', name: 'Employees', icon: AccessibilityIcon},
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed-sidebar">
      <nav>
        {routes.map((section, index) => (
          <div key={index} className="mb-6">
            {section.heading && (
              <h2 className="text-sm font text-gray-700 dark:text-gray-300 mb-2">{section.heading}</h2>
            )}
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center px-3 py-2 rounded-md text-sm text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.name}
                  </Link>
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


// app/components/ui/dropdown-menu.tsx
"use client";

import * as React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid"; // No changes needed here

export function DropdownMenu({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Menu as="div" className="relative inline-block text-left" {...props}>
      {children}
    </Menu>
  );
}

export function DropdownMenuTrigger({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Menu.Button as="button" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" {...props}>
      {children}
      <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-white" />
    </Menu.Button>
  );
}

export function DropdownMenuContent({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        {...props}
      >
        {children}
      </Menu.Items>
    </Transition>
  );
}

export function DropdownMenuItem({
  children,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          className={`${
            active ? "bg-indigo-600 text-white" : "text-gray-900"
          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
          {...props}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  );
}

// app/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-[#2c4c90] text-white h-16 px-4">
      <div className="flex space-x-4">
        <Link href="/" className="hover:text-gray-400">
          Home
        </Link>
      </div>
      <div className="flex space-x-6">
        <Link href="/settings" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faCog} />
        </Link>
        <Link href="/profile" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </div>
  );
};

export default Header;

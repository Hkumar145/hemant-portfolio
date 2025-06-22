'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional: Use Heroicons or Lucide

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Hemant Kumar</h1>

        {/* Hamburger Button for Mobile */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`lg:flex space-y-4 lg:space-y-0 lg:space-x-6 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'
            }`}
        >
          <li><Link href="#home" className="block text-gray-600 hover:text-blue-600">Home</Link></li>
          <li><Link href="#about" className="block text-gray-600 hover:text-blue-600">About</Link></li>
          <li><Link href="#projects" className="block text-gray-600 hover:text-blue-600">Projects</Link></li>
          <li><Link href="#contact" className="block text-gray-600 hover:text-blue-600">Contact</Link></li>
          <li>
            <a
              href="/Hemant_Kumar_Resume.pdf"
              download
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
              CV
            </a>
          </li>

        </ul>
      </nav>
    </header>
  );
}

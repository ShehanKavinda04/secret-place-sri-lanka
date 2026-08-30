import React from 'react';
import { ShieldCheck, Leaf, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-ceylon-950 border-t border-ceylon-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <ShieldCheck className="h-5 w-5 text-amber-badge" />
            <span className="text-sm font-medium">Escrow Banking Guarantee</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Leaf className="h-5 w-5 text-emerald-accent" />
            <span className="text-sm font-medium">2% Conservation Fund</span>
          </div>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Website</span>
            <Globe className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-sm text-gray-400 font-jakarta">
            &copy; 2025 Secret Place Sri Lanka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-ceylon-900 text-gray-100 font-sans selection:bg-emerald-accent/30 selection:text-emerald-300 flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

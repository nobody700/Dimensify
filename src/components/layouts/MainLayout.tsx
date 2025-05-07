import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import ParticleBackground from '../ui/ParticleBackground';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-white relative overflow-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-16 pt-20 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

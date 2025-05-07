import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Text to Image', path: '/text-to-image' },
    { name: 'Text to Video', path: '/text-to-video' },
    { name: 'Pricing', path: '/billing' },
  ];

  const logoAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }
  };

  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8',
    isScrolled ? 'bg-dark-950/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
  );

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center z-50">
          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={logoAnimation}
            className="flex items-center"
          >
            <Sparkles className="h-6 w-6 text-accent-400 mr-2" />
            <span className="text-2xl font-bold font-heading bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
              Dimensify
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              )}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <Link
            to="/billing"
            className="ml-3 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Upgrade
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-50 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-800/50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden fixed inset-0 bg-dark-950/95 backdrop-blur-md flex flex-col z-40 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -20,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center flex-grow space-y-6 p-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  'text-xl font-medium transition-colors',
                  isActive
                    ? 'text-white bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text'
                    : 'text-gray-300 hover:text-white'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            
            <Link
              to="/billing"
              className="mt-4 px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-lg font-medium hover:opacity-90 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Upgrade
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
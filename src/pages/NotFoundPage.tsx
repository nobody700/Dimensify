import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <svg 
          width="180" 
          height="180" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-500"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        404 - Page Not Found
      </motion.h1>
      
      <motion.p 
        className="text-xl text-gray-300 mb-8 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Oops! The page you're looking for has vanished into another dimension.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link 
          to="/" 
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium text-white hover:opacity-90 transition-opacity inline-flex items-center"
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
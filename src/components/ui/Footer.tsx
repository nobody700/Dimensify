import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Sparkles className="h-5 w-5 text-accent-400 mr-2" />
              <span className="text-xl font-bold font-heading bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
                Dimensify
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-400 max-w-md">
              Transform your ideas into stunning visuals with our AI-powered media generation studio. Create beautiful images and videos in seconds.
            </p>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Features
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/text-to-image" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Text to Image
                  </Link>
                </li>
                <li>
                  <Link to="/text-to-video" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Text to Video
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/billing" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-dark-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Dimensify. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-4 sm:mt-0 flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-accent-500" /> by creative minds
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
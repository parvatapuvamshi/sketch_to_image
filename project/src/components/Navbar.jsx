import React from 'react';
import { Palette, Moon, Sun, Image } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ darkMode, toggleDarkMode, onShowGallery }) => {
  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900/90 border-amber-700/50' 
        : 'bg-amber-50/90 border-amber-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg"
            >
              <Palette className="h-6 w-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
              Sketch2Pix
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* My Images Button */}
            <button
              onClick={onShowGallery}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                darkMode
                  ? 'bg-gray-800 text-amber-200 hover:bg-gray-700 hover:text-amber-100'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">My Images</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                darkMode
                  ? 'bg-gray-800 text-amber-400 hover:bg-gray-700 hover:text-amber-300'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
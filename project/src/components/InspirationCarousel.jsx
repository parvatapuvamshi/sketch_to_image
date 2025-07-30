import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InspirationCarousel = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Curated architectural and building images from Unsplash
  const inspirationImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      title: 'Modern Skyscraper',
      description: 'Contemporary glass architecture'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      title: 'Futuristic Building',
      description: 'Innovative architectural design'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      title: 'City Landscape',
      description: 'Urban architectural beauty'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      title: 'Modern House',
      description: 'Residential architecture'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=400&h=300&fit=crop',
      title: 'Office Complex',
      description: 'Commercial building design'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop',
      title: 'Abstract Architecture',
      description: 'Creative structural design'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === inspirationImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? inspirationImages.length - 1 : prevIndex - 1
    );
  };

  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % inspirationImages.length;
      images.push(inspirationImages[index]);
    }
    return images;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-2 ${
          darkMode ? 'text-amber-200' : 'text-amber-800'
        }`}>
          Get Inspired
        </h3>
        <p className={`text-sm ${
          darkMode ? 'text-amber-300' : 'text-amber-600'
        }`}>
          Explore architectural designs that showcase the power of Sketch2Pix
        </p>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all hover:scale-110 ${
            darkMode
              ? 'bg-gray-800 text-amber-200 hover:bg-gray-700 hover:text-amber-100'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
          } shadow-lg`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all hover:scale-110 ${
            darkMode
              ? 'bg-gray-800 text-amber-200 hover:bg-gray-700 hover:text-amber-100'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
          } shadow-lg`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Image Cards */}
        <div className="flex gap-4 px-12">
          {getVisibleImages().map((image, index) => (
            <motion.div
              key={`${image.id}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex-1 group cursor-pointer transition-transform hover:scale-105 ${
                darkMode ? 'hover:shadow-2xl' : 'hover:shadow-xl'
              }`}
            >
              <div className={`rounded-xl overflow-hidden ${
                darkMode ? 'bg-gray-800/70' : 'bg-amber-50'
              } shadow-lg`}>
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h4 className={`font-semibold mb-1 ${
                    darkMode ? 'text-amber-200' : 'text-amber-800'
                  }`}>
                    {image.title}
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-amber-300' : 'text-amber-600'
                  }`}>
                    {image.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {inspirationImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-amber-500 w-8'
                  : darkMode
                  ? 'bg-amber-700/50 hover:bg-amber-600'
                  : 'bg-amber-300 hover:bg-amber-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspirationCarousel;
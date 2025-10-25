import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';
import InspirationCarousel from './components/InspirationCarousel';
import ImageGallery from './components/ImageGallery';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleGenerate = async (file) => {
    setIsGenerating(true);
    setGenerationResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://516d4430e86b.ngrok-free.app/generate_json', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const data = await response.json();
      console.log(data);
      const result = {
        originalImage: URL.createObjectURL(file),
        generatedImage: data.generated_image,
        timestamp: new Date().toISOString(),
      };

      setGenerationResult(result);
      setGeneratedImages(prev => [result, ...prev]);
    } catch (error) {
      console.error('Error generating image:', error);
      // You could add error handling UI here
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShowGallery = () => {
    setShowGallery(!showGallery);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-amber-900 to-black' 
        : 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50'
    }`}>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        onShowGallery={handleShowGallery}
      />

      <AnimatePresence mode="wait">
        {showGallery ? (
          <ImageGallery
            key="gallery"
            darkMode={darkMode}
            images={generatedImages}
            onBack={() => setShowGallery(false)}
          />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8 space-y-12"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-pulse`}>
                Transform Sketches into Reality
              </h2>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
                darkMode ? 'text-amber-200' : 'text-amber-800'
              }`}>
                Upload your sketch and watch our AI transform it into a photorealistic image using advanced Pix2Pix technology.
              </p>
            </motion.div>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <UploadSection 
                darkMode={darkMode}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </motion.div>

            {/* Result Section */}
            <AnimatePresence>
              {(generationResult || isGenerating) && (
                <ResultSection
                  darkMode={darkMode}
                  result={generationResult}
                  isGenerating={isGenerating}
                />
              )}
            </AnimatePresence>

            {/* Inspiration Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <InspirationCarousel darkMode={darkMode} />
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
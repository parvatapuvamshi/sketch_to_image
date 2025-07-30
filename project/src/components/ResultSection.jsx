import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Loader } from 'lucide-react';

const ResultSection = ({ darkMode, result, isGenerating }) => {
  const downloadImage = (imageUrl, filename) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className={`rounded-2xl p-8 backdrop-blur-sm border ${
        darkMode 
          ? 'bg-gray-900/70 border-amber-700/50 shadow-2xl' 
          : 'bg-amber-50/70 border-amber-200 shadow-xl'
      }`}>
        <h3 className={`text-2xl font-bold text-center mb-8 ${
          darkMode ? 'text-amber-200' : 'text-amber-800'
        }`}>
          {isGenerating ? 'Generating Your Image...' : 'Generation Complete!'}
        </h3>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Original Image */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold text-center ${
              darkMode ? 'text-amber-300' : 'text-amber-700'
            }`}>
              Original Sketch
            </h4>
            <div className={`relative rounded-xl overflow-hidden ${
              darkMode ? 'bg-gray-800/50' : 'bg-amber-100/50'
            }`}>
              {result ? (
                <div className="relative group">
                  <img
                    src={result.originalImage}
                    alt="Original sketch"
                    className="w-full h-64 object-contain"
                  />
                  <button
                    onClick={() => downloadImage(result.originalImage, 'original-sketch.png')}
                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-64 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-32 h-32 rounded-lg ${darkMode ? 'bg-amber-800/50' : 'bg-amber-200'}`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center md:block hidden">
            <ArrowRight className={`h-8 w-8 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>

          {/* Generated Image */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold text-center ${
              darkMode ? 'text-amber-300' : 'text-amber-700'
            }`}>
              Generated Image
            </h4>
            <div className={`relative rounded-xl overflow-hidden ${
              darkMode ? 'bg-gray-800/50' : 'bg-amber-100/50'
            }`}>
              {isGenerating ? (
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Loader className="h-12 w-12 mx-auto text-amber-500" />
                    </motion.div>
                    <p className={`text-sm ${
                      darkMode ? 'text-amber-300' : 'text-amber-700'
                    }`}>
                      AI is working its magic...
                    </p>
                  </div>
                </div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative group"
                >
                  <img
                    src={result.generatedImage}
                    alt="Generated image"
                    className="w-full h-64 object-contain"
                  />
                  <button
                    onClick={() => downloadImage(result.generatedImage, 'generated-image.png')}
                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <div className="w-full h-64 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-32 h-32 rounded-lg ${darkMode ? 'bg-amber-800/50' : 'bg-amber-200'}`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        {result && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <button
              onClick={() => downloadImage(result.originalImage, 'original-sketch.png')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all hover:scale-105 ${
                darkMode
                  ? 'bg-gray-800 text-amber-200 hover:bg-gray-700'
                  : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
              }`}
            >
              <Download className="h-4 w-4" />
              <span>Download Original</span>
            </button>
            <button
              onClick={() => downloadImage(result.generatedImage, 'generated-image.png')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4" />
              <span>Download Generated</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultSection;
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Calendar } from 'lucide-react';

const ImageGallery = ({ darkMode, images, onBack }) => {
  const downloadImage = (imageUrl, filename) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
            darkMode
              ? 'bg-gray-800 text-amber-200 hover:bg-gray-700'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
          } shadow-lg`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Generator</span>
        </button>

        <h2 className={`text-2xl font-bold ${
          darkMode ? 'text-amber-200' : 'text-amber-800'
        }`}>
          My Generated Images ({images.length})
        </h2>

        <div></div> {/* Spacer for centering */}
      </div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className={`text-center py-16 ${
          darkMode ? 'text-amber-300' : 'text-amber-600'
        }`}>
          <p className="text-lg mb-2">No images generated yet</p>
          <p className="text-sm">Start by uploading a sketch and generating your first image!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Images */}
              <div className="grid grid-cols-2 gap-1">
                <div className="relative group">
                  <img
                    src={image.originalImage}
                    alt="Original sketch"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Original</span>
                  </div>
                </div>
                <div className="relative group">
                  <img
                    src={image.generatedImage}
                    alt="Generated image"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Generated</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className={`flex items-center text-sm mb-3 ${
                  darkMode ? 'text-amber-300' : 'text-amber-600'
                }`}>
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(image.timestamp)}
                </div>

                {/* Download Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadImage(image.originalImage, `original-${index}.png`)}
                    className={`flex-1 px-3 py-2 text-xs rounded transition-colors ${
                      darkMode
                        ? 'bg-gray-700 text-amber-200 hover:bg-gray-600'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    <Download className="h-3 w-3 inline mr-1" />
                    Original
                  </button>
                  <button
                    onClick={() => downloadImage(image.generatedImage, `generated-${index}.png`)}
                    className="flex-1 px-3 py-2 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded hover:from-amber-600 hover:to-orange-600 transition-colors"
                  >
                    <Download className="h-3 w-3 inline mr-1" />
                    Generated
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ImageGallery;
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadSection = ({ darkMode, onGenerate, isGenerating }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  const handleGenerate = () => {
    if (selectedFile) {
      onGenerate(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Upload Area */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? darkMode
              ? 'border-amber-400 bg-amber-900/30 shadow-2xl'
              : 'border-amber-400 bg-amber-100/50 shadow-xl'
            : darkMode
            ? 'border-amber-600/50 bg-gray-800/70 hover:border-amber-500 hover:bg-gray-800/90'
            : 'border-amber-300 bg-amber-50/70 hover:border-amber-400 hover:bg-amber-100/80'
        } backdrop-blur-sm`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-amber-900/50' : 'bg-amber-100'
            }`}>
              {isDragActive ? (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Upload className="h-8 w-8 text-amber-500" />
                </motion.div>
              ) : (
                <ImageIcon className={`h-8 w-8 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
              )}
            </div>
            
            <div className="space-y-2">
              <p className={`text-lg font-medium ${
                darkMode ? 'text-amber-200' : 'text-amber-800'
              }`}>
                {isDragActive ? 'Drop your sketch here!' : 'Upload your sketch'}
              </p>
              <p className={`text-sm ${
                darkMode ? 'text-amber-300' : 'text-amber-600'
              }`}>
                Drag and drop or click to select • PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Generate Button */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`inline-flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isGenerating
                ? 'bg-amber-600/50'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-2xl'
            }`}
          >
            {isGenerating ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="rounded-full h-5 w-5 border-b-2 border-white"
                />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                <span>Generate Image</span>
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UploadSection;
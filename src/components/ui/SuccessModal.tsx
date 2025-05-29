import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-5">
          <button 
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
            aria-label="閉じる"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center py-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            >
              <CheckCircle2 size={80} className="text-success-500 mb-4" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              完了しました！
            </h2>
            
            <p className="text-gray-600 text-center mb-6">
              {message}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              閉じる
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessModal;
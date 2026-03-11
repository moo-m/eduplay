import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BadgesPopover = ({ stations, onClose }) => {
  // تعريف تفاصيل كل شارة: أيقونة، لون، اسم الشارة، رمز القفل
  const badgeDetails = {
    listening: { 
      icon: '🎧', 
      color: 'bg-blue-400', 
      glow: 'shadow-blue-400/50',
      title: 'المستمع المتميز' 
    },
    speaking: { 
      icon: '🗣️', 
      color: 'bg-green-400', 
      glow: 'shadow-green-400/50',
      title: 'المتحدث البارع' 
    },
    reading: { 
      icon: '📖', 
      color: 'bg-yellow-400', 
      glow: 'shadow-yellow-400/50',
      title: 'القارئ النهم' 
    },
    writing: { 
      icon: '✍️', 
      color: 'bg-pink-400', 
      glow: 'shadow-pink-400/50',
      title: 'الكاتب المبدع' 
    },
    grammar: { 
      icon: '💡', 
      color: 'bg-purple-400', 
      glow: 'shadow-purple-400/50',
      title: 'النحوي الذكي' 
    },
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border-4 border-amber-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-center text-amber-800 mb-4">
          🏅 شارات الإنجاز
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          {stations.map((station) => {
            const isCompleted = station.status === 'completed';
            const details = badgeDetails[station.id];
            
            return (
              <div key={station.id} className="flex flex-col items-center text-center">
                <div
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl 
                    ${isCompleted 
                      ? details.color + ' shadow-lg ' + details.glow 
                      : 'bg-gray-200 text-gray-400'
                    } 
                    transition-all duration-300 transform hover:scale-110`}
                >
                  {details.icon}
                  
                  {/* إضافة قفل للشارات غير المكتملة */}
                  {!isCompleted && (
                    <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                      🔒
                    </span>
                  )}
                </div>
                
                {/* اسم الشارة */}
                <span className="text-sm mt-2 font-medium text-gray-800">
                  {details.title}
                </span>
                
                {/* حالة الإكمال (اختياري) */}
                {isCompleted && (
                  <span className="text-xs text-green-600 mt-1">✓ مكتملة</span>
                )}
              </div>
            );
          })}
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-full transition"
        >
          إغلاق
        </button>
      </motion.div>
    </motion.div>
  );
};

export default BadgesPopover;
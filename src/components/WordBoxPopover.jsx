
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BADGES } from '../config/badgesConfig';

const WordBoxPopover = ({ words, onClose, isCompleted = false, stationId = null }) => {
  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, [words]);

  const badge = stationId ? BADGES[stationId] : null;

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
          {isCompleted ? '🏆 صندوق الكلمات - مكتمل!' : '📦 صندوق الكلمات'}
        </h3>

        {words.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            لم تجمع أي كلمات بعد... أكمل المراحل لتجمع الكلمات!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {shuffledWords.map((word, index) => (
              <span
                key={index}
                className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium border border-amber-300 shadow-sm"
              >
                {word}
              </span>
            ))}
          </div>
        )}

        {isCompleted && badge && (
          <div className="mt-6 text-center">
            <div className="flex justify-center mb-2">
              <div className={`w-20 h-20 rounded-full ${badge.color} flex items-center justify-center text-4xl shadow-lg ${badge.glow}`}>
                {badge.icon}
              </div>
            </div>
            <p className="text-lg font-bold text-purple-700">لقد حصلت على شارة</p>
            <p className="text-xl font-bold text-amber-800">{badge.name}</p>
          </div>
        )}

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

export default WordBoxPopover;
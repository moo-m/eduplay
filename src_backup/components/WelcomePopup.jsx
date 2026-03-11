import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomePopup({
  isOpen,
  onClose,
  character,
  messages,
  steps = messages.length,
  getGenieImage,
}) {
  const [step, setStep] = useState(0);

  if (!isOpen || !character) return null;

  const handleNext = () => {
    if (step < steps - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          <img
            src={getGenieImage ? getGenieImage(step) : character.image}
            alt={character.name}
            className="h-32 sm:h-40 object-contain mx-auto mb-4"
          />
          <p className="text-gray-700 text-center mb-6 leading-relaxed">
            {messages[step]}
          </p>
          <div className="flex justify-center gap-4">
            {step > 0 && (
              <button
                onClick={handlePrev}
                className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-xl font-semibold transition"
              >
                السابق
              </button>
            )}
            {step < steps - 1 ? (
              <button
                onClick={handleNext}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition"
              >
                التالي
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-xl font-semibold transition"
              >
                لنبدأ!
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
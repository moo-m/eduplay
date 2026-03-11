// src/components/VerseQuestionModal.jsx
import { motion } from "framer-motion";
import Genie from "./genie";

export default function VerseQuestionModal({ isOpen, onClose, verse, character }) {
  if (!isOpen || !verse) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 relative"
      >
        <div className="flex flex-col items-center">
          <Genie
            character={character}
            mood="main"
            text={verse.explanation}
            visible={true}
            position="top-center"
            imgClassName="h-24 sm:h-32"
          />
          <p className="text-lg font-bold text-center my-4">{verse.text}</p>
          <button
            onClick={onClose}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition"
          >
            التالي
          </button>
        </div>
      </motion.div>
    </div>
  );
}
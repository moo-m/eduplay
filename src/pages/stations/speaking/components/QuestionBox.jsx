// src/pages/stations/speaking/components/QuestionBox.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Genie from "../../../../components/genie";

export default function QuestionBox({ question, onAnswer, result, character }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === question.correct;
    onAnswer(isCorrect);
  };

  const getButtonClass = (index) => {
    if (selected === null) return "bg-white hover:bg-orange-100";
    if (index === question.correct) return "bg-green-400 text-white";
    if (index === selected && index !== question.correct) return "bg-red-400 text-white";
    return "bg-gray-200 opacity-50";
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4"
    >
      <div className="bg-white rounded-3xl p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <Genie
            character={character}
            mood="main"
            text=""
            visible={true}
            position="relative"
            className="w-12 h-12"
          />
          <h3 className="text-xl font-bold text-purple-800">{character.name} يسأل:</h3>
        </div>
        <p className="text-gray-700 text-lg mb-6">{question.text}</p>
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className={`w-full py-3 px-4 rounded-xl border-2 border-orange-300 font-semibold transition ${getButtonClass(idx)}`}
            >
              {opt}
            </button>
          ))}
        </div>
        {result === 'correct' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-green-600 font-bold"
          >
            {question.correctReply}
          </motion.p>
        )}
        {result === 'wrong' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-red-600 font-bold"
          >
            {question.wrongReply}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
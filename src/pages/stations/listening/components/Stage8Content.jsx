// src/pages/stations/listening/components/Stage8Content.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Genie from "../../../../components/genie";
import listeningQuestions from "../../../../data/listeningQuestions";

export default function Stage8Content({ character, initialState, onStateChange, onNext }) {
  const [cards, setCards] = useState(initialState?.cards || []);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [disabledCards, setDisabledCards] = useState(initialState?.disabledCards || []);
  const [genieMood, setGenieMood] = useState("main");
  const [genieText, setGenieText] = useState(listeningQuestions.stage8.openingMessage);
  const [shake, setShake] = useState(false);
  const [lastWrongIndex, setLastWrongIndex] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!cards.length) {
      const shuffled = [...listeningQuestions.stage8.cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
    }
  }, []);

  useEffect(() => {
    onStateChange({ cards, disabledCards });
  }, [cards, disabledCards, onStateChange]);

  useEffect(() => {
    const totalPairs = 4;
    if (disabledCards.length === totalPairs * 2 && !completed) {
      setCompleted(true);
      setGenieMood("7_celebration");
      setGenieText(listeningQuestions.stage8.completionMessage);
    }
  }, [disabledCards, completed]);

  const handleCardClick = (index) => {
    if (disabledCards.includes(index) || index === selectedIndex) return;

    if (selectedIndex !== null) {
      const firstCard = cards[selectedIndex];
      const secondCard = cards[index];
      if (firstCard.pairId === secondCard.pairId && firstCard.pairId !== -1) {
        setDisabledCards([...disabledCards, selectedIndex, index]);
        setGenieMood("1_joy");
        const successMessages = listeningQuestions.stage8.successMessages;
        const randomMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
        setGenieText(randomMsg);
        setSelectedIndex(null);
      } else {
        setGenieMood("2_encouragement");
        const errorMessages = listeningQuestions.stage8.errorMessages;
        const randomMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        setGenieText(randomMsg);
        setShake(true);
        setLastWrongIndex(index);
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setSelectedIndex(null), 500);
      }
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8 w-full">
      <Genie character={character} mood={genieMood} text={genieText} visible={true} position="bottom-center" />

      <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        {cards.map((card, idx) => {
          const isSelected = selectedIndex === idx;
          const isDisabled = disabledCards.includes(idx);
          const isWrongShake = shake && lastWrongIndex === idx;

          return (
            <motion.div
              key={idx}
              animate={{
                scale: isSelected ? 1.05 : 1,
                boxShadow: isSelected
                  ? "0 0 20px rgba(59, 130, 246, 0.8)"
                  : isDisabled
                  ? "0 0 15px rgba(34, 197, 94, 0.8)"
                  : "0 4px 6px rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-xl shadow-lg cursor-pointer transition-colors ${
                isDisabled
                  ? "bg-green-200 border-2 border-green-500 pointer-events-none"
                  : isSelected
                  ? "bg-blue-200 border-2 border-blue-500"
                  : "bg-white border-2 border-orange-300 hover:bg-orange-50"
              } ${isWrongShake ? "animate-shake" : ""}`}
              onClick={() => handleCardClick(idx)}
            >
              <p className="text-center font-arabic">{card.text}</p>
            </motion.div>
          );
        })}
      </div>

      {completed && (
        <button
          onClick={onNext}
          className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition"
        >
          المرحلة التالية
        </button>
      )}
    </div>
  );
}
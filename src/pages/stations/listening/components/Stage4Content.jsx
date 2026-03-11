// src/pages/stations/listening/components/Stage4Content.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Genie from "../../../../components/genie";

export default function Stage4Content({ character, initialState, onStateChange, onNext }) {
  const allCards = [
    "إنَّ ثيابي قديمة.",
    "إنَّ ثيابي بالية.",
    "إنني أحتاج ثوبًا جديدًا.",
    "احذر يا رجل!",
    "انتبه يا صديقي!",
    "حاذر يا أخي!",
    "نص علمي",
    "أنشودة",
    "حكاية شعرية",
    "الطرفة: قصة قصيرة مضحكة"
  ];

  const questions = [
    {
      text: "اسحب الجملة التي قالها أشعب عندما تذكَّر حال ثيابه إلى صندوق الإجابات.",
      correct: "إنَّ ثيابي بالية."
    },
    {
      text: "اسحب إلى الصندوق ما قاله أحد الجالسين منبِّهًا أشعب.",
      correct: "احذر يا رجل!"
    },
    {
      text: "اسحب البطاقة التي تدل على نوع النص المسموع.",
      correct: "الطرفة: قصة قصيرة مضحكة"
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialState?.currentQuestionIndex || 0);
  const [availableCards, setAvailableCards] = useState(initialState?.availableCards || []);
  const [dropZoneCard, setDropZoneCard] = useState(null);
  const [isWrong, setIsWrong] = useState(false);
  const [genieMood, setGenieMood] = useState("3_thinking");
  const [genieText, setGenieText] = useState(questions[0].text);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [completed, setCompleted] = useState(initialState?.completed || false);

  useEffect(() => {
    if (!availableCards.length && !completed) {
      const shuffled = [...allCards].sort(() => Math.random() - 0.5);
      setAvailableCards(shuffled);
    }
  }, [completed, availableCards.length]);

  useEffect(() => {
    onStateChange({ currentQuestionIndex, availableCards, completed });
  }, [currentQuestionIndex, availableCards, completed, onStateChange]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", card);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const card = e.dataTransfer.getData("text/plain");

    if (card === currentQuestion.correct) {
      setDropZoneCard(card);
      setGenieMood("1_joy");
      setGenieText("أحسنت! إجابة صحيحة.");

      setTimeout(() => {
        setAvailableCards((prev) => prev.filter((c) => c !== card));
        setDropZoneCard(null);

        if (currentQuestionIndex === questions.length - 1) {
          setCompleted(true);
          setGenieMood("7_celebration");
          setGenieText("رائع! لقد فهمت النص فهمًا مميزًا.");
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setGenieMood("3_thinking");
          setGenieText(questions[currentQuestionIndex + 1].text);
        }
      }, 2000);
    } else {
      setIsWrong(true);
      setGenieMood("2_encouragement");
      setGenieText("حاول مرةً أخرى وتذكَّر جيدًا ما سمعت.");
      setTimeout(() => setIsWrong(false), 1000);
    }
  };

  return (
    <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8">
      <Genie
        character={character}
        mood={genieMood}
        text={genieText}
        visible={true}
        position="bottom-center"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full max-w-md h-24 mb-6 border-2 border-dashed rounded-xl flex items-center justify-center transition-all duration-300 ${
          isDraggingOver
            ? "border-orange-500 bg-orange-50"
            : isWrong
            ? "border-red-500 bg-red-50 animate-shake"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        {dropZoneCard ? (
          <div className="bg-green-100 p-2 rounded-lg shadow">{dropZoneCard}</div>
        ) : (
          <span className="text-gray-400">اسحب الإجابة إلى هنا</span>
        )}
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4">
        <div className="grid grid-cols-2 gap-3">
          {availableCards.map((card, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, card)}
              className="bg-orange-100 p-3 rounded-xl shadow cursor-grab active:cursor-grabbing hover:bg-orange-200 transition text-sm text-center"
            >
              {card}
            </div>
          ))}
        </div>
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
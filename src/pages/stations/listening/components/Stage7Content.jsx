// src/pages/stations/listening/components/Stage7Content.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Genie from "../../../../components/genie";
import listeningQuestions from "../../../../data/listeningQuestions";

export default function Stage7Content({ character, initialState, onStateChange, onNext }) {
  const isAshab = character?.key === "ashab";
  const [currentStep, setCurrentStep] = useState(initialState?.currentStep || 0);
  const [storyLines, setStoryLines] = useState(initialState?.storyLines || []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [genieMood, setGenieMood] = useState("1_joy");
  const [genieText, setGenieText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const steps = listeningQuestions.stage7.steps;
  const totalSteps = steps.length;
  const current = steps[currentStep];

  useEffect(() => {
    onStateChange({ currentStep, storyLines });
  }, [currentStep, storyLines, onStateChange]);

  useEffect(() => {
    if (currentStep === 0) {
      setGenieText(isAshab ? listeningQuestions.stage7.opening.ashab : listeningQuestions.stage7.opening.juha);
    } else {
      setGenieText(isAshab ? current.questionAshab : current.questionJuha);
    }
  }, [currentStep, isAshab, current]);

  const handleOptionClick = (option) => {
    if (isCorrect) return;

    setSelectedOption(option.text);
    if (option.correct) {
      setIsCorrect(true);
      setShowNextButton(true);
      setErrorMessage("");
      setGenieMood("1_joy");
      setGenieText(isAshab ? current.successReplyAshab : current.successReplyJuha);
      setStoryLines((prev) => [
        ...prev,
        isAshab ? current.correctLineAshab : current.correctLineJuha,
      ]);
    } else {
      const reply = isAshab ? option.errorReplyAshab : option.errorReplyJuha;
      setErrorMessage(reply);
      setGenieMood("2_encouragement");
      setGenieText(reply);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setIsCorrect(false);
      setShowNextButton(false);
      setErrorMessage("");
      setGenieMood("3_thinking");
    } else {
      setCompleted(true);
      setGenieMood("7_celebration");
      setGenieText("أحسنت! هكذا عادت القصة كاملة.");
    }
  };

  useEffect(() => {
    if (currentStep > 0 && !errorMessage && !isCorrect) {
      setGenieText(isAshab ? current.questionAshab : current.questionJuha);
      setGenieMood("3_thinking");
    }
  }, [currentStep, current, isAshab, errorMessage, isCorrect]);

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8 w-full">
      <div className="w-full max-w-2xl mb-4">
        <div className="flex justify-between mb-1 text-sm text-gray-600">
          <span>الخطوة {currentStep + 1} من {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="bg-orange-400 h-2 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 mb-6 min-h-[150px]">
        <h3 className="text-xl font-bold text-purple-800 mb-3">القصة تتكوّن...</h3>
        <div className="text-right space-y-2">
          {storyLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-gray-700"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      <Genie character={character} mood={genieMood} text={genieText} visible={true} position="bottom-center" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        {current.options.map((option, idx) => {
          const isSelected = selectedOption === option.text;
          const isCorrectOption = option.correct && isCorrect;
          return (
            <motion.button
              key={idx}
              onClick={() => handleOptionClick(option)}
              disabled={isCorrect}
              className={`p-4 rounded-xl shadow-lg font-semibold transition-all ${
                isCorrectOption
                  ? "bg-green-200 border-2 border-green-500"
                  : isSelected && !option.correct
                  ? "bg-red-200 border-2 border-red-500"
                  : "bg-white border-2 border-orange-300 hover:bg-orange-100"
              }`}
              whileHover={{ scale: isCorrect ? 1 : 1.02 }}
              whileTap={{ scale: isCorrect ? 1 : 0.98 }}
            >
              {option.text}
            </motion.button>
          );
        })}
      </div>

      {errorMessage && <p className="mt-4 text-red-500 font-semibold whitespace-pre-line">{errorMessage}</p>}

      <AnimatePresence>
        {showNextButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleNext}
            className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition"
          >
            {currentStep === totalSteps - 1 ? "إنهاء القصة" : "التالي"}
          </motion.button>
        )}
      </AnimatePresence>

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
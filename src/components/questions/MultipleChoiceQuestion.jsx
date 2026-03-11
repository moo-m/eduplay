// src/components/questions/MultipleChoiceQuestion.jsx
import { useState, useEffect } from 'react';

export default function MultipleChoiceQuestion({
  question,
  onAnswer,
  disabled = false,
  selectedOption = null,
  showCorrect = false
}) {
  const [selected, setSelected] = useState(selectedOption);

  // تحديث selected عندما تتغير selectedOption من الخارج (عند التنقل بين الأسئلة)
  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  const handleSelect = (optionId) => {
    if (disabled) return;
    setSelected(optionId);
    if (onAnswer) {
      const option = question.options.find(opt => opt.id === optionId);
      onAnswer(option.correct, optionId);
    }
  };

  return (
    <div className="w-full max-w-md">
      {question.image && (
        <img
          src={question.image}
          alt="صورة توضيحية"
          className="w-full rounded-2xl shadow-lg mb-4"
        />
      )}
      <p className="text-lg font-semibold mb-4">{question.text}</p>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrect = showCorrect && option.correct;
          const isWrong = showCorrect && !option.correct && isSelected;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={disabled}
              className={`py-3 rounded-xl font-semibold transition ${
                disabled && isCorrect
                  ? 'bg-green-200 border border-green-400 cursor-default'
                  : disabled && isWrong
                  ? 'bg-red-200 border border-red-400 cursor-default'
                  : disabled && !isSelected
                  ? 'bg-gray-200 border border-gray-400 cursor-default opacity-60'
                  : isSelected
                  ? 'bg-orange-200 border-2 border-orange-400'
                  : 'bg-white border-2 border-orange-300 hover:bg-orange-100'
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
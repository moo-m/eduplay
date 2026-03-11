// ==================== /src/pages/stations/speaking/stages/Stage1.jsx (نموذج) ====================
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Genie from "../../../../components/genie";
import { useGenieEngine } from "../../../../components/genie/GenieEngine";

export default function Stage1({ character, onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [showVerseModal, setShowVerseModal] = useState(false);
  const [verseCollected, setVerseCollected] = useState(false);
  const [verseWrong, setVerseWrong] = useState(false);

  const {
    mood,
    message,
    visible,
    handleAnswer,
    handleStageComplete,
    handleHint,
    hideGenie,
    setMoodAndMessage
  } = useGenieEngine({ autoHideAfterComplete: false });

  const questions = [
    {
      text: "كيف تطلب شيئًا بأدب؟",
      answers: [
        { text: "أعطني هذا!", correct: false },
        { text: "هل يمكنك مساعدتي من فضلك؟", correct: true },
        { text: "أريد هذا الآن.", correct: false }
      ]
    },
    {
      text: "ما العبارة المناسبة لشكر شخص؟",
      answers: [
        { text: "شكرًا جزيلاً", correct: true },
        { text: "لا شكر على واجب", correct: false },
        { text: "عفواً", correct: false }
      ]
    }
  ];

  const verseQuestion = {
    text: "أكمل الآية: { وَقُل رَّبِّ زِدْنِي ... }",
    answers: [
      { text: "عِلْمًا", correct: true },
      { text: "مَالًا", correct: false },
      { text: "وَلَدًا", correct: false }
    ],
    hint: "سورة طه"
  };

  const isCurrentCompleted = completedQuestions.includes(currentQuestion);
  const prevQuestionRef = useRef(currentQuestion);

  useEffect(() => {
    if (prevQuestionRef.current !== currentQuestion) {
      if (isCurrentCompleted) {
        setMoodAndMessage("main", "يمكنك مراجعة إجاباتك.");
      } else {
        setMoodAndMessage(
          currentQuestion === 0 ? "main" : "3_thinking",
          currentQuestion === 0 ? "اختر العبارة المناسبة." : "والآن السؤال التالي."
        );
      }
      prevQuestionRef.current = currentQuestion;
    }
  }, [currentQuestion, isCurrentCompleted, setMoodAndMessage]);

  const handleQuestionAnswer = answer => {
    if (isCurrentCompleted) return;

    if (answer.correct) {
      handleAnswer(true, "أحسنت! إجابة صحيحة.");
      const updated = [...completedQuestions, currentQuestion];
      setCompletedQuestions(updated);

      if (updated.length === questions.length) {
        setTimeout(() => {
          setShowVerseModal(true);
          handleHint("أجب عن هذا السؤال لتحصل على الكلمة الأولى.");
        }, 800);
      }
    } else {
      handleAnswer(false, "إجابة خاطئة. حاول مرة أخرى.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(prev => prev + 1);
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(prev => prev - 1);
  };

  const handleVerseAnswer = answer => {
    if (verseCollected) return;

    if (answer.correct) {
      setVerseCollected(true);
      setVerseWrong(false);
      handleStageComplete("أحسنت! كلمة «علمًا» أضيفت إلى رصيدك.");
      setTimeout(() => hideGenie(), 2000);
      setTimeout(() => {
        setShowVerseModal(false);
        onNext("علمًا");
      }, 2500);
    } else {
      setVerseWrong(true);
      handleAnswer(false, `خاطئ. تلميح: ${verseQuestion.hint}`);
    }
  };

  return (
    <div className="text-center mt-10 flex flex-col items-center relative px-4 sm:px-8">
      <Genie character={character} mood={mood} text={message} visible={visible} position="bottom-center" />

      <img src="/images/speaking/stage1.jpg" alt="صورة المرحلة" className="w-full max-w-md rounded-2xl shadow-lg mt-16 mb-6" />

      <p className="text-lg font-semibold mb-4">{questions[currentQuestion].text}</p>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {questions[currentQuestion].answers.map((ans, i) => (
          <button
            key={i}
            onClick={() => handleQuestionAnswer(ans)}
            disabled={isCurrentCompleted}
            className={`py-3 rounded-xl font-semibold transition ${
              isCurrentCompleted ? "bg-green-200 border border-green-400 cursor-default" : "bg-white border-2 border-orange-300 hover:bg-orange-100"
            }`}
          >
            {ans.text}
          </button>
        ))}
      </div>

      {completedQuestions.length > 0 && (
        <div className="flex gap-4 mt-6">
          <button onClick={handlePrevQuestion} disabled={currentQuestion === 0} className="px-6 py-2 rounded-xl bg-gray-200 disabled:opacity-50">السابق</button>
          <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1} className="px-6 py-2 rounded-xl bg-gray-200 disabled:opacity-50">التالي</button>
        </div>
      )}

      <AnimatePresence>
        {showVerseModal && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4"
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-md w-full text-center shadow-2xl">
              <p className="text-2xl mb-2">🌟 سؤال المكافأة</p>
              <p className="font-bold text-lg mb-4">{verseQuestion.text}</p>
              <div className="flex flex-col gap-3">
                {verseQuestion.answers.map((ans, i) => (
                  <button
                    key={i}
                    onClick={() => handleVerseAnswer(ans)}
                    disabled={verseCollected}
                    className={`py-3 rounded-xl font-semibold transition ${
                      verseCollected
                        ? "bg-yellow-200 border border-yellow-400 cursor-default"
                        : verseWrong
                        ? "bg-white border-2 border-red-300 hover:bg-red-50"
                        : "bg-white border-2 border-orange-300 hover:bg-orange-100"
                    }`}
                  >
                    {ans.text}
                  </button>
                ))}
              </div>
              {verseCollected && (
                <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-5 text-yellow-600 font-bold text-lg">
                  🏅 كلمة المكافأة: علمًا — انتقل إلى المرحلة التالية...
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
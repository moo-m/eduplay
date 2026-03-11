// ==================== /src/pages/stations/speaking/stages/Stage2.jsx (نموذج) ====================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Genie from "../../../../components/genie";

export default function Stage2({ character, onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [showVerseModal, setShowVerseModal] = useState(false);
  const [verseCollected, setVerseCollected] = useState(false);
  const [verseWrong, setVerseWrong] = useState(false);
  const [genieMood, setGenieMood] = useState("main");
  const [genieText, setGenieText] = useState("هيا نكمل! أجب عن السؤال.");

  const questions = [
    {
      text: "كيف تعبر عن رأيك؟",
      answers: ["أعتقد أن...", "لا يهم", "افعل هذا"]
    },
    {
      text: "ما الطريقة المناسبة لطلب الإذن؟",
      answers: ["هل يمكنني...؟", "أريد...", "سأفعل..."]
    }
  ];

  const verseQuestion = {
    text: "أكمل الحديث النبوي: { إنما الأعمال ... }",
    answers: ["بالنيات", "بالأعمال", "بالأقوال"],
    correct: "بالنيات",
    hint: "بداية حديث مشهور."
  };

  const isAnswered = completedQuestions.includes(currentQuestion);

  const handleQuestionAnswer = () => {
    if (completedQuestions.includes(currentQuestion)) return;

    const updated = [...completedQuestions, currentQuestion];
    setCompletedQuestions(updated);

    if (currentQuestion === questions.length - 1) {
      setGenieMood("1_joy");
      setGenieText("ممتاز! أجبت على كل الأسئلة ✅");
      setTimeout(() => setShowVerseModal(true), 800);
    } else {
      setGenieMood("1_joy");
      setGenieText("أحسنت! انتقل للسؤال التالي 👀");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setGenieMood("3_thinking");
      setGenieText("السؤال التالي، ركز جيدًا!");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleVerseAnswer = (ans) => {
    if (ans === verseQuestion.correct) {
      setVerseCollected(true);
      setVerseWrong(false);
      setGenieMood("7_celebration");
      setGenieText("مذهل! أكملت المرحلة الثانية 🎉");

      setTimeout(() => {
        setShowVerseModal(false);
        onNext("بالنيات");
      }, 1500);
    } else {
      setVerseWrong(true);
      setGenieMood("2_encouragement");
      setGenieText(`تلميح: ${verseQuestion.hint}`);
    }
  };

  return (
    <div className="text-center mt-10 flex flex-col items-center min-h-screen px-4 sm:px-8">
      <Genie character={character} mood={genieMood} text={genieText} />

      <img src="/images/speaking/stage2.jpg" alt="صورة المرحلة" className="w-full max-w-md rounded-2xl shadow-lg mt-16 mb-6" />

      <p className="text-lg font-semibold mb-4">{questions[currentQuestion].text}</p>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {questions[currentQuestion].answers.map((ans, i) => (
          <button
            key={i}
            onClick={handleQuestionAnswer}
            disabled={isAnswered}
            className={`py-3 rounded-xl font-semibold transition ${
              isAnswered
                ? "bg-green-200 border border-green-400 cursor-default"
                : "bg-white border-2 border-orange-300 hover:bg-orange-100"
            }`}
          >
            {ans}
          </button>
        ))}
      </div>

      {isAnswered && (
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
                {verseQuestion.answers.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => handleVerseAnswer(a)}
                    disabled={verseCollected}
                    className={`py-3 rounded-xl font-semibold transition ${
                      verseCollected
                        ? "bg-yellow-200 border border-yellow-400 cursor-default"
                        : verseWrong
                        ? "bg-white border-2 border-red-300 hover:bg-red-50"
                        : "bg-white border-2 border-orange-300 hover:bg-orange-100"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>

              {verseCollected && (
                <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-5 text-yellow-600 font-bold text-lg">
                  🏅 كلمة المكافأة: بالنيات — جارٍ الانتقال...
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
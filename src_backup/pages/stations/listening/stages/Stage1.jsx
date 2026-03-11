// src/pages/stations/listening/stages/Stage1.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Genie from "../../../../components/genie";

const STORAGE_KEY = "listening_stage1_data";

export default function Stage1({ character, onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ 0: null, 1: null });
  const [submitted, setSubmitted] = useState({ 0: false, 1: false });
  const [verseAnswer, setVerseAnswer] = useState(null);
  const [verseSubmitted, setVerseSubmitted] = useState(false);
  const [verseWrong, setVerseWrong] = useState(false);
  const [genieMood, setGenieMood] = useState("main");
  const [genieText, setGenieText] = useState("");

  const questions = [
    {
      id: 0,
      text: "ماذا ترى في الصورة؟",
      answers: [
        { text: "ثلاثة رجال، أحدهم يرحِّب بضيوفه.", correct: true },
        { text: "منزل طيني بتصميم تراثي.", correct: true },
        { text: "ثلاث بطات تقف عند مدخل البيت.", correct: true },
      ],
    },
    {
      id: 1,
      text: "عمَّ تتوقع أن يدور النص المسموع؟",
      answers: [
        { text: "نوادر فكاهية لشخصيات تراثية كأشعب وجحا.", correct: true },
        { text: "مواقف طريفة تتعلَّق بالكرم أو الطمع.", correct: true },
        { text: "حيلة أو خدعة ذكية للحصول على شيء ما.", correct: true },
      ],
    },
  ];

  const verseQuestion = {
    text: "أكمل الآية: { قُلْ هُوَ ٱللَّهُ ... }",
    answers: [
      { text: "أَحَدٌ", correct: true },
      { text: "ٱلرَّحْمَٰنُ", correct: false },
      { text: "ٱللَّهُ أَكْبَرُ", correct: false },
    ],
    hint: "سورة الإخلاص",
  };

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSubmitted(data.submitted || { 0: false, 1: false });
        setVerseSubmitted(data.verseSubmitted || false);
        setVerseAnswer(data.verseAnswer || null);
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ submitted, verseSubmitted, verseAnswer })
    );
  }, [submitted, verseSubmitted, verseAnswer]);

  const isCurrentSubmitted = submitted[currentQuestion];
  const allQuestionsSubmitted = submitted[0] && submitted[1];

  // Genie messages based on progress
  useEffect(() => {
    if (!allQuestionsSubmitted) {
      if (currentQuestion === 0) {
        setGenieMood("main");
        setGenieText("تأمل الصورة جيداً ثم اختر الإجابة المناسبة.");
      } else {
        setGenieMood("3_thinking");
        setGenieText("والآن، ماذا تتوقع أن يكون موضوع النص المسموع؟");
      }
    } else {
      if (!verseSubmitted) {
        setGenieMood("3_thinking");
        setGenieText("أكمل الآية لتحصل على الكلمة الأولى.");
      } else if (verseSubmitted && verseAnswer) {
        setGenieMood("7_celebration");
        setGenieText("ممتاز! كلمة «أحد» أصبحت في رصيدك.");
      }
    }
  }, [currentQuestion, allQuestionsSubmitted, verseSubmitted, verseAnswer]);

  const handleQuestionAnswer = (answer) => {
    if (isCurrentSubmitted) return;

    setAnswers({ ...answers, [currentQuestion]: answer.correct });
    setSubmitted({ ...submitted, [currentQuestion]: true });

    if (currentQuestion === 0) {
      setCurrentQuestion(1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion === 1) setCurrentQuestion(0);
  };

  const handleVerseAnswer = (answer) => {
    if (verseSubmitted) return;

    setVerseAnswer(answer.correct);
    if (answer.correct) {
      setVerseSubmitted(true);
      setVerseWrong(false);
    } else {
      setVerseWrong(true);
      setGenieMood("2_encouragement");
      setGenieText(`ليس هذه المرة، فكر في ${verseQuestion.hint}.`);
    }
  };

  const handleProceed = () => {
    onNext("أحد");
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

      <img
        src="/images/listening/prep_image.jpeg"
        alt="صورة المرحلة"
        className="w-full max-w-md rounded-2xl shadow-lg mt-16 mb-6"
      />

      {/* الأسئلة الرئيسية */}
      {!allQuestionsSubmitted && (
        <>
          <p className="text-lg font-semibold mb-4">{questions[currentQuestion].text}</p>
          <div className="flex flex-col gap-3 w-full max-w-md">
            {questions[currentQuestion].answers.map((ans, i) => (
              <button
                key={i}
                onClick={() => handleQuestionAnswer(ans)}
                disabled={isCurrentSubmitted}
                className={`py-3 rounded-xl font-semibold transition ${
                  isCurrentSubmitted && ans.correct
                    ? "bg-green-200 border border-green-400 cursor-default"
                    : isCurrentSubmitted && !ans.correct
                    ? "bg-gray-200 border border-gray-400 cursor-default opacity-60"
                    : "bg-white border-2 border-orange-300 hover:bg-orange-100"
                }`}
              >
                {ans.text}
              </button>
            ))}
          </div>
          {submitted[currentQuestion] && currentQuestion === 1 && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="px-6 py-2 rounded-xl bg-gray-200"
              >
                السابق
              </button>
            </div>
          )}
        </>
      )}

      {/* سؤال الآية - يظهر بعد الإجابة على جميع الأسئلة */}
      {allQuestionsSubmitted && !verseSubmitted && (
        <div className="w-full max-w-md mt-6">
          <p className="text-lg font-semibold mb-4">{verseQuestion.text}</p>
          <div className="flex flex-col gap-3">
            {verseQuestion.answers.map((ans, i) => (
              <button
                key={i}
                onClick={() => handleVerseAnswer(ans)}
                className={`py-3 rounded-xl font-semibold transition ${
                  verseWrong && !ans.correct
                    ? "bg-white border-2 border-red-300"
                    : "bg-white border-2 border-orange-300 hover:bg-orange-100"
                }`}
              >
                {ans.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* زر الانتقال إلى المرحلة التالية بعد حل الآية */}
      {verseSubmitted && (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={handleProceed}
          className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition"
        >
          الانتقال إلى المرحلة التالية
        </motion.button>
      )}
    </div>
  );
}
// src/pages/stations/listening/stages/CompleteVerseStage.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Genie from "../../../../components/genie";
import BadgeCard from "../../../../components/BadgeCard";
import { completeStation } from "../../../../utils/storage";

export default function CompleteVerseStage({ character, words, onFinish }) {
  const navigate = useNavigate();
  const FINAL_SENTENCE = "الاستماع الجيد يظهر الاحترام ويعزز الفهم بين المتحدثين دائمًا";
  const sentence = words.join(" ");
  const unlocked = sentence === FINAL_SENTENCE;

  const hasCompleted = useRef(false);

  useEffect(() => {
    if (unlocked && !hasCompleted.current) {
      hasCompleted.current = true;
      completeStation("listening");
      if (onFinish) onFinish();
    }
  }, [unlocked, onFinish]);

  const handleBackToMain = () => {
    navigate("/main");
  };

  return (
    <div className="text-center mt-20 px-4">
      <Genie
        character={character}
        mood={unlocked ? "7_celebration" : "3_thinking"}
        text={
          unlocked
            ? "أحسنت! لقد أكملت محطة الاستماع 🎉"
            : "لقد جمعت الكلمات! لنرَ النتيجة..."
        }
      />

      <div className="flex gap-3 justify-center flex-wrap mt-10">
        {words.map((word, i) => (
          <span
            key={i}
            className="bg-yellow-200 border-2 border-yellow-400 px-4 py-2 rounded-xl font-bold text-lg"
          >
            {word}
          </span>
        ))}
      </div>

      {unlocked && (
        <>
          <BadgeCard title="شارة المستمع الجيد" />
          <button
            onClick={handleBackToMain}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-xl transition"
          >
            العودة إلى الرئيسية
          </button>
        </>
      )}

      {!unlocked && (
        <p className="mt-6 text-red-400 font-semibold">
          لم تكتمل الجملة بعد. عدد الكلمات المجموعة: {words.length}
        </p>
      )}
    </div>
  );
}


import { useEffect, useRef } from "react";
import Genie from "../../../../components/genie";
import BadgeCard from "../../../../components/BadgeCard";
import { completeStation } from "../../../../utils/storage";

export default function CompleteVerseStage({ character, words, onFinish }) {
  const FINAL_SENTENCE = "أحد واعٍ";
  const sentence = words.join(" ");
  const unlocked = sentence === FINAL_SENTENCE;

  const hasCompleted = useRef(false); // لتجنب التنفيذ المتكرر

  useEffect(() => {
    if (unlocked && !hasCompleted.current) {
      hasCompleted.current = true;
      completeStation("listening");
      if (onFinish) onFinish();
    }
  }, [unlocked, onFinish]);

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

      {unlocked && <BadgeCard title="شارة المستمع الجيد" />}

      {!unlocked && (
        <p className="mt-6 text-red-400 font-semibold">
          لم تكتمل الجملة بعد. عدد الكلمات المجموعة: {words.length}
        </p>
      )}
    </div>
  );
}
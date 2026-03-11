// src/pages/stations/listening/components/Stage5Content.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Genie from "../../../../components/genie";

export default function Stage5Content({ character, initialState, onStateChange, onNext }) {
  const allCards = [
    "الْتَقى بِأَحَدِ الْمارَّةِ",
    "دَعاهُ إِلى وَليمَةٍ فاخِرَةٍ",
    "بَدَأَ بِالْتِهامِ الطَّعامِ",
    "تَوَجَّها إِلى وَليمَةٍ"
  ];

  const [availableCards, setAvailableCards] = useState(initialState?.availableCards || []);
  const [slots, setSlots] = useState(initialState?.slots || [null, null]);
  const [isWrong, setIsWrong] = useState(false);
  const [genieMood, setGenieMood] = useState("1_joy");
  const [genieText, setGenieText] = useState(
    "أحسنت في المرحلة السابقة! أمامك الآن تحدٍّ جديد. هذا هو الحدث الأول، فهل تستطيع أن تتذكَّر الحدثين اللذين جاءا بعده؟ اسحبهما إلى الصندوق بالترتيب الصحيح."
  );
  const [draggedOverSlot, setDraggedOverSlot] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!availableCards.length) {
      const shuffled = [...allCards].sort(() => Math.random() - 0.5);
      setAvailableCards(shuffled);
    }
  }, []);

  useEffect(() => {
    onStateChange({ availableCards, slots });
  }, [availableCards, slots, onStateChange]);

  const isComplete = slots[0] === "الْتَقى بِأَحَدِ الْمارَّةِ" && slots[1] === "دَعاهُ إِلى وَليمَةٍ فاخِرَةٍ";

  useEffect(() => {
    if (isComplete && !completed) {
      setCompleted(true);
      setGenieMood("7_celebration");
      setGenieText("رائع! لقد رتبت الأحداث ترتيبًا صحيحًا.");
    }
  }, [isComplete, completed]);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", card);
  };

  const handleDragOver = (e, slotIndex) => {
    e.preventDefault();
    setDraggedOverSlot(slotIndex);
  };

  const handleDragLeave = () => {
    setDraggedOverSlot(null);
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    setDraggedOverSlot(null);
    const card = e.dataTransfer.getData("text/plain");

    if (slotIndex === 0 && card === "الْتَقى بِأَحَدِ الْمارَّةِ") {
      if (slots[0] === null) {
        setSlots([card, slots[1]]);
        setAvailableCards(prev => prev.filter(c => c !== card));
        setGenieMood("1_joy");
        setGenieText("أحسنت! استمر.");
      } else {
        handleWrong("هذه الخانة ممتلئة بالفعل.");
      }
    } else if (slotIndex === 1 && card === "دَعاهُ إِلى وَليمَةٍ فاخِرَةٍ") {
      if (slots[0] !== "الْتَقى بِأَحَدِ الْمارَّةِ") {
        handleWrong("ابدأ بالحدث الأقرب زمنًا.");
      } else if (slots[1] === null) {
        setSlots([slots[0], card]);
        setAvailableCards(prev => prev.filter(c => c !== card));
        setGenieMood("1_joy");
        setGenieText("أحسنت! استمر.");
      } else {
        handleWrong("هذه الخانة ممتلئة بالفعل.");
      }
    } else {
      handleWrong("تذكَّر تسلسل القصة جيدًا، وفكِّر في الحدث الذي جاء أولًا.");
    }
  };

  const handleWrong = (message) => {
    setIsWrong(true);
    setGenieMood("2_encouragement");
    setGenieText(message);
    setTimeout(() => setIsWrong(false), 1000);
  };

  const SlotBox = ({ title, slotIndex, content }) => (
    <div
      onDragOver={(e) => handleDragOver(e, slotIndex)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, slotIndex)}
      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
        draggedOverSlot === slotIndex
          ? "border-orange-500 bg-orange-50"
          : isWrong
          ? "border-red-500 bg-red-50 animate-shake"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      {content ? (
        <div className="bg-green-100 p-2 rounded-lg shadow text-center">{content}</div>
      ) : (
        <span className="text-gray-400 text-center block">اسحب الحدث هنا</span>
      )}
    </div>
  );

  return (
    <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8">
      <Genie character={character} mood={genieMood} text={genieText} visible={true} position="bottom-center" />

      <div className="w-full max-w-md space-y-3 mb-6">
        <div className="bg-orange-200 p-4 rounded-xl border-2 border-orange-400 text-center font-semibold">
          حاوَلَ أَشْعَبُ اصْطِيادَ بَطَّةٍ
        </div>
        <SlotBox title="" slotIndex={0} content={slots[0]} />
        <SlotBox title="" slotIndex={1} content={slots[1]} />
      </div>

      {availableCards.length > 0 && (
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
      )}

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
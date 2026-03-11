// src/pages/stations/listening/components/Stage9Content.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Genie from "../../../../components/genie";
import listeningQuestions from "../../../../data/listeningQuestions";

export default function Stage9Content({ character, initialState, onStateChange, onNext }) {
  const allCards = [
    ...listeningQuestions.stage9.characters,
    ...listeningQuestions.stage9.traits,
    ...listeningQuestions.stage9.reasons
  ];
  const [availableCards, setAvailableCards] = useState(initialState?.availableCards || []);
  const [personSlot, setPersonSlot] = useState(initialState?.personSlot || null);
  const [traitSlot, setTraitSlot] = useState(initialState?.traitSlot || null);
  const [reasonSlot, setReasonSlot] = useState(initialState?.reasonSlot || null);
  const [completedGroups, setCompletedGroups] = useState(initialState?.completedGroups || 0);
  const [genieMood, setGenieMood] = useState("main");
  const [genieText, setGenieText] = useState(listeningQuestions.stage9.openingMessage);
  const [shake, setShake] = useState(false);
  const [glow, setGlow] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!availableCards.length) {
      const shuffled = [...allCards].sort(() => Math.random() - 0.5);
      setAvailableCards(shuffled);
    }
  }, []);

  useEffect(() => {
    onStateChange({ availableCards, personSlot, traitSlot, reasonSlot, completedGroups });
  }, [availableCards, personSlot, traitSlot, reasonSlot, completedGroups, onStateChange]);

  useEffect(() => {
    if (completedGroups === 3 && !completed) {
      setCompleted(true);
      setGenieMood("7_celebration");
      setGenieText("أحسنت! أكملت جميع المجموعات.");
    }
  }, [completedGroups, completed]);

  const checkCurrentGroup = () => {
    if (!personSlot || !traitSlot || !reasonSlot) return false;
    const correctGroups = listeningQuestions.stage9.correctGroups;
    return correctGroups.some(group =>
      group.person === personSlot.text &&
      group.trait === traitSlot.text &&
      group.reason === reasonSlot.text
    );
  };

  useEffect(() => {
    if (personSlot && traitSlot && reasonSlot) {
      if (checkCurrentGroup()) {
        setGlow(true);
        setGenieMood("1_joy");
        setGenieText(listeningQuestions.stage9.successMessages[completedGroups]);
        setTimeout(() => {
          setGlow(false);
          setPersonSlot(null);
          setTraitSlot(null);
          setReasonSlot(null);
          setCompletedGroups(prev => prev + 1);
        }, 1000);
      } else {
        setShake(true);
        setGenieMood("2_encouragement");
        setGenieText(listeningQuestions.stage9.errorMessage);
        setAvailableCards(prev => [...prev, personSlot, traitSlot, reasonSlot]);
        setTimeout(() => {
          setPersonSlot(null);
          setTraitSlot(null);
          setReasonSlot(null);
          setShake(false);
        }, 800);
      }
    }
  }, [personSlot, traitSlot, reasonSlot]);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotType) => {
    e.preventDefault();
    const cardData = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (slotType === 'person' && !personSlot && cardData.type === 'person') {
      setPersonSlot(cardData);
      setAvailableCards(prev => prev.filter(c => c.id !== cardData.id));
    } else if (slotType === 'trait' && !traitSlot && cardData.type === 'trait') {
      setTraitSlot(cardData);
      setAvailableCards(prev => prev.filter(c => c.id !== cardData.id));
    } else if (slotType === 'reason' && !reasonSlot && cardData.type === 'reason') {
      setReasonSlot(cardData);
      setAvailableCards(prev => prev.filter(c => c.id !== cardData.id));
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  const isLongText = (text) => text.length > 30;

  const SlotBox = ({ title, slotType, content }) => (
    <div
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, slotType)}
      className={`flex-1 p-4 rounded-xl border-2 min-h-[120px] flex flex-col items-center justify-center transition-all duration-300 ${
        glow && content ? 'shadow-[0_0_30px_rgba(34,197,94,0.8)] border-green-400' : ''
      } ${shake ? 'animate-shake' : 'border-gray-300 bg-gray-50'}`}
    >
      <span className="text-sm font-bold text-gray-500 mb-2">{title}</span>
      {content ? (
        <div className="bg-white p-2 rounded-lg shadow text-center w-full">{content.text}</div>
      ) : (
        <span className="text-gray-400">اسحب البطاقة هنا</span>
      )}
    </div>
  );

  return (
    <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8 w-full">
      <Genie character={character} mood={genieMood} text={genieText} visible={true} position="bottom-center" />

      <div className="flex flex-row-reverse gap-4 w-full max-w-3xl mb-6 mt-8">
        <SlotBox title="السبب" slotType="reason" content={reasonSlot} />
        <SlotBox title="الصفة" slotType="trait" content={traitSlot} />
        <SlotBox title="الشخصية" slotType="person" content={personSlot} />
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          {availableCards.map((card, idx) => {
            const long = isLongText(card.text);
            return (
              <motion.div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
                whileDrag={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                className={`bg-orange-100 p-3 rounded-xl shadow cursor-grab active:cursor-grabbing hover:bg-orange-200 transition text-center ${
                  long ? 'col-span-3' : 'col-span-1'
                }`}
              >
                {card.text}
              </motion.div>
            );
          })}
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
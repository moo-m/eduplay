// ==================== /src/pages/stations/grammar/Grammar.jsx ====================
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StationLayout from "../../../components/StationLayout";
import { completeStation } from "../../../utils/storage";
import { BADGES } from "../../../config/badgesConfig";
import Stage1 from "./stages/Stage1";
import Stage2 from "./stages/Stage2";
import CompleteVerseStage from "./stages/CompleteVerseStage";

const TOTAL_STAGES = 2;
const STATION_ID = "grammar";

export default function Grammar({ selectedCharacter }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [collectedWords, setCollectedWords] = useState([]);
  const [showWordBox, setShowWordBox] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const badgeUnlockedRef = useRef(false);

  const isCompleted = stageIndex >= TOTAL_STAGES;

  useEffect(() => {
    if (isCompleted && !badgeUnlockedRef.current) {
      setShowCompletionAnimation(true);
      badgeUnlockedRef.current = true;
      const timer = setTimeout(() => setShowCompletionAnimation(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  const nextStage = (word = null) => {
    if (word) setCollectedWords(prev => [...prev, word]);
    setStageIndex(prev => prev + 1);
  };

  const handleComplete = () => completeStation(STATION_ID);

  const renderStage = () => {
    switch (stageIndex) {
      case 0: return <Stage1 character={selectedCharacter} onNext={nextStage} />;
      case 1: return <Stage2 character={selectedCharacter} onNext={nextStage} />;
      default:
        return (
          <CompleteVerseStage
            character={selectedCharacter}
            words={collectedWords}
            onFinish={handleComplete}
            stationId={STATION_ID}
          />
        );
    }
  };

  const badge = BADGES[STATION_ID];

  return (
    <>
      <StationLayout
        stationName="محطة أبني لغتي"
        stationId={STATION_ID}
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        collectedWords={collectedWords}
        onWordBoxClick={() => setShowWordBox(true)}
        showWordBox={showWordBox}
        setShowWordBox={setShowWordBox}
      >
        {renderStage()}
      </StationLayout>

      <AnimatePresence mode="wait">
        {showCompletionAnimation && (
          <motion.div
            key="badge-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setShowCompletionAnimation(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", damping: 12 }}
              className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 text-center shadow-2xl border-4 border-amber-400 max-w-sm mx-4"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`w-24 h-24 mx-auto rounded-full ${badge.color} flex items-center justify-center text-5xl shadow-lg ${badge.glow} mb-4`}
              >
                {badge.icon}
              </motion.div>
              <h2 className="text-3xl font-bold text-amber-800 mb-2">تهانينا! 🎉</h2>
              <p className="text-xl text-gray-700 mb-2">لقد فتحت شارة</p>
              <p className="text-2xl font-bold text-purple-700">{badge.name}</p>
              <p className="text-amber-600 mt-4">كلماتك المجمعة: {collectedWords.join(' - ')}</p>
              <button
                onClick={() => setShowCompletionAnimation(false)}
                className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition"
              >
                رائع!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
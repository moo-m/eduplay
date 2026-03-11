// // src/pages/stations/listening/Listening.jsx
// import { useState, useEffect, useRef } from "react";
// import StationLayout from "../../../components/StationLayout";
// import { completeStation } from "../../../utils/storage";
// import { BADGES } from "../../../config/badgesConfig";
// import Stage1 from "./stages/Stage1";
// import Stage2 from "./stages/Stage2";
// import CompleteVerseStage from "./stages/CompleteVerseStage";
// import WelcomePopup from "../../../components/WelcomePopup";

// const TOTAL_STAGES = 2;
// const STATION_ID = "listening";

// export default function Listening({ selectedCharacter }) {
//     const [stageIndex, setStageIndex] = useState(0);
//     const [collectedWords, setCollectedWords] = useState([]);
//     const [completedStages, setCompletedStages] = useState([]);
//     const [showWordBox, setShowWordBox] = useState(false);
//     const [showCompletionAnimation, setShowCompletionAnimation] =
//         useState(false);
//     const [showWelcome, setShowWelcome] = useState(false);
//     const [welcomeStep, setWelcomeStep] = useState(0);

//     const badgeUnlockedRef = useRef(false);
//     const isCompleted = stageIndex >= TOTAL_STAGES;

//     const listeningWelcomeMessages = selectedCharacter
//         ? [
//               `أهلاً بك في محطة الاستماع! أنا ${selectedCharacter.name}، وسأساعدك في هذه المحطة.`,
//               "ستجيب عن أسئلة متعددة الخيارات، وستجمع كلمات لتكوين جملة تفتح لك شارة الإنجاز.",
//               "هل أنت مستعد؟ دعنا نبدأ!"
//           ]
//         : [];

//     useEffect(() => {
//         if (selectedCharacter) {
//             const hasSeen = localStorage.getItem("hasSeenListeningWelcome");
//             if (!hasSeen) {
//                 setShowWelcome(true);
//                 localStorage.setItem("hasSeenListeningWelcome", "true");
//             }
//         }
//     }, [selectedCharacter]);

//     useEffect(() => {
//         if (isCompleted && !badgeUnlockedRef.current) {
//             setShowCompletionAnimation(true);
//             badgeUnlockedRef.current = true;
//             const timer = setTimeout(
//                 () => setShowCompletionAnimation(false),
//                 4000
//             );
//             return () => clearTimeout(timer);
//         }
//     }, [isCompleted]);

//     const nextStage = (word = null) => {
//         if (word) setCollectedWords(prev => [...prev, word]);
//         setCompletedStages(prev => {
//             if (!prev.includes(stageIndex)) {
//                 return [...prev, stageIndex];
//             }
//             return prev;
//         });
//         setStageIndex(prev => prev + 1);
//     };

//     const handleComplete = () => {
//         completeStation(STATION_ID);
//     };

//     const resetStage1 = () => {
//         localStorage.removeItem("listening_stage1_data");
//         setStageIndex(0);
//         setCompletedStages([]);
//         setCollectedWords([]);
//     };

//     const handleCloseWelcome = () => {
//         setShowWelcome(false);
//         setWelcomeStep(0);
//     };

//     const getListeningGenieImage = step => {
//         if (!selectedCharacter) return "";
//         let mood = "main";
//         if (step === 1) mood = "1_joy";
//         else if (step === 2) mood = "7_celebration";
//         return mood === "main"
//             ? `/images/genie/${selectedCharacter.key}/main.png`
//             : `/images/genie/${selectedCharacter.key}/portrait_${mood}.png`;
//     };

//     const goToStage = index => {
//         if (completedStages.includes(index) && index < stageIndex) {
//             setStageIndex(index);
//         }
//     };

//     const renderStage = () => {
//         switch (stageIndex) {
//             case 0:
//                 return (
//                     <Stage1 character={selectedCharacter} onNext={nextStage} />
//                 );
//             case 1:
//                 return (
//                     <Stage2 character={selectedCharacter} onNext={nextStage} />
//                 );
//             default:
//                 return (
//                     <CompleteVerseStage
//                         character={selectedCharacter}
//                         words={collectedWords}
//                         onFinish={handleComplete}
//                         onReset={resetStage1}
//                     />
//                 );
//         }
//     };

//     const badge = BADGES[STATION_ID];

//     return (
//         <>
//             <WelcomePopup
//                 isOpen={showWelcome}
//                 onClose={handleCloseWelcome}
//                 character={selectedCharacter}
//                 messages={listeningWelcomeMessages}
//                 getGenieImage={getListeningGenieImage}
//             />

//             <StationLayout
//                 stationName="محطة الاستماع"
//                 stationId={STATION_ID}
//                 stageIndex={stageIndex}
//                 totalStages={TOTAL_STAGES}
//                 collectedWords={collectedWords}
//                 onWordBoxClick={() => setShowWordBox(true)}
//                 showWordBox={showWordBox}
//                 setShowWordBox={setShowWordBox}
//                 completedStages={completedStages}
//                 onStageSelect={goToStage}
//             >
//                 {renderStage()}
//             </StationLayout>

//             {/* أنيميشن اكتمال المحطة مع فتح الشارة - باستخدام CSS transitions */}
//             <div
//                 className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-all duration-300 ${
//                     showCompletionAnimation
//                         ? "opacity-100 visible"
//                         : "opacity-0 invisible"
//                 }`}
//                 onClick={() => setShowCompletionAnimation(false)}
//             >
//                 <div
//                     className={`bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 text-center shadow-2xl border-4 border-amber-400 max-w-sm mx-4 transform transition-all duration-500 ${
//                         showCompletionAnimation
//                             ? "scale-100 rotate-0"
//                             : "scale-50 -rotate-10"
//                     }`}
//                 >
//                     <div
//                         className={`w-24 h-24 mx-auto rounded-full ${badge.color} flex items-center justify-center text-5xl shadow-lg ${badge.glow} mb-4 animate-pulse`}
//                     >
//                         {badge.icon}
//                     </div>
//                     <h2 className="text-3xl font-bold text-amber-800 mb-2">
//                         تهانينا! 🎉
//                     </h2>
//                     <p className="text-xl text-gray-700 mb-2">لقد فتحت شارة</p>
//                     <p className="text-2xl font-bold text-purple-700">
//                         {badge.name}
//                     </p>
//                     <p className="text-amber-600 mt-4">
//                         كلماتك المجمعة: {collectedWords.join(" - ")}
//                     </p>
//                     <button
//                         onClick={() => setShowCompletionAnimation(false)}
//                         className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition"
//                     >
//                         رائع!
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

import { useState, useEffect, useRef } from "react";
import StationLayout from "../../../layouts/StationLayout";
import { completeStation } from "../../../utils/storage";
import { BADGES } from "../../../config/badgesConfig";
import Stage1 from "./stages/Stage1";
import Stage2 from "./stages/Stage2";
import CompleteVerseStage from "./stages/CompleteVerseStage";
import WelcomePopup from "../../../components/WelcomePopup";

const TOTAL_STAGES = 2;
const STATION_ID = "listening";

export default function Listening({ selectedCharacter }) {
  console.log("✅ Listening is rendering");

  const [stageIndex, setStageIndex] = useState(0);
  const [collectedWords, setCollectedWords] = useState([]);
  const [completedStages, setCompletedStages] = useState([]);
  const [showWordBox, setShowWordBox] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeStep, setWelcomeStep] = useState(0);

  const badgeUnlockedRef = useRef(false);
  const isCompleted = stageIndex >= TOTAL_STAGES;

  const listeningWelcomeMessages = selectedCharacter
    ? [
        `أهلاً بك في محطة الاستماع! أنا ${selectedCharacter.name}، وسأساعدك في هذه المحطة.`,
        "ستجيب عن أسئلة متعددة الخيارات، وستجمع كلمات لتكوين جملة تفتح لك شارة الإنجاز.",
        "هل أنت مستعد؟ دعنا نبدأ!",
      ]
    : [];

  useEffect(() => {
    if (selectedCharacter) {
      const hasSeen = localStorage.getItem("hasSeenListeningWelcome");
      if (!hasSeen) {
        setShowWelcome(true);
        localStorage.setItem("hasSeenListeningWelcome", "true");
      }
    }
  }, [selectedCharacter]);

  useEffect(() => {
    if (isCompleted && !badgeUnlockedRef.current) {
      setShowCompletionAnimation(true);
      badgeUnlockedRef.current = true;
      const timer = setTimeout(() => setShowCompletionAnimation(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  const nextStage = (word = null) => {
    if (word) setCollectedWords((prev) => [...prev, word]);
    setCompletedStages((prev) => {
      if (!prev.includes(stageIndex)) {
        return [...prev, stageIndex];
      }
      return prev;
    });
    setStageIndex((prev) => prev + 1);
  };

  const handleComplete = () => {
    completeStation(STATION_ID);
  };

  const resetStage1 = () => {
    localStorage.removeItem("listening_stage1_data");
    setStageIndex(0);
    setCompletedStages([]);
    setCollectedWords([]);
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    setWelcomeStep(0);
  };

  const getListeningGenieImage = (step) => {
    if (!selectedCharacter) return "";
    let mood = "main";
    if (step === 1) mood = "1_joy";
    else if (step === 2) mood = "7_celebration";
    return mood === "main"
      ? `/images/genie/${selectedCharacter.key}/main.png`
      : `/images/genie/${selectedCharacter.key}/portrait_${mood}.png`;
  };

  const goToStage = (index) => {
    if (completedStages.includes(index) && index < stageIndex) {
      setStageIndex(index);
    }
  };

  const renderStage = () => {
    switch (stageIndex) {
      case 0:
        return <Stage1 character={selectedCharacter} onNext={nextStage} />;
      case 1:
        return <Stage2 character={selectedCharacter} onNext={nextStage} />;
      default:
        return (
          <CompleteVerseStage
            character={selectedCharacter}
            words={collectedWords}
            onFinish={handleComplete}
            onReset={resetStage1}
          />
        );
    }
  };

  const badge = BADGES[STATION_ID];

  return (
    <>
      <WelcomePopup
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        character={selectedCharacter}
        messages={listeningWelcomeMessages}
        getGenieImage={getListeningGenieImage}
      />

      <StationLayout
        stationName="محطة الاستماع"
        stationId={STATION_ID}
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        collectedWords={collectedWords}
        onWordBoxClick={() => setShowWordBox(true)}
        showWordBox={showWordBox}
        setShowWordBox={setShowWordBox}
        completedStages={completedStages}
        onStageSelect={goToStage}
      >
        {renderStage()}
      </StationLayout>

      {/* أنيميشن اكتمال المحطة مع فتح الشارة - باستخدام CSS transitions */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-all duration-300 ${
          showCompletionAnimation ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShowCompletionAnimation(false)}
      >
        <div
          className={`bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 text-center shadow-2xl border-4 border-amber-400 max-w-sm mx-4 transform transition-all duration-500 ${
            showCompletionAnimation ? "scale-100 rotate-0" : "scale-50 -rotate-10"
          }`}
        >
          <div
            className={`w-24 h-24 mx-auto rounded-full ${badge.color} flex items-center justify-center text-5xl shadow-lg ${badge.glow} mb-4 animate-pulse`}
          >
            {badge.icon}
          </div>
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
        </div>
      </div>
    </>
  );
}
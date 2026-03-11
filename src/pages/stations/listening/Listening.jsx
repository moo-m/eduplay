// // src/pages/stations/listening/Listening.jsx
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import StationLayout from "../../../layouts/StationLayout";
// import { completeStation } from "../../../utils/storage";
// import { BADGES } from "../../../config/badgesConfig";
// import WelcomePopup from "../../../components/WelcomePopup";
// import WordBoxExplanationPopup from "../../../components/WordBoxExplanationPopup";
// import QuestionRenderer from "../../../components/questions/QuestionRenderer";
// import Stage3Content from "./components/Stage3Content";
// import Stage4Content from "./components/Stage4Content";
// import Stage5Content from "./components/Stage5Content";
// import Stage6Content from "./components/Stage6Content";
// import Stage7Content from "./components/Stage7Content";
// import Stage8Content from "./components/Stage8Content";
// import Stage9Content from "./components/Stage9Content";
// import listeningQuestions from "../../../data/listeningQuestions";
// import Genie from "../../../components/genie";
// const TOTAL_STAGES = 9;
// const STATION_ID = "listening";

// export default function Listening({ selectedCharacter }) {
//     const [stageIndex, setStageIndex] = useState(0);
//     const [questionIndex, setQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState({});
//     const [submitted, setSubmitted] = useState({});
//     const [stage2Completed, setStage2Completed] = useState(false); // حالة اكتمال الاستماع في المرحلة الثانية
//     const [collectedWords, setCollectedWords] = useState([]);
//     const [completedStages, setCompletedStages] = useState([]);
//     const [showWordBox, setShowWordBox] = useState(false);
//     const [showWordBoxExplanation, setShowWordBoxExplanation] = useState(false);
//     const [showCompletionAnimation, setShowCompletionAnimation] =
//         useState(false);
//     const [showWelcome, setShowWelcome] = useState(false);
//     const [welcomeStep, setWelcomeStep] = useState(0);
//     const [genieMood, setGenieMood] = useState("main");
//     const [genieText, setGenieText] = useState("");
//     const [showWordNotification, setShowWordNotification] = useState(false);
//     const [wordNotificationText, setWordNotificationText] = useState("");

//     const badgeUnlockedRef = useRef(false);
//     const isCompleted = stageIndex >= TOTAL_STAGES;

//     const currentStageData = listeningQuestions[`stage${stageIndex + 1}`] || {
//         questions: [],
//         rewardWord: ""
//     };
//     const currentStageQuestions = currentStageData.questions || [];
//     const currentQuestion = currentStageQuestions[questionIndex];
//     const isLastQuestionInStage =
//         questionIndex === currentStageQuestions.length - 1;
//     const isFirstQuestionInStage = questionIndex === 0;

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

//     useEffect(() => {
//         if (stageIndex === 0) {
//             if (questionIndex === 0) {
//                 setGenieMood("main");
//                 setGenieText("تأمل الصورة جيداً ثم اختر الإجابة المناسبة.");
//             } else if (questionIndex === 1) {
//                 setGenieMood("3_thinking");
//                 setGenieText("والآن، ماذا تتوقع أن يكون موضوع النص المسموع؟");
//             } else if (questionIndex === 2) {
//                 setGenieMood("3_thinking");
//                 setGenieText("أكمل الآية لتحصل على الكلمة الأولى.");
//             }
//         } else if (stageIndex === 1) {
//             if (!stage2Completed) {
//                 setGenieMood("1_joy");
//                 setGenieText(
//                     "أحسنت! لقد أكملت المرحلة الأولى. استمع الآن للنص."
//                 );
//             } else {
//                 setGenieMood("7_celebration");
//                 setGenieText("أحسنت! لقد استمعت للنص كاملاً.");
//             }
//         }
//     }, [stageIndex, questionIndex, stage2Completed]);

//     // حفظ بيانات المرحلة الأولى
//     useEffect(() => {
//         if (stageIndex === 0) {
//             localStorage.setItem(
//                 "listening_stage1_data",
//                 JSON.stringify({
//                     answers,
//                     submitted,
//                     questionIndex
//                 })
//             );
//         }
//     }, [answers, submitted, questionIndex, stageIndex]);

//     // تحميل بيانات المرحلة الأولى
//     useEffect(() => {
//         if (stageIndex === 0) {
//             const saved = localStorage.getItem("listening_stage1_data");
//             if (saved) {
//                 try {
//                     const data = JSON.parse(saved);
//                     setAnswers(data.answers || {});
//                     setSubmitted(data.submitted || {});
//                     if (
//                         data.questionIndex !== undefined &&
//                         data.questionIndex < currentStageQuestions.length
//                     ) {
//                         setQuestionIndex(data.questionIndex);
//                     }
//                 } catch (e) {
//                     console.error("فشل تحميل البيانات", e);
//                 }
//             }
//         }
//     }, [stageIndex, currentStageQuestions.length]);

//     const handleAnswer = (questionId, isCorrect, optionId) => {
//         if (submitted[questionId]) return;

//         if (isCorrect) {
//             setAnswers(prev => ({
//                 ...prev,
//                 [questionId]: { isCorrect, optionId }
//             }));
//             setSubmitted(prev => ({ ...prev, [questionId]: true }));
//             setGenieMood("1_joy");
//             setGenieText("أحسنت! إجابة صحيحة.");
//         } else {
//             setGenieMood("2_encouragement");
//             setGenieText("حاول مرة أخرى، فكر جيداً.");
//         }
//     };

//     const handleNext = () => {
//         if (stageIndex === 1) {
//             // في المرحلة الثانية، نضيف كلمة المكافأة وننتقل للمرحلة الثالثة
//             const rewardWord = currentStageData.rewardWord;
//             if (rewardWord) {
//                 setCollectedWords(prev => [...prev, rewardWord]);
//                 setWordNotificationText(`✨ حصلت على كلمة: ${rewardWord}`);
//                 setShowWordNotification(true);
//                 setTimeout(() => setShowWordNotification(false), 2000);
//             }
//             setCompletedStages(prev => [...prev, stageIndex]);
//             setStageIndex(prev => prev + 1);
//             setQuestionIndex(0);
//             setStage2Completed(false); // إعادة تعيين حالة الاستماع للمستقبل
//         } else if (isLastQuestionInStage) {
//             // في المرحلة الأولى، نضيف كلمة المكافأة وننتقل للمرحلة الثانية
//             const rewardWord = currentStageData.rewardWord;
//             if (rewardWord) {
//                 setCollectedWords(prev => [...prev, rewardWord]);
//                 setWordNotificationText(`✨ حصلت على كلمة: ${rewardWord}`);
//                 setShowWordNotification(true);
//                 setTimeout(() => setShowWordNotification(false), 2000);
//             }
//             setCompletedStages(prev => [...prev, stageIndex]);
//             setStageIndex(prev => prev + 1);
//             setQuestionIndex(0);
//         } else {
//             // داخل نفس المرحلة
//             setQuestionIndex(prev => prev + 1);
//         }
//     };

//     const handlePrev = () => {
//         if (!isFirstQuestionInStage) {
//             setQuestionIndex(prev => prev - 1);
//         }
//     };

//     const handleAudioEnded = () => {
//         setStage2Completed(true);
//         setGenieMood("7_celebration");
//         setGenieText("أحسنت! لقد استمعت للنص كاملاً.");
//     };

//     const goToStage = index => {
//         if (completedStages.includes(index) && index < stageIndex) {
//             setStageIndex(index);
//             setQuestionIndex(0);
//         }
//     };

//     const resetStage1 = () => {
//         localStorage.removeItem("listening_stage1_data");
//         localStorage.removeItem("listening_stage3_data");
//         setStageIndex(0);
//         setQuestionIndex(0);
//         setAnswers({});
//         setSubmitted({});
//         setStage2Completed(false);
//         setCollectedWords([]);
//         setCompletedStages([]);
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

//     const handleWordBoxClick = () => {
//         const hasSeen = localStorage.getItem("hasSeenWordBoxExplanation");
//         if (!hasSeen) {
//             setShowWordBoxExplanation(true);
//             localStorage.setItem("hasSeenWordBoxExplanation", "true");
//         } else {
//             setShowWordBox(true);
//         }
//     };

//     const handleCloseExplanation = () => {
//         setShowWordBoxExplanation(false);
//         setShowWordBox(true);
//     };

//     const badge = BADGES[STATION_ID];

//     if (stageIndex >= TOTAL_STAGES) {
//         return (
//             <div className="text-center mt-20 px-4">
//                 <Genie
//                     character={selectedCharacter}
//                     mood={
//                         collectedWords.length === 3
//                             ? "7_celebration"
//                             : "3_thinking"
//                     }
//                     text={
//                         collectedWords.length === 3
//                             ? "أحسنت! لقد أكملت محطة الاستماع 🎉"
//                             : "لقد جمعت الكلمات! لنرَ النتيجة..."
//                     }
//                 />
//                 <div className="flex gap-3 justify-center flex-wrap mt-10">
//                     {collectedWords.map((word, i) => (
//                         <span
//                             key={i}
//                             className="bg-yellow-200 border-2 border-yellow-400 px-4 py-2 rounded-xl font-bold text-lg"
//                         >
//                             {word}
//                         </span>
//                     ))}
//                 </div>
//                 {collectedWords.length === 3 && (
//                     <>
//                         <div className="mt-8 bg-yellow-100 border-4 border-yellow-400 p-6 rounded-3xl shadow-lg text-center">
//                             <div className="text-4xl mb-2">🎖</div>
//                             <h2 className="text-2xl font-bold text-yellow-700">
//                                 شارة المستمع الجيد
//                             </h2>
//                         </div>
//                         <button
//                             onClick={resetStage1}
//                             className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition"
//                         >
//                             إعادة المرحلة
//                         </button>
//                     </>
//                 )}
//                 {collectedWords.length !== 3 && (
//                     <p className="mt-6 text-red-400 font-semibold">
//                         لم تكتمل الجملة بعد. عدد الكلمات المجموعة:{" "}
//                         {collectedWords.length}
//                     </p>
//                 )}
//             </div>
//         );
//     }

//     return (
//         <>
//             <WelcomePopup
//                 isOpen={showWelcome}
//                 onClose={handleCloseWelcome}
//                 character={selectedCharacter}
//                 messages={listeningWelcomeMessages}
//                 getGenieImage={getListeningGenieImage}
//             />

//             <WordBoxExplanationPopup
//                 isOpen={showWordBoxExplanation}
//                 onClose={handleCloseExplanation}
//                 character={selectedCharacter}
//             />

//             <StationLayout
//                 stationName="محطة الاستماع"
//                 stationId={STATION_ID}
//                 stageIndex={stageIndex}
//                 totalStages={TOTAL_STAGES}
//                 collectedWords={collectedWords}
//                 onWordBoxClick={handleWordBoxClick}
//                 showWordBox={showWordBox}
//                 setShowWordBox={setShowWordBox}
//                 completedStages={completedStages}
//                 onStageSelect={goToStage}
//             >
//                 <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8">
//                     {stageIndex < 2 && (
//                         <Genie
//                             character={selectedCharacter}
//                             mood={genieMood}
//                             text={genieText}
//                             visible={true}
//                             position="bottom-center"
//                         />
//                     )}

//                     {stageIndex === 0 && currentQuestion && (
//                         <>
//                             <QuestionRenderer
//                                 question={currentQuestion}
//                                 onAnswer={(isCorrect, optionId) =>
//                                     handleAnswer(
//                                         currentQuestion.id,
//                                         isCorrect,
//                                         optionId
//                                     )
//                                 }
//                                 disabled={submitted[currentQuestion.id]}
//                                 selectedOption={
//                                     answers[currentQuestion.id]?.optionId
//                                 }
//                                 showCorrect={false}
//                             />
//                             <div className="flex gap-4 mt-8">
//                                 {!isFirstQuestionInStage && (
//                                     <button
//                                         onClick={handlePrev}
//                                         className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
//                                     >
//                                         السابق
//                                     </button>
//                                 )}
//                                 {submitted[currentQuestion?.id] && (
//                                     <button
//                                         onClick={handleNext}
//                                         className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition"
//                                     >
//                                         {isLastQuestionInStage
//                                             ? "المرحلة التالية"
//                                             : "التالي"}
//                                     </button>
//                                 )}
//                             </div>
//                         </>
//                     )}
//                     {stageIndex === 1 && (
//                         <>
//                             <QuestionRenderer
//                                 question={currentStageQuestions[0]}
//                                 onAudioPlay={() => {
//                                     // اختياري
//                                 }}
//                                 onAudioEnded={handleAudioEnded}
//                                 onAudioTimeUpdate={time => {
//                                     // يمكن استخدامه لتحديث شيء ما إذا أردت
//                                 }}
//                             />
//                             <button
//                                 onClick={handleNext}
//                                 disabled={!stage2Completed}
//                                 className={`mt-8 px-10 py-4 rounded-full font-bold text-lg shadow-lg transition ${
//                                     stage2Completed
//                                         ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
//                                         : "bg-gray-300 cursor-not-allowed text-gray-500"
//                                 }`}
//                             >
//                                 المرحلة التالية
//                             </button>
//                         </>
//                     )}

//                     {stageIndex === 2 && (
//                         <Stage3Content
//                             character={selectedCharacter}
//                             onNext={word => {
//                                 setCollectedWords(prev => [...prev, word]);
//                                 setCompletedStages(prev => [
//                                     ...prev,
//                                     stageIndex
//                                 ]);
//                                 setStageIndex(prev => prev + 1);
//                             }}
//                         />
//                     )}
//                     {stageIndex === 3 && (
//                         <Stage4Content
//                             character={selectedCharacter}
//                             onNext={word => {
//                                 setCollectedWords(prev => [...prev, word]);
//                                 setCompletedStages(prev => [
//                                     ...prev,
//                                     stageIndex
//                                 ]);
//                                 setStageIndex(prev => prev + 1);
//                             }}
//                         />
//                     )}
//                     {stageIndex === 4 && (
//                         <Stage5Content
//                             character={selectedCharacter}
//                             onNext={word => {
//                                 setCollectedWords(prev => [...prev, word]);
//                                 setCompletedStages(prev => [
//                                     ...prev,
//                                     stageIndex
//                                 ]);
//                                 setStageIndex(prev => prev + 1);
//                             }}
//                         />
//                     )}
//                     {stageIndex === 5 && (
//                         <Stage6Content
//                             character={selectedCharacter}
//                             onNext={word => {
//                                 setCollectedWords(prev => [...prev, word]);
//                                 setCompletedStages(prev => [
//                                     ...prev,
//                                     stageIndex
//                                 ]);
//                                 setStageIndex(prev => prev + 1);
//                             }}
//                         />
//                     )}

//                     {stageIndex === 6 && (
//                         <Stage7Content
//                             character={selectedCharacter}
//                             onNext={word => {
//                                 setCollectedWords(prev => [...prev, word]);
//                                 setCompletedStages(prev => [
//                                     ...prev,
//                                     stageIndex
//                                 ]);
//                                 setStageIndex(prev => prev + 1);
//                             }}
//                         />
//                     )}
//                     {stageIndex === 7 && (
//                         <Stage8Content
//                             character={selectedCharacter}
//                             onNext={word => {
//                                 setCollectedWords(prev => [...prev, word]);
//                                 setCompletedStages(prev => [
//                                     ...prev,
//                                     stageIndex
//                                 ]);
//                                 setStageIndex(prev => prev + 1);
//                             }}
//                         />
//                     )}
//                     {stageIndex === 8 && (
//   <Stage9Content
//     character={selectedCharacter}
//     onNext={(word) => {
//       setCollectedWords((prev) => [...prev, word]);
//       setCompletedStages((prev) => [...prev, stageIndex]);
//       setStageIndex((prev) => prev + 1);
//     }}
//   />
// )}
//                 </div>
//             </StationLayout>

//             <AnimatePresence>
//                 {showWordNotification && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -50 }}
//                         className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50"
//                     >
//                         {wordNotificationText}
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <div
//                 className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-all duration-300 ${
//                     showCompletionAnimation
//                         ? "opacity-100 visible"
//                         : "opacity-0 invisible"
//                 }`}
//                 onClick={() => setShowCompletionAnimation(false)}
//             >
//                 <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 text-center shadow-2xl border-4 border-amber-400 max-w-sm mx-4 transform transition-all duration-500 scale-100 rotate-0">
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

//v2
// src/pages/stations/listening/Listening.jsx
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import StationLayout from "../../../layouts/StationLayout";
// import { completeStation } from "../../../utils/storage";
// import { BADGES } from "../../../config/badgesConfig";
// import WelcomePopup from "../../../components/WelcomePopup";
// import WordBoxExplanationPopup from "../../../components/WordBoxExplanationPopup";
// import QuestionRenderer from "../../../components/questions/QuestionRenderer";
// import Stage3Content from "./components/Stage3Content";
// import Stage4Content from "./components/Stage4Content";
// import Stage5Content from "./components/Stage5Content";
// import Stage6Content from "./components/Stage6Content";
// import Stage7Content from "./components/Stage7Content";
// import Stage8Content from "./components/Stage8Content";
// import Stage9Content from "./components/Stage9Content";
// import CompleteVerseStage from "./stages/CompleteVerseStage";
// import listeningQuestions from "../../../data/listeningQuestions";
// import Genie from "../../../components/genie";

// const TOTAL_STAGES = 9;
// const STATION_ID = "listening";

// // مفاتيح التخزين لكل مرحلة
// const STORAGE_KEYS = {
//   stage0: "listening_stage0_data", // المرحلة الأولى (الأسئلة)
//   stage2: "listening_stage2_data", // المرحلة الثالثة (الصور)
//   stage3: "listening_stage3_data", // المرحلة الرابعة (drag & drop)
//   stage4: "listening_stage4_data", // المرحلة الخامسة (ترتيب الأحداث)
//   stage5: "listening_stage5_data", // المرحلة السادسة (سحب الجني)
//   stage6: "listening_stage6_data", // المرحلة السابعة (القصة)
//   stage7: "listening_stage7_data", // المرحلة الثامنة (مطابقة)
//   stage8: "listening_stage8_data", // المرحلة التاسعة (شخصية-صفة-سبب)
// };

// export default function Listening({ selectedCharacter }) {
//   const [stageIndex, setStageIndex] = useState(0);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState({});
//   const [stage2Completed, setStage2Completed] = useState(false);
//   const [collectedWords, setCollectedWords] = useState([]);
//   const [completedStages, setCompletedStages] = useState([]);
//   const [showWordBox, setShowWordBox] = useState(false);
//   const [showWordBoxExplanation, setShowWordBoxExplanation] = useState(false);
//   const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [welcomeStep, setWelcomeStep] = useState(0);
//   const [genieMood, setGenieMood] = useState("main");
//   const [genieText, setGenieText] = useState("");

//   // حالات خاصة بكل مرحلة
//   const [stage3State, setStage3State] = useState(null); // الصور
//   const [stage4State, setStage4State] = useState(null); // drag & drop
//   const [stage5State, setStage5State] = useState(null); // ترتيب الأحداث
//   const [stage6State, setStage6State] = useState(null); // سحب الجني
//   const [stage7State, setStage7State] = useState(null); // القصة
//   const [stage8State, setStage8State] = useState(null); // مطابقة
//   const [stage9State, setStage9State] = useState(null); // شخصية-صفة-سبب

//   const badgeUnlockedRef = useRef(false);
//   const isCompleted = stageIndex >= TOTAL_STAGES;

//   const currentStageData = listeningQuestions[`stage${stageIndex + 1}`] || { questions: [], rewardWord: "" };
//   const currentStageQuestions = currentStageData.questions || [];
//   const currentQuestion = currentStageQuestions[questionIndex];
//   const isLastQuestionInStage = questionIndex === currentStageQuestions.length - 1;
//   const isFirstQuestionInStage = questionIndex === 0;

//   // رسائل الترحيب
//   const listeningWelcomeMessages = selectedCharacter
//     ? [
//         `أهلاً بك في محطة الاستماع! أنا ${selectedCharacter.name}، وسأساعدك في هذه المحطة.`,
//         "ستجيب عن أسئلة متعددة الخيارات، وستجمع كلمات لتكوين جملة تفتح لك شارة الإنجاز.",
//         "هل أنت مستعد؟ دعنا نبدأ!",
//       ]
//     : [];

//   // تحميل البيانات من localStorage عند بدء التشغيل
//   useEffect(() => {
//     // تحميل بيانات المرحلة الأولى (الأسئلة)
//     const savedStage0 = localStorage.getItem(STORAGE_KEYS.stage0);
//     if (savedStage0) {
//       try {
//         const data = JSON.parse(savedStage0);
//         setAnswers(data.answers || {});
//         setSubmitted(data.submitted || {});
//         setQuestionIndex(data.questionIndex || 0);
//       } catch (e) {}
//     }

//     // تحميل بيانات المرحلة الثانية (audio) - ربما لا تحتاج لأنها بسيطة
//     const savedStage2 = localStorage.getItem(STORAGE_KEYS.stage2);
//     if (savedStage2) {
//       try {
//         const data = JSON.parse(savedStage2);
//         setStage2Completed(data.completed || false);
//       } catch (e) {}
//     }

//     // تحميل بيانات المرحلة الثالثة (الصور)
//     const savedStage3 = localStorage.getItem(STORAGE_KEYS.stage3);
//     if (savedStage3) {
//       try {
//         const data = JSON.parse(savedStage3);
//         setStage3State(data);
//       } catch (e) {}
//     }

//     // تحميل بيانات المرحلة الرابعة
//     const savedStage4 = localStorage.getItem(STORAGE_KEYS.stage4);
//     if (savedStage4) {
//       try {
//         const data = JSON.parse(savedStage4);
//         setStage4State(data);
//       } catch (e) {}
//     }

//     // تحميل بيانات المرحلة الخامسة
//     const savedStage5 = localStorage.getItem(STORAGE_KEYS.stage5);
//     if (savedStage5) {
//       try {
//         const data = JSON.parse(savedStage5);
//         setStage5State(data);
//       } catch (e) {}
//     }

//     // تحميل بيانات المرحلة السادسة
//     const savedStage6 = localStorage.getItem(STORAGE_KEYS.stage6);
//     if (savedStage6) {
//       try {
//         const data = JSON.parse(savedStage6);
//         setStage6State(data);
//       } catch (e) {}
//     }

//     // تحميل بيانات المرحلة السابعة
//     const savedStage7 = localStorage.getItem(STORAGE_KEYS.stage7);
//     if (savedStage7) {
//       try {
//         const data = JSON.parse(savedStage7);
//         setStage7State(data);
//       } catch (e) {}
//     }

//     // تحميل بيانات المرحلة الثامنة
//     const savedStage8 = localStorage.getItem(STORAGE_KEYS.stage8);
//     if (savedStage8) {
//       try {
//         const data = JSON.parse(savedStage8);
//         setStage8State(data);
//       } catch (e) {}
//     }

//     // تحميل بيانات المرحلة التاسعة
//     const savedStage9 = localStorage.getItem(STORAGE_KEYS.stage9);
//     if (savedStage9) {
//       try {
//         const data = JSON.parse(savedStage9);
//         setStage9State(data);
//       } catch (e) {}
//     }

//     // تحميل collectedWords و completedStages من التخزين العام
//     const savedProgress = localStorage.getItem("listening_progress");
//     if (savedProgress) {
//       try {
//         const data = JSON.parse(savedProgress);
//         setCollectedWords(data.collectedWords || []);
//         setCompletedStages(data.completedStages || []);
//       } catch (e) {}
//     }
//   }, []);

//   // حفظ بيانات المرحلة الأولى
//   useEffect(() => {
//     if (stageIndex === 0) {
//       localStorage.setItem(
//         STORAGE_KEYS.stage0,
//         JSON.stringify({ answers, submitted, questionIndex })
//       );
//     }
//   }, [answers, submitted, questionIndex, stageIndex]);

//   // حفظ بيانات المرحلة الثانية
//   useEffect(() => {
//     if (stageIndex === 1) {
//       localStorage.setItem(STORAGE_KEYS.stage2, JSON.stringify({ completed: stage2Completed }));
//     }
//   }, [stage2Completed, stageIndex]);

//   // حفظ بيانات المرحلة الثالثة (عند التحديث من Stage3Content)
//   useEffect(() => {
//     if (stageIndex === 2 && stage3State) {
//       localStorage.setItem(STORAGE_KEYS.stage3, JSON.stringify(stage3State));
//     }
//   }, [stage3State, stageIndex]);

//   // حفظ بيانات المرحلة الرابعة
//   useEffect(() => {
//     if (stageIndex === 3 && stage4State) {
//       localStorage.setItem(STORAGE_KEYS.stage4, JSON.stringify(stage4State));
//     }
//   }, [stage4State, stageIndex]);

//   // حفظ بيانات المرحلة الخامسة
//   useEffect(() => {
//     if (stageIndex === 4 && stage5State) {
//       localStorage.setItem(STORAGE_KEYS.stage5, JSON.stringify(stage5State));
//     }
//   }, [stage5State, stageIndex]);

//   // حفظ بيانات المرحلة السادسة
//   useEffect(() => {
//     if (stageIndex === 5 && stage6State) {
//       localStorage.setItem(STORAGE_KEYS.stage6, JSON.stringify(stage6State));
//     }
//   }, [stage6State, stageIndex]);

//   // حفظ بيانات المرحلة السابعة
//   useEffect(() => {
//     if (stageIndex === 6 && stage7State) {
//       localStorage.setItem(STORAGE_KEYS.stage7, JSON.stringify(stage7State));
//     }
//   }, [stage7State, stageIndex]);

//   // حفظ بيانات المرحلة الثامنة
//   useEffect(() => {
//     if (stageIndex === 7 && stage8State) {
//       localStorage.setItem(STORAGE_KEYS.stage8, JSON.stringify(stage8State));
//     }
//   }, [stage8State, stageIndex]);

//   // حفظ بيانات المرحلة التاسعة
//   useEffect(() => {
//     if (stageIndex === 8 && stage9State) {
//       localStorage.setItem(STORAGE_KEYS.stage9, JSON.stringify(stage9State));
//     }
//   }, [stage9State, stageIndex]);

//   // حفظ collectedWords و completedStages
//   useEffect(() => {
//     localStorage.setItem(
//       "listening_progress",
//       JSON.stringify({ collectedWords, completedStages })
//     );
//   }, [collectedWords, completedStages]);

//   // باقي الـ effects كما هي
//   useEffect(() => {
//     if (selectedCharacter) {
//       const hasSeen = localStorage.getItem("hasSeenListeningWelcome");
//       if (!hasSeen) {
//         setShowWelcome(true);
//         localStorage.setItem("hasSeenListeningWelcome", "true");
//       }
//     }
//   }, [selectedCharacter]);

//   useEffect(() => {
//     if (isCompleted && !badgeUnlockedRef.current) {
//       setShowCompletionAnimation(true);
//       badgeUnlockedRef.current = true;
//       const timer = setTimeout(() => setShowCompletionAnimation(false), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [isCompleted]);

//   // تحديث genie messages حسب المرحلة (يمكنك تحسينها)
//   useEffect(() => {
//     if (stageIndex === 0) {
//       if (questionIndex === 0) {
//         setGenieMood("main");
//         setGenieText("تأمل الصورة جيداً ثم اختر الإجابة المناسبة.");
//       } else if (questionIndex === 1) {
//         setGenieMood("3_thinking");
//         setGenieText("والآن، ماذا تتوقع أن يكون موضوع النص المسموع؟");
//       } else if (questionIndex === 2) {
//         setGenieMood("3_thinking");
//         setGenieText("أكمل الآية لتحصل على الكلمة الأولى.");
//       }
//     } else if (stageIndex === 1) {
//       if (!stage2Completed) {
//         setGenieMood("1_joy");
//         setGenieText("أحسنت! لقد أكملت المرحلة الأولى. استمع الآن للنص.");
//       } else {
//         setGenieMood("7_celebration");
//         setGenieText("أحسنت! لقد استمعت للنص كاملاً.");
//       }
//     }
//     // يمكن إضافة حالات للمراحل الأخرى
//   }, [stageIndex, questionIndex, stage2Completed]);

//   const handleAnswer = (questionId, isCorrect, optionId) => {
//     if (submitted[questionId]) return;

//     if (isCorrect) {
//       setAnswers((prev) => ({ ...prev, [questionId]: { isCorrect, optionId } }));
//       setSubmitted((prev) => ({ ...prev, [questionId]: true }));
//       setGenieMood("1_joy");
//       setGenieText("أحسنت! إجابة صحيحة.");
//     } else {
//       setGenieMood("2_encouragement");
//       setGenieText("حاول مرة أخرى، فكر جيداً.");
//     }
//   };

//   const handleNext = () => {
//     if (stageIndex === 1) {
//       // المرحلة الثانية
//       const rewardWord = currentStageData.rewardWord;
//       if (rewardWord) {
//         setCollectedWords((prev) => [...prev, rewardWord]);
//       }
//       setCompletedStages((prev) => [...prev, stageIndex]);
//       setStageIndex((prev) => prev + 1);
//       setQuestionIndex(0);
//       setStage2Completed(false);
//     } else if (stageIndex === 0) {
//       if (isLastQuestionInStage) {
//         const rewardWord = currentStageData.rewardWord;
//         if (rewardWord) {
//           setCollectedWords((prev) => [...prev, rewardWord]);
//         }
//         setCompletedStages((prev) => [...prev, stageIndex]);
//         setStageIndex((prev) => prev + 1);
//         setQuestionIndex(0);
//       } else {
//         setQuestionIndex((prev) => prev + 1);
//       }
//     }
//   };

//   const handlePrev = () => {
//     if (!isFirstQuestionInStage) {
//       setQuestionIndex((prev) => prev - 1);
//     }
//   };

//   const handleAudioEnded = () => {
//     setStage2Completed(true);
//     setGenieMood("7_celebration");
//     setGenieText("أحسنت! لقد استمعت للنص كاملاً.");
//   };

//   const goToStage = (index) => {
//     if (completedStages.includes(index) && index < stageIndex) {
//       setStageIndex(index);
//       setQuestionIndex(0);
//     }
//   };

//   const handleWordBoxClick = () => {
//     const hasSeen = localStorage.getItem("hasSeenWordBoxExplanation");
//     if (!hasSeen) {
//       setShowWordBoxExplanation(true);
//       localStorage.setItem("hasSeenWordBoxExplanation", "true");
//     } else {
//       setShowWordBox(true);
//     }
//   };

//   const handleCloseExplanation = () => {
//     setShowWordBoxExplanation(false);
//     setShowWordBox(true);
//   };

//   const handleCloseWelcome = () => {
//     setShowWelcome(false);
//     setWelcomeStep(0);
//   };

//   const getListeningGenieImage = (step) => {
//     if (!selectedCharacter) return "";
//     let mood = "main";
//     if (step === 1) mood = "1_joy";
//     else if (step === 2) mood = "7_celebration";
//     return mood === "main"
//       ? `/images/genie/${selectedCharacter.key}/main.png`
//       : `/images/genie/${selectedCharacter.key}/portrait_${mood}.png`;
//   };

//   const badge = BADGES[STATION_ID];

//   if (stageIndex >= TOTAL_STAGES) {
//     const finalWords = collectedWords.slice(0, 2);
//     return (
//       <CompleteVerseStage
//         character={selectedCharacter}
//         words={finalWords}
//         onFinish={() => {}}
//       />
//     );
//   }

//   return (
//     <>
//       <WelcomePopup
//         isOpen={showWelcome}
//         onClose={handleCloseWelcome}
//         character={selectedCharacter}
//         messages={listeningWelcomeMessages}
//         getGenieImage={getListeningGenieImage}
//       />

//       <WordBoxExplanationPopup
//         isOpen={showWordBoxExplanation}
//         onClose={handleCloseExplanation}
//         character={selectedCharacter}
//       />

//       <StationLayout
//         stationName="محطة الاستماع"
//         stationId={STATION_ID}
//         stageIndex={stageIndex}
//         totalStages={TOTAL_STAGES}
//         collectedWords={collectedWords}
//         onWordBoxClick={handleWordBoxClick}
//         showWordBox={showWordBox}
//         setShowWordBox={setShowWordBox}
//         completedStages={completedStages}
//         onStageSelect={goToStage}
//       >
//         <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8">
//           {/* المرحلة 0: الأسئلة */}
//           {stageIndex === 0 && (
//             <>
//               <Genie
//                 character={selectedCharacter}
//                 mood={genieMood}
//                 text={genieText}
//                 visible={true}
//                 position="bottom-center"
//               />
//               {currentQuestion && (
//                 <QuestionRenderer
//                   question={currentQuestion}
//                   onAnswer={(isCorrect, optionId) =>
//                     handleAnswer(currentQuestion.id, isCorrect, optionId)
//                   }
//                   disabled={submitted[currentQuestion.id]}
//                   selectedOption={answers[currentQuestion.id]?.optionId}
//                   showCorrect={false}
//                 />
//               )}
//               <div className="flex gap-4 mt-8">
//                 {!isFirstQuestionInStage && (
//                   <button
//                     onClick={handlePrev}
//                     className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
//                   >
//                     السابق
//                   </button>
//                 )}
//                 {submitted[currentQuestion?.id] && (
//                   <button
//                     onClick={handleNext}
//                     className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition"
//                   >
//                     {isLastQuestionInStage ? "المرحلة التالية" : "التالي"}
//                   </button>
//                 )}
//               </div>
//             </>
//           )}

//           {/* المرحلة 1: الصوت */}
//           {stageIndex === 1 && (
//             <>
//               <Genie
//                 character={selectedCharacter}
//                 mood={genieMood}
//                 text={genieText}
//                 visible={true}
//                 position="bottom-center"
//               />
//               <QuestionRenderer
//                 question={currentStageQuestions[0]}
//                 onAudioEnded={handleAudioEnded}
//               />
//               <button
//                 onClick={handleNext}
//                 disabled={!stage2Completed}
//                 className={`mt-8 px-10 py-4 rounded-full font-bold text-lg shadow-lg transition ${
//                   stage2Completed
//                     ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
//                     : "bg-gray-300 cursor-not-allowed text-gray-500"
//                 }`}
//               >
//                 المرحلة التالية
//               </button>
//             </>
//           )}

//           {/* المرحلة 2: الصور (Stage3) */}
//           {stageIndex === 2 && (
//             <Stage3Content
//               character={selectedCharacter}
//               initialState={stage3State}
//               onStateChange={setStage3State}
//               onNext={(word) => {
//                 setCollectedWords((prev) => [...prev, word]);
//                 setCompletedStages((prev) => [...prev, stageIndex]);
//                 setStageIndex((prev) => prev + 1);
//               }}
//             />
//           )}

//           {/* المرحلة 3: السحب والإفلات الأولى (Stage4) */}
//           {stageIndex === 3 && (
//             <Stage4Content
//               character={selectedCharacter}
//               initialState={stage4State}
//               onStateChange={setStage4State}
//               onNext={(word) => {
//                 setCollectedWords((prev) => [...prev, word]);
//                 setCompletedStages((prev) => [...prev, stageIndex]);
//                 setStageIndex((prev) => prev + 1);
//               }}
//             />
//           )}

//           {/* المرحلة 4: ترتيب الأحداث (Stage5) */}
//           {stageIndex === 4 && (
//             <Stage5Content
//               character={selectedCharacter}
//               initialState={stage5State}
//               onStateChange={setStage5State}
//               onNext={(word) => {
//                 setCollectedWords((prev) => [...prev, word]);
//                 setCompletedStages((prev) => [...prev, stageIndex]);
//                 setStageIndex((prev) => prev + 1);
//               }}
//             />
//           )}

//           {/* المرحلة 5: سحب الجني (Stage6) */}
//           {stageIndex === 5 && (
//             <Stage6Content
//               character={selectedCharacter}
//               initialState={stage6State}
//               onStateChange={setStage6State}
//               onNext={(word) => {
//                 setCollectedWords((prev) => [...prev, word]);
//                 setCompletedStages((prev) => [...prev, stageIndex]);
//                 setStageIndex((prev) => prev + 1);
//               }}
//             />
//           )}

//           {/* المرحلة 6: القصة (Stage7) */}
//           {stageIndex === 6 && (
//             <Stage7Content
//               character={selectedCharacter}
//               initialState={stage7State}
//               onStateChange={setStage7State}
//               onNext={(word) => {
//                 setCollectedWords((prev) => [...prev, word]);
//                 setCompletedStages((prev) => [...prev, stageIndex]);
//                 setStageIndex((prev) => prev + 1);
//               }}
//             />
//           )}

//           {/* المرحلة 7: المطابقة (Stage8) */}
//           {stageIndex === 7 && (
//             <Stage8Content
//               character={selectedCharacter}
//               initialState={stage8State}
//               onStateChange={setStage8State}
//               onNext={(word) => {
//                 setCollectedWords((prev) => [...prev, word]);
//                 setCompletedStages((prev) => [...prev, stageIndex]);
//                 setStageIndex((prev) => prev + 1);
//               }}
//             />
//           )}

//           {/* المرحلة 8: الشخصية-الصفة-السبب (Stage9) */}
//           {stageIndex === 8 && (
//             <Stage9Content
//               character={selectedCharacter}
//               initialState={stage9State}
//               onStateChange={setStage9State}
//               onNext={(word) => {
//                 setCollectedWords((prev) => [...prev, word]);
//                 setCompletedStages((prev) => [...prev, stageIndex]);
//                 setStageIndex((prev) => prev + 1);
//               }}
//             />
//           )}
//         </div>
//       </StationLayout>

//       {/* أنيميشن اكتمال المحطة */}
//       <div
//         className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-all duration-300 ${
//           showCompletionAnimation ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         onClick={() => setShowCompletionAnimation(false)}
//       >
//         <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 text-center shadow-2xl border-4 border-amber-400 max-w-sm mx-4 transform transition-all duration-500 scale-100 rotate-0">
//           <div
//             className={`w-24 h-24 mx-auto rounded-full ${badge.color} flex items-center justify-center text-5xl shadow-lg ${badge.glow} mb-4 animate-pulse`}
//           >
//             {badge.icon}
//           </div>
//           <h2 className="text-3xl font-bold text-amber-800 mb-2">تهانينا! 🎉</h2>
//           <p className="text-xl text-gray-700 mb-2">لقد فتحت شارة</p>
//           <p className="text-2xl font-bold text-purple-700">{badge.name}</p>
//           <p className="text-amber-600 mt-4">كلماتك المجمعة: {collectedWords.join(" - ")}</p>
//           <button
//             onClick={() => setShowCompletionAnimation(false)}
//             className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition"
//           >
//             رائع!
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


// src/pages/stations/listening/Listening.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StationLayout from "../../../layouts/StationLayout";
import { completeStation } from "../../../utils/storage";
import { BADGES } from "../../../config/badgesConfig";
import WelcomePopup from "../../../components/WelcomePopup";
import WordBoxExplanationPopup from "../../../components/WordBoxExplanationPopup";
import QuestionRenderer from "../../../components/questions/QuestionRenderer";
import Stage2Content from "./components/Stage2Content";
import Stage3Content from "./components/Stage3Content";
import Stage4Content from "./components/Stage4Content";
import Stage5Content from "./components/Stage5Content";
import Stage6Content from "./components/Stage6Content";
import Stage7Content from "./components/Stage7Content";
import Stage8Content from "./components/Stage8Content";
import Stage9Content from "./components/Stage9Content";
import VerseQuestionModal from "../../../components/VerseQuestionModal";
import CompleteVerseStage from "./stages/CompleteVerseStage";
import listeningQuestions from "../../../data/listeningQuestions";
import Genie from "../../../components/genie";

const TOTAL_STAGES = 9;
const STATION_ID = "listening";

const STORAGE_KEYS = {
  stage0: "listening_stage0_data",
  stage2: "listening_stage2_data",
  stage3: "listening_stage3_data",
  stage4: "listening_stage4_data",
  stage5: "listening_stage5_data",
  stage6: "listening_stage6_data",
  stage7: "listening_stage7_data",
  stage8: "listening_stage8_data",
};

export default function Listening({ selectedCharacter }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [stage2Completed, setStage2Completed] = useState(false);
  const [collectedWords, setCollectedWords] = useState([]);
  const [completedStages, setCompletedStages] = useState([]);
  const [showWordBox, setShowWordBox] = useState(false);
  const [showWordBoxExplanation, setShowWordBoxExplanation] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeStep, setWelcomeStep] = useState(0);
  const [genieMood, setGenieMood] = useState("main");
  const [genieText, setGenieText] = useState("");

  const [stage3State, setStage3State] = useState(null);
  const [stage4State, setStage4State] = useState(null);
  const [stage5State, setStage5State] = useState(null);
  const [stage6State, setStage6State] = useState(null);
  const [stage7State, setStage7State] = useState(null);
  const [stage8State, setStage8State] = useState(null);
  const [stage9State, setStage9State] = useState(null);

  const [showVerseModal, setShowVerseModal] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(null);
  const [pendingRewardWord, setPendingRewardWord] = useState("");
  const [nextStageAfterVerse, setNextStageAfterVerse] = useState(null);
  
  const [currentStageForVerse, setCurrentStageForVerse] = useState(null);

  const badgeUnlockedRef = useRef(false);
  const isCompleted = stageIndex >= TOTAL_STAGES;

  const currentStageData = listeningQuestions[`stage${stageIndex + 1}`] || { questions: [], rewardWord: "" };
  const currentStageQuestions = currentStageData.questions || [];
  const currentQuestion = currentStageQuestions[questionIndex];
  const isLastQuestionInStage = questionIndex === currentStageQuestions.length - 1;
  const isFirstQuestionInStage = questionIndex === 0;

  const listeningWelcomeMessages = selectedCharacter
    ? [
        `أهلاً بك في محطة الاستماع! أنا ${selectedCharacter.name}، وسأساعدك في هذه المحطة.`,
        "ستجيب عن أسئلة متعددة الخيارات، وستجمع كلمات لتكوين جملة تفتح لك شارة الإنجاز.",
        "هل أنت مستعد؟ دعنا نبدأ!",
      ]
    : [];

  useEffect(() => {
    const savedStage0 = localStorage.getItem(STORAGE_KEYS.stage0);
    if (savedStage0) {
      try {
        const data = JSON.parse(savedStage0);
        setAnswers(data.answers || {});
        setSubmitted(data.submitted || {});
        setQuestionIndex(data.questionIndex || 0);
      } catch (e) {}
    }

    const savedStage2 = localStorage.getItem(STORAGE_KEYS.stage2);
    if (savedStage2) {
      try {
        const data = JSON.parse(savedStage2);
        setStage2Completed(data.completed || false);
      } catch (e) {}
    }

    const savedStage3 = localStorage.getItem(STORAGE_KEYS.stage3);
    if (savedStage3) {
      try {
        const data = JSON.parse(savedStage3);
        setStage3State(data);
      } catch (e) {}
    }

    const savedStage4 = localStorage.getItem(STORAGE_KEYS.stage4);
    if (savedStage4) {
      try {
        const data = JSON.parse(savedStage4);
        setStage4State(data);
      } catch (e) {}
    }

    const savedStage5 = localStorage.getItem(STORAGE_KEYS.stage5);
    if (savedStage5) {
      try {
        const data = JSON.parse(savedStage5);
        setStage5State(data);
      } catch (e) {}
    }

    const savedStage6 = localStorage.getItem(STORAGE_KEYS.stage6);
    if (savedStage6) {
      try {
        const data = JSON.parse(savedStage6);
        setStage6State(data);
      } catch (e) {}
    }

    const savedStage7 = localStorage.getItem(STORAGE_KEYS.stage7);
    if (savedStage7) {
      try {
        const data = JSON.parse(savedStage7);
        setStage7State(data);
      } catch (e) {}
    }

    const savedStage8 = localStorage.getItem(STORAGE_KEYS.stage8);
    if (savedStage8) {
      try {
        const data = JSON.parse(savedStage8);
        setStage8State(data);
      } catch (e) {}
    }

    const savedStage9 = localStorage.getItem(STORAGE_KEYS.stage9);
    if (savedStage9) {
      try {
        const data = JSON.parse(savedStage9);
        setStage9State(data);
      } catch (e) {}
    }

    const savedProgress = localStorage.getItem("listening_progress");
    if (savedProgress) {
      try {
        const data = JSON.parse(savedProgress);
        setCollectedWords(data.collectedWords || []);
        setCompletedStages(data.completedStages || []);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (stageIndex === 0) {
      localStorage.setItem(
        STORAGE_KEYS.stage0,
        JSON.stringify({ answers, submitted, questionIndex })
      );
    }
  }, [answers, submitted, questionIndex, stageIndex]);

  useEffect(() => {
    if (stageIndex === 1) {
      localStorage.setItem(STORAGE_KEYS.stage2, JSON.stringify({ completed: stage2Completed }));
    }
  }, [stage2Completed, stageIndex]);

  useEffect(() => {
    if (stageIndex === 2 && stage3State) {
      localStorage.setItem(STORAGE_KEYS.stage3, JSON.stringify(stage3State));
    }
  }, [stage3State, stageIndex]);

  useEffect(() => {
    if (stageIndex === 3 && stage4State) {
      localStorage.setItem(STORAGE_KEYS.stage4, JSON.stringify(stage4State));
    }
  }, [stage4State, stageIndex]);

  useEffect(() => {
    if (stageIndex === 4 && stage5State) {
      localStorage.setItem(STORAGE_KEYS.stage5, JSON.stringify(stage5State));
    }
  }, [stage5State, stageIndex]);

  useEffect(() => {
    if (stageIndex === 5 && stage6State) {
      localStorage.setItem(STORAGE_KEYS.stage6, JSON.stringify(stage6State));
    }
  }, [stage6State, stageIndex]);

  useEffect(() => {
    if (stageIndex === 6 && stage7State) {
      localStorage.setItem(STORAGE_KEYS.stage7, JSON.stringify(stage7State));
    }
  }, [stage7State, stageIndex]);

  useEffect(() => {
    if (stageIndex === 7 && stage8State) {
      localStorage.setItem(STORAGE_KEYS.stage8, JSON.stringify(stage8State));
    }
  }, [stage8State, stageIndex]);

  useEffect(() => {
    if (stageIndex === 8 && stage9State) {
      localStorage.setItem(STORAGE_KEYS.stage9, JSON.stringify(stage9State));
    }
  }, [stage9State, stageIndex]);

  useEffect(() => {
    localStorage.setItem(
      "listening_progress",
      JSON.stringify({ collectedWords, completedStages })
    );
  }, [collectedWords, completedStages]);

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

  useEffect(() => {
    if (stageIndex === 0) {
      if (questionIndex === 0) {
        setGenieMood("main");
        setGenieText("تأمل الصورة جيداً ثم اختر الإجابة المناسبة.");
      } else if (questionIndex === 1) {
        setGenieMood("3_thinking");
        setGenieText("والآن، ماذا تتوقع أن يكون موضوع النص المسموع؟");
      } else if (questionIndex === 2) {
        setGenieMood("3_thinking");
        setGenieText("أكمل الآية لتحصل على الكلمة الأولى.");
      }
    } else if (stageIndex === 1) {
      if (!stage2Completed) {
        setGenieMood("1_joy");
        setGenieText("أحسنت! لقد أكملت المرحلة الأولى. استمع الآن للنص.");
      } else {
        setGenieMood("7_celebration");
        setGenieText("أحسنت! لقد استمعت للنص كاملاً.");
      }
    }
  }, [stageIndex, questionIndex, stage2Completed]);

  const handleAnswer = (questionId, isCorrect, optionId) => {
    if (submitted[questionId]) return;

    if (isCorrect) {
      setAnswers((prev) => ({ ...prev, [questionId]: { isCorrect, optionId } }));
      setSubmitted((prev) => ({ ...prev, [questionId]: true }));
      setGenieMood("1_joy");
      setGenieText("أحسنت! إجابة صحيحة.");
    } else {
      setGenieMood("2_encouragement");
      setGenieText("حاول مرة أخرى، فكر جيداً.");
    }
  };

const showVerseForNextStage = (completedStage, nextStage) => {
  // إذا كانت المرحلة التالية مكتملة، ننتقل مباشرة
  if (completedStages.includes(nextStage)) {
    setCompletedStages(prev => [...prev, completedStage]);
    setStageIndex(nextStage);
    setQuestionIndex(0);
    return;
  }

  const verseData = listeningQuestions[`stage${nextStage}`]?.verse;
  if (verseData) {
    setCurrentStageForVerse(completedStage);
    setCurrentVerse(verseData);
    setPendingRewardWord(verseData.rewardWord);
    setNextStageAfterVerse(nextStage);
    setShowVerseModal(true);
  } else {
    setCompletedStages(prev => [...prev, completedStage]);
    setStageIndex(nextStage);
    setQuestionIndex(0);
  }
};
const handleVerseClose = () => {
  if (!completedStages.includes(currentStageForVerse)) {
    setCollectedWords(prev => [...prev, pendingRewardWord]);
  }
  setCompletedStages(prev => [...prev, currentStageForVerse]);
  setStageIndex(nextStageAfterVerse);
  setQuestionIndex(0);
  setShowVerseModal(false);
  setGenieMood("1_joy");
  setGenieText("أحسنت! كلمة جديدة أضيفت.");
};

const handleNext = () => {
  if (stageIndex === 1) {
    // المرحلة الثانية تعتمد على onComplete
    return;
  } else if (stageIndex === 0) {
    if (isLastQuestionInStage) {
      showVerseForNextStage(0, 1); // المرحلة 0 اكتملت → ننتقل إلى 1 مع آية المرحلة 1
    } else {
      setQuestionIndex(prev => prev + 1);
    }
  }
};

  const handlePrev = () => {
    if (!isFirstQuestionInStage) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAudioEnded = () => {
    setStage2Completed(true);
    setGenieMood("7_celebration");
    setGenieText("أحسنت! لقد استمعت للنص كاملاً.");
  };

  const goToStage = (index) => {
    if (completedStages.includes(index)) {
      setStageIndex(index);
      setQuestionIndex(0);
    }
  };

  const handleWordBoxClick = () => {
    const hasSeen = localStorage.getItem("hasSeenWordBoxExplanation");
    if (!hasSeen) {
      setShowWordBoxExplanation(true);
      localStorage.setItem("hasSeenWordBoxExplanation", "true");
    } else {
      setShowWordBox(true);
    }
  };

  const handleCloseExplanation = () => {
    setShowWordBoxExplanation(false);
    setShowWordBox(true);
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

  const badge = BADGES[STATION_ID];

  if (stageIndex >= TOTAL_STAGES) {
    const finalWords = collectedWords.slice(0, 9);
    return (
      <CompleteVerseStage
        character={selectedCharacter}
        words={finalWords}
        onFinish={() => {}}
      />
    );
  }
 

  return (
    <>
      <WelcomePopup
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        character={selectedCharacter}
        messages={listeningWelcomeMessages}
        getGenieImage={getListeningGenieImage}
      />

      <WordBoxExplanationPopup
        isOpen={showWordBoxExplanation}
        onClose={handleCloseExplanation}
        character={selectedCharacter}
      />

      <VerseQuestionModal
        isOpen={showVerseModal}
        onClose={handleVerseClose}
        verse={currentVerse}
        character={selectedCharacter}
      />

      <StationLayout
        stationName="محطة الاستماع"
        stationId={STATION_ID}
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        collectedWords={collectedWords}
        onWordBoxClick={handleWordBoxClick}
        showWordBox={showWordBox}
        setShowWordBox={setShowWordBox}
        completedStages={completedStages}
        onStageSelect={goToStage}
      >
        <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8">
          {stageIndex === 0 && (
            <>
              <Genie
                character={selectedCharacter}
                mood={genieMood}
                text={genieText}
                visible={true}
                position="bottom-center"
              />
              {currentQuestion && (
                <QuestionRenderer
                  question={currentQuestion}
                  onAnswer={(isCorrect, optionId) =>
                    handleAnswer(currentQuestion.id, isCorrect, optionId)
                  }
                  disabled={submitted[currentQuestion.id]}
                  selectedOption={answers[currentQuestion.id]?.optionId}
                  showCorrect={false}
                />
              )}
              <div className="flex gap-4 mt-8">
                {!isFirstQuestionInStage && (
                  <button
                    onClick={handlePrev}
                    className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                  >
                    السابق
                  </button>
                )}
                {submitted[currentQuestion?.id] && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition"
                  >
                    {isLastQuestionInStage ? "المرحلة التالية" : "التالي"}
                  </button>
                )}
              </div>
            </>
          )}

{stageIndex === 1 && (
  <Stage2Content
    character={selectedCharacter}
    onComplete={() => showVerseForNextStage(1, 2)}
  />
)}
{stageIndex === 2 && (
  <Stage3Content
    character={selectedCharacter}
    initialState={stage3State}
    onStateChange={setStage3State}
    onNext={() => showVerseForNextStage(2, 3)}
  />
)}
{stageIndex === 3 && (
  <Stage4Content
    character={selectedCharacter}
    initialState={stage4State}
    onStateChange={setStage4State}
    onNext={() => showVerseForNextStage(3, 4)}
  />
)}
{stageIndex === 4 && (
  <Stage5Content
    character={selectedCharacter}
    initialState={stage5State}
    onStateChange={setStage5State}
    onNext={() => showVerseForNextStage(4, 5)}
  />
)}
{stageIndex === 5 && (
  <Stage6Content
    character={selectedCharacter}
    initialState={stage6State}
    onStateChange={setStage6State}
    onNext={() => showVerseForNextStage(5, 6)}
  />
)}
{stageIndex === 6 && (
  <Stage7Content
    character={selectedCharacter}
    initialState={stage7State}
    onStateChange={setStage7State}
    onNext={() => showVerseForNextStage(6, 7)}
  />
)}
{stageIndex === 7 && (
  <Stage8Content
    character={selectedCharacter}
    initialState={stage8State}
    onStateChange={setStage8State}
    onNext={() => showVerseForNextStage(7, 8)}
  />
)}
{stageIndex === 8 && (
  <Stage9Content
    character={selectedCharacter}
    initialState={stage9State}
    onStateChange={setStage9State}
    onNext={() => showVerseForNextStage(8, 9)}
  />
)}
        </div>
      </StationLayout>

      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-all duration-300 ${
          showCompletionAnimation ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShowCompletionAnimation(false)}
      >
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 text-center shadow-2xl border-4 border-amber-400 max-w-sm mx-4 transform transition-all duration-500 scale-100 rotate-0">
          <div
            className={`w-24 h-24 mx-auto rounded-full ${badge.color} flex items-center justify-center text-5xl shadow-lg ${badge.glow} mb-4 animate-pulse`}
          >
            {badge.icon}
          </div>
          <h2 className="text-3xl font-bold text-amber-800 mb-2">تهانينا! 🎉</h2>
          <p className="text-xl text-gray-700 mb-2">لقد فتحت شارة</p>
          <p className="text-2xl font-bold text-purple-700">{badge.name}</p>
          <p className="text-amber-600 mt-4">كلماتك المجمعة: {collectedWords.join(" - ")}</p>
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





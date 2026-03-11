// // src/layouts/StationLayout.jsx
// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ProgressBar from "../components/ProgressBar";
// import WordBoxPopover from "../components/WordBoxPopover";

// export default function StationLayout({
//   stationName,
//   stationId,
//   stageIndex,
//   totalStages,
//   collectedWords = [],
//   onWordBoxClick,
//   showWordBox,
//   setShowWordBox,
//   children,
//   completedStages = [],
//   onStageSelect,
// }) {
//   const [showStagesMenu, setShowStagesMenu] = useState(false);
//   const menuRef = useRef(null);
//   const buttonRef = useRef(null);
//   const navigate = useNavigate();

//   // إغلاق القائمة عند النقر خارجها
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setShowStagesMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // نسبة التقدم
//   const progressPercent = totalStages > 0 ? (stageIndex / totalStages) * 100 : 0;
//   const isCompleted = stageIndex >= totalStages;

//   return (
//     <div className="min-h-screen bg-amber-50 flex flex-col">
//       {/* الهيدر */}
//       <header className="bg-white shadow-md p-4 relative z-30">
//         {/* الصف العلوي */}
//         <div className="flex items-center justify-between mb-3">
//           {/* الجهة اليمنى (لأن الاتجاه عربي): زر الرجوع واسم المحطة */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => navigate("/main")}
//               className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl transition-colors"
//               title="العودة إلى الرئيسية"
//             >
//               ←
//             </button>
//             <h1 className="text-xl font-bold text-orange-600">{stationName}</h1>
//           </div>

//           {/* الجهة اليسرى: زر المراحل + زر الإنجازات + نص المرحلة وشريط التقدم */}
//           <div className="flex items-center gap-3">
//             {/* زر المراحل */}
//             <button
//               ref={buttonRef}
//               onClick={() => setShowStagesMenu(!showStagesMenu)}
//               className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg transition-colors"
//               title="عرض المراحل"
//             >
//               ☰
//             </button>

//             {/* زر الإنجازات */}
//             <button
//               onClick={onWordBoxClick}
//               className="relative group"
//               aria-label="صندوق الكلمات"
//             >
//               <span className="text-3xl filter drop-shadow-lg transform transition-transform group-hover:scale-110">
//                 📦
//               </span>
//               {collectedWords.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {collectedWords.length}
//                 </span>
//               )}
//             </button>

//             {/* نص المرحلة وشريط التقدم */}
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-500 whitespace-nowrap">
//                 {!isCompleted
//                   ? `المرحلة ${stageIndex + 1} / ${totalStages}`
//                   : "مكتمل ✅"}
//               </span>
//               <ProgressBar value={progressPercent} />
//             </div>
//           </div>
//         </div>

//         {/* قائمة المراحل المنبثقة */}
//         <div
//           ref={menuRef}
//           className={`absolute top-16 left-4 z-40 bg-white rounded-2xl shadow-xl p-4 w-64 border-2 border-orange-300 transition-all duration-300 ${
//             showStagesMenu ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
//           }`}
//         >
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-bold text-lg">المراحل</h3>
//             <button
//               onClick={() => setShowStagesMenu(false)}
//               className="text-gray-500 hover:text-black"
//             >
//               ✕
//             </button>
//           </div>

//           <div className="space-y-2">
//             {Array.from({ length: totalStages }, (_, i) => i).map((stageNum) => {
//               const isCompletedStage = completedStages.includes(stageNum);
//               const isCurrent = stageIndex === stageNum;
//               const isClickable = isCompletedStage && stageNum < stageIndex;

//               return (
//                 <button
//                   key={stageNum}
//                   onClick={() => {
//                     if (isClickable) {
//                       onStageSelect(stageNum);
//                       setShowStagesMenu(false);
//                     }
//                   }}
//                   disabled={!isClickable}
//                   className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
//                     isCurrent
//                       ? "bg-orange-100 border-2 border-orange-400"
//                       : isCompletedStage
//                       ? "bg-green-50 hover:bg-green-100 cursor-pointer"
//                       : "bg-gray-100 opacity-60 cursor-not-allowed"
//                   }`}
//                 >
//                   <span
//                     className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
//                       isCurrent
//                         ? "bg-orange-500 text-white"
//                         : isCompletedStage
//                         ? "bg-green-500 text-white"
//                         : "bg-gray-300 text-gray-600"
//                     }`}
//                   >
//                     {stageNum + 1}
//                   </span>

//                   <span className="font-semibold">
//                     {isCurrent ? "الحالية" : isCompletedStage ? "مكتملة" : "غير متاحة"}
//                   </span>

//                   {isCompletedStage && stageNum < stageIndex && (
//                     <span className="mr-auto text-green-600 text-sm">✔</span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </header>

//       {/* محتوى المرحلة */}
//       <main className="flex-1 px-4 sm:px-8 py-6">{children}</main>

//       {/* نافذة الإنجازات */}
//       {showWordBox && (
//         <WordBoxPopover
//           words={collectedWords}
//           onClose={() => setShowWordBox(false)}
//           isCompleted={isCompleted}
//           stationId={stationId}
//         />
//       )}
//     </div>
//   );
// }

// src/layouts/StationLayout.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import WordBoxPopover from "../components/WordBoxPopover";

export default function StationLayout({
  stationName,
  stationId,
  stageIndex,
  totalStages,
  collectedWords = [],
  onWordBoxClick,
  showWordBox,
  setShowWordBox,
  children,
  completedStages = [],
  onStageSelect,
}) {
  const [showStagesMenu, setShowStagesMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowStagesMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const progressPercent = totalStages > 0 ? (stageIndex / totalStages) * 100 : 0;
  const isCompleted = stageIndex >= totalStages;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <header className="bg-white shadow-md p-4 relative z-30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/main")}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl transition-colors"
              title="العودة إلى الرئيسية"
            >
              ←
            </button>
            <h1 className="text-xl font-bold text-orange-600">{stationName}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              ref={buttonRef}
              onClick={() => setShowStagesMenu(!showStagesMenu)}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg transition-colors"
              title="عرض المراحل"
            >
              ☰
            </button>

            <button
              onClick={onWordBoxClick}
              className="relative group"
              aria-label="صندوق الكلمات"
            >
              <span className="text-3xl filter drop-shadow-lg transform transition-transform group-hover:scale-110">
                📦
              </span>
              {collectedWords.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {collectedWords.length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {!isCompleted
                  ? `المرحلة ${stageIndex + 1} / ${totalStages}`
                  : "مكتمل ✅"}
              </span>
              <ProgressBar value={progressPercent} />
            </div>
          </div>
        </div>

        <div
          ref={menuRef}
          className={`absolute top-16 left-4 z-40 bg-white rounded-2xl shadow-xl p-4 w-64 border-2 border-orange-300 transition-all duration-300 ${
            showStagesMenu ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">المراحل</h3>
            <button
              onClick={() => setShowStagesMenu(false)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {Array.from({ length: totalStages }, (_, i) => i).map((stageNum) => {
              const isCompletedStage = completedStages.includes(stageNum);
              const isCurrent = stageIndex === stageNum;
              // يمكن التنقل إلى أي مرحلة مكتملة (سابقة)
              const isClickable = isCompletedStage;

              return (
                <button
                  key={stageNum}
                  onClick={() => {
                    if (isClickable) {
                      onStageSelect(stageNum);
                      setShowStagesMenu(false);
                    }
                  }}
                  disabled={!isClickable}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isCurrent
                      ? "bg-orange-100 border-2 border-orange-400"
                      : isCompletedStage
                      ? "bg-green-50 hover:bg-green-100 cursor-pointer"
                      : "bg-gray-100 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      isCurrent
                        ? "bg-orange-500 text-white"
                        : isCompletedStage
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {stageNum + 1}
                  </span>

                  <span className="font-semibold">
                    {isCurrent ? "الحالية" : isCompletedStage ? "مكتملة" : "غير متاحة"}
                  </span>

                  {isCompletedStage && (
                    <span className="mr-auto text-green-600 text-sm">✔</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-8 py-6">{children}</main>

      {showWordBox && (
        <WordBoxPopover
          words={collectedWords}
          onClose={() => setShowWordBox(false)}
          isCompleted={isCompleted}
          stationId={stationId}
        />
      )}
    </div>
  );
}
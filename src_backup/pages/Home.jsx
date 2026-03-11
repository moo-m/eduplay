// // src/pages/Home.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AppLayout from "../layouts/AppLayout";
// import Header from "../layouts/Header";
// import Footer from "../layouts/Footer";
// import { GENIES } from "../components/genie/genieData";

// export default function Home() {
//   const navigate = useNavigate();
//   const [localSelection, setLocalSelection] = useState(GENIES[0]);

//   // تحميل الشخصية المحفوظة عند بدء التشغيل
//   useEffect(() => {
//     const saved = localStorage.getItem("selectedCharacter");
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setLocalSelection(parsed);
//     }
//   }, []);

//   const handleSelect = (char) => {
//     setLocalSelection(char);
//     localStorage.setItem("selectedCharacter", JSON.stringify(char));
//   };

//   const handleStart = () => {
//     if (localSelection) {
//       // تمرير معرف الشخصية في state للتوجيه
//       navigate("/main", { state: { characterId: localSelection.id } });
//     }
//   };

//   const glowStyles = {
//     orange: {
//       halo: "bg-orange-400/30",
//       shadow: "drop-shadow-[0_0_40px_rgba(255,80,40,0.9)]",
//       floor: "bg-orange-500/30",
//     },
//     purple: {
//       halo: "bg-purple-400/30",
//       shadow: "drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]",
//       floor: "bg-purple-500/30",
//     },
//   };

//   return (
//     <AppLayout
//       header={<Header title="من طرائف أشعب وجحا" subtitle="طرفتي دليل فطنتي" />}
//       footer={<Footer />}
//     >
//       <div className="text-center mt-10 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-purple-800">اختر شخصيتك</h2>

//         <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
//           {GENIES.map((char) => {
//             const isSelected = localSelection?.id === char.id;
//             const style = glowStyles[char.glow];

//             return (
//               <div
//                 key={char.id}
//                 onClick={() => handleSelect(char)}
//                 className="flex flex-col items-center cursor-pointer group transition-all duration-500"
//               >
//                 <div className="relative flex flex-col items-center">
//                   <div
//                     className={`absolute bottom-2 w-44 h-8 blur-2xl rounded-full transition-all duration-500 ${
//                       isSelected ? style.floor : "bg-black/20"
//                     }`}
//                   ></div>

//                   <div
//                     className={`absolute inset-0 rounded-full blur-3xl transition-all duration-500 ${
//                       isSelected ? style.halo : "opacity-0"
//                     }`}
//                   ></div>

//                   <img
//                     src={`/images/genie/${char.key}/main.png`}
//                     alt={char.name}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "/images/genie/fallback.png"; // صورة افتراضية في حال عدم وجود الصورة
//                     }}
//                     className={`h-64 object-contain transition-all duration-500 ${
//                       isSelected
//                         ? `scale-110 ${style.shadow}`
//                         : "opacity-90 group-hover:scale-105"
//                     }`}
//                   />
//                 </div>

//                 <h4 className="text-2xl font-bold text-purple-900 mt-6">{char.name}</h4>
//                 <p className="text-sm font-semibold mt-1 text-gray-600">{char.desc}</p>
//               </div>
//             );
//           })}
//         </div>

//         <button
//           onClick={handleStart}
//           disabled={!localSelection}
//           className={`mt-12 text-white text-xl font-bold px-14 py-4 rounded-2xl shadow-lg transition-all duration-300 ${
//             localSelection
//               ? "bg-orange-500 hover:bg-orange-600 hover:scale-105"
//               : "bg-gray-300 cursor-not-allowed"
//           }`}
//         >
//           ابدأ المغامرة
//         </button>
//       </div>
//     </AppLayout>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { GENIES } from "../components/genie/genieData";

export default function Home({ setSelectedCharacter }) {
  const navigate = useNavigate();
  const [localSelection, setLocalSelection] = useState(GENIES[0]);

  // تحميل الشخصية المحفوظة عند بدء التشغيل، أو استخدام جحا افتراضياً
  useEffect(() => {
    const saved = localStorage.getItem("selectedCharacter");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalSelection(parsed);
    } else {
      // إذا لم يكن هناك حفظ، نستخدم جحا كافتراضي ونحفظه
      const defaultChar = GENIES[0];
      setLocalSelection(defaultChar);
      localStorage.setItem("selectedCharacter", JSON.stringify(defaultChar));
      setSelectedCharacter(defaultChar);
    }
  }, [setSelectedCharacter]);

  const handleSelect = (char) => {
    setLocalSelection(char);
    localStorage.setItem("selectedCharacter", JSON.stringify(char));
    setSelectedCharacter(char);
  };

  const handleStart = () => {
    if (localSelection) {
      navigate("/main");
    }
  };

  const glowStyles = {
    orange: {
      halo: "bg-orange-400/30",
      shadow: "drop-shadow-[0_0_40px_rgba(255,80,40,0.9)]",
      floor: "bg-orange-500/30",
    },
    purple: {
      halo: "bg-purple-400/30",
      shadow: "drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]",
      floor: "bg-purple-500/30",
    },
  };

  return (
    <AppLayout
      header={<Header title="من طرائف أشعب وجحا" subtitle="طرفتي دليل فطنتي" />}
      footer={<Footer />}
    >
      <div className="text-center mt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-purple-800">اختر شخصيتك</h2>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
          {GENIES.map((char) => {
            const isSelected = localSelection?.id === char.id;
            const style = glowStyles[char.glow];

            return (
              <div
                key={char.id}
                onClick={() => handleSelect(char)}
                className="flex flex-col items-center cursor-pointer group transition-all duration-500"
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className={`absolute bottom-2 w-44 h-8 blur-2xl rounded-full transition-all duration-500 ${
                      isSelected ? style.floor : "bg-black/20"
                    }`}
                  ></div>

                  <div
                    className={`absolute inset-0 rounded-full blur-3xl transition-all duration-500 ${
                      isSelected ? style.halo : "opacity-0"
                    }`}
                  ></div>

                  <img
                    src={`/images/genie/${char.key}/main.png`}
                    alt={char.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/genie/fallback.png";
                    }}
                    className={`h-64 object-contain transition-all duration-500 ${
                      isSelected
                        ? `scale-110 ${style.shadow}`
                        : "opacity-90 group-hover:scale-105"
                    }`}
                  />
                </div>

                <h4 className="text-2xl font-bold text-purple-900 mt-6">{char.name}</h4>
                <p className="text-sm font-semibold mt-1 text-gray-600">{char.desc}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleStart}
          disabled={!localSelection}
          className={`mt-12 text-white text-xl font-bold px-14 py-4 rounded-2xl shadow-lg transition-all duration-300 ${
            localSelection
              ? "bg-orange-500 hover:bg-orange-600 hover:scale-105"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          ابدأ المغامرة
        </button>
      </div>
    </AppLayout>
  );
}
// import React, { useRef } from "react";
// import PropTypes from "prop-types";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Genie({ character, text, mood = "main", visible = true, position = "bottom-center" }) {
//   const constraintsRef = useRef(null); // مرجع لتحديد حدود السحب (كامل الشاشة)

//   if (!character) return null;

//   // تحديد مسار الصورة حسب المزاج
//   const imagePath =
//     mood === "main"
//       ? `/images/genie/${character.key}/main.png`
//       : `/images/genie/${character.key}/portrait_${mood}.png`;

//   // أنيميشن ديناميكي لكل مزاج
//   const animations = {
//     main: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
//     "1_joy": { y: [0, -10, 0], rotate: [0, 10, -10, 0], transition: { repeat: Infinity, duration: 1.5 } },
//     "2_encouragement": { y: [0, -5, 0], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 2 } },
//     "3_thinking": { rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 2 } },
//     "4_surprise": { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1 } },
//     "5_sadness": { y: [0, 5, 0], transition: { repeat: Infinity, duration: 2 } },
//     "6_challenge": { x: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 1.5 } },
//     "7_celebration": { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0], transition: { repeat: Infinity, duration: 1.5 } },
//     "8_approval": { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.2 } },
//   };

//   // تحديد موقع الجني بناءً على prop position (الموضع الابتدائي)
//   const positionClasses = {
//     "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
//     "bottom-left": "bottom-0 left-4",
//     "bottom-right": "bottom-0 right-4",
//     "top-center": "top-0 left-1/2 -translate-x-1/2",
//     "top-left": "top-0 left-4",
//     "top-right": "top-0 right-4",
//   };

//   return (
//     <>
//       {/* عنصر خفي لتحديد حدود السحب (كامل الشاشة) */}
//       <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />
//       <AnimatePresence>
//         {visible && (
//           <motion.div
//             key="genie-container"
//             drag
//             dragConstraints={constraintsRef} // السماح بالسحب في كل الشاشة
//             dragElastic={0.8} // مرونة عالية عند تجاوز الحدود
//             dragMomentum={true} // استمرار الحركة بعد السحب
//             dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }} // تأثير الارتداد
//             whileDrag={{ 
//               scale: 1.05, 
//               opacity: 0.7,
//               cursor: "grabbing",
//               transition: { duration: 0.1 }
//             }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.3 }}
//             className={`fixed ${positionClasses[position] || positionClasses["bottom-center"]} flex flex-col items-center z-[9999] cursor-grab active:cursor-grabbing p-2 sm:p-4`}
//             style={{ touchAction: "none" }} // تحسين للسحب على الشاشات اللمسية
//           >
//             {/* فقاعة النص */}
//             {text && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg mb-2 sm:mb-3 max-w-xs sm:max-w-sm text-center"
//               >
//                 <p className="text-gray-800 font-semibold text-sm sm:text-base">{text}</p>
//               </motion.div>
//             )}

//             {/* صورة الجني */}
//             <motion.img
//               src={imagePath}
//               alt={character.name}
//               className="h-24 sm:h-32 object-contain"
//               animate={animations[mood] || animations.main}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// Genie.propTypes = {
//   character: PropTypes.object.isRequired,
//   text: PropTypes.string,
//   mood: PropTypes.string,
//   visible: PropTypes.bool,
//   position: PropTypes.oneOf(["bottom-center", "bottom-left", "bottom-right", "top-center", "top-left", "top-right"]),
// };

import React, { useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

export default function Genie({
  character,
  text,
  mood = "main",
  visible = true,
  position = "bottom-center",
  imgClassName = "h-24 sm:h-32" // القيمة الافتراضية (الحجم الطبيعي)
}) {
  const constraintsRef = useRef(null);

  if (!character) return null;

  const imagePath =
    mood === "main"
      ? `/images/genie/${character.key}/main.png`
      : `/images/genie/${character.key}/portrait_${mood}.png`;

  const animations = {
    main: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
    "1_joy": { y: [0, -10, 0], rotate: [0, 10, -10, 0], transition: { repeat: Infinity, duration: 1.5 } },
    "2_encouragement": { y: [0, -5, 0], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 2 } },
    "3_thinking": { rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 2 } },
    "4_surprise": { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1 } },
    "5_sadness": { y: [0, 5, 0], transition: { repeat: Infinity, duration: 2 } },
    "6_challenge": { x: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 1.5 } },
    "7_celebration": { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0], transition: { repeat: Infinity, duration: 1.5 } },
    "8_approval": { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.2 } },
  };

  const positionClasses = {
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-0 left-4",
    "bottom-right": "bottom-0 right-4",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "top-left": "top-0 left-4",
    "top-right": "top-0 right-4",
  };

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />
      <AnimatePresence>
        {visible && (
          <motion.div
            key="genie-container"
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.8}
            dragMomentum
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
            whileDrag={{
              scale: 1.05,
              opacity: 0.7,
              cursor: "grabbing",
              transition: { duration: 0.1 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${positionClasses[position] || positionClasses["bottom-center"]} flex flex-col items-center z-[9999] cursor-grab active:cursor-grabbing p-2 sm:p-4`}
            style={{ touchAction: "none" }}
          >
            {/* فقاعة النص */}
            {text && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg mb-2 sm:mb-3 max-w-xs sm:max-w-sm text-center"
              >
                <p className="text-gray-800 font-semibold text-sm sm:text-base">{text}</p>
              </motion.div>
            )}

            {/* صورة الجني مع إمكانية تخصيص الحجم */}
            <motion.img
              src={imagePath}
              alt={character.name}
              className={imgClassName} // استخدام الخاصية الجديدة
              animate={animations[mood] || animations.main}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

Genie.propTypes = {
  character: PropTypes.object.isRequired,
  text: PropTypes.string,
  mood: PropTypes.string,
  visible: PropTypes.bool,
  position: PropTypes.oneOf(["bottom-center", "bottom-left", "bottom-right", "top-center", "top-left", "top-right"]),
  imgClassName: PropTypes.string, // الخاصية الجديدة
};
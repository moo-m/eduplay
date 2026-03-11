// src/pages/stations/speaking/components/CharacterArea.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import Genie from "../../../../components/genie";

export default function CharacterArea({ character, isTop, onDragToTop }) {
  const constraintsRef = useRef(null);

  if (isTop) {
    // الشخصية في الأعلى: غير قابلة للسحب
    return (
      <div className="relative w-32 h-32">
        <Genie
          character={character}
          mood="main"
          text=""
          visible={true}
          position="relative"
          className="w-32 h-32"
        />
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs whitespace-nowrap">
          {character.name}
        </span>
      </div>
    );
  }

  // الشخصية في الأسفل: قابلة للسحب
  return (
    <div ref={constraintsRef} className="relative">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        onDragStart={(e) => {
          // تخزين نوع الشخصية في dataTransfer
          e.dataTransfer.setData('text/plain', character.key);
        }}
        onDragEnd={(event, info) => {
          // إذا تم الإفلات في المنطقة العلوية (Y صغير)
          if (info.point.y < window.innerHeight * 0.4) {
            onDragToTop(character.key);
          }
        }}
        whileDrag={{ scale: 1.2, zIndex: 100 }}
        className="relative w-32 h-32 cursor-grab active:cursor-grabbing"
      >
        <Genie
          character={character}
          mood="main"
          text=""
          visible={true}
          position="relative"
          className="w-32 h-32"
        />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-purple-800 px-3 py-1 rounded-full text-xs whitespace-nowrap shadow"
        >
          {character.key === 'juha' ? 'لدي قصة!' : 'لدي تعليق!'}
        </motion.div>
      </motion.div>
      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs whitespace-nowrap">
        {character.name}
      </span>
    </div>
  );
}
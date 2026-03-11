import React, { useRef } from "react";
import Genie from "../../../components/genie";
import { GENIES } from "../../../components/genie/genieData";

export default function DraggableGenie() {
  const containerRef = useRef(null);

  // اختر الشخصيتين
  const characters = GENIES.filter(
    g => g.key === "juha" || g.key === "ashab"
  );

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-blue-50 overflow-hidden"
    >
      {/* نصف الشاشة العلوي فارغ */}
      <div className="flex-1"></div>

      {/* نصف الشاشة السفلي: الجني على اليسار واليمين */}
      <div className="relative h-64 w-full flex justify-between px-16 items-end">
        {characters.map((char, i) => (
          <Genie
            key={char.key}
            character={char}
            mood="main"
            visible={true}
            position={i ? "bottom-left" : "bottom-right"}
            imgClassName="h-32 w-32"
            isDraggable={true}
            constraintsRef={containerRef} // الحاوية تغطي كل الشاشة
            onDrag={() => {
              const rect = containerRef.current.getBoundingClientRect();
              console.log(`${char.key} container:`, rect);
            }}
          />
        ))}
      </div>
    </div>
  );
}
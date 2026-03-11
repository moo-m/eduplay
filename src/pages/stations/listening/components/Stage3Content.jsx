// src/pages/stations/listening/components/Stage3Content.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Genie from "../../../../components/genie";

export default function Stage3Content({ character, initialState, onStateChange, onNext }) {
  const [selectedImages, setSelectedImages] = useState(initialState?.selectedImages || {});
  const [genieMood, setGenieMood] = useState("3_thinking");
  const [genieText, setGenieText] = useState(
    "هل تستطيع تذكر الشخصيات التي وردت في النص المسموع؟ اضغط عليها لتتذكرها."
  );
  const [allCorrect, setAllCorrect] = useState(false);

  const images = [
    { id: 'friend', name: 'صديق أشعب', mentioned: false, imageUrl: '/images/listening/friend.png' },
    { id: 'owner', name: 'صاحب المنزل', mentioned: true, imageUrl: '/images/listening/owner.png' },
    { id: 'passerby', name: 'أحد المارة', mentioned: true, imageUrl: '/images/listening/passerby.png' },
    { id: 'ashab', name: 'أشعب', mentioned: true, imageUrl: '/images/listening/ashab.png' },
    { id: 'juha', name: 'جحا', mentioned: false, imageUrl: '/images/listening/juha.png' }
  ];

  useEffect(() => {
    onStateChange({ selectedImages });
  }, [selectedImages, onStateChange]);

  const handleImageClick = (img) => {
    if (selectedImages[img.id]) return;

    if (img.mentioned) {
      setSelectedImages(prev => ({ ...prev, [img.id]: true }));
      setGenieMood("1_joy");
      setGenieText("أحسنت! هذه الشخصية وردت في النص.");
    } else {
      setGenieMood("2_encouragement");
      setGenieText("هذه الشخصية لم تذكر، حاول مرة أخرى.");
    }
  };

  const allCorrectSelected = images.filter(img => img.mentioned).every(img => selectedImages[img.id]);

  useEffect(() => {
    if (allCorrectSelected && !allCorrect) {
      setAllCorrect(true);
      setGenieMood("7_celebration");
      setGenieText("رائع! لقد تعرفت على جميع الشخصيات.");
    }
  }, [allCorrectSelected, allCorrect]);

  return (
    <div className="text-center mt-6 flex flex-col items-center px-4 sm:px-8">
      <Genie
        character={character}
        mood={genieMood}
        text={genieText}
        visible={true}
        position="bottom-center"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 max-w-2xl">
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => handleImageClick(img)}
            className={`cursor-pointer transition-all duration-300 ${
              selectedImages[img.id] ? "opacity-100" : "opacity-70"
            }`}
          >
            <img
              src={img.imageUrl}
              alt={img.name}
              className={`w-full h-auto rounded-xl shadow-lg transition-all duration-300 ${
                selectedImages[img.id] ? "filter-none" : "grayscale"
              }`}
            />
            <p className="mt-2 text-sm font-semibold text-gray-700">{img.name}</p>
          </div>
        ))}
      </div>

      {allCorrect && (
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
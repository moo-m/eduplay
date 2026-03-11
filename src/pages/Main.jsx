import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StationCard from "../components/StationCard";
import ProgressBar from "../components/ProgressBar";
import PinModal from "../components/PinModal";
import WelcomePopup from "../components/WelcomePopup";
import { initProgress, getProgress, unlockStation } from "../utils/storage";
import { UNIVERSAL_PIN } from "../config";
import { BADGES } from "../config/badgesConfig";

const STATIONS = [
  { id: "listening", name: "الاستماع", icon: "🎧", code: "48271" },
  { id: "speaking", name: "التحدث", icon: "🗣️", code: "59364" },
  { id: "reading", name: "القراءة", icon: "📖", code: "71429" },
  { id: "writing", name: "الكتابة", icon: "✍️", code: "86035" },
  { id: "grammar", name: "أبني لغتي", icon: "💡", code: "92518" },
];

export default function Main({ selectedCharacter }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [activeStation, setActiveStation] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  const completedStations = progress
    ? Object.entries(progress.stations)
        .filter(([_, status]) => status === "completed")
        .map(([id]) => id)
    : [];

  const welcomeMessages = selectedCharacter
    ? [
        `أهلاً بك في مغامرة التعلم! أنا ${selectedCharacter.name}، وسأكون مرشدك في هذه الرحلة الممتعة.`,
        "سأساعدك في حل التحديات، وسأقدم لك التلميحات عند الحاجة، وسأحتفل معك بكل إنجاز تحققه.",
        "اختر المحطة التي تريد البدء بها، ودعنا ننطلق! 🚀",
      ]
    : [];

  useEffect(() => {
    initProgress();
    setProgress(getProgress());
  }, []);

  useEffect(() => {
    if (selectedCharacter) {
      const hasSeen = localStorage.getItem("hasSeenGenieWelcome");
      if (!hasSeen) {
        setShowWelcome(true);
        localStorage.setItem("hasSeenGenieWelcome", "true");
      }
    }
  }, [selectedCharacter]);

  const openStation = (station) => {
    if (progress.stations[station.id] === "locked") {
      setActiveStation(station);
    } else {
      navigate(`/stations/${station.id}`);
    }
  };

  const handlePin = (pin) => {
    if (!activeStation) return;

    if (pin === activeStation.code || pin === UNIVERSAL_PIN) {
      unlockStation(activeStation.id);
      setProgress(getProgress());
      navigate(`/stations/${activeStation.id}`);
      setActiveStation(null);
    }
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const getGenieImage = (step) => {
    if (!selectedCharacter) return "";
    let mood = "main";
    if (step === 1) mood = "1_joy";
    else if (step === 2) mood = "7_celebration";
    return mood === "main"
      ? `/images/genie/${selectedCharacter.key}/main.png`
      : `/images/genie/${selectedCharacter.key}/portrait_${mood}.png`;
  };

  if (!progress) return null;

  const percent =
    (Object.values(progress.stations).filter((s) => s === "completed").length /
      STATIONS.length) *
    100;

  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-6 relative">
      <WelcomePopup
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        character={selectedCharacter}
        messages={welcomeMessages}
        getGenieImage={getGenieImage}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
          الوحدة الثامنة
        </h1>
        <button
          onClick={() => setShowBadges(!showBadges)}
          className="relative bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-xl font-bold shadow transition"
        >
          🏆 الإنجازات
          {completedStations.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {completedStations.length}
            </span>
          )}
        </button>
      </div>

      {showBadges && (
        <div className="absolute left-4 top-20 z-50 bg-white rounded-2xl shadow-xl p-4 w-64 border-2 border-yellow-300">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">الشارات</h3>
            <button onClick={() => setShowBadges(false)} className="text-gray-500">✕</button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {STATIONS.map((station) => {
              const badge = BADGES[station.id];
              const isCompleted = completedStations.includes(station.id);
              return badge ? (
                <div
                  key={station.id}
                  className={`flex items-center gap-3 p-2 rounded-lg transition ${
                    isCompleted ? "bg-amber-50" : "bg-gray-100 opacity-70"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xl ${
                      isCompleted ? badge.color : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {isCompleted ? badge.icon : "🔒"}
                  </span>
                  <span className={`font-semibold ${isCompleted ? "" : "text-gray-500"}`}>
                    {badge.name}
                  </span>
                  {isCompleted && (
                    <span className="mr-auto text-green-600 text-sm">✔</span>
                  )}
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto mt-4">
        <ProgressBar value={percent} />
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mt-8">
        {STATIONS.map((station) => (
          <StationCard
            key={station.id}
            station={station}
            status={progress.stations[station.id]}
            onClick={() => openStation(station)}
          />
        ))}
      </div>

      {activeStation && (
        <PinModal onClose={() => setActiveStation(null)} onConfirm={handlePin} />
      )}
    </div>
  );
}
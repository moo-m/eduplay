import { useState, useRef, useEffect } from "react";

export default function StationLayout({
  stationName,
  stageIndex,
  totalStages,
  collectedWords = [],
  onWordBoxClick,
  children,
  completedStages = [],
  onStageSelect,
}) {
  const [showStagesMenu, setShowStagesMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // إغلاق القائمة عند الضغط خارجها
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

  // نسبة التقدم
  const progress = totalStages > 0 ? ((stageIndex + 1) / totalStages) * 100 : 0;

  return (
    <div className="min-h-screen bg-orange-50 relative">
      {/* ================= HEADER ================= */}
      <div className="bg-white shadow-md p-4 relative z-30">
        {/* الصف العلوي */}
        <div className="flex items-center justify-between mb-3">
          {/* اسم المحطة + زر المراحل */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-orange-600">{stationName}</h1>

            <button
              ref={buttonRef}
              onClick={() => setShowStagesMenu((prev) => !prev)}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg transition-colors"
              title="عرض المراحل"
            >
              ☰
            </button>
          </div>

          {/* زر الإنجازات */}
          <button
            onClick={onWordBoxClick}
            className="relative bg-yellow-400 px-4 py-2 rounded-xl font-bold shadow hover:scale-105 transition-transform"
          >
            🏆 الإنجازات
            {collectedWords.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {collectedWords.length}
              </span>
            )}
          </button>
        </div>

        {/* شريط التقدم */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-orange-400 h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* قائمة المراحل المنبثقة */}
        <div
          ref={menuRef}
          className={`absolute top-14 left-4 z-40 bg-white rounded-2xl shadow-xl p-4 w-64 border-2 border-orange-300 transition-all duration-300 ${
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
              const isCompleted = completedStages.includes(stageNum);
              const isCurrent = stageIndex === stageNum;
              const isClickable = isCompleted && stageNum < stageIndex;

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
                      : isCompleted
                      ? "bg-green-50 hover:bg-green-100 cursor-pointer"
                      : "bg-gray-100 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      isCurrent
                        ? "bg-orange-500 text-white"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {stageNum + 1}
                  </span>

                  <span className="font-semibold">
                    {isCurrent ? "الحالية" : isCompleted ? "مكتملة" : "غير متاحة"}
                  </span>

                  {isCompleted && stageNum < stageIndex && (
                    <span className="mr-auto text-green-600 text-sm">✔</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= محتوى المرحلة ================= */}
      <div className="p-6">{children}</div>
    </div>
  );
}

import React from 'react';
import ProgressBar from './ProgressBar';
import WordBoxPopover from './WordBoxPopover';

const StationLayout = ({
  stationName,
  stationId,
  stageIndex,
  totalStages,
  collectedWords,
  onWordBoxClick,
  showWordBox,
  setShowWordBox,
  children,
}) => {
  const progressPercent = Math.round((stageIndex / totalStages) * 100);
  const isCompleted = stageIndex >= totalStages;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <header className="bg-orange-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold text-purple-800">
          {stationName}
        </h1>

        <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
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
      </header>

      <main className="flex-1 px-4 sm:px-8 py-6">{children}</main>

      {showWordBox && (
        <WordBoxPopover
          words={collectedWords}
          onClose={() => setShowWordBox(false)}
          isCompleted={isCompleted}
          stationId={stationId} // ✅ تأكد من تمريرها
        />
      )}
    </div>
  );
};

export default StationLayout;
// src/components/questions/AudioQuestion.jsx
import { useState, useRef, useEffect } from "react";

export default function AudioQuestion({
  question,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  disabled = false,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
      if (onTimeUpdate) onTimeUpdate(audio.currentTime);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onEnded) onEnded();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isDragging, onEnded, onTimeUpdate]);

  const togglePlay = () => {
    if (disabled) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
      if (onPlay) onPlay();
    } else {
      audio.pause();
      setIsPlaying(false);
      if (onPause) onPause();
    }
  };

  const handleReplay = () => {
    if (disabled) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
    if (onPlay) onPlay();
  };

  const handleProgressChange = (e) => {
    if (disabled) return;
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = (e) => {
    setIsDragging(false);
    // قد نحتاج لتحديث الوقت بعد السحب
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <p className="text-lg font-semibold mb-4 text-center">{question.text}</p>
      <audio ref={audioRef} src={question.audioUrl} preload="metadata" />

      {/* شريط التقدم */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-600 w-12 text-left">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          onMouseDown={handleProgressMouseDown}
          onMouseUp={handleProgressMouseUp}
          disabled={disabled}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${
              (currentTime / (duration || 1)) * 100
            }%, #e5e7eb ${(currentTime / (duration || 1)) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <span className="text-sm text-gray-600 w-12 text-right">
          {formatTime(duration)}
        </span>
      </div>

      {/* أزرار التحكم */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={handleReplay}
          disabled={disabled}
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          title="إعادة"
        >
          ↺
        </button>
        <button
          onClick={togglePlay}
          disabled={disabled}
          className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center text-2xl transition disabled:opacity-50"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </div>
  );
}
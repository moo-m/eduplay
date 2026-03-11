// src/pages/stations/listening/components/Stage2Content.jsx

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import Genie from "../../../../components/genie";

export default function Stage2Content({ character, onComplete }) {

const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [audioPlayed, setAudioPlayed] = useState(false);

const [genieMood, setGenieMood] = useState("1_joy");
const [genieText, setGenieText] = useState(
"أحسنت! استمع الآن إلى النص بعناية."
);

const audioRef = useRef(null);
const canvasRef = useRef(null);

// waveform بسيط
const waveform = useRef(
Array.from({ length: 100 }, () => Math.random() * 0.6 + 0.2)
);

useEffect(() => {

const audio = audioRef.current;

const loaded = () => setDuration(audio.duration);

const update = () => {
  setCurrentTime(audio.currentTime);
  drawWaveform();
};

const ended = () => {

  setIsPlaying(false);
  setAudioPlayed(true);

  setGenieMood("7_celebration");
  setGenieText("رائع! أنهيت الاستماع.");

};

audio.addEventListener("loadedmetadata", loaded);
audio.addEventListener("timeupdate", update);
audio.addEventListener("ended", ended);

drawWaveform();

return () => {
  audio.removeEventListener("loadedmetadata", loaded);
  audio.removeEventListener("timeupdate", update);
  audio.removeEventListener("ended", ended);
};

}, []);

const drawWaveform = () => {

const canvas = canvasRef.current;
if (!canvas) return;

const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

ctx.clearRect(0, 0, width, height);

const bars = waveform.current;
const barWidth = width / bars.length;

const progress = duration ? currentTime / duration : 0;

bars.forEach((value, i) => {

  const x = i * barWidth;
  const barHeight = value * height;

  const played = i / bars.length < progress;

  ctx.fillStyle = played ? "#f97316" : "#e5e7eb";

  ctx.fillRect(
    x,
    height / 2 - barHeight / 2,
    barWidth * 0.5,
    barHeight
  );

});

// مؤشر التقدم

const progressX = progress * width;

ctx.beginPath();
ctx.moveTo(progressX, 0);
ctx.lineTo(progressX, height);
ctx.strokeStyle = "#f97316";
ctx.lineWidth = 2;
ctx.stroke();

};

const togglePlay = () => {

const audio = audioRef.current;

if (audio.paused) {

  audio.play();
  setIsPlaying(true);

  setGenieMood("3_thinking");
  setGenieText("استمع جيدًا للنص.");

} else {

  audio.pause();
  setIsPlaying(false);

}

};

const replay = () => {

const audio = audioRef.current;

audio.currentTime = 0;
audio.play();

setIsPlaying(true);
setAudioPlayed(false);

};

const handleWaveClick = (e) => {

const canvas = canvasRef.current;
const rect = canvas.getBoundingClientRect();

const x = e.clientX - rect.left;

const percent = x / rect.width;

const newTime = percent * duration;

audioRef.current.currentTime = newTime;

setCurrentTime(newTime);

};

const formatTime = (seconds) => {

if (!seconds) return "0:00";

const m = Math.floor(seconds / 60);
const s = Math.floor(seconds % 60);

return `${m}:${s < 10 ? "0" : ""}${s}`;

};

return (

<div className="min-h-screen flex flex-col items-center pt-20 pb-32 px-6 bg-gradient-to-b from-purple-50 via-white to-orange-50">

  <Genie
    character={character}
    mood={genieMood}
    text={genieText}
    visible={true}
    position="bottom-center"
  />

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-16 w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 border border-gray-100"
  >

    <h2 className="text-2xl font-bold text-purple-700 mb-10 text-center">
      🎧 استمع إلى النص
    </h2>

    <audio ref={audioRef} preload="metadata">
      <source src="/audio/listening/stage2.mp3" type="audio/mpeg" />
    </audio>

    {/* waveform */}

    <canvas
      ref={canvasRef}
      width={900}
      height={100}
      onClick={handleWaveClick}
      className="w-full cursor-pointer mb-6"
    />

    {/* الوقت */}

    <div className="flex justify-between text-sm text-gray-500 mb-10">
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>

    {/* الأزرار */}

    <div className="flex justify-center items-center gap-8">

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={replay}
        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <RotateCcw size={20} />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg"
      >
        {isPlaying ? <Pause size={28}/> : <Play size={28}/>}
      </motion.button>

    </div>

    {audioPlayed && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-8 text-green-600 font-semibold"
      >
        ✓ تم الاستماع إلى النص
      </motion.div>
    )}

  </motion.div>

<motion.button
  whileHover={{ scale: audioPlayed ? 1.05 : 1 }}
  whileTap={{ scale: audioPlayed ? 0.95 : 1 }}
  onClick={() => onComplete()}   // ← التعديل هنا (بدلاً من onNext)
  disabled={!audioPlayed}
  className={`mt-12 px-12 py-4 rounded-full text-lg font-bold shadow transition ${
    audioPlayed
      ? "bg-green-500 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  المرحلة التالية
</motion.button>

</div>

);
}
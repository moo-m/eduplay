import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Genie from "../../../../components/genie";

export default function Stage2({ character, onNext }) {
    const [audioPlayed, setAudioPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [genieMood, setGenieMood] = useState("1_joy");
    const [genieText, setGenieText] = useState(
        "أحسنت! لقد أكملت المرحلة الأولى بنجاح. الآن استمع جيدًا للنص المسموع."
    );
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const setAudioDuration = () => setDuration(audio.duration);
        const handleEnd = () => {
            setIsPlaying(false);
            setAudioPlayed(true);
            setGenieMood("7_celebration");
            setGenieText("أحسنت! لقد استمعت للنص كاملاً. يمكنك الآن الانتقال.");
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", setAudioDuration);
        audio.addEventListener("ended", handleEnd);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", setAudioDuration);
            audio.removeEventListener("ended", handleEnd);
        };
    }, []);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
            if (!audioPlayed) {
                setGenieMood("3_thinking");
                setGenieText("استمع جيدًا، ثم اضغط على زر التالي.");
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const handleReplay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
        setAudioPlayed(false);
        setGenieMood("3_thinking");
        setGenieText("استمع جيدًا مرة أخرى.");
    };

    const handleNext = () => {
        onNext("واعٍ");
    };

    const formatTime = seconds => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="text-center mt-10 flex flex-col items-center min-h-screen px-4 sm:px-8">
            <Genie
                character={character}
                mood={genieMood}
                text={genieText}
                visible={true}
                position="bottom-center"
            />

            <div className="mt-16 w-full max-w-md bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <audio ref={audioRef} preload="metadata" className="hidden">
                    <source
                        src="/audio/listening.MP3"
                        type="audio/mpeg"
                    />
                    المتصفح لا يدعم تشغيل الصوت.
                </audio>

                {/* شريط التقدم */}
                <div className="relative w-full h-2 bg-gray-200 rounded-full mb-2 overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* عرض الوقت */}
                <div className="flex justify-between text-sm font-medium text-gray-600 mb-6">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                {/* أزرار التحكم بنصوص عربية */}
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={handleReplay}
                        className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition shadow-sm"
                    >
                        إعادة
                    </button>
                    <button
                        onClick={handlePlayPause}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-md hover:shadow-lg transition"
                    >
                        {isPlaying ? "إيقاف" : "تشغيل"}
                    </button>
                </div>

                {/* رسالة تأكيد الاستماع */}
                {audioPlayed && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-emerald-600 font-semibold text-center"
                    >
                        ✓ استمعت إلى النص بنجاح
                    </motion.p>
                )}
            </div>

            {/* زر التالي */}
            <button
                onClick={handleNext}
                disabled={!audioPlayed}
                className={`mt-8 px-10 py-4 rounded-full font-bold text-lg shadow-lg transition ${
                    audioPlayed
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                        : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
            >
                التالي
            </button>
        </div>
    );
}

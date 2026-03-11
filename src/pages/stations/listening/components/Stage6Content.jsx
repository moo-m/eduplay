// Stage6Content.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Genie from "../../../../components/genie";

export default function Stage6Content({ character, onNext }) {
    const sentences = [
        {
            text: "سوف أَصْحَبُكَ معي إلى وليمةٍ عظيمة.",
            coloredWord: "وليمة",
            options: [
                { text: "مَأْدُبَة", correct: true },
                { text: "مَطْعَم", correct: false }
            ],
            successMessage: "أحسنت! الوليمة تعني مأدبة."
        },
        {
            text: "أخرجَ أَشْعَبُ كِسْرَةً من الخُبْزِ.",
            coloredWord: "كِسْرَة",
            options: [
                { text: "رَغِيف", correct: false },
                { text: "قِطْعَة", correct: true }
            ],
            successMessage: "رائع! الكسرة هي قطعة من الخبز."
        },
        {
            text: "كانَ البَطُّ يَقِظًا.",
            coloredWord: "يَقِظًا",
            options: [
                { text: "مُنْتَبِهًا", correct: true },
                { text: "مُسْتَعِدًّا", correct: false }
            ],
            successMessage: "أحسنت! لقد عرفت معاني الكلمات جميعها."
        }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [genieMood, setGenieMood] = useState("main");
    const [genieText, setGenieText] = useState("اسحبني نحو المعنى الصحيح.");
    const [hoveredOption, setHoveredOption] = useState(null);

    const genieRef = useRef(null);
    const optionRefs = useRef([]);

    const current = sentences[currentIndex];

    /* =========================
     Helpers
  ========================== */

    const getRect = el => el.getBoundingClientRect();

    const isOverlapping = (rect1, rect2) => {
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    };

    /* =========================
     Drag Tracking
  ========================== */

    const handleDrag = () => {
        if (!genieRef.current) return;

        const genieRect = getRect(genieRef.current);
        let found = false;

        optionRefs.current.forEach((ref, index) => {
            if (!ref) return;

            const optionRect = getRect(ref);

            if (isOverlapping(genieRect, optionRect)) {
                found = true;

                if (current.options[index].correct) {
                    setHoveredOption(index);
                    setGenieMood("1_joy");
                    setGenieText("أفلتني هنا!");
                } else {
                    setHoveredOption(null);
                    setGenieMood("2_encouragement");
                    setGenieText("ليست الإجابة الصحيحة.");
                }
            }
        });

        // إذا ابتعد عن جميع الإجابات
        if (!found) {
            setHoveredOption(null);
            setGenieMood("main");
            setGenieText("اسحبني نحو المعنى الصحيح.");
        }
    };

    /* =========================
     Drop
  ========================== */

    const handleDrop = () => {
        if (!genieRef.current) return;

        const genieRect = getRect(genieRef.current);

        optionRefs.current.forEach((ref, index) => {
            if (!ref) return;

            const optionRect = getRect(ref);

            if (
                isOverlapping(genieRect, optionRect) &&
                current.options[index].correct
            ) {
                setGenieMood("7_celebration");
                setGenieText(current.successMessage);

                setTimeout(() => {
                    if (currentIndex === sentences.length - 1) {
                        onNext("الفهم");
                    } else {
                        setCurrentIndex(prev => prev + 1);
                        setGenieMood("main");
                        setGenieText("اسحبني نحو المعنى الصحيح.");
                        setHoveredOption(null);
                    }
                }, 1000);
            }
        });
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start pt-16 px-4">
            {/* الجملة مع تلوين الكلمة */}
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl mb-16">
                <p className="text-lg leading-relaxed">
                    {current.text
                        .split(current.coloredWord)
                        .map((part, i, arr) => (
                            <span key={i}>
                                {part}
                                {i < arr.length - 1 && (
                                    <span className="text-amber-600 font-bold text-xl">
                                        {current.coloredWord}
                                    </span>
                                )}
                            </span>
                        ))}
                </p>
            </div>

            {/* الخيارات */}
            <div className="flex flex-col sm:flex-row gap-20 mb-32">
                {current.options.map((option, index) => (
                    <motion.div
                        key={index}
                        ref={el => (optionRefs.current[index] = el)}
                        animate={{
                            scale: hoveredOption === index ? 1.1 : 1
                        }}
                        className="px-12 py-6 rounded-2xl shadow-md
                       bg-indigo-100 border-2 border-indigo-300
                       text-indigo-800 text-lg font-semibold
                       transition-all"
                    >
                        {option.text}
                    </motion.div>
                ))}
            </div>

            {/* الجني يبدأ أسفل الشاشة */}
            <motion.div
                ref={genieRef}
                drag
                dragMomentum={false}
                onDrag={handleDrag}
                onDragEnd={handleDrop}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] cursor-grab active:cursor-grabbing"
            >
                <Genie
                    character={character}
                    mood={genieMood}
                    text={genieText}
                    isDraggable={false}
                    position="bottom-center"
                />
            </motion.div>
        </div>
    );
}

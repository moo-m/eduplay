// components/Genie.jsx
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

export default function Genie({
    character,
    text,
    mood = "main",
    visible = true,
    position = "bottom-center",
    imgClassName = "h-24 sm:h-32",
    isDraggable = true
}) {
    const constraintsRef = useRef(null);

    if (!character) return null;

    const imagePath =
        mood === "main"
            ? `/images/genie/${character.key}/main.png`
            : `/images/genie/${character.key}/portrait_${mood}.png`;

    const animations = {
        main: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
        "1_joy": {
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0],
            transition: { repeat: Infinity, duration: 1.5 }
        },
        "2_encouragement": {
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0],
            transition: { repeat: Infinity, duration: 2 }
        },
        "3_thinking": {
            rotate: [0, -5, 5, 0],
            transition: { repeat: Infinity, duration: 2 }
        },
        "4_surprise": {
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 1 }
        },
        "5_sadness": {
            y: [0, 5, 0],
            transition: { repeat: Infinity, duration: 2 }
        },
        "6_challenge": {
            x: [0, -5, 5, 0],
            transition: { repeat: Infinity, duration: 1.5 }
        },
        "7_celebration": {
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0],
            transition: { repeat: Infinity, duration: 1.5 }
        },
        "8_approval": {
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 1.2 }
        }
    };

    const positionClasses = {
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
        "bottom-left": "bottom-0 left-4",
        "bottom-right": "bottom-0 right-4",
        "top-center": "top-0 left-1/2 -translate-x-1/2",
        "top-left": "top-0 left-4",
        "top-right": "top-0 right-4"
    };

    return (
        <>
            {isDraggable && (
                <div
                    ref={constraintsRef}
                    className="fixed inset-0 pointer-events-none"
                />
            )}

            <AnimatePresence>
                {visible && (
                    <motion.div
                        drag={isDraggable}
                        dragConstraints={isDraggable ? constraintsRef : false}
                        dragElastic={0.8}
                        dragMomentum
                        whileDrag={
                            isDraggable
                                ? {
                                      scale: 1.05,
                                      opacity: 0.7,
                                      cursor: "grabbing"
                                  }
                                : {}
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className={`fixed ${
                            positionClasses[position] ||
                            positionClasses["bottom-center"]
                        } flex flex-col items-center z-[9999] p-2 sm:p-4`}
                    >
                        {text && (
                            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg mb-3 max-w-xs text-center">
                                <p className="text-gray-800 font-semibold text-sm sm:text-base">
                                    {text}
                                </p>
                            </div>
                        )}

                        <motion.img
                            src={imagePath}
                            alt={character.name}
                            className={imgClassName}
                            animate={animations[mood] || animations.main}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

Genie.propTypes = {
    character: PropTypes.object.isRequired,
    text: PropTypes.string,
    mood: PropTypes.string,
    visible: PropTypes.bool,
    position: PropTypes.string,
    imgClassName: PropTypes.string,
    isDraggable: PropTypes.bool
};



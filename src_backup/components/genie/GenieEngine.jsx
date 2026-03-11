
// src/components/genie/GenieEngine.jsx
import { useGenie } from "./GenieContext";
import { useState } from "react";

export function useGenieEngine(options = { autoHideAfterComplete: true, hideDelay: 3000 }) {
  const { genieState, setMood, updatePerformance } = useGenie();
  const [visible, setVisible] = useState(true);

  const showGenie = () => setVisible(true);
  const hideGenie = () => setVisible(false);

  const setMoodAndMessage = (mood, message) => {
    setMood(mood, message);
    showGenie();
  };

  const handleAnswer = (isCorrect, customMessage = "") => {
    setVisible(true);

    const currentStreak = genieState.performance.streak;
    const newStreak = isCorrect ? currentStreak + 1 : 0;

    updatePerformance(isCorrect);

    if (isCorrect) {
      if (newStreak >= 3) {
        setMood("7_celebration", customMessage || "مذهل! سلسلة إجابات صحيحة 🎉");
      } else if (newStreak >= 2) {
        setMood("8_approval", customMessage || "ممتاز! استمر 👍");
      } else {
        setMood("1_joy", customMessage || "إجابة صحيحة 👏");
      }
    } else {
      const wrongCount = genieState.performance.wrong + 1;
      if (wrongCount >= 3) {
        setMood("3_thinking", customMessage || "دعني أفكر معك...  🤔");
      } else {
        setMood("2_encouragement", customMessage || "لا بأس… حاول مرة أخرى 👀");
      }
    }
  };

  const handleStageStart = (message = "") => {
    setVisible(true);
    setMood("main", message);
  };

  const handleStageComplete = (message = "لقد أكملت المرحلة بنجاح! 🏅") => {
    setVisible(true);
    setMood("7_celebration", message);

    if (options.autoHideAfterComplete) {
      setTimeout(() => {
        setVisible(false);
      }, options.hideDelay);
    }
  };

  const handleHint = (message = "إليك تلميح... 💡") => {
    setVisible(true);
    setMood("3_thinking", message);
  };

  return {
    mood: genieState.mood,
    message: genieState.message,
    performance: genieState.performance,
    visible,
    handleAnswer,
    handleStageStart,
    handleStageComplete,
    handleHint,
    showGenie,
    hideGenie,
    setMoodAndMessage,
  };
}
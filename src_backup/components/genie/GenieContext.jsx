
// src/components/genie/GenieContext.jsx
import { createContext, useContext, useState } from "react";

const GenieContext = createContext();

export function GenieProvider({ children }) {
  const [genieState, setGenieState] = useState({
    mood: "main",
    message: "",
    performance: {
      correct: 0,
      wrong: 0,
      streak: 0,
    },
  });

  const updatePerformance = (isCorrect) => {
    setGenieState((prev) => {
      const newCorrect = isCorrect ? prev.performance.correct + 1 : prev.performance.correct;
      const newWrong = !isCorrect ? prev.performance.wrong + 1 : prev.performance.wrong;
      const newStreak = isCorrect ? prev.performance.streak + 1 : 0;

      return {
        ...prev,
        performance: {
          correct: newCorrect,
          wrong: newWrong,
          streak: newStreak,
        },
      };
    });
  };

  const setMood = (mood, message = "") => {
    setGenieState((prev) => ({
      ...prev,
      mood,
      message,
    }));
  };

  return (
    <GenieContext.Provider
      value={{
        genieState,
        setMood,
        updatePerformance,
      }}
    >
      {children}
    </GenieContext.Provider>
  );
}

export const useGenie = () => useContext(GenieContext);
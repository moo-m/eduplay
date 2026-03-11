import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Listening from "./pages/stations/listening/Listening";
import Speaking from "./pages/stations/speaking/Speaking.jsx";
import { GENIES } from "./components/genie/genieData";

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // تحميل الشخصية من localStorage أو استخدام جحا كافتراضي
  useEffect(() => {
    const saved = localStorage.getItem("selectedCharacter");
    if (saved) {
      setSelectedCharacter(JSON.parse(saved));
    } else {
      // تعيين الشخصية الافتراضية (جحا) وحفظها
      const defaultChar = GENIES[0];
      setSelectedCharacter(defaultChar);
      localStorage.setItem("selectedCharacter", JSON.stringify(defaultChar));
    }
  }, []);

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Home setSelectedCharacter={setSelectedCharacter} />} 
      />

      <Route
        path="/main"
        element={
          <Main selectedCharacter={selectedCharacter} />
        }
      />

      <Route
        path="/stations/listening"
        element={
          <Listening selectedCharacter={selectedCharacter} />
        }
      />
      <Route
        path="/stations/speaking"
        element={
          <Speaking selectedCharacter={selectedCharacter} />
        }
      />

      {/* باقي المحطات عند إضافتها */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
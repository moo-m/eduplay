import { useState } from "react";

export default function PinModal({ onClose, onConfirm }) {
  const [pin, setPin] = useState("");

  const handleConfirm = () => {
    onConfirm(pin);
    setPin("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-3xl w-full max-w-xs sm:max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">أدخل الرمز السري</h2>

        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          className="border w-full p-2 rounded-lg text-center mb-3 focus:outline-orange-400"
          placeholder="••••••"
        />

        <button
          onClick={handleConfirm}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto mb-2 sm:mb-0"
        >
          تأكيد
        </button>

        <button
          onClick={onClose}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto mb-2 sm:mb-0"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}

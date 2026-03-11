/**
 * StagePlaceholder.jsx - نموذج للمراحل القادمة
 *
 * طريقة الاستخدام الصحيحة لنظام الجني:
 *
 * 1. استورد useGenieEngine فقط - لا تحتاج لـ useState للـ mood أو feedback
 * 2. مرر mood و message مباشرة لمكوّن <Genie>
 * 3. استدع handleAnswer(true/false) عند كل إجابة
 * 4. استدع handleStageComplete() عند إنهاء المرحلة
 */

import Genie from "../../../../components/genie";
import { useGenieEngine } from "../../../../components/genie/GenieEngine";

export default function StagePlaceholder({ character, stageNumber, onNext }) {
  const { mood, message, handleAnswer, handleStageComplete, handleHint } = useGenieEngine();

  const handleCorrectAnswer = () => {
    handleAnswer(true, "أحسنت! 👏");
  };

  const handleWrongAnswer = () => {
    handleAnswer(false, "حاول مرة أخرى 💪");
  };

  const handleFinish = () => {
    handleStageComplete(`أكملت المرحلة ${stageNumber} بنجاح! 🎉`);
    setTimeout(() => onNext(`كلمة${stageNumber}`), 1200);
  };

  return (
    <div className="flex flex-col items-center text-center mt-20 px-4">

      {/* ✅ الجني يتحكم فيه النظام تلقائياً */}
      <Genie
        character={character}
        mood={mood}
        text={message || `مرحلة ${stageNumber}: استعد للعب والتعلم!`}
      />

      {/* منطقة النشاط */}
      <div className="mt-16 w-full max-w-md h-64 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-500">
        نشاط المرحلة {stageNumber} هنا
      </div>

      {/* أزرار تجريبية - تُزال عند بناء النشاط الحقيقي */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleCorrectAnswer}
          className="bg-green-400 text-white px-4 py-2 rounded-xl font-bold"
        >
          ✅ إجابة صحيحة
        </button>
        <button
          onClick={handleWrongAnswer}
          className="bg-red-400 text-white px-4 py-2 rounded-xl font-bold"
        >
          ❌ إجابة خاطئة
        </button>
        <button
          onClick={() => handleHint("تلميح: فكر جيداً 💡")}
          className="bg-blue-400 text-white px-4 py-2 rounded-xl font-bold"
        >
          💡 تلميح
        </button>
      </div>

      {/* زر إنهاء المرحلة */}
      <button
        onClick={handleFinish}
        className="mt-10 bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 transition"
      >
        إنهاء المرحلة
      </button>
    </div>
  );
}

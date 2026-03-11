// src/pages/stations/speaking/components/RecordingStage.jsx
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Download, Send } from "lucide-react";
import Genie from "../../../../components/genie";

export default function RecordingStage({ character, onRecordingComplete, onDownload, onSend, audioURL }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const startRecording = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(userStream);
      const recorder = new MediaRecorder(userStream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        onRecordingComplete(blob, url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      alert("لم نتمكن من الوصول إلى الميكروفون. تأكد من السماح به.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-amber-50 flex flex-col items-center p-6">
      <Genie
        character={character}
        mood="1_joy"
        text={audioURL ? "تسجيل رائع! يمكنك الآن تحميله أو إرساله." : "سجل قصتك الآن!"}
        visible={true}
        position="top-center"
      />

      <div className="mt-10 w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">سجل قصتك</h2>

        {!audioURL ? (
          <div className="flex justify-center">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl shadow-lg transition ${
                isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isRecording ? <Square size={32} /> : <Mic size={32} />}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <audio controls src={audioURL} className="w-full" />
            <div className="flex gap-4 justify-center">
              <button
                onClick={onDownload}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                <Download size={20} /> تحميل
              </button>
              <button
                onClick={onSend}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                <Send size={20} /> إرسال للمعلم
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-yellow-100 p-4 rounded-2xl max-w-md">
        <p className="font-bold text-purple-700 mb-2">تذكر دائمًا:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>⭐ استخدام اللغة السليمة</li>
          <li>⭐ تغيير نبرة الصوت</li>
          <li>⭐ إظهار روح الفكاهة</li>
          <li>⭐ استخدام تعبيرات الوجه</li>
        </ul>
      </div>
    </div>
  );
}
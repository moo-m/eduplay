// Stage_TalkingStation.jsx — محطة التحدث: طرفة جحا وحميره العشرة
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Genie from "../../../components/genie";

/* ─── الشخصيتان ─── */
const JUHA  = { id: 1, name: "جحا",  desc: "حكيم طريف",   key: "juha",  glow: "orange" };
const ASHAB = { id: 2, name: "أشعب", desc: "محبّ الطعام", key: "ashab", glow: "purple" };

/* ─── سيناريو الحوار الكامل ─── */
// كل خطوة: { char, mood, text, waitForNext? }
// عندما waitForNext = false → تنتقل تلقائياً بعد ظهور النص
// question: يُطلب من اللاعب اختيار الإجابة قبل المتابعة
const SCENES = [
  {
    id: 1,
    img: "/images/speaking/scene1.png",
    steps: [
      { char: "juha",  mood: "main",       text: "في أحد الأيام كنت أسير مع حميري في الطريق،\nفقررت أن أعدّها لأتأكد من عددها." },
      { char: "juha",  mood: "3_thinking", text: "بدأت أعدّها… واحد… اثنان… ثلاثة…\nوصلت إلى تسعة فقط!" },
      { char: "ashab", mood: "4_surprise", text: "تسعة فقط؟! هذا غريب!\nكم حمارًا وجد جحا عندما عدّ حميره؟",
        question: {
          options: ["ثمانية", "تسعة", "عشرة"],
          correct: 1,
          responses: [
            { mood: "5_sadness",     text: "لا، انظر مرة أخرى إلى المشهد.\nكم حمارًا شاهدت؟" },
            { mood: "7_celebration", text: "أحسنت! تسعة حمير بالضبط!\nهذا ما أربك جحا تمامًا!" },
            { mood: "5_sadness",     text: "عشرة؟ لو كانت عشرة ما كان جحا محتارًا!\nانظر إلى الصورة جيدًا." },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    img: "/images/speaking/scene2.png",
    steps: [
      { char: "juha",  mood: "main",       text: "تعجبت كثيرًا…\nكنت متأكدًا أن لديّ عشرة حمير!" },
      { char: "juha",  mood: "3_thinking", text: "عددتها وأنا جالس على ظهر أحدها…\nفلم أجد سوى تسعة!" },
      { char: "ashab", mood: "3_thinking", text: "إذن ماذا راح يفكر جحا الآن؟\nبماذا بدأ يفكر؟",
        question: {
          options: ["أين بيتي", "أين الحمار العاشر", "أين الطريق"],
          correct: 1,
          responses: [
            { mood: "5_sadness",     text: "لا، بيته ليس المشكلة!\nهو فقد شيئًا مهمًا. ماذا فقد؟" },
            { mood: "7_celebration", text: "بالضبط! أين الحمار العاشر؟\nهذا السؤال الذي حيّر جحا!" },
            { mood: "5_sadness",     text: "الطريق؟ لا!\nهو يعرف الطريق لكنه فقد شيئًا آخر." },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    img: "/images/speaking/scene3.png",
    steps: [
      { char: "juha",  mood: "3_thinking", text: "كنت في حيرة كبيرة…\nكيف اختفى الحمار العاشر؟!" },
      { char: "ashab", mood: "3_thinking", text: "فكّر معي قليلًا…\nلماذا كان جحا محتارًا جدًا؟",
        question: {
          options: ["نسي الطريق", "وجد حمير كثيرة", "عدّها فوجدها تسعة فقط"],
          correct: 2,
          responses: [
            { mood: "5_sadness",     text: "نسي الطريق؟ لا!\nالمشكلة في الحمير نفسها. أعد القراءة." },
            { mood: "5_sadness",     text: "حمير كثيرة؟ بالعكس!\nهو يظن أنه فقد حمارًا." },
            { mood: "7_celebration", text: "ممتاز! عدّها فوجدها تسعة فقط!\nبينما هو متأكد أن لديه عشرة." },
          ],
        },
      },
    ],
  },
  {
    id: 4,
    img: "/images/speaking/scene4.png",
    steps: [
      { char: "juha",  mood: "main",       text: "ثم خطرت لي فكرة رائعة!\nقررت أن أنزل من فوق حماري." },
      { char: "juha",  mood: "1_joy",      text: "نزلت… وبدأت أعدّ مرة أخرى…\nواحد… اثنان… عشرة! عشرة حمير!" },
      { char: "ashab", mood: "4_surprise", text: "آها! الآن فهمت السر!\nماذا اكتشف جحا عندما نزل؟",
        question: {
          options: ["الحمير تسعة", "الحمير عشرة", "الحمير أحد عشر"],
          correct: 1,
          responses: [
            { mood: "5_sadness",     text: "لا! لو كانت تسعة لظل محتارًا!\nماذا قال جحا بعد أن نزل؟" },
            { mood: "7_celebration", text: "رائع! الحمير عشرة!\nكان يعدّها وهو جالس على إحداها فنسيها!" },
            { mood: "5_sadness",     text: "أحد عشر؟ لا!\nاستمع جيدًا لما قاله جحا." },
          ],
        },
      },
    ],
  },
];

/* ══════════════════════════════════════════════════════════
   المكوّن الرئيسي
══════════════════════════════════════════════════════════ */
export default function SpeakingStageContent({ character, onNext }) {
  const [sceneIdx,    setSceneIdx]    = useState(0);
  const [stepIdx,     setStepIdx]     = useState(0);
  const [onStage,     setOnStage]     = useState(null);   // null | "juha" | "ashab"
  const [qState,      setQState]      = useState("hidden"); // hidden | visible | answered
  const [qSelected,   setQSelected]   = useState(null);
  const [qResponse,   setQResponse]   = useState(null);   // { mood, text } ردّ الشخصية
  const [phase,       setPhase]       = useState("story");
  const [recState,    setRecState]    = useState("idle");
  const [recSecs,     setRecSecs]     = useState(0);

  // موضع كل شخصية — يتحكم به مباشرة
  const [juhaPos,  setJuhaPos]  = useState({ y: 0, scale: 1 });
  const [ashabPos, setAshabPos] = useState({ y: 0, scale: 1 });

  const recTimer = useRef(null);
  const scene    = SCENES[sceneIdx];
  const step     = scene?.steps[stepIdx];
  const hasQ     = !!step?.question;

  useEffect(() => () => clearInterval(recTimer.current), []);

  // تعريف انيميشن الرفع والعودة
  const RAISE_T  = { type: "spring", stiffness: 110, damping: 16, mass: 1.3 };
  const RETURN_T = { type: "spring", stiffness: 80,  damping: 14, mass: 1.5 };

  /* ─────────────────────────────────────────────
     رفع شخصية بالضغط عليها
  ───────────────────────────────────────────── */
  const raiseChar = useCallback((charKey) => {
    if (onStage === charKey) return;

    // أنزل الحالية أولاً
    if (onStage === "juha")  setJuhaPos({ y: 0, scale: 1 });
    if (onStage === "ashab") setAshabPos({ y: 0, scale: 1 });

    // ارفع الجديدة
    if (charKey === "juha")  setJuhaPos({ y: -160, scale: 1.22 });
    if (charKey === "ashab") setAshabPos({ y: -160, scale: 1.22 });

    setOnStage(charKey);
    setQState("hidden");
    setQSelected(null);
    setQResponse(null);

    if (step?.question) {
      setQState("visible");
    }
  }, [onStage, step]);

  /* ─────────────────────────────────────────────
     أنزل الشخصية الحالية يدوياً (زر "التالي")
  ───────────────────────────────────────────── */
  const lowerCurrent = useCallback(() => {
    if (!onStage) return;
    if (onStage === "juha")  setJuhaPos({ y: 0, scale: 1 });
    if (onStage === "ashab") setAshabPos({ y: 0, scale: 1 });
    setOnStage(null);

    const nextIdx = stepIdx + 1;
    if (nextIdx < scene.steps.length) {
      setStepIdx(nextIdx);
    }
  }, [onStage, stepIdx, scene]);

  /* ─────────────────────────────────────────────
     الإجابة على السؤال
  ───────────────────────────────────────────── */
  const handleAnswer = useCallback((i) => {
    if (qState === "answered") return;

    const q = step.question;
    const resp = q.responses[i];
    setQSelected(i);
    setQResponse(resp);
    setQState("answered");

    if (i === q.correct) {
      // إجابة صحيحة → انتقل للمشهد التالي بعد لحظة
      setTimeout(() => {
        const nextScene = sceneIdx + 1;
        // أنزل الشخصية أولاً
        const ctrl = onStage === "juha" ? setJuhaPos : setAshabPos;
        ctrl({ y: 0, scale: 1 });
        setOnStage(null);
        setQState("hidden");
        setQSelected(null);
        setQResponse(null);

        setTimeout(() => {
          if (nextScene >= SCENES.length) {
            setPhase("ending");
          } else {
            setSceneIdx(nextScene);
            setStepIdx(0);
          }
        }, 400);
      }, 1800);
    } else {
      // إجابة خاطئة → اعرض الرد ثم أعد الأسئلة
      setTimeout(() => {
        setQState("visible");
        setQSelected(null);
        setQResponse(null);
      }, 2000);
    }
  }, [qState, step, sceneIdx, onStage]);

  /* ─────────────────────────────────────────────
     حساب نص + mood كل شخصية
  ───────────────────────────────────────────── */
  const getGenieProps = (charKey) => {
    const isOnStage = onStage === charKey;
    const isActive  = step?.char === charKey;

    if (!isOnStage) {
      // في الأسفل: نص تشجيعي خفيف
      return { mood: "2_encouragement", text: "لدي تعليق!" };
    }

    // على المنصة
    if (qResponse && isOnStage) {
      // يعرض ردّ الإجابة
      return { mood: qResponse.mood, text: qResponse.text };
    }
    if (qState === "visible" && isOnStage) {
      // يعرض نص السؤال
      return { mood: step.mood, text: step.text };
    }
    if (isActive) {
      return { mood: step.mood, text: step.text };
    }
    return { mood: "main", text: null };
  };

  const juhaProps  = getGenieProps("juha");
  const ashabProps = getGenieProps("ashab");

  /* ─────────────────────────────────────────────
     تلميح: من يجب رفعه؟
  ───────────────────────────────────────────── */
  const hintChar = step?.char === "juha" ? "جحا" : "أشعب";
  const showHint = onStage === null && phase === "story";

  /* ─────────────────────────────────────────────
     تسجيل
  ───────────────────────────────────────────── */
  const startRec = () => {
    setRecState("rec"); setRecSecs(0);
    recTimer.current = setInterval(() => setRecSecs(s => s + 1), 1000);
  };
  const stopRec = () => {
    clearInterval(recTimer.current);
    setRecState("done");
  };

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <div
      className="relative w-full flex flex-col overflow-hidden"
      style={{ height: "100dvh", direction: "rtl", fontFamily: "'Tajawal', sans-serif", background: "#0a1628" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap" rel="stylesheet" />

      {/* ══════════════════════════════════
          القسم العلوي — صورة المشهد (55%)
      ══════════════════════════════════ */}
      <div className="relative flex-shrink-0" style={{ height: "55%" }}>

        {/* الصورة */}
        <AnimatePresence mode="wait">
          <motion.img
            key={phase === "ending" ? "end" : `scene-${sceneIdx}`}
            src={phase === "ending" ? SCENES[SCENES.length - 1].img : scene.img}
            alt=""
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* تدرج سفلي */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(10,22,40,0) 35%, rgba(10,22,40,1) 100%)" }} />

        {/* شريط التقدم */}
        {phase === "story" && (
          <div className="absolute top-3 left-4 right-4 flex gap-1.5 z-10">
            {SCENES.map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full transition-all duration-700"
                style={{ background: i < sceneIdx ? "#6366F1" : i === sceneIdx ? "white" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
        )}

        {/* نهاية القصة */}
        <AnimatePresence>
          {phase === "ending" && (
            <motion.div key="ending-lines"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
              {[
                { char: "أشعب", txt: "هاهاها! الآن فهمت السر!", color: "#7C3AED" },
                { char: "جحا",  txt: "كنت أعدّ الحمير وأنا جالس على إحداها فنسيتها!", color: "#D97706" },
              ].map(({ char, txt, color }, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.35 }}
                  className="rounded-xl px-4 py-2.5 border border-white/15"
                  style={{ background: "rgba(15,34,64,0.9)" }}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white ml-2"
                    style={{ background: color }}>{char}</span>
                  <span className="text-white text-sm">"{txt}"</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════
          القسم السفلي (45%)
      ══════════════════════════════════ */}
      <div className="relative flex-1 flex flex-col"
        style={{ background: "linear-gradient(to bottom,#0f2240,#0a1628)" }}>

        {/* ─── منطقة المحتوى (أسئلة / زر / تسجيل / تلميح) ─── */}
        <div className="flex-1 flex items-center justify-center px-4 pt-2">
          <AnimatePresence mode="wait">

            {/* تلميح الرفع */}
            {showHint && (
              <motion.div key="hint"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.p
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="text-white/50 text-sm font-bold text-center bg-white/8 px-5 py-2 rounded-full border border-white/10"
                  style={{ fontFamily: "'Tajawal', sans-serif" }}>
                  اسحب {hintChar} للأعلى ليبدأ الحديث ↑
                </motion.p>
              </motion.div>
            )}

            {/* زر "التالي" — يظهر فقط إذا الشخصية على المنصة وليس هناك سؤال */}
            {phase === "story" && onStage && !hasQ && qState === "hidden" && (
              <motion.div key="next-btn"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <motion.button
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                  onClick={lowerCurrent}
                  className="px-8 py-3 rounded-2xl text-white font-bold text-base border border-white/20"
                  style={{
                    background: "rgba(99,102,241,0.35)",
                    backdropFilter: "blur(8px)",
                    fontFamily: "'Tajawal', sans-serif",
                  }}>
                  {stepIdx < scene.steps.length - 1
                    ? `أنزل ${onStage === "juha" ? "جحا" : "أشعب"} وارفع ${scene.steps[stepIdx + 1]?.char === "juha" ? "جحا" : "أشعب"} ▼`
                    : `انتهيت — أنزل ${onStage === "juha" ? "جحا" : "أشعب"} ▼`}
                </motion.button>
              </motion.div>
            )}

            {/* الأسئلة */}
            {phase === "story" && (qState === "visible" || qState === "answered") && (
              <motion.div key="question-panel"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="w-full max-w-md">
                <div className="rounded-2xl p-4 border border-white/15"
                  style={{ background: "rgba(30,58,95,0.92)", backdropFilter: "blur(12px)" }}>

                  {/* رد الشخصية على الإجابة */}
                  <AnimatePresence>
                    {qResponse && (
                      <motion.div key="q-response"
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-3 px-3 py-2 rounded-xl border text-center text-sm font-bold"
                        style={{
                          background: qSelected === step?.question?.correct
                            ? "rgba(5,150,105,0.25)" : "rgba(220,38,38,0.2)",
                          borderColor: qSelected === step?.question?.correct
                            ? "rgba(52,211,153,0.4)" : "rgba(252,165,165,0.4)",
                          color: qSelected === step?.question?.correct ? "#6EE7B7" : "#FCA5A5",
                          fontFamily: "'Tajawal', sans-serif",
                        }}>
                        {qResponse.text}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* الخيارات */}
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {step?.question?.options.map((opt, i) => {
                      const isCorrect = i === step.question.correct;
                      const isSelected = qSelected === i;
                      let cls = "bg-white/10 border-white/25 text-white hover:bg-white/20";
                      if (isSelected && qState === "answered") {
                        cls = isCorrect
                          ? "bg-emerald-500/90 border-emerald-400 text-white scale-105"
                          : "bg-red-500/80 border-red-400 text-white";
                      }
                      return (
                        <motion.button key={i}
                          whileHover={qState === "visible" ? { scale: 1.06 } : {}}
                          whileTap={qState === "visible" ? { scale: 0.94 } : {}}
                          onClick={() => qState === "visible" && handleAnswer(i)}
                          disabled={qState === "answered"}
                          className={`px-5 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${cls}`}
                          style={{ fontFamily: "'Tajawal', sans-serif" }}>
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* زر الانتقال لمحطة التسجيل */}
            {phase === "ending" && (
              <motion.div key="to-rec"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md">
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setPhase("recording")}
                  className="w-full py-4 rounded-2xl text-white font-black text-base"
                  style={{
                    background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                    boxShadow: "0 6px 28px rgba(99,102,241,0.45)",
                    fontFamily: "'Tajawal', sans-serif",
                  }}>
                  🎙️ الآن جاء دورك — انتقل إلى محطة التحدث
                </motion.button>
              </motion.div>
            )}

            {/* محطة التسجيل */}
            {phase === "recording" && (
              <motion.div key="recording"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md">
                <div className="rounded-2xl p-5 border border-white/15 text-center"
                  style={{ background: "rgba(30,58,95,0.95)" }}>
                  <p className="text-yellow-300 text-xs font-bold mb-4" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                    ⭐ اللغة السليمة &nbsp;·&nbsp; نبرة الصوت &nbsp;·&nbsp; روح الفكاهة &nbsp;·&nbsp; تعبيرات الوجه
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                    onClick={recState === "rec" ? stopRec : startRec}
                    className="w-16 h-16 rounded-full text-2xl mx-auto flex items-center justify-center border-4 border-white/20 mb-3"
                    style={{
                      background: recState === "rec"
                        ? "radial-gradient(circle,#ef4444,#dc2626)"
                        : "radial-gradient(circle,#10b981,#059669)",
                      boxShadow: recState === "rec"
                        ? "0 0 24px rgba(239,68,68,0.6)"
                        : "0 0 24px rgba(16,185,129,0.5)",
                    }}>
                    {recState === "rec" ? "⏹" : "🎙️"}
                  </motion.button>
                  {recState === "rec" && (
                    <motion.p animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                      className="text-red-300 text-xs font-bold mb-2" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                      ● يُسجَّل… {recSecs}ث
                    </motion.p>
                  )}
                  {recState === "idle" && (
                    <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                      اضغط لتبدأ التسجيل
                    </p>
                  )}
                  {recState === "done" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex gap-2 justify-center flex-wrap">
                      {[
                        { l: "🔄 إعادة",          fn: () => { setRecState("idle"); setRecSecs(0); } },
                        { l: "⬇️ تحميل",           fn: () => {} },
                        { l: "📲 إرسال للمعلم",    fn: () => {} },
                      ].map(({ l, fn }) => (
                        <button key={l} onClick={fn}
                          className="px-3 py-1.5 rounded-xl text-white text-xs font-bold bg-indigo-600 hover:bg-indigo-500 transition-colors"
                          style={{ fontFamily: "'Tajawal', sans-serif" }}>{l}</button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ─── الجنيّان يميناً وشمالاً — اضغط للرفع ─── */}
        <div className="flex-shrink-0 flex justify-between items-end px-6 pb-4">

          {/* جحا — يمين */}
          <motion.div
            onClick={() => raiseChar("juha")}
            animate={juhaPos}
            transition={RAISE_T}
            style={{
              cursor: onStage === "juha" ? "default" : "pointer",
              userSelect: "none",
              zIndex: onStage === "juha" ? 30 : 15,
              opacity: onStage === "ashab" ? 0.55 : 1,
              transition: "opacity 0.3s",
            }}
          >
            <Genie
              character={JUHA}
              mood={juhaProps.mood}
              text={juhaProps.text}
              visible
              isDraggable={false}
              position="bottom-right"
              imgClassName="h-28 sm:h-36"
            />
          </motion.div>

          {/* أشعب — يسار */}
          <motion.div
            onClick={() => raiseChar("ashab")}
            animate={ashabPos}
            transition={RAISE_T}
            style={{
              cursor: onStage === "ashab" ? "default" : "pointer",
              userSelect: "none",
              zIndex: onStage === "ashab" ? 30 : 15,
              opacity: onStage === "juha" ? 0.55 : 1,
              transition: "opacity 0.3s",
            }}
          >
            <Genie
              character={ASHAB}
              mood={ashabProps.mood}
              text={ashabProps.text}
              visible
              isDraggable={false}
              position="bottom-left"
              imgClassName="h-28 sm:h-36"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

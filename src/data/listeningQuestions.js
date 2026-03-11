// src/data/listeningQuestions.js
// const listeningQuestions = {
//     stage1: {
//         rewardWord: "الاستماع",
//         questions: [
//             {
//                 id: "q1",
//                 type: "multiple-choice",
//                 text: "ماذا ترى في الصورة؟",
//                 image: "/images/listening/prep_image.jpeg",
//                 options: [
//                     {
//                         id: "a1",
//                         text: "ثلاثة رجال، أحدهم يرحِّب بضيوفه.",
//                         correct: true
//                     },
//                     {
//                         id: "a2",
//                         text: "منزل طيني بتصميم تراثي.",
//                         correct: true
//                     },
//                     {
//                         id: "a3",
//                         text: "ثلاث بطات تقف عند مدخل البيت.",
//                         correct: true
//                     }
//                 ]
//             },
//             {
//                 id: "q2",
//                 type: "multiple-choice",
//                 text: "عمَّ تتوقع أن يدور النص المسموع؟",
//                 image: "/images/listening/prep_image.jpeg",
//                 options: [
//                     {
//                         id: "b1",
//                         text: "نوادر فكاهية لشخصيات تراثية كأشعب وجحا.",
//                         correct: true
//                     },
//                     {
//                         id: "b2",
//                         text: "مواقف طريفة تتعلَّق بالكرم أو الطمع.",
//                         correct: true
//                     },
//                     {
//                         id: "b3",
//                         text: "حيلة أو خدعة ذكية للحصول على شيء ما.",
//                         correct: true
//                     }
//                 ]
//             },
//             {
//                 id: "verse",
//                 type: "multiple-choice",
//                 text: "أكمل الآية: { قُلْ هُوَ ٱللَّهُ ... }",
//                 options: [
//                     { id: "v1", text: "أَحَدٌ", correct: true },
//                     { id: "v2", text: "ٱلرَّحْمَٰنُ", correct: false },
//                     { id: "v3", text: "ٱللَّهُ أَكْبَرُ", correct: false }
//                 ],
//                 hint: "سورة الإخلاص"
//             }
//         ]
//     },
//     stage2: {
//         rewardWord: "الجيد",
//         questions: [
//             {
//                 id: "audio1",
//                 type: "audio",
//                 text: "استمع إلى النص ثم أجب عن السؤال التالي.",
//                 audioUrl: "/audio/listening/stage2.mp3"
//             }
//         ]
//     },
//     stage3: {
//         rewardWord: "يظهر",
//         images: [
//             {
//                 id: "friend",
//                 name: "صديق أشعب",
//                 mentioned: false,
//                 imageUrl: "/images/listening/friend.png"
//             },
//             {
//                 id: "owner",
//                 name: "صاحب المنزل",
//                 mentioned: true,
//                 imageUrl: "/images/listening/owner.png"
//             },
//             {
//                 id: "passerby",
//                 name: "أحد المارة",
//                 mentioned: true,
//                 imageUrl: "/images/listening/passerby.png"
//             },
//             {
//                 id: "ashab",
//                 name: "أشعب",
//                 mentioned: true,
//                 imageUrl: "/images/listening/ashab.png"
//             },
//             {
//                 id: "juha",
//                 name: "جحا",
//                 mentioned: false,
//                 imageUrl: "/images/listening/juha.png"
//             }
//         ]
//     },
//     stage4: {
//         rewardWord: "الاحترام"
//     },
//     stage5: {
//         rewardWord: "ويعزز"
//     },
//     stage6: {
//         rewardWord: "الفهم"
//     },
//     stage7: {
//         rewardWord: "بين",
//         opening: {
//             ashab: "رائع! لقد وصلتَ إلى مرحلة جديدة.\nأريد أن أُخبرك بقصة حدثت معي، لكن بعض تفاصيلها تاهت من ذاكرتي…\nأشعر أنني كنتُ أفعل شيئًا مهمًا قرب البحيرة…\nهل تساعدني لأتذكّر؟",
//             juha: "أريد أن أُخبركم بقصة حدثت مع صديقي أشعب، لكن بعض تفاصيلها ضاعت مني… ساعدوني في ترتيبها."
//         },
//         steps: [
//             {
//                 questionAshab:
//                     "أتذكر أنني كنتُ أرغب في شيء… شيءٍ كنتُ ألاحقه بعيني… ما هو؟",
//                 questionJuha: "ماذا كان يرغب أشعب في البداية؟",
//                 options: [
//                     {
//                         text: "اللعب بالماء",
//                         correct: false,
//                         errorReplyAshab:
//                             "اللعب جميل… لكنني لم أكن في مزاج للهو.\nكان هناك شيء أشدّ إلحاحًا من اللعب…",
//                         errorReplyJuha: "أشعب لم يكن طفلاً ليلعب بالماء!"
//                     },
//                     { text: "اصطياد بطة", correct: true },
//                     {
//                         text: "بيع الخبز في السوق",
//                         correct: false,
//                         errorReplyAshab:
//                             "لو كنتُ أبيع الخبز، لما بقي معي كسرة يابسة!\nلا… لم أكن تاجرًا في تلك اللحظة.",
//                         errorReplyJuha: "أشعب تاجر؟ هذا جديد!"
//                     }
//                 ],
//                 correctLineAshab: "كنتُ أرغب في اصطياد بطة.",
//                 correctLineJuha: "كان أشعب يرغب في اصطياد بطة.",
//                 successReplyAshab: "نعم! الآن بدأتُ أتذكّر.",
//                 successReplyJuha: "أجل، هذا ما كان يصبو إليه."
//             },
//             {
//                 questionAshab: "لكن لماذا أردتُ اصطيادها؟ لم يكن الأمر عبثًا…",
//                 questionJuha: "لماذا أراد اصطياد البطة؟",
//                 options: [
//                     {
//                         text: "أردتُ التفاخر أمام الناس",
//                         correct: false,
//                         errorReplyAshab:
//                             "أنا؟ أتباهى بصيد بطة؟\nلم يكن هناك جمهور أصلًا!\nكان الدافع أقرب إلى بطني من عيني.",
//                         errorReplyJuha: "أشعب لا يفكر في التفاخر، بل في معدته!"
//                     },
//                     {
//                         text: "أعجبني منظرها فقط",
//                         correct: false,
//                         errorReplyAshab:
//                             "صحيح أنها جميلة… لكن الجمال لا يُسكت الجوع.",
//                         errorReplyJuha: "الجوع لا يهتم بالمناظر الجميلة!"
//                     },
//                     {
//                         text: "كنتُ جائعًا وأريد أن أتغذّى عليها وأسدَّ جوعي",
//                         correct: true
//                     }
//                 ],
//                 correctLineAshab:
//                     "لأنني كنتُ جائعًا وأريد أن أتغذّى عليها وأسدَّ جوعي.",
//                 correctLineJuha: "لأنه كان جائعًا وأراد أن يتغذى عليها.",
//                 successReplyAshab: "أجل… كان الجوع هو الحكاية كلها.",
//                 successReplyJuha: "الجوع كان دافعه."
//             },
//             {
//                 questionAshab: "حاولتُ كثيرًا… ترى، هل نجحتُ في الإمساك بها؟",
//                 questionJuha: "هل نجح في الإمساك بها؟",
//                 options: [
//                     { text: "لم أستطع الحصول عليها", correct: true },
//                     {
//                         text: "اصطدتُها بسهولة",
//                         correct: false,
//                         errorReplyAshab:
//                             "بسهولة؟! لو كان الأمر سهلًا، لما بقيتُ جائعًا!",
//                         errorReplyJuha: "لو اصطادها بسهولة لما سمعنا هذه القصة!"
//                     },
//                     {
//                         text: "أمسكتُ بها بعد مطاردة قصيرة",
//                         correct: false,
//                         errorReplyAshab:
//                             "كانت المطاردة أطول من قدرتي… لكنها انتهت بلا بطة.",
//                         errorReplyJuha: "حتى بعد مطاردة، لم ينجح!"
//                     }
//                 ],
//                 correctLineAshab: "حاولتُ كثيرًا، لكنني لم أستطع الحصول عليها.",
//                 correctLineJuha: "حاول كثيرًا، لكنه لم يستطع الحصول عليها.",
//                 successReplyAshab: "للأسف… كانت أسرع مني.",
//                 successReplyJuha: "للأسف، كانت البطة أسرع منه."
//             },
//             {
//                 questionAshab:
//                     "وحين لم أنجح… لم أعد خالي اليدين تمامًا… ماذا أخرجتُ من جيبي؟",
//                 questionJuha: "عندما لم ينجح، ماذا أخرج من جيبه؟",
//                 options: [
//                     {
//                         text: "شبكة صيد صغيرة",
//                         correct: false,
//                         errorReplyAshab:
//                             "لو كان معي شبكة، لما اكتفيتُ بالمحاولة!",
//                         errorReplyJuha: "أشعب لا يملك شبكة صيد!"
//                     },
//                     { text: "كسرة من الخبز اليابس", correct: true },
//                     {
//                         text: "قطعة نقود",
//                         correct: false,
//                         errorReplyAshab:
//                             "لو كنتُ أملك نقودًا، لذهبتُ إلى السوق… لكن جيبي كان أفقر من ذلك.",
//                         errorReplyJuha: "لو كان معه نقود لاشترى طعامًا!"
//                     }
//                 ],
//                 correctLineAshab: "فأخرجتُ كسرةً من الخبز اليابس.",
//                 correctLineJuha: "فأخرج كسرة من الخبز اليابس.",
//                 successReplyAshab: "نعم… كانت يابسة، لكنها كانت أملي.",
//                 successReplyJuha: "لم يكن معه سوى هذه الكسرة."
//             },
//             {
//                 questionAshab:
//                     "وماذا فعلتُ بتلك الكسرة؟ تذكّر… كنتُ قرب البحيرة.",
//                 questionJuha: "ماذا فعل بتلك الكسرة؟",
//                 options: [
//                     { text: "غمستُها في ماء البحيرة وأكلتُها", correct: true },
//                     {
//                         text: "رميتُها للبط",
//                         correct: false,
//                         errorReplyAshab:
//                             "أأرمي طعامي وأنا جائع؟ لا… لم أكن كريمًا إلى هذا الحد!",
//                         errorReplyJuha: "أشعب يرمي الطعام وهو جائع؟ مستحيل!"
//                     },
//                     {
//                         text: "احتفظتُ بها لليوم التالي",
//                         correct: false,
//                         errorReplyAshab:
//                             "جوعي لم يسمح لي بالانتظار… كان القرار فوريًا.",
//                         errorReplyJuha: "لا يمكنه الانتظار حتى الغد!"
//                     }
//                 ],
//                 correctLineAshab: "ثم غمستُها في ماء البحيرة وأكلتُها.",
//                 correctLineJuha: "ثم غمسها في ماء البحيرة وأكلها.",
//                 successReplyAshab: "أحسنت! هكذا عادت القصة كاملة إلى ذاكرتي.",
//                 successReplyJuha: "أحسنت! هكذا اكتملت القصة."
//             }
//         ]
//     },
//     stage8: {
//         rewardWord: "المتحدثين",
//         openingMessage:
//             "هيا نلعب لعبة المتشابهات! اختر جملتين لهما المعنى نفسه.",
//         successMessages: [
//             "أحسنت! الجملتان متشابهتان في المعنى.",
//             "رائع! استمر.",
//             "ممتاز يا بطل!",
//             "عمل جيد، واصل!",
//             "هكذا تكون المطابقة!"
//         ],
//         errorMessages: [
//             "حاول مرة أخرى.",
//             "فكّر في معنى الجملة.",
//             "ليس هذا التطابق الصحيح.",
//             "اقتربت، جرب زوجاً آخر.",
//             "انتبه للمعنى!"
//         ],
//         completionMessage: "أحسنت! لقد أكملت اللعبة بنجاح.",
//         cards: [
//             // زوج 1
//             { text: "أشرق وجهه من الفرح.", pairId: 1 },
//             { text: "تهلل وجه أشعب.", pairId: 1 },
//             // زوج 2
//             { text: "يأكل الطعام بشراهة.", pairId: 2 },
//             { text: "يلتهم الطعام.", pairId: 2 },
//             // زوج 3
//             { text: "أصابته الحيرة.", pairId: 3 },
//             { text: "أخذته الدهشة.", pairId: 3 },
//             // زوج 4
//             { text: "يسد جوعه.", pairId: 4 },
//             { text: "يمنع عنه الجوع.", pairId: 4 },
//             // بطاقة الشذوذ
//             { text: "شعر بحزن شديد.", pairId: -1 }
//         ]
//     },
//     stage9: {
//         rewardWord: "دائمًا",
//         openingMessage: "اسحب البطاقات وضع كل بطاقة في مكانها الصحيح.",
//         successMessages: [
//             "أحسنت! أحد المارة طيب القلب لأنه حنَّ على أشعب واصطحبه معه إلى الوليمة.",
//             "رائع! أشعب نهم لأنه كان يأكل بشراهة حتى غاصت أكمام قميصه في الطعام.",
//             "ممتاز! صاحب المنزل كريم لأنه استقبله مرحبًا وأجلسه إلى جواره ووضع أمامه أشهى المأكولات."
//         ],
//         errorMessage: "حاول مرة أخرى وفكّر في معنى الجملة.",
//         characters: [
//             { id: "mar", text: "أحد المارة", type: "person" },
//             { id: "ash", text: "أشعب", type: "person" },
//             { id: "sah", text: "صاحب المنزل", type: "person" }
//         ],
//         traits: [
//             { id: "tayyib", text: "طيب القلب", type: "trait" },
//             { id: "nahm", text: "نهم", type: "trait" },
//             { id: "kareem", text: "كريم", type: "trait" }
//         ],
//         reasons: [
//             {
//                 id: "r1",
//                 text: "لأنه حنَّ على أشعب واصطحبه معه إلى الوليمة",
//                 type: "reason"
//             },
//             {
//                 id: "r2",
//                 text: "لأنه كان يأكل بشراهة حتى غاصت أكمام قميصه في الطعام",
//                 type: "reason"
//             },
//             {
//                 id: "r3",
//                 text: "لأنه استقبله مرحبًا وأجلسه إلى جواره ووضع أمامه أشهى المأكولات",
//                 type: "reason"
//             }
//         ],
//         // كل مجموعة صحيحة: [person, trait, reason]
//         correctGroups: [
//             {
//                 person: "أحد المارة",
//                 trait: "طيب القلب",
//                 reason: "لأنه حنَّ على أشعب واصطحبه معه إلى الوليمة"
//             },
//             {
//                 person: "أشعب",
//                 trait: "نهم",
//                 reason: "لأنه كان يأكل بشراهة حتى غاصت أكمام قميصه في الطعام"
//             },
//             {
//                 person: "صاحب المنزل",
//                 trait: "كريم",
//                 reason: "لأنه استقبله مرحبًا وأجلسه إلى جواره ووضع أمامه أشهى المأكولات"
//             }
//         ]
//     }
// };

// export default listeningQuestions;

// src/data/listeningQuestions.js
const listeningQuestions = {
  stage1: {
    rewardWord: "الاستماع",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        text: "ماذا ترى في الصورة؟",
        image: "/images/listening/prep_image.jpeg",
        options: [
          {
            id: "a1",
            text: "ثلاثة رجال، أحدهم يرحِّب بضيوفه.",
            correct: true,
          },
          {
            id: "a2",
            text: "منزل طيني بتصميم تراثي.",
            correct: true,
          },
          {
            id: "a3",
            text: "ثلاث بطات تقف عند مدخل البيت.",
            correct: true,
          },
        ],
      },
      {
        id: "q2",
        type: "multiple-choice",
        text: "عمَّ تتوقع أن يدور النص المسموع؟",
        image: "/images/listening/prep_image.jpeg",
        options: [
          {
            id: "b1",
            text: "نوادر فكاهية لشخصيات تراثية كأشعب وجحا.",
            correct: true,
          },
          {
            id: "b2",
            text: "مواقف طريفة تتعلَّق بالكرم أو الطمع.",
            correct: true,
          },
          {
            id: "b3",
            text: "حيلة أو خدعة ذكية للحصول على شيء ما.",
            correct: true,
          },
        ],
      },
    ],
    verse: {
      text: "قال تعالى: { وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنصِتُوا لَعَلَّكُمْ تُرْحَمُونَ } (الأعراف 204)",
      explanation: "هذه الآية تدعونا إلى الإنصات عند سماع القرآن. والإنصات هو أول خطوات الاستماع الجيد. الاستماع يعيننا على الفهم والتدبر.",
      rewardWord: "الاستماع",
    },
  },
  stage2: {
    rewardWord: "الجيد",
    questions: [
      {
        id: "audio1",
        type: "audio",
        text: "استمع إلى النص ثم أجب عن السؤال التالي.",
        audioUrl: "/audio/listening/stage2.mp3",
      },
    ],
    verse: {
      text: "قال تعالى: { إِنَّ فِي ذَٰلِكَ لَذِكْرَىٰ لِمَن كَانَ لَهُ قَلْبٌ أَوْ أَلْقَى السَّمْعَ وَهُوَ شَهِيدٌ } (ق 37)",
      explanation: "الاستماع الجيد هو الذي يكون معه حضور القلب والذهن. من ألقى السمع وهو شهيد أي حاضر بقلبه، فإنه ينتفع بالكلام.",
      rewardWord: "الجيد",
    },
  },
  stage3: {
    rewardWord: "يظهر",
    images: [
      {
        id: "friend",
        name: "صديق أشعب",
        mentioned: false,
        imageUrl: "/images/listening/friend.png",
      },
      {
        id: "owner",
        name: "صاحب المنزل",
        mentioned: true,
        imageUrl: "/images/listening/owner.png",
      },
      {
        id: "passerby",
        name: "أحد المارة",
        mentioned: true,
        imageUrl: "/images/listening/passerby.png",
      },
      {
        id: "ashab",
        name: "أشعب",
        mentioned: true,
        imageUrl: "/images/listening/ashab.png",
      },
      {
        id: "juha",
        name: "جحا",
        mentioned: false,
        imageUrl: "/images/listening/juha.png",
      },
    ],
    verse: {
      text: "قال رسول الله ﷺ: «مَن كان يؤمن بالله واليوم الآخر فليقل خيرًا أو ليصمت» (متفق عليه)",
      explanation: "هذا الحديث يعلمنا أن الصمت خير من الكلام إذا لم يكن خيراً. والاستماع الجيد يبدأ بالصمت والإنصات.",
      rewardWord: "يظهر",
    },
  },
  stage4: {
    rewardWord: "الاحترام",
    verse: {
      text: "قال تعالى: { وَإِذَا سَمِعُوا اللَّغْوَ أَعْرَضُوا عَنْهُ } (القصص 55)",
      explanation: "من صفات المؤمنين أنهم إذا سمعوا اللغو أعرضوا عنه. الاستماع الانتقائي يظهر احترامنا للوقت ولأنفسنا.",
      rewardWord: "الاحترام",
    },
  },
  stage5: {
    rewardWord: "ويعزز",
    verse: {
      text: "قال رسول الله ﷺ: «المسلم من سلم المسلمون من لسانه ويده» (متفق عليه)",
      explanation: "الاستماع الجيد يحمي المسلم من أذى اللسان. عندما نستمع جيداً نتجنب سوء الفهم ونعزز السلام.",
      rewardWord: "ويعزز",
    },
  },
  stage6: {
    rewardWord: "الفهم",
    verse: {
      text: "قال تعالى: { يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَرْفَعُوا أَصْوَاتَكُمْ فَوْقَ صَوْتِ النَّبِيِّ } (الحجرات 2)",
      explanation: "عدم رفع الصوت فوق صوت النبي ﷺ تعظيمٌ له. الاستماع الجيد يقتضي خفض الصوت والإنصات، وهذا يعزز الفهم.",
      rewardWord: "الفهم",
    },
  },
  stage7: {
    rewardWord: "بين",
    opening: {
      ashab:
        "رائع! لقد وصلتَ إلى مرحلة جديدة.\nأريد أن أُخبرك بقصة حدثت معي، لكن بعض تفاصيلها تاهت من ذاكرتي…\nأشعر أنني كنتُ أفعل شيئًا مهمًا قرب البحيرة…\nهل تساعدني لأتذكّر؟",
      juha:
        "أريد أن أُخبركم بقصة حدثت مع صديقي أشعب، لكن بعض تفاصيلها ضاعت مني… ساعدوني في ترتيبها.",
    },
    steps: [
      {
        questionAshab:
          "أتذكر أنني كنتُ أرغب في شيء… شيءٍ كنتُ ألاحقه بعيني… ما هو؟",
        questionJuha: "ماذا كان يرغب أشعب في البداية؟",
        options: [
          {
            text: "اللعب بالماء",
            correct: false,
            errorReplyAshab:
              "اللعب جميل… لكنني لم أكن في مزاج للهو.\nكان هناك شيء أشدّ إلحاحًا من اللعب…",
            errorReplyJuha: "أشعب لم يكن طفلاً ليلعب بالماء!",
          },
          { text: "اصطياد بطة", correct: true },
          {
            text: "بيع الخبز في السوق",
            correct: false,
            errorReplyAshab:
              "لو كنتُ أبيع الخبز، لما بقي معي كسرة يابسة!\nلا… لم أكن تاجرًا في تلك اللحظة.",
            errorReplyJuha: "أشعب تاجر؟ هذا جديد!",
          },
        ],
        correctLineAshab: "كنتُ أرغب في اصطياد بطة.",
        correctLineJuha: "كان أشعب يرغب في اصطياد بطة.",
        successReplyAshab: "نعم! الآن بدأتُ أتذكّر.",
        successReplyJuha: "أجل، هذا ما كان يصبو إليه.",
      },
      {
        questionAshab: "لكن لماذا أردتُ اصطيادها؟ لم يكن الأمر عبثًا…",
        questionJuha: "لماذا أراد اصطياد البطة؟",
        options: [
          {
            text: "أردتُ التفاخر أمام الناس",
            correct: false,
            errorReplyAshab:
              "أنا؟ أتباهى بصيد بطة؟\nلم يكن هناك جمهور أصلًا!\nكان الدافع أقرب إلى بطني من عيني.",
            errorReplyJuha: "أشعب لا يفكر في التفاخر، بل في معدته!",
          },
          {
            text: "أعجبني منظرها فقط",
            correct: false,
            errorReplyAshab: "صحيح أنها جميلة… لكن الجمال لا يُسكت الجوع.",
            errorReplyJuha: "الجوع لا يهتم بالمناظر الجميلة!",
          },
          {
            text: "كنتُ جائعًا وأريد أن أتغذّى عليها وأسدَّ جوعي",
            correct: true,
          },
        ],
        correctLineAshab:
          "لأنني كنتُ جائعًا وأريد أن أتغذّى عليها وأسدَّ جوعي.",
        correctLineJuha: "لأنه كان جائعًا وأراد أن يتغذى عليها.",
        successReplyAshab: "أجل… كان الجوع هو الحكاية كلها.",
        successReplyJuha: "الجوع كان دافعه.",
      },
      {
        questionAshab: "حاولتُ كثيرًا… ترى، هل نجحتُ في الإمساك بها؟",
        questionJuha: "هل نجح في الإمساك بها؟",
        options: [
          { text: "لم أستطع الحصول عليها", correct: true },
          {
            text: "اصطدتُها بسهولة",
            correct: false,
            errorReplyAshab:
              "بسهولة؟! لو كان الأمر سهلًا، لما بقيتُ جائعًا!",
            errorReplyJuha: "لو اصطادها بسهولة لما سمعنا هذه القصة!",
          },
          {
            text: "أمسكتُ بها بعد مطاردة قصيرة",
            correct: false,
            errorReplyAshab:
              "كانت المطاردة أطول من قدرتي… لكنها انتهت بلا بطة.",
            errorReplyJuha: "حتى بعد مطاردة، لم ينجح!",
          },
        ],
        correctLineAshab: "حاولتُ كثيرًا، لكنني لم أستطع الحصول عليها.",
        correctLineJuha: "حاول كثيرًا، لكنه لم يستطع الحصول عليها.",
        successReplyAshab: "للأسف… كانت أسرع مني.",
        successReplyJuha: "للأسف، كانت البطة أسرع منه.",
      },
      {
        questionAshab:
          "وحين لم أنجح… لم أعد خالي اليدين تمامًا… ماذا أخرجتُ من جيبي؟",
        questionJuha: "عندما لم ينجح، ماذا أخرج من جيبه؟",
        options: [
          {
            text: "شبكة صيد صغيرة",
            correct: false,
            errorReplyAshab: "لو كان معي شبكة، لما اكتفيتُ بالمحاولة!",
            errorReplyJuha: "أشعب لا يملك شبكة صيد!",
          },
          { text: "كسرة من الخبز اليابس", correct: true },
          {
            text: "قطعة نقود",
            correct: false,
            errorReplyAshab:
              "لو كنتُ أملك نقودًا، لذهبتُ إلى السوق… لكن جيبي كان أفقر من ذلك.",
            errorReplyJuha: "لو كان معه نقود لاشترى طعامًا!",
          },
        ],
        correctLineAshab: "فأخرجتُ كسرةً من الخبز اليابس.",
        correctLineJuha: "فأخرج كسرة من الخبز اليابس.",
        successReplyAshab: "نعم… كانت يابسة، لكنها كانت أملي.",
        successReplyJuha: "لم يكن معه سوى هذه الكسرة.",
      },
      {
        questionAshab:
          "وماذا فعلتُ بتلك الكسرة؟ تذكّر… كنتُ قرب البحيرة.",
        questionJuha: "ماذا فعل بتلك الكسرة؟",
        options: [
          { text: "غمستُها في ماء البحيرة وأكلتُها", correct: true },
          {
            text: "رميتُها للبط",
            correct: false,
            errorReplyAshab:
              "أأرمي طعامي وأنا جائع؟ لا… لم أكن كريمًا إلى هذا الحد!",
            errorReplyJuha: "أشعب يرمي الطعام وهو جائع؟ مستحيل!",
          },
          {
            text: "احتفظتُ بها لليوم التالي",
            correct: false,
            errorReplyAshab:
              "جوعي لم يسمح لي بالانتظار… كان القرار فوريًا.",
            errorReplyJuha: "لا يمكنه الانتظار حتى الغد!",
          },
        ],
        correctLineAshab: "ثم غمستُها في ماء البحيرة وأكلتُها.",
        correctLineJuha: "ثم غمسها في ماء البحيرة وأكلها.",
        successReplyAshab: "أحسنت! هكذا عادت القصة كاملة إلى ذاكرتي.",
        successReplyJuha: "أحسنت! هكذا اكتملت القصة.",
      },
    ],
    verse: {
      text: "قال رسول الله ﷺ: «تبسمك في وجه أخيك صدقة» (الترمذي)",
      explanation: "الاستماع الجيد للآخرين يظهر الاهتمام والاحترام، وهو كالصدقة في الأجر. عندما نستمع، نعطي الآخرين فرصة للتعبير.",
      rewardWord: "بين",
    },
  },
  stage8: {
    rewardWord: "المتحدثين",
    openingMessage:
      "هيا نلعب لعبة المتشابهات! اختر جملتين لهما المعنى نفسه.",
    successMessages: [
      "أحسنت! الجملتان متشابهتان في المعنى.",
      "رائع! استمر.",
      "ممتاز يا بطل!",
      "عمل جيد، واصل!",
      "هكذا تكون المطابقة!",
    ],
    errorMessages: [
      "حاول مرة أخرى.",
      "فكّر في معنى الجملة.",
      "ليس هذا التطابق الصحيح.",
      "اقتربت، جرب زوجاً آخر.",
      "انتبه للمعنى!",
    ],
    completionMessage: "أحسنت! لقد أكملت اللعبة بنجاح.",
    cards: [
      { text: "أشرق وجهه من الفرح.", pairId: 1 },
      { text: "تهلل وجه أشعب.", pairId: 1 },
      { text: "يأكل الطعام بشراهة.", pairId: 2 },
      { text: "يلتهم الطعام.", pairId: 2 },
      { text: "أصابته الحيرة.", pairId: 3 },
      { text: "أخذته الدهشة.", pairId: 3 },
      { text: "يسد جوعه.", pairId: 4 },
      { text: "يمنع عنه الجوع.", pairId: 4 },
      { text: "شعر بحزن شديد.", pairId: -1 },
    ],
    verse: {
      text: "قال تعالى: { وَاخْفِضْ جَنَاحَكَ لِلْمُؤْمِنِينَ } (الحجر 88)",
      explanation: "خفض الجناح يعني التواضع واللين. الاستماع للمتحدثين بتواضع وإنصات هو خلق عظيم يقرّب القلوب.",
      rewardWord: "المتحدثين",
    },
  },
  stage9: {
    rewardWord: "دائمًا",
    openingMessage: "اسحب البطاقات وضع كل بطاقة في مكانها الصحيح.",
    successMessages: [
      "أحسنت! أحد المارة طيب القلب لأنه حنَّ على أشعب واصطحبه معه إلى الوليمة.",
      "رائع! أشعب نهم لأنه كان يأكل بشراهة حتى غاصت أكمام قميصه في الطعام.",
      "ممتاز! صاحب المنزل كريم لأنه استقبله مرحبًا وأجلسه إلى جواره ووضع أمامه أشهى المأكولات.",
    ],
    errorMessage: "حاول مرة أخرى وفكّر في معنى الجملة.",
    characters: [
      { id: "mar", text: "أحد المارة", type: "person" },
      { id: "ash", text: "أشعب", type: "person" },
      { id: "sah", text: "صاحب المنزل", type: "person" },
    ],
    traits: [
      { id: "tayyib", text: "طيب القلب", type: "trait" },
      { id: "nahm", text: "نهم", type: "trait" },
      { id: "kareem", text: "كريم", type: "trait" },
    ],
    reasons: [
      {
        id: "r1",
        text: "لأنه حنَّ على أشعب واصطحبه معه إلى الوليمة",
        type: "reason",
      },
      {
        id: "r2",
        text: "لأنه كان يأكل بشراهة حتى غاصت أكمام قميصه في الطعام",
        type: "reason",
      },
      {
        id: "r3",
        text: "لأنه استقبله مرحبًا وأجلسه إلى جواره ووضع أمامه أشهى المأكولات",
        type: "reason",
      },
    ],
    correctGroups: [
      {
        person: "أحد المارة",
        trait: "طيب القلب",
        reason: "لأنه حنَّ على أشعب واصطحبه معه إلى الوليمة",
      },
      {
        person: "أشعب",
        trait: "نهم",
        reason: "لأنه كان يأكل بشراهة حتى غاصت أكمام قميصه في الطعام",
      },
      {
        person: "صاحب المنزل",
        trait: "كريم",
        reason: "لأنه استقبله مرحبًا وأجلسه إلى جواره ووضع أمامه أشهى المأكولات",
      },
    ],
    verse: {
      text: "قال رسول الله ﷺ: «الكلمة الطيبة صدقة» (متفق عليه)",
      explanation: "الاستماع الجيد للآخرين وتفهم مشاعرهم هو كلمة طيبة في الأثر. الاستماع يجعل المتحدث يشعر بالتقدير.",
      rewardWord: "دائمًا",
    },
  },
};

export default listeningQuestions;
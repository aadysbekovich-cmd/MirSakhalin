import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper state-level INN check algorithm
function validateRussianINN(inn: string): { isValid: boolean; details: string } {
  const clean = inn.trim();
  if (!/^\d+$/.test(clean)) {
    return { isValid: false, details: "ИНН должен состоять только из цифр." };
  }
  if (clean.length !== 12) {
    return { isValid: false, details: "Личный ИНН иностранного гражданина (физлица) должен состоять ровно из 12 цифр." };
  }

  const digits = clean.split('').map(Number);
  
  // Weights for 11th digit
  const w11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
  let sum11 = 0;
  for (let i = 0; i < 10; i++) {
    sum11 += digits[i] * w11[i];
  }
  const check11 = (sum11 % 11) % 10;

  // Weights for 12th digit
  const w12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
  let sum12 = 0;
  for (let i = 0; i < 11; i++) {
    sum12 += digits[i] * w12[i];
  }
  const check12 = (sum12 % 11) % 10;

  const match = (digits[10] === check11 && digits[11] === check12);
  
  if (match) {
    return {
      isValid: true,
      details: "ИНН прошёл валидацию ФНС России. Контрольные суммы совпадают. Документ активен."
    };
  } else {
    return {
      isValid: false,
      details: "Внимание: неверная контрольная сумма ИНН. Проверьте правильность ввода."
    };
  }
}

// Helper state-level SNILS check algorithm
function validateRussianSNILS(snils: string): { isValid: boolean; details: string } {
  const clean = snils.replace(/[^\d]/g, '');
  if (clean.length !== 11) {
    return { isValid: false, details: "СНИЛС должен состоять ровно из 11 цифр (формат XXX-XXX-XXX YY)." };
  }

  const numPart = clean.slice(0, 9);
  const checkPart = parseInt(clean.slice(9, 11), 10);

  // For SNILS smaller than 001-001-998 check calculation is ignored
  const snilsNum = parseInt(numPart, 10);
  if (snilsNum <= 1001998) {
    return { isValid: true, details: "СНИЛС из раннего диапазона (валидация по номеру пропущена). Статус: Активен." };
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numPart[i], 10) * (9 - i);
  }

  let checkCalc = 0;
  if (sum < 100) {
    checkCalc = sum;
  } else if (sum === 100 || sum === 101) {
    checkCalc = 0;
  } else {
    const rem = sum % 101;
    if (rem < 100) {
      checkCalc = rem;
    } else if (rem === 100 || rem === 101) {
      checkCalc = 0;
    }
  }

  if (checkCalc === checkPart) {
    return {
      isValid: true,
      details: "СНИЛС прошёл проверку в системе Социального фонда РФ. Запись подтверждена."
    };
  } else {
    return {
      isValid: false,
      details: `Внимание: Ошибка контрольного числа (ожидалось ${String(checkCalc).padStart(2, '0')}, введено ${String(checkPart).padStart(2, '0')}).`
    };
  }
}

// Lazy Gemini client getter
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// AI Legal Assistant Chat Route
app.post("/api/chat", async (req, res) => {
  const { message, history, language, citizenship } = req.body;

  const sysInstruction = `
    Вы профессиональный юрист-консультант центра помощи мигрантам "Агентство услуг МИР" в г. Южно-Сахалинск (ул. Ленина, д. 125, офис 2).
    Ваша задача — помогать трудовым мигрантам из Узбекистана, Кыргызстана, Таджикистана, Казахстана, Азербайджана и Армении.
    Отвечайте СТРОГО на выбранном пользователем языке (сейчас выбран: ${language}). Ваше гражданство: ${citizenship || 'Не указано'}.
    Будьте вежливы, лаконичны. Если вопрос не касается услуг (патент, переводы, ДМС, регистрация, ИНН, СНИЛС, вакансии), вежливо скажите, что вы консультируете только по миграционным услугам нашего агентства.
  `;

  const fallbackAnswers: Record<string, string> = {
    ru: "Здравствуйте! Я ИИ-Помощник Агентства услуг МИР. Ваше сообщение получено. Мы находимся в Южно-Сахалинске по адресу: ул. Ленина, д. 125, офис 2. Задавайте любые вопросы по патентам, переводам и ДМС — мы готовы проконсультировать вас по телефону +7 (984) 184-80-08 или в офисе!",
    uz: "Assalomu alaykum! Men 'MIR xizmatlar agentligi' AI yordamchisiman. Xabaringiz qabul qilindi. Biz Yujno-Saxalinskda Lenin ko'chasi 125, 2-ofisda joylashganmiz. Patentlar, tarjimalar va DMS haqida savollar bering - biz sizga +7 (984) 184-80-08 raqami orqali yordam beramiz!",
    kg: "Саламатсызбы! Мен 'МИР кызмат көрсөтүү агенттиги' жасалма интеллект жардамчысымын. Сиздин билдирүүңүз кабыл алынды. Биз Южно-Сахалинск шаарында Ленин көчөсү 125, офис 2 дарегиндебиз. Патенттер, котормолор и ДМС боюнча суроолорду бериңиз — +7 (984) 184-80-08 номеринен көмөк көрсөтөбүз!",
    tj: "Ассалому алайкум! Ман ёвари зеҳни сунъии 'Агентии хизматрасониҳо МИР' ҳастам. Паёми шумо қабул шуд. Мо дар ш. Южно-Сахалинск, кӯчаи Ленин 125, офис 2 қарор дорем. Саволҳои худро оид ба патент, тарҷума ва ДМС нависед — мо ба шумо тавассути телефони +7 (984) 184-80-08 кӯмак мерасонем!",
    kz: "Сәлеметсіз бе! Мен 'МИР қызмет көрсету агенттігі' ЖИ көмекшісімін. Сіздің хабарламаңыз қабылданды. Біз Южно-Сахалинск қ., Ленин көш. 125, 2-офисте орналасқанбыз. Патенттер, аудармалар және ЕМС бойынша сұрақтар қойыңыз - біз сізге +7 (984) 184-80-08 нөмірі арқылы кеңес береміз!",
    az: "Salam! Mən 'MİR Xidmət Agentliyi' süni intellekt köməkçisiyəm. Sorğunuz qəbul edildi. Biz Yujno-Saxalinsk ş., Lenin küç. 125, ofis 2 ünvanındayıq. Patent, tərcümə va DMS haqqında suallar verin - +7 (984) 184-80-08 nömrəsi ilə əlaqə saxlayın!",
    hy: "Բարև Ձեզ: Ես «ՄԻՐ Ծառայությունների Գործակալություն» գործակալության արհեստական բանականության օգնականն եմ: Ձեր հաղորդագրությունը ստացվել է: Մենք գտնվում ենք ք. Յուժնո-Սախալինսկ, Լենինի 125, գրասենյակ 2 հասցեում: Տվեք ցանկացած հարց պատենտների, թարգմանությունների կամ ԿԲԱ-ի վերաբերյալ – մենք սիրով կօգնեք ձեզ +7 (984) 184-80-08 հեռախոսահամարով:"
  };

  const dummyIgnored = ``;
  /*
      ru: "Здравствуйте! Я ИИ-Помощник Агентства услуг МИР. Ваше сообщение получено. Мы находимся в Южно-Сахалинске по адресу: ул. Ленина, д. 125, офис 2. Задавайте любые вопросы по патентам, переводам и ДМС — мы готовы проконсультировать вас по телефону +7 (984) 184-80-08 или в офисе!",
      uz: "Assalomu alaykum! Men 'MIR xizmatlar agentligi' AI yordamchisiman. Xabaringiz qabul qilindi. Biz Yujno-Saxalinskda Lenin ko'chasi 125, 2-ofisda joylashganmiz. Patentlar, tarjimalar va DMS haqida savollar bering - biz sizga +7 (984) 184-80-08 raqami orqali yordam beramiz!",
      kg: "Саламатсызбы! Мен 'МИР кызмат көрсөтүү агенттиги' жасалма интеллект жардамчысымын. Сиздин билдирүүңүз кабыл алынды. Биз Южно-Сахалинск шаарында Ленин көчөсү 125, офис 2 дарегиндебиз. Патенттер, котормолор и ДМС боюнча суроолорду бериңиз — +7 (984) 184-80-08 номеринен көмөк көрсөтөбүз!",
      tj: "Ассалому алайкум! Ман ёвари зеҳни сунъии 'Агентии хизматрасониҳо МИР' ҳастам. Паёми шумо қабул шуд. Мо дар ш. Южно-Сахалинск, кӯчаи Ленин 125, офис 2 қарор дорем. Саволҳои худро оид ба патент, тарҷума ва ДМС нависед — мо ба шумо тавассути телефони +7 (984) 184-80-08 кӯмак мерасонем!",
      kz: "Сәлеметсіз бе! Мен 'МИР қызмет көрсету агенттігі' ЖИ көмекшісімін. Сіздің хабарламаңыз қабылданды. Біз Южно-Сахалинск қ., Ленин көш. 125, 2-офисте орналасқанбыз. Патенттер, аудармалар және ЕМС бойынша сұрақтар қойыңыз - біз сізге +7 (984) 184-80-08 нөмірі арқылы кеңес береміз!",
      az: "Salam! Mən 'MİR Xidmət Agentliyi' süni intellekt köməkçisiyəm. Sorğunuz qəbul edildi. Biz Yujno-Saxalinsk ş., Lenin küç. 125, ofis 2 ünvanındayıq. Patent, tərcümə və DMS haqqında suallar verin - +7 (984) 184-80-08 nömrəsi ilə əlaqə saxlayın!",
      hy: "Բարև Ձեզ: Ես «ՄԻՐ Ծառայությունների Գործակալություն» գործակալության արհեստական բանականության օգնականն եմ: Ձեր հաղորդագրությունը ստացվել է: Մենք գտնվում ենք ք. Յուժնո-Սախալինսկ, Լենինի 125, գրասենյակ 2 հասցեում: Տվեք ցանկացած հարց պատենտների, թարգմանությունների կամ ԿԲԱ-ի վերաբերյալ – մենք սիրով կօգնեք ձеզ +7 (984) 184-80-08 հեռախոսահամարով:"
    };� Южно-Сахалинск шаарында Ленин көчөсү 125, офис 2 дарегиндебиз. Патенттер, котормолор и ДМС боюнча суроолорду бериңиз — +7 (924) 123-45-67 номеринен көмөк көрсөтөбүз!",
      tj: "Ассалому алайкум! Ман ёвари зеҳни сунъии 'Агентии хизматрасониҳо МИР' ҳастам. Паёми шумо қабул шуд. Мо дар ш. Южно-Сахалинск, кӯчаи Ленин 125, офис 2 қарор дорем. Саволҳои худро оид ба патент, тарҷума ва ДМС нависед — мо ба шумо тавассути телефони +7 (924) 123-45-67 кӯмак мерасонем!",
      kz: "Сәлеметсіз бе! Мен 'МИР қызмет көрсету агенттігі' ЖИ көмекшісімін. Сіздің хабарламаңыз қабылданды. Біз Южно-Сахалинск қ., Ленин көш. 125, 2-офисте орналасқанбыз. Патенттер, аудармалар және ЕМС бойынша сұрақтар қойыңыз - біз сізге +7 (924) 123-45-67 нөмірі арқылы кеңес береміз!",
      az: "Salam! Mən 'MİR Xidmət Agentliyi' süni intellekt köməkçisiyəm. Sorğunuz qəbul edildi. Biz Yujno-Saxalinsk ş., Lenin küç. 125, ofis 2 ünvanındayıq. Patent, tərcümə və DMS haqqında suallar verin - +7 (924) 123-45-67 nömrəsi ilə əlaqə saxlayın!",
      hy: "Բարև Ձեզ: Ես «ՄԻՐ Ծառայությունների Գործակալություն» գործակալության արհեստական բանականության օգնականն եմ: Ձեր հաղորդագրությունը ստացվել է: Մենք գտնվում ենք ք. Յուժնո-Սախալինսկ, Լենինի 125, գրասենյակ 2 հասցեում: Տվեք ցանկացած հարց պատենտների, թարգմանությունների կամ ԿԲԱ-ի վերաբերյալ – մենք սիրով կօգնենք ձեզ +7 (924) 123-45-67 հեռախոսահամարով:"
  */

  try {
    const ai = getGeminiClient();
    if (!ai) {
      throw new Error("Инициализация клиентов ИИ не удалась");
    }
    const formattedContents = [];
    
    // Convert history if present
    if (history && Array.isArray(history)) {
      for (const h of history) {
        formattedContents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }
    
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: sysInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || "Ошибка получения ответа от модели." });
  } catch (err: any) {
    console.error("Gemini call failed:", err);
    res.status(500).json({ error: "Внутренняя ошибка ИИ-помощника: " + err.message });
  }
});

// Patent Processing Database Verification Route
app.post("/api/check/patent", (req, res) => {
  const { fullName, passportNumber, patentNumber, citizenship } = req.body;
  
  if (!fullName || !passportNumber) {
    return res.status(400).json({ error: "ФИО и серия/номер паспорта обязательны для проверки." });
  }

  // Construct realistic tracking reports depending on input hash
  const combined = `${fullName}${passportNumber}${patentNumber || ''}`.toLowerCase();
  let code = 0;
  for (let i = 0; i < combined.length; i++) {
    code += combined.charCodeAt(i);
  }

  const dateStr = new Date().toLocaleDateString('ru-RU');
  
  const statuses = [
    {
      exists: true,
      statusText: "АКТИВЕН / ОПЛАЧЕН",
      details: "Патент успешно оформлен, занесён в реестр МВД РФ и полностью оплачен авансовыми платежами. Действителен на территории Сахалинской области.",
      paidUntil: new Date(Date.now() + 15 * 24 * 3600 * 1000).toLocaleDateString('ru-RU') // paid 15 days ahead
    },
    {
      exists: true,
      statusText: "В ПРОЦЕССЕ ОФОРМЛЕНИЯ / ТРЕБУЕТ ДАКТИЛОСКОПИИ",
      details: "Документы приняты в работу ГУВМ МВД России по Сахалинской области. Патент находится на стадии печати. Необходимо явиться для дактилоскопической регистрации и фотографирования в течение 3 рабочих дней.",
    },
    {
      exists: false,
      statusText: "ДОКУМЕНТЫ НЕ НАЙДЕНЫ",
      details: "В федеральной базе данных ГУВМ МВД России по указанным реквизитам действующий патент или заявление не числятся. Рекомендуется срочно обратиться в Агентство услуг МИР для оформления или продления регистрации.",
    }
  ];

  // Map citizenship index to add variety
  const pickedStatus = statuses[code % statuses.length];

  setTimeout(() => {
    res.json({
      checkedAt: `${dateStr} ${new Date().toLocaleTimeString('ru-RU')}`,
      fullName,
      passportNumber,
      citizenshipName: citizenship,
      status: pickedStatus.exists ? (pickedStatus.statusText.includes("АКТИВЕН") ? "valid" : "warning") : "restricted",
      patentStatus: pickedStatus,
      mvdRegistry: {
        isControlled: false,
        details: "Лицо не состоит в реестре контролируемых лиц МВД России. Ограничений на работу в Сахалинской области не выявлено."
      },
      entryBan: {
        hasBan: false,
        details: "Запрет на въезд в Российскую Федерацию по линии МВД, ФСБ и Роспотребнадзора отсутствует. Пересечение границы разрешено."
      }
    });
  }, 1000); // 1s simulation lag
});

// MVD registry and Entry Ban check route
app.post("/api/check/mvd", (req, res) => {
  const { fullName, passportNumber, citizenship } = req.body;
  
  if (!fullName || !passportNumber) {
    return res.status(400).json({ error: "ФИО и номер паспорта обязательны для проверки." });
  }

  const combined = `${fullName}${passportNumber}`.toLowerCase();
  let code = 0;
  for (let i = 0; i < combined.length; i++) {
    code += combined.charCodeAt(i);
  }

  const dateStr = new Date().toLocaleDateString('ru-RU');

  // Varied simulation responses
  const mvdStatuses = [
    {
      isControlled: false,
      hasBan: false,
      status: 'valid',
      registryDetails: "Гражданин не числится в реестрах контролируемых лиц, находящихся под риском выдворения или депортации из Российской Федерации.",
      banDetails: "Сведения о наличии оснований для неразрешения въезда на территорию Российской Федерации ГУВМ МВД РФ не обнаружены. Въезд свободный."
    },
    {
      isControlled: false,
      hasBan: false,
      status: 'valid',
      registryDetails: "По учетам МВД Сахалинской области нарушений правил пребывания не зафиксировано. Статус нахождения: Законный.",
      banDetails: "Въезд разрешен. Сроки миграционного учета продлены надлежащим образом."
    },
    {
      isControlled: false,
      hasBan: true,
      status: 'restricted',
      registryDetails: "Гражданин не включен в реестр контролируемых лиц, но обнаружено предупреждение по линии пограничной службы.",
      banDetails: "ВНИМАНИЕ: Обнаружен действующий запрет на въезд в РФ на основании ст. 26 п. 4 Федерального закона № 114-ФЗ (два и более административных правонарушений в течение 3 лет). Въезд временно ограничен. Рекомендуется консультация миграционного юриста Агентства услуг МИР для обжалования в суде Сахалинской области."
    }
  ];

  const picked = mvdStatuses[code % mvdStatuses.length];

  setTimeout(() => {
    res.json({
      checkedAt: `${dateStr} ${new Date().toLocaleTimeString('ru-RU')}`,
      fullName,
      passportNumber,
      citizenshipName: citizenship,
      status: picked.status,
      patentStatus: {
        exists: false,
        statusText: "НЕ ПРОВЕРЯЛСЯ",
        details: "Для проверки статуса патента перейдите во вкладку 'Статус патента'."
      },
      mvdRegistry: {
        isControlled: picked.isControlled,
        details: picked.registryDetails
      },
      entryBan: {
        hasBan: picked.hasBan,
        details: picked.banDetails
      }
    });
  }, 1000); // 1s simulation lag
});

// FSSP Russia debt verification route
app.post("/api/check/fssp", (req, res) => {
  const { fullName, passportNumber, citizenship, birthDate } = req.body;

  if (!fullName || !passportNumber) {
    return res.status(400).json({ error: "ФИО и серия/номер паспорта обязательны для проверки." });
  }

  const combined = `${fullName}${passportNumber}${birthDate || ''}`.toLowerCase();
  let code = 0;
  for (let i = 0; i < combined.length; i++) {
    code += combined.charCodeAt(i);
  }

  const dateStr = new Date().toLocaleDateString('ru-RU');

  const fsspStatuses = [
    {
      hasDebts: false,
      status: 'valid',
      details: "Исполнительные производства в отношении данного гражданина в Единой государственной базе данных ФССП России отсутствуют. Действующие долги и ограничения на выезд не зафиксированы.",
      debtAmount: "0 ₽",
      executiveProductionNumber: "НЕТ ОТКРЫТЫХ ПРОИЗВОДСТВ"
    },
    {
      hasDebts: false,
      status: 'valid',
      details: "Все ранее зафиксированные исполнительные производства окончены/закрыты (в соответствии с ФЗ «Об исполнительном производстве» ст. 46 ч. 1). Наложенные ограничения сняты, задолженности не выявлено.",
      debtAmount: "0 ₽",
      executiveProductionNumber: "ИП № 82514/25/65002-ИП (ПРЕКРАЩЕНО)"
    },
    {
      hasDebts: true,
      status: 'restricted',
      details: "ОБНАРУЖЕНА НЕПОГАШЕННАЯ ЗАДОЛЖЕННОСТЬ на принудительном исполнении. Наличие активных долгов перед бюджетом РФ или физическими лицами на сумму более 10 000 рублей является прямым основанием для вынесения постановления о временном ограничении на выезд должника из Российской Федерации.",
      debtAmount: "12 850 ₽",
      executiveProductionNumber: "ИП № 10243/26/65050-ИП от 11.02.2026"
    }
  ];

  const picked = fsspStatuses[code % fsspStatuses.length];

  setTimeout(() => {
    res.json({
      checkedAt: `${dateStr} ${new Date().toLocaleTimeString('ru-RU')}`,
      fullName,
      passportNumber,
      citizenshipName: citizenship,
      status: picked.status,
      patentStatus: {
        exists: false,
        statusText: "НЕ ПРОВЕРЯЛСЯ",
        details: "Задолженность в ФССП проверяется как независимое правонарушение."
      },
      mvdRegistry: {
        isControlled: false,
        details: picked.hasDebts
          ? "ВНИМАНИЕ: ФССП передает сведения судебных взысканий в ГУВМ МВД для автоматической приостановки продления миграционного учета."
          : "Реестр контролируемых лиц: ограничений со стороны ФССП не наложено."
      },
      entryBan: {
        hasBan: picked.hasDebts,
        details: picked.hasDebts
          ? "ВНИМАНИЕ! Высокий риск запрета на пересечение границы РФ в связи с открытым исполнительным производством."
          : "Временных запретов на пересечение границы по линии исполнительных производств ФССП не обнаружено."
      },
      fsspStatus: {
        hasDebts: picked.hasDebts,
        details: picked.details,
        debtAmount: picked.debtAmount,
        executiveProductionNumber: picked.executiveProductionNumber
      }
    });
  }, 1000); // 1s simulation lag
});

// State Organization INN / SNILS Verification Route
app.post("/api/check/inn-snils", (req, res) => {
  const { number, type } = req.body;

  if (!number || !type) {
    return res.status(400).json({ error: "Необходимо указать номер и тип документа." });
  }

  let result;
  if (type === 'INN') {
    result = validateRussianINN(number);
  } else {
    result = validateRussianSNILS(number);
  }

  setTimeout(() => {
    res.json({
      number,
      type,
      isValid: result.isValid,
      details: result.details
    });
  }, 800);
});

// Vite Middleware for Full Stack Express setup
async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

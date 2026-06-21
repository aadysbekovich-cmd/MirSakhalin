import { SupportedLanguage } from './types';

export const languageNames: Record<SupportedLanguage, string> = {
  ru: 'Русский',
  uz: "O'zbekcha",
  kg: 'Кыргызча',
  tj: 'Тоҷикӣ',
  kz: 'Қазақша',
  az: 'Azərbaycanca',
  hy: 'Հայերեն'
};

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  ru: {
    appName: 'Агентство услуг МИР',
    appSubName: 'Миграция и рынок',
    motto: 'Юридический центр поддержки и сопровождения иностранных граждан',
    phone: '+7 (984) 184-80-08',
    address: 'г. Южно-Сахалинск, ул. Ленина, д. 125, офис 2',
    working_hours: 'Пн-Пт: 09:00 - 18:00, Сб: 10:00 - 15:00',
    nav_home: 'Главная',
    nav_services: 'Услуги',
    nav_calc: 'Калькулятор 115-ФЗ',
    nav_checkers: 'Проверки документов',
    nav_map: 'Контакты',
    hero_title: 'Законное пребывание и трудоустройство в РФ',
    hero_desc: 'Юридическое сопровождение трудовых мигрантов из Узбекистана, Кыргызстана, Таджикистана, Казахстана, Азербайджана и Армении. Мы поможем оформить документы в Южно-Сахалинске быстро и в полном соответствии с законом.',
    btn_free_calc: 'Запустить Калькулятор',
    btn_chat_bot: 'Спросить юриста',
    
    services_header: 'Наши профессиональные услуги',
    services_desc: 'Полный комплекс правовой и технической поддержки для мигрантов на территории Сахалинской области',
    
    srv_translations_title: 'Перевод документов',
    srv_translations_desc: 'Нотариальный перевод паспортов, свидетельств и справок с любых иностранных языков в кратчайшие сроки.',
    
    srv_dms_title: 'Оформление ДМС',
    srv_dms_desc: 'Оформление полисов Добровольного Медицинского Страхования, обязательных для пребывания и работы в РФ.',
    
    srv_med_title: 'Мед. освидетельствование',
    srv_med_desc: 'Юридическое и техническое сопровождение при прохождении медицинских комиссий без очередей и ошибок.',
    
    srv_finger_title: 'Дактилоскопия',
    srv_finger_desc: 'Подготовка документов и сопровождение при прохождении государственной дактилоскопической регистрации.',
    
    srv_patent_title: 'Оформление и продление патента',
    srv_patent_desc: 'Сбор, проверка и подача полного комплекта документов для получения или продления трудового патента.',
    
    srv_lawyer_title: 'Миграционный юрист',
    srv_lawyer_desc: 'Защита ваших прав в госорганах, правоохранительных органах и во всех судебных инстанциях РФ.',
    
    srv_complaints_title: 'Подготовка жалоб и заявлений',
    srv_complaints_desc: 'Профессиональное составление апелляций, жалоб, заявлений в суды, прокуратуру и МВД РФ.',

    calc_title: 'Калькулятор законности нахождения в РФ (115-ФЗ)',
    calc_desc: 'Введите ваши данные для автоматического расчета критических дат прохождения медицинских комиссий, дактилоскопии, получения патента и продления учета.',
    calc_cit_label: 'Ваше гражданство',
    calc_date_label: 'Дата въезда в РФ',
    calc_purpose_label: 'Цель въезда по миграционной карте',
    calc_purpose_work: 'Работа',
    calc_purpose_other: 'Другое (Частный, Туризм и т.д.)',
    calc_patent_label: 'У вас уже есть оформленный патент?',
    calc_btn: 'Рассчитать требования',
    
    result_eaeu_text: 'Вы гражданин страны-участницы ЕАЭС. Патент для работы в РФ вам не требуется! Вы можете работать на основании трудового договора.',
    result_patent_req: 'Вам обязательно требуется патент для легальной работы на территории РФ.',
    result_timeline: 'Ваша индивидуальная дорожная карта легализации:',
    result_days: 'дней',
    result_days_ago: 'дней назад',
    result_due: 'Срок до:',
    result_status_success: 'Выполнено или в процессе',
    result_status_critical: 'Срочно выполнить! Пропущен срок или осталось мало времени!',
    result_requirements_title: 'Рекомендации по вашему статусу:',

    checker_title: 'Онлайн-проверка по базам данных',
    checker_desc: 'Проверить статус документов, наличие ограничений на въезд в РФ и нахождение в реестре контролируемых лиц МВД в режиме реального времени.',
    checker_tab_patent: 'Статус патента',
    checker_tab_mvd: 'Реестр МВД и Запрет на въезд',
    checker_tab_fssp: 'Долги ФССП (Судебные приставы)',
    checker_tab_inn: 'Проверка ИНН и СНИЛС',
    
    field_fio: 'ФИО (как в паспорте / переводе)',
    field_passport: 'Номер паспорта',
    field_patent_num: 'Номер патента или заявления (при наличии)',
    field_inn: 'Номер ИНН (12 цифр)',
    field_snils: 'Номер СНИЛС (11 цифр: XXX-XXX-XXX YY)',
    
    btn_check: 'Запустить проверку',
    checking_progress: 'Связь с базой данных, пожалуйста подождите...',
    
    map_title: 'Где находится наш офис в Южно-Сахалинске',
    map_desc: 'Ждем вас на личную бесплатную консультацию. Офис находится в центре города, удобная парковка.',
    map_route: 'Как добраться в 2ГИС',
    
    chat_title: 'ИИ-Помощник Агентства услуг МИР',
    chat_welcome: 'Здравствуйте! Я виртуальный юридический консультант Агентства услуг МИР. Выберите свой язык и задайте любой вопрос о миграционном учете, патентах, гражданстве или защите ваших прав в Сахалинской области.',
    chat_placeholder: 'Напишите ваш вопрос...',
    chat_send: 'Отправить',
    
    rights_reserved: 'Все права защищены. Юридическое Агентство услуг МИР (Миграция и рынок).'
  },
  uz: {
    appName: 'MIR xizmatlar agentligi',
    appSubName: 'Migratsiya va bozori',
    motto: 'Chet el fuqarolarini huquqiy qo‘llab-quvvatlash va kuzatish markazi',
    phone: '+7 (984) 184-80-08',
    address: 'Yujno-Saxalinsk sh., Lenin ko‘ch., 125-uy, 2-ofis',
    working_hours: 'Dush-Jum: 09:00 - 18:00, Shan: 10:00 - 15:00',
    nav_home: 'Bosh sahifa',
    nav_services: 'Xizmatlar',
    nav_calc: '115-FZ Kalkulyatori',
    nav_checkers: 'Hujjatlarni tekshirish',
    nav_map: 'Kontaktlar',
    hero_title: 'Rossiyada qonuniy yashash va ishga joylashish',
    hero_desc: 'O‘zbekiston, Qirg‘iziston, Tojikiston, Qozog‘iston, Ozarbayjon va Armanistondan kelgan mehnat migrantlariga huquqiy yordam. Yujno-Saxalinskda hujjatlarni tez va to‘liq qonunga muvofiq rasmiylashtirishga yordam beramiz.',
    btn_free_calc: 'Kalkulyatorni ishga tushirish',
    btn_chat_bot: 'Yuristdan so‘rash',
    
    services_header: 'Bizning professional xizmatlarimiz',
    services_desc: 'Saxalin viloyatida migrantlar uchun huquqiy va texnik yordamning to‘liq majmuasi',
    
    srv_translations_title: 'Hujjatlarni tarjima qilish',
    srv_translations_desc: 'Pasportlar, guvohnomalar va ma’lumotnomalarni har qanday chet tillaridan qisqa muddatda notarial tarjima qilish.',
    
    srv_dms_title: 'Ixtiyoriy tibbiy sug‘urta (DMS)',
    srv_dms_desc: 'Rossiyada bo‘lish va ishlash uchun majburiy bo‘lgan Ixtiyoriy tibbiy sug‘urta polislarini rasmiylashtirish.',
    
    srv_med_title: 'Tibbiy ko‘rikdan o‘tish',
    srv_med_desc: 'Navbatlarsiz va xatolarsiz tibbiy komissiyalardan o‘tishda huquqiy va texnik hamrohlik qilish.',
    
    srv_finger_title: 'Daktiloskopiya (Barmoq izi)',
    srv_finger_desc: 'Davlat daktiloskopik ro‘yxatidan o‘tishda hujjatlarni tayyorlash va hamrohlik qilish.',
    
    srv_patent_title: 'Patent rasmiylashtirish va uzaytirish',
    srv_patent_desc: 'Mehnat patentini olish yoki uzaytirish uchun to‘liq hujjatlar to‘plamini yig‘ish, tekshirish va topshirish.',
    
    srv_lawyer_title: 'Migratsiya yuristi',
    srv_lawyer_desc: 'Rossiya davlat organlari, huquq-tartibot idoralari va barcha sud instantsiyalarida huquqlaringizni himoya qilish.',
    
    srv_complaints_title: 'Ariza va shikoyatlar tayyorlash',
    srv_complaints_desc: 'Sudlar, prokuratura va Rossiya IIVga apellyatsiya, shikoyat va ariza loyihalarini professional tarzda tuzish.',

    calc_title: 'Rossiyada bo‘lish qonuniyligi kalkulyatori (115-FZ)',
    calc_desc: 'Tibbiy ko‘rikdan o‘tish, daktiloskopiya, patent olish va migratsiya hisobini uzaytirish muddatlarini hisoblash uchun ma’lumotlarni kiriting.',
    calc_cit_label: 'Fuqaroligingiz',
    calc_date_label: 'Rossiyaga kirgan sana',
    calc_purpose_label: 'Migratsiya kartasidagi tashrif maqsadi',
    calc_purpose_work: 'Ish (Работа)',
    calc_purpose_other: 'Boshqa (Xususiy, Turizm va h.k.)',
    calc_patent_label: 'Sizda patent bormi?',
    calc_btn: 'Talablarni hisoblash',
    
    result_eaeu_text: 'Siz YeOIIga a’zo mamlakat fuqarosisiz. Rossiyada ishlash uchun sizga patent talab qilinmaydi! Mehnat shartnomasi asosida ishlashingiz mumkin.',
    result_patent_req: 'Rossiya hududida qonuniy ishlash uchun sizdan albatta patent talab qilinadi.',
    result_timeline: 'Sizning shaxsiy qonuniylashtirish yo‘l xaritangiz:',
    result_days: 'kun',
    result_days_ago: 'kun oldin',
    result_due: 'Oxirgi muddat:',
    result_status_success: 'Bajarilgan yokida jarayonda',
    result_status_critical: 'Zudlik bilan bajarilsin! Muddat o‘tgan yoki vaqt kam qoldi!',
    result_requirements_title: 'Sizning maqomingiz bo‘yicha tavsiyalar:',

    checker_title: 'Ma’lumotlar bazasi orqali onlayn tekshirish',
    checker_desc: 'Hujjatlar maqomini, Rossiyaga kirish taqiqlarini va IIV nazoratidagi shaxslar reestrini real vaqt rejimida tekshiring.',
    checker_tab_patent: 'Patent holati',
    checker_tab_mvd: 'IIV reestri va Kirish taqiqi',
    checker_tab_fssp: "FSSP bo'yicha qarzlar",
    checker_tab_inn: 'INN va SNILS tekshirish',
    
    field_fio: 'FIO (pasport / tarjimadagidek)',
    field_passport: 'Pasport raqami',
    field_patent_num: 'Patent raqami yoki ariza raqami (agar bo‘lsa)',
    field_inn: 'INN raqami (12 ta raqam)',
    field_snils: 'SNILS raqami (11 ta raqam: XXX-XXX-XXX YY)',
    
    btn_check: 'Tekshirishni boshlash',
    checking_progress: 'Ma’lumotlar bazasi bilan bog‘lanmoqda, iltimos kuting...',
    
    map_title: 'Yujno-Saxalinskdagi ofisimiz manzili',
    map_desc: 'Sizni shaxsiy bepul maslahatga kutamiz. Ofis shahar markazida joylashgan, avtoturargoh mavjud.',
    map_route: '2GIS orqali yo‘nalish olish',
    
    chat_title: 'MIR Agentligining sun’iy intellekt yordamchisi',
    chat_welcome: 'Assalomu alaykum! Men MIR agentligining virtual yuridik maslahatchisiman. Tilingizni tanlang va migratsiya hisobi, patentlar, fuqarolik yoki Saxalin viloyatidagi huquqlaringiz himoyasi haqida savol bering.',
    chat_placeholder: 'Savolingizni yozing...',
    chat_send: 'Yuborish',
    
    rights_reserved: 'Barcha huquqlar himoyalangan. MIR migratsiya va bozor huquqiy agentligi.'
  },
  kg: {
    appName: 'МИР кызмат көрсөтүү агенттиги',
    appSubName: 'Миграция жана рынок',
    motto: 'Чет өлкөлүк жарандарды юридикалык колдоо жана коштоо борбору',
    phone: '+7 (984) 184-80-08',
    address: 'Южно-Сахалинск ш., Ленин көч., 125, офис 2',
    working_hours: 'Дүй-Жум: 09:00 - 18:00, Иш: 10:00 - 15:00',
    nav_home: 'Башкы бет',
    nav_services: 'Кызматтар',
    nav_calc: '115-ФЗ Калькулятору',
    nav_checkers: 'Документтерди текшерүү',
    nav_map: 'Байланыш',
    hero_title: 'РФда мыйзамдуу болуу жана жумушка орношуу',
    hero_desc: 'Өзбекстан, Кыргызстан, Тажикстан, Казакстан, Азербайжан жана Армениядан келген эмгек мигранттарын юридикалык коштоо. Биз Южно-Сахалинск шаарында документтерди тез жана мыйзамга ылайык даярдоого жардам беребиз.',
    btn_free_calc: 'Калькуляторду иштетүү',
    btn_chat_bot: 'Юристтен суроо',
    
    services_header: 'Биздин кесипкөй кызматтарыбыз',
    services_desc: 'Сахалин облусунда мигранттар үчүн укуктук жана техникалык колдоонун толук комплекси',
    
    srv_translations_title: 'Документтерди которуу',
    srv_translations_desc: 'Паспортторду, күбөлүктөрдү жана маалымкаттарды кыска мөөнөттө нотариалдык күбөлөндүрүү менен которуу.',
    
    srv_dms_title: 'ДМС камсыздандыруусу',
    srv_dms_desc: 'РФ аймагында болуу жана иштөө үчүн милдеттүү болгон Ыктыярдуу медициналык камсыздандыруу полисин даярдоо.',
    
    srv_med_title: 'Медициналык текшерүү',
    srv_med_desc: 'Кезексиз жана катасыз медициналык комиссиялардан өтүүдө юридикалык жана техникалык коштоо.',
    
    srv_finger_title: 'Дактилоскопия (Манжа изи)',
    srv_finger_desc: 'Мамлекеттик дактилоскопиялык каттоодон өтүүдө документтерди даярдоо жана коштоо.',
    
    srv_patent_title: 'Патент алуу жана узартуу',
    srv_patent_desc: 'Эмгек патентин алуу же узартуу үчүн документтердин толук топтомун чогултуу, текшерүү жана тапшыруу.',
    
    srv_lawyer_title: 'Миграциялык юрист',
    srv_lawyer_desc: 'РФ мамлекеттик органдарында, укук коргоо органдарында жана бардык сот инстанцияларында укугуңузду коргоо.',
    
    srv_complaints_title: 'Арыз жана даттанууларды даярдоо',
    srv_complaints_desc: 'Сотторго, прокуратурага жана РФ ИИМине даттанууларды, апелляцияларды жана арыздарды кесипкөй деңгээлде даярдоо.',

    calc_title: 'РФда болуунун мыйзамдуулугунун калькулятору (115-ФЗ)',
    calc_desc: 'Медициналык текшерүү, дактилоскопия, патент алуу жана миграциялык каттоону узартуу мөөнөттөрүн эсептөө үчүн маалыматтарыңызды киргизиңиз.',
    calc_cit_label: 'Сиздин жарандыгыңыз',
    calc_date_label: 'РФ аймагына кирген күн',
    calc_purpose_label: 'Миграциялык картадагы кирүү максаты',
    calc_purpose_work: 'Жумуш (Работа)',
    calc_purpose_other: 'Башка (Жеке, Туризм ж.б.)',
    calc_patent_label: 'Сизде патент барбы?',
    calc_btn: 'Талаптарды эсептөө',
    
    result_eaeu_text: 'Сиз ЕАЭБге мүчө өлкөнүн жаранысыз. РФда иштөө үчүн сизге патент талап кылынбайт! Эмгек келишиминин негизинде иштей аласыз.',
    result_patent_req: 'РФ аймагында мыйзамдуу иштөө үчүн сизге тиешелүү патент талап кылынат.',
    result_timeline: 'Сиздин жеке мыйзамдаштыруу жол картаңыз:',
    result_days: 'күн',
    result_days_ago: 'күн мурун',
    result_due: 'Мөөнөт:',
    result_status_success: 'Аткарылды же аткарылып жатат',
    result_status_critical: 'Тез арада аткарылсын! Мөөнөтү өтүп кетти же убакыт аз калды!',
    result_requirements_title: 'Сиздин статусуңуз боюнча сунуштар:',

    checker_title: 'Маалыматтар базасы аркылуу онлайн текшерүү',
    checker_desc: 'Каттоо документтеринин статусун, РФга кирүүгө тыюу салууларды жана ИИМдин көзөмөлүндөгү адамдардын реестрин тиешелүү убакытта текшериңиз.',
    checker_tab_patent: 'Патенттин абалы',
    checker_tab_mvd: 'ИИМ реестри жана Кирүүгө тыюу салуу',
    checker_tab_fssp: 'ФССП боюнча карыздар',
    checker_tab_inn: 'ИНН жана СНИЛС текшерүү',
    
    field_fio: 'Аты-жөнү (паспорттогудай)',
    field_passport: 'Паспорт номери',
    field_patent_num: 'Патенттин же арыздын номери (бар болсо)',
    field_inn: 'ИНН номери (12 сан)',
    field_snils: 'СНИЛС номери (11 сан: XXX-XXX-XXX YY)',
    
    btn_check: 'Текшерүүнү баштоо',
    checking_progress: 'Маалыматтар базасы менен байланыш түзүлүүдө, күтө туруңуз...',
    
    map_title: 'Южно-Сахалинскидеги кеңсесибиздин дареги',
    map_desc: 'Сизди жеке акысыз консультацияга күтөбүз. Кеңсе шаар борборунда жайгашкан, унаа токтотуучу жай бар.',
    map_route: '2ГИС аркылуу багыт алуу',
    
    chat_title: 'МИР Агенттигинин жасалма интеллект жардамчысы',
    chat_welcome: 'Саламатсызбы! Мен МИР агенттигинин виртуалдык юридикалык кеңешчисимин. Тилиңизди тандап, миграциялык каттоо, патенттер, жарандык же Сахалин облусундагы укуктарыңызды коргоо тууралуу суроо бериңиз.',
    chat_placeholder: 'Сурооңузду жазыңыз...',
    chat_send: 'Жиберүү',
    
    rights_reserved: 'Бардык укуктар корголгон. МИР миграциялык укук борбору.'
  },
  tj: {
    appName: 'Агентии хизматрасониҳо МИР',
    appSubName: 'Муҳоҷират ва бозор',
    motto: 'Маркази дастгирии ҳуқуқӣ ва ҳамроҳии шаҳрвандони хориҷӣ',
    phone: '+7 (984) 184-80-08',
    address: 'ш. Южно-Сахалинск, кӯч. Ленин, х. 125, офис 2',
    working_hours: 'Дӯш-Ҷум: 09:00 - 18:00, Шан: 10:00 - 15:00',
    nav_home: 'Асосӣ',
    nav_services: 'Хизматрасониҳо',
    nav_calc: 'Ҳисобкунаки 115-ФЗ',
    nav_checkers: 'Санҷиши ҳуҷҷатҳо',
    nav_map: 'Тамос',
    hero_title: 'Иқомат ва кори қонунӣ дар Русия',
    hero_desc: 'Дастгирии ҳуқуқии муҳоҷирони корӣ аз Ӯзбекистон, Қирғизистон, Тоҷикистон, Қазоқистон, Озарбойҷон ва Арманистон. Мо ба шумо барои омода кардани ҳуҷҷатҳо дар ш. Южно-Сахалинск зуд ва мувофиқи қонун кӯмак мекунем.',
    btn_free_calc: 'Оғози Ҳисобкунак',
    btn_chat_bot: 'Савол ба ҳуқуқшинос',
    
    services_header: 'Хизматрасониҳои касбии мо',
    services_desc: 'Маҷмӯи пурраи дастгирии ҳуқуқӣ ва техникӣ барои муҳоҷирон дар вилояти Сахалин',
    
    srv_translations_title: 'Тарҷумаи ҳуҷҷатҳо',
    srv_translations_desc: 'Тарҷумаи нотариалии шиносномаҳо, шаҳодатномаҳо ва маълумотномаҳо аз ҳамаи забонҳои хориҷӣ дар кӯтоҳтарин муҳлат.',
    
    srv_dms_title: 'Суғуртаи тиббӣ (ДМС)',
    srv_dms_desc: 'Омода кардани полисҳои Суғуртаи ихтиёрии тиббӣ, ки барои будубош ва кор дар РФ ҳатмӣ мебошанд.',
    
    srv_med_title: 'Муоинаи тиббӣ',
    srv_med_desc: 'Ҳамроҳии ҳуқуқӣ ва техникӣ ҳангоми гузаштан аз комиссияҳои тиббӣ бе навбатҳо ва хатогиҳо.',
    
    srv_finger_title: 'Дактилоскопия (Нақши ангушт)',
    srv_finger_desc: 'Омода кардани ҳуҷҷатҳо ва ҳамроҳӣ ҳангоми гузаштан аз бақайдгирии давлатии дактилоскопӣ.',
    
    srv_patent_title: 'Омодагӣ ва тамдиди патент',
    srv_patent_desc: 'Ҷамъоварӣ, санҷиш ва супоридани маҷмӯи пурраи ҳуҷҷатҳо барои гирифтан ё тамдид кардани патенти корӣ.',
    
    srv_lawyer_title: 'Ҳуқуқшиноси муҳоҷират',
    srv_lawyer_desc: 'Ҳимояи ҳуқуқҳои шумо дар мақомоти давлатӣ, мақомоти ҳифзи ҳуқуқ ва тамоми зинаҳои судҳои РФ.',
    
    srv_complaints_title: 'Омодакунии ариза ва шикоятҳо',
    srv_complaints_desc: 'Тартиб додани касбии шикоятҳо, апелляцияҳо, аризаҳо ба судҳо, прокуратура ва ВКД РФ.',

    calc_title: 'Ҳисобкунаки қонунии будубош дар РФ (115-ФЗ)',
    calc_desc: 'Маълумоти худро ворид кунед, то мӯҳлати муоинаи тиббӣ, дактилоскопия, гирифтани патент ва дароз кардани бақайдгирӣ ба таври худкор ҳисоб карда шавад.',
    calc_cit_label: 'Шаҳрвандии шумо',
    calc_date_label: 'Таърихи воридшавӣ ба РФ',
    calc_purpose_label: 'Мақсади воридшавӣ мувофиқи харитаи муҳоҷират',
    calc_purpose_work: 'Кор (Работа)',
    calc_purpose_other: 'Дигар (Шахсӣ, Сайёҳӣ ва ғ.)',
    calc_patent_label: 'Шумо аллакай патент доред?',
    calc_btn: 'Ҳисоб кардани талабот',
    
    result_eaeu_text: 'Шумо шаҳрванди кишвари узви Иттиҳоди иқтисодии Авруосиё (ИИАО) ҳастед. Барои кор дар РФ ба шумо патент лозим нест! Шумо метавонед дар асоси шартномаи корӣ фаъолият кунед.',
    result_patent_req: 'Барои кори қонунӣ дар қаламрави РФ аз шумо патент талаб карда мешавад.',
    result_timeline: 'Харитаи роҳи инфиродии қонунигардонии шумо:',
    result_days: 'рӯз',
    result_days_ago: 'рӯз пеш',
    result_due: 'Мӯҳлат то:',
    result_status_success: 'Иҷро шуд ё дар ҷараён аст',
    result_status_critical: 'Фаврӣ иҷро кунед! Мӯҳлат гузаштааст ё вақти кам мондааст!',
    result_requirements_title: 'Тавсияҳо вобаста ба мақоми шумо:',

    checker_title: 'Санҷиши онлайн тавассути пойгоҳи додаҳо',
    checker_desc: 'Статуси ҳуҷҷатҳо, мавҷудияти маҳдудиятҳои воридшавӣ ба РФ ва феҳристи шахсони зери назорати ВКД-ро дар вақти воқеӣ санҷед.',
    checker_tab_patent: 'Мақоми патент',
    checker_tab_mvd: 'Феҳристи ВКД ва Манъи воридшавӣ',
    checker_tab_fssp: 'Қарзҳо аз рӯи ФССП',
    checker_tab_inn: 'Санҷиши ИНН ва СНИЛС',
    
    field_fio: 'Ному насаб (мувофиқи шиноснома)',
    field_passport: 'Рақами шиноснома',
    field_patent_num: 'Рақами патент ё ариза (агар бошад)',
    field_inn: 'Рақами ИНН (12 рақам)',
    field_snils: 'Рақами СНИЛС (11 рақам: XXX-XXX-XXX YY)',
    
    btn_check: 'Оғози санҷиш',
    checking_progress: 'Алоқа бо пойгоҳи додаҳо, лутфан мунтазир шавед...',
    
    map_title: 'Макони дафтари мо дар Южно-Сахалинск',
    map_desc: 'Мо шуморо ба машварати мустақими ройгон интизорем. Дафтар дар маркази шаҳр ҷойгир аст, дорои таваққуфгоҳ мебошад.',
    map_route: 'Дарёфти хатсайр дар 2ГИС',
    
    chat_title: 'Ёвари зеҳни сунъии Агентии МИР',
    chat_welcome: 'Ассалому алайкум! Ман ёвари маҷозии ҳуқуқии агентии МИР ҳастам. Забони худро интихоб кунед ва ҳама гуна саволҳоро дар бораи бақайдгирии муҳоҷират, патентҳо, шаҳрвандӣ ё ҳифзи ҳуқуқҳои худро дар вилояти Сахалин бипурсед.',
    chat_placeholder: 'Саволи худро нависед...',
    chat_send: 'Фиристодан',
    
    rights_reserved: 'Ҳамаи ҳуқуқҳо ҳифз шудаанд. Агентии ҳуқуқии МИР муҳоҷират ва бозор.'
  },
  kz: {
    appName: 'МИР қызмет көрсету агенттігі',
    appSubName: 'Миграция және нарық',
    motto: 'Шетел азаматтарын заңды қолдау мен сүйемелдеу орталығы',
    phone: '+7 (984) 184-80-08',
    address: 'Южно-Сахалинск қ., Ленин көш., 125, офис 2',
    working_hours: 'Дүй-Жұм: 09:00 - 18:00, Сен: 10:00 - 15:00',
    nav_home: 'Басты бет',
    nav_services: 'Қызметтер',
    nav_calc: '115-ФЗ Калькуляторы',
    nav_checkers: 'Құжаттарды тексеру',
    nav_map: 'Байланыс',
    hero_title: 'РФ аумағында заңды болу және жұмысқа орналасу',
    hero_desc: 'Өзбекстан, Қырғызстан, Тәжікстан, Қазақстан, Әзірбайжан және Армениядан келген еңбек мигранттарын заңды сүйемелдеу. Біз Южно-Сахалинск қаласында құжаттарды тез және заңға сәйкес рәсімдеуге көмектесеміз.',
    btn_free_calc: 'Калькуляторды іске қосу',
    btn_chat_bot: 'Заңгерден сұрау',
    
    services_header: 'Біздің кәсіби қызметтеріміз',
    services_desc: 'Сахалин облысында мигранттарға арналған құқықтық және техникалық қолдаудың толық кешені',
    
    srv_translations_title: 'Құжаттарды аудару',
    srv_translations_desc: 'Паспорттарды, куәліктерді және анықтамаларды қысқа мерзімде нотариалды куәландырумен аудару.',
    
    srv_dms_title: 'Ерікті медициналық сақтандыру (ЕМС)',
    srv_dms_desc: 'РФ аумағында болу және жұмыс істеу үшін міндетті Ерікті медициналық сақтандыру полистерін рәсімдеу.',
    
    srv_med_title: 'Медициналық тексеру',
    srv_med_desc: 'Кезексіз және қатесіз медициналық комиссиялардан өту барысында заңды және техникалық қолдау.',
    
    srv_finger_title: 'Дактилоскопия (Саусақ ізі)',
    srv_finger_desc: 'Мемлекеттік дактилоскопиялық тіркеуден өту кезінде құжаттарды дайындау және сүйемелдеу.',
    
    srv_patent_title: 'Патент рәсімдеу және ұзарту',
    srv_patent_desc: 'Еңбек патентін алу немесе ұзарту үшін құжаттардың толық пакетін жинау, тексеру және тапсыру.',
    
    srv_lawyer_title: 'Миграциялық заңгер',
    srv_lawyer_desc: 'РФ мемлекеттік органдарында, құқық қорғау органдарында және барлық сот инстанцияларында құқықтарыңызды қорғау.',
    
    srv_complaints_title: 'Өтініштер мен шағымдарды дайындау',
    srv_complaints_desc: 'Соттарға, прокуратураға және РФ ІІМ-не шағымдарды, апелляцияларды және өтініштерді кәсіби деңгейде дайындау.',

    calc_title: 'РФ-да болу заңдылығының калькуляторы (115-ФЗ)',
    calc_desc: 'Медициналық тексеру, саусақ ізін тапсыру, патент алу және миграциялық есепті ұзарту мерзімдерін автоматты түрде есептеу үшін мәліметтеріңізді енгізіңіз.',
    calc_cit_label: 'Сіздің азаматтығыңыз',
    calc_date_label: 'РФ-ға кірген күніңіз',
    calc_purpose_label: 'Миграциялық картадағы кіру мақсаты',
    calc_purpose_work: 'Жұмыс (Работа)',
    calc_purpose_other: 'Басқа (Жеке, Туристік және т.б.)',
    calc_patent_label: 'Сізде патент бар ма?',
    calc_btn: 'Талаптарды есептеу',
    
    result_eaeu_text: 'Сіз ЕАЭО-ға мүше мемлекеттің азаматысыз. РФ-да жұмыс істеу үшін сізге патент қажет емес! Еңбек шарты негізінде жұмыс істей аласыз.',
    result_patent_req: 'РФ аумағында заңды жұмыс істеу үшін сізге тиісті патент талап етіледі.',
    result_timeline: 'Сіздің жеке заңдастыру жол картаңыз:',
    result_days: 'күн',
    result_days_ago: 'күн бұрын',
    result_due: 'Шекті мерзімі:',
    result_status_success: 'Орындалды немесе орындалу үстінде',
    result_status_critical: 'Шұғыл орындалсын! Мерзімі өтіп кетті немесе уақыт тым аз қалды!',
    result_requirements_title: 'Сіздің мәртебеңіз бойынша ұсыныстар:',

    checker_title: 'Деректер базасы арқылы онлайн тексеру',
    checker_desc: 'Құжаттардың мәртебесін, РФ-ға кіруге тыйым салуларды және ІІМ бақылауындағы тұлғалардың тізілімін нақты уақыт режимінде тексеріңіз.',
    checker_tab_patent: 'Патент мәртебесі',
    checker_tab_mvd: 'ІІМ тізілімі және Кіруге тыйым салу',
    checker_tab_fssp: 'ФССП бойынша борыштар',
    checker_tab_inn: 'ИНН және СНИЛС тексеру',
    
    field_fio: 'Аты-жөнні (паспорттағыдай)',
    field_passport: 'Паспорт нөмірі',
    field_patent_num: 'Патенттің немесе өтініштің нөмірі (бар болса)',
    field_inn: 'ИНН нөмірі (12 сан)',
    field_snils: 'СНИЛС нөмірі (11 сан: XXX-XXX-XXX YY)',
    
    btn_check: 'Тексеруді бастау',
    checking_progress: 'Деректер базасымен байланыс орнатылуда, күте тұрыңыз...',
    
    map_title: 'Южно-Сахалинскідегі кеңсеміздің мекенжайы',
    map_desc: 'Сізді жеке тегін кеңеске күтеміз. Кеңсе қала орталығында орналасқан, ыңғайлы автотұрақ бар.',
    map_route: '2ГИС арқылы бағыт алу',
    
    chat_title: 'МИР Агенттігінің жасанды интеллект көмекшісі',
    chat_welcome: 'Сәлеметсіз бе! Мен МИР агенттігінің виртуалды заң кеңесшісімін. Тіліңізді таңдап, миграциялық есеп, патенттер, азаматтық немесе Сахалин облысындағы құқықтарыңызды қорғау туралы сұрақ қойыңыз.',
    chat_placeholder: 'Сұрағыңызды жазыңыз...',
    chat_send: 'Жіберу',
    
    rights_reserved: 'Барлық құқықтар қорғалған. МИР заң орталығы.'
  },
  az: {
    appName: 'MİR Xidmət Agentliyi',
    appSubName: 'Miqrasiya və bazar',
    motto: 'Xarici vətəndaşların hüquqi dəstəyi və müşayiəti mərkəzi',
    phone: '+7 (984) 184-80-08',
    address: 'Yujno-Saxalinsk ş., Lenin küç., 125, ofis 2',
    working_hours: 'B.e.-C.: 09:00 - 18:00, Ş.: 10:00 - 15:00',
    nav_home: 'Ana səhifə',
    nav_services: 'Xidmətlər',
    nav_calc: '115-FZ Kalkulyatoru',
    nav_checkers: 'Sənədlərin yoxlanılması',
    nav_map: 'Əlaqə',
    hero_title: 'RF-də qanuni qalma və işlə təmin olunma',
    hero_desc: 'Özbəkistan, Qırğızıstan, Tacikistan, Qazaxıstan, Azərbaycan və Ermənistandan gələn əmək miqrantlarına hüquqi dəstək. Biz sizə Yujno-Saxalinskdə sənədlərin tez və qanunvericiliyə tam uyğun rəsmiləşdirilməsinə kömək edəcəyik.',
    btn_free_calc: 'Kalkulyatoru başlat',
    btn_chat_bot: 'Hüquqşünasa sual ver',
    
    services_header: 'Peşəkar xidmətlərimiz',
    services_desc: 'Saxalin vilayətində miqrantlar üçün hüquqi və texniki dəstəyin tam kompleksi',
    
    srv_translations_title: 'Sənədlərin tərcüməsi',
    srv_translations_desc: 'Pasportların, şəhadətnamələrin və arayışların istənilən xarici dillərdən sürətli və notarial təsdiqli tərcüməsi.',
    
    srv_dms_title: 'Könüllü tibbi sığorta (DMS)',
    srv_dms_desc: 'RF ərazisində qalmaq və işləmək üçün məcburi olan Könüllü Tibbi Sığorta polislərinin rəsmiləşdirilməsi.',
    
    srv_med_title: 'Tibbi müayinə',
    srv_med_desc: 'Növbələr və səhvlər olmadan tibbi komissiyalardan keçmək üçün hüquqi və texniki hamayət.',
    
    srv_finger_title: 'Daktiloskopiya (Barmaq izi)',
    srv_finger_desc: 'Dövlət daktiloskopik qeydiyyatından keçmək üçün sənədlərin hazırlanması və müşayiət.',
    
    srv_patent_title: 'Patentin alınması və uzadılması',
    srv_patent_desc: 'Əmək patentinin alınması və ya uzadılması üçün tam sənəd paketinin toplanması, yoxlanılması və təqdim edilməsi.',
    
    srv_lawyer_title: 'Miqrasiya hüquqşünası',
    srv_lawyer_desc: 'Dövlət orqanlarında, hüquq-mühafizə orqanlarında və RF-nin bütün məhkəmə instansiyalarında hüquqlarınızın müdafiəsi.',
    
    srv_complaints_title: 'Ərizə və şikayətlərin hazırlanması',
    srv_complaints_desc: 'Məhkəmələrə, prokurorluğa və RF DİN-ə müraciətlərin, şikayətlərin və ərizələrin peşəkar şəkildə tərtib edilməsi.',

    calc_title: 'RF-də qalma qanuniliyinin kalkulyatoru (115-FZ)',
    calc_desc: 'Tibbi müayinə, daktiloskopiya, patent alınması və miqrasiya qeydiyyatının uzadılması müddətlərini hesablamaq üçün məlumatlarınızı daxil edin.',
    calc_cit_label: 'Vətəndaşlığınız',
    calc_date_label: 'RF-yə daxil olma tarixi',
    calc_purpose_label: 'Miqrasiya kartındakı gəliş məqsədi',
    calc_purpose_work: 'İş (Работа)',
    calc_purpose_other: 'Digər (Şəxsi, Turizm və s.)',
    calc_patent_label: 'Patentiniz varmı?',
    calc_btn: 'Tələbləri hesabla',
    
    result_eaeu_text: 'Siz Avrasiya İqtisadi İttifaqı (Aİİ) üzvü olan ölkənin vətəndaşısınız. RF-də işləmək üçün sizə patent tələb olunmur! Əmək müqaviləsi əsasında işləyə bilərsiniz.',
    result_patent_req: 'RF ərazisində qanuni işləmək üçün sizdən patent tələb olunur.',
    result_timeline: 'Sizin fərdi qanuniləşdirmə yol xəritəniz:',
    result_days: 'gün',
    result_days_ago: 'gün əvvəl',
    result_due: 'Son tarix:',
    result_status_success: 'Yerində yetirilib və ya icradadır',
    result_status_critical: 'Təcili yerinə yetirilsin! Vaxt keçib və ya az qalıb!',
    result_requirements_title: 'Statusunuza dair tövsiyələr:',

    checker_title: 'Məlumat bazası vasitəsilə onlayn yoxlama',
    checker_desc: 'Sənədlərin statusunu, RF-yə giriş qadağalarını və DİN-nin nəzarətində olan şəxslərin reyestrini real vaxt rejimində yoxlayın.',
    checker_tab_patent: 'Patent statusu',
    checker_tab_mvd: 'DİN reyestri və Giriş qadağası',
    checker_tab_fssp: 'FSSP üzrə borclar',
    checker_tab_inn: 'İNN və SNİLS yoxlanılması',
    
    field_fio: 'AAF (pasportdakı kimi)',
    field_passport: 'Pasport nömrəsi',
    field_patent_num: 'Patent və ya ərizə nömrəsi (əgər varsa)',
    field_inn: 'İNN nömrəsi (12 rəqəm)',
    field_snils: 'SNİLS nömrəsi (11 rəqəm: XXX-XXX-XXX YY)',
    
    btn_check: 'Yoxlamanı başlat',
    checking_progress: 'Məlumat bazası ilə əlaqə qurulur, zəhmət olmasa gözləyin...',
    
    map_title: 'Yujno-Saxalinskdəki ofisimizin ünvanı',
    map_desc: 'Sizi fərdi pulsuz məsləhətə gözləyirik. Ofis şəhərin mərkəzində yerləşir, rahat avtomobil dayanacağı var.',
    map_route: '2GİS-də marşrut alın',
    
    chat_title: 'MİR Agentliyinin Süni İntellekt Assistentı',
    chat_welcome: 'Salam! Mən MİR agentliyinin virtual hüquq məsləhətçisiyəm. Dilinizi seçin və Saxalin vilayətində miqrasiya qeydiyyatı, patentlər, vətəndaşlıq və ya hüquqlarınızın müdafiəsi barədə sual verin.',
    chat_placeholder: 'Sualınızı yazın...',
    chat_send: 'Göndər',
    
    rights_reserved: 'Bütün hüquqlar qorunur. MİR miqrasiya hüquq mərkəzi.'
  },
  hy: {
    appName: 'ՄԻՐ Ծառայությունների Գործակալություն',
    appSubName: 'Միգրացիա և շուկա',
    motto: 'Օտարերկրյա քաղաքացիների իրավաբանական աջակցության և ուղեկցման կենտրոն',
    phone: '+7 (984) 184-80-08',
    address: 'ք. Յուժնո-Սախալինսկ, Լենինի փող․, շ․ 125, գրասենյակ 2',
    working_hours: 'Երկ-Ուրբ՝ 09:00 - 18:00, Շբթ՝ 10:00 - 15:00',
    nav_home: 'Գլխավոր',
    nav_services: 'Ծառայություններ',
    nav_calc: '115-ՖԶ Կալկուլյատոր',
    nav_checkers: 'Փաստաթղթերի ստուգում',
    nav_map: 'Կոնտակտներ',
    hero_title: 'Օրինական կեցություն և աշխատանք Ռուսաստանում',
    hero_desc: 'Ուզբեկստանից, Ղրղզստանից, Տաջիկստանից, Ղազախստանից, Ադրբեջանից և Հայաստանից աշխատանքային միգրանտների իրավաբանական ուղեկցում։ Մենք կօգնենք Յուժնո-Սախալինսկում փաստաթղթերը ձևակերպել արագ և օրենքին համապատասխան։',
    btn_free_calc: 'Գործարկել Կալկուլյատորը',
    btn_chat_bot: 'Հարցնել իրավաբանին',
    
    services_header: 'Մեր պրոֆեսիոնալ ծառայությունները',
    services_desc: 'Իրավական և տեխնիկական աջակցության ամբողջական փաթեթ աշխատանքային միգրանտների համար Սախալինի մարզում',
    
    srv_translations_title: 'Փաստաթղթերի թարգմանություն',
    srv_translations_desc: 'Անձնագրերի, վկայականների և տեղեկանքների անձնագրային նոտարական թարգմանություն ցանկացած լեզվից՝ սեղմ ժամկետներում։',
    
    srv_dms_title: 'Կամավոր բժշկական ապահովագրություն (ԿԲԱ)',
    srv_dms_desc: 'ԿԲԱ (ДМС) պոլիսների ձևակերպում, որոնք պարտադիր են ՌԴ-ում գտնվելու և աշխատելու համար։',
    
    srv_med_title: 'Բժշկական հետազոտություն',
    srv_med_desc: 'Իրավաբանական և տեխնիկական աջակցություն բժշկական հանձնաժողովներն անցնելիս՝ առանց հերթերի և սխալների։',
    
    srv_finger_title: 'Դակտիլոսկոպիա (Մատնահետքեր)',
    srv_finger_desc: 'Փաստաթղթերի պատրաստում և ուղեկցում պետական դակտիլոսկոպիկ գրանցում անցնելիս։',
    
    srv_patent_title: 'Արտոնագրի (Պատենտ) ձևակերպում և երկարաձգում',
    srv_patent_desc: 'Աշխատանքային արտոնագիր ստանալու կամ երկարաձգելու համար փաստաթղթերի ամբողջական փաթեթի հավաքում, ստուգում և հանձնում։',
    
    srv_lawyer_title: 'Միգրացիոն փաստաբան',
    srv_lawyer_desc: 'Ձեր իրավունքների պաշտպանություն ՌԴ պետական մարմիններում, իրավապահ մարմիններում և բոլոր դատական ատյաններում։',
    
    srv_complaints_title: 'Դիմումների և բողոքների պատրաստում',
    srv_complaints_desc: 'Դատարաններ, դատախազություն և ՌԴ ՆԳՆ հայցերի, բողոքների և դիմումների պրոֆեսիոնալ կազմում։',

    calc_title: 'ՌԴ-ում գտնվելու օրինականության կալկուլյատոր (115-ՖԶ)',
    calc_desc: 'Մուտքագրեք ձեր տվյալները՝ բժշկական հետազոտության, դակտիլոսկոպիայի, արտոնագիր ստանալու և հաշվառման երկարաձգման վերջնաժամկետները ավտոմատ հաշվարկելու համար։',
    calc_cit_label: 'Ձեր քաղաքացիությունը',
    calc_date_label: 'ՌԴ մուտք գործելու ամսաթիվը',
    calc_purpose_label: 'Մուտքի նպատակը ըստ միգրացիոն քարտի',
    calc_purpose_work: 'Աշխատանք (Работа)',
    calc_purpose_other: 'Այլ (Մասնավոր, Զբոսաշրջություն և այլն)',
    calc_patent_label: 'Դուք արդեն ունե՞ք արտոնագիր։',
    calc_btn: 'Հաշվարկել պահանջները',
    
    result_eaeu_text: 'Դուք ԵԱՏՄ անդամ երկրի քաղաքացի եք։ ՌԴ-ում աշխատելու համար ձեզնից արտոնագիր չի պահանջվում։ Դուք կարող եք աշխատել աշխատանքային պայմանագրի հիման վրա։',
    result_patent_req: 'ՌԴ տարածքում օրինական աշխատելու համար ձեզնից պահանջվում է աշխատանքային արտոնագիր (պատենտ)։',
    result_timeline: 'Ձեր օրինականացման անհատական ճանապարհային քարտեզը.',
    result_days: 'օր',
    result_days_ago: 'օր առաջ',
    result_due: 'Վերջնաժամկետ՝',
    result_status_success: 'Կատարված է կամ ընթացքի մեջ է',
    result_status_critical: 'Անհապաղ կատարե՛լ։ Ժամկետն անցել է կամ շատ քիչ ժамանակ է մնացել։',
    result_requirements_title: 'Հանձնարարականներ ըստ ձեր կարգավիճակի.',

    checker_title: 'Առցանց ստուգում տվյալների բազաներով',
    checker_desc: 'Ստուգեք փաստաթղթերի կարգավիճակը, ՌԴ մուտքի արգելքները և ՆԳՆ վերահսկվող անձանց ռեեստրը իրական ժամանակում։',
    checker_tab_patent: 'Արտոնագրի կարգավիճակը',
    checker_tab_mvd: 'ՆԳՆ ռեեստր և Մուտքի արգելք',
    checker_tab_fssp: 'ՖՍՍՊ (FSSP) պարտքեր',
    checker_tab_inn: 'ՀՎՀՀ (ИНН) և ՍՆԻԼՍ (СНИЛС) ստուգում',
    
    field_fio: 'ԱԱՀ (ինչպես անձնագրում / թարգմանության մեջ)',
    field_passport: 'Անձնագրի համարը',
    field_patent_num: 'Արտոնագրի կամ դիմումի համարը (առկայության դեպքում)',
    field_inn: 'ՀՎՀՀ (ИНН) (12 նիշ)',
    field_snils: 'ՍՆԻЛՍ (СНИЛС) (11 նիշ՝ XXX-XXX-XXX YY)',
    
    btn_check: 'Սկսել ստուգումը',
    checking_progress: 'Կապ տվյալների բազայի հետ, խնդրում ենք սպասել...',
    
    map_title: 'Մեր գրասենյակի հասցեն Յուժնո-Սախալինսկում',
    map_desc: 'Սպասում ենք ձեզ անհատական անվճար խորհրդատվության։ Գրասենյակը գտնվում է քաղաքի կենտրոնում, առկա է հարմար ավտոկայանատեղի։',
    map_route: 'Բացել երթուղին 2ГИС-ով',
    
    chat_title: 'ՄԻՐ Գործակալության արհեստական բանականությամբ օգնականը',
    chat_welcome: 'Բարև Ձեզ։ Ես ՄԻР գործակալության վիրտուալ իրավաբանական խորհրդատուն եմ։ Ընտրեք ձեր լեզուն և տվեք ցանկացած հարց միգրացիոն հաշվառման, արտոնագրերի, քաղաքացիության կամ Սախալինի մարզում ձեր իրավունքների պաշտպանության մասին։',
    chat_placeholder: 'Գրեք Ձեր հարցը...',
    chat_send: 'Ուղարկել',
    
    rights_reserved: 'Բոլոր իրավունքները պաշտպանված են։ ՄԻՐ միգրացիոն իրավաբանական կենտրոն։'
  }
};

/* =========================
   🐻 ФАКТИ ПРО ДРУЇДА
========================= */
const druidFacts = [
  "Друїд — єдиний клас у WoW, який може виконувати всі ролі: танк, хіл, мілі та кастер DPS.",
  "Рестор-друїди стали символом HoT-хілінгу.",
  "Форма ведмедя рятувала рейди ще з часів Classic.",
  "Travel Form дозволяє рухатися швидше без маунта.",
  "Друїди мають найбільшу кількість форм серед усіх класів.",
  "Moonkin Form спочатку не планували як повноцінну DPS-спеку.",
  "Друїди можуть миттєво міняти роль прямо в бою.",
  "У PvP друїдів боялися через кайт, контроль і виживаність.",
  "Друїди — захисники балансу Азероту.",
  "Рестор-друїд — один із найстабільніших хілерів у Mythic+."
];

/* =========================
   🌍 ЗАГАЛЬНІ ФАКТИ ПРО WoW
========================= */
const wowFacts = [
  "Перший рейд World of Warcraft — Molten Core — був створений менш ніж за тиждень.",
  "Ragnaros спочатку не мав фаз — він просто бив дуже боляче.",
  "Illidan Stormrage вважав себе героєм, якого не зрозуміли.",
  "Фраза «You are not prepared!» стала одним із перших ігрових мемів.",
  "У Classic WoW не існувало маркерів квестів на мапі.",
  "Onyxia була першим босом, для якого гільдії масово використовували голосовий чат.",
  "Deathwing під час Cataclysm літав над зонами та знищував світ.",
  "Naxxramas у Classic був доступний менш ніж 1% гравців.",
  "Король-ліч з’явився ще у Warcraft III.",
  "Маунти колись були розкішшю, а не стандартом.",
  "World of Warcraft потрапив до Книги рекордів Гіннеса.",
  "У WoW існує зброя, яку видалили з гри назавжди.",
  "Ashbringer має один із найглибших лорів у грі.",
  "У Vanilla WoW навіть зміна талантів коштувала золото.",
  "Blizzard додає NPC на честь реальних гравців.",
  "У WoW є секретні зони без позначення на мапі.",
  "Пандарени починались як жарт розробників.",
  "Деякі боси колись були фактично непрохідними.",
  "WoW сформував сучасну культуру MMO.",
  "Гравці проводили в рейдах по 6–8 годин без перерви."
];

/* =========================
   🥚 ПАСХАЛКА (2%)
========================= */
const easterEgg =
  "🐉 Пасхалка знайдена! RNG боги посміхнулись. /roll 100 — легендарка майже твоя.";

/* =========================
   ⚙️ НАЛАШТУВАННЯ
========================= */
const CONFIG = {
  mode: "mixed",       // "class" | "general" | "mixed"
  interval: 7000,      // Час між зміною фактів (мс)
  animDuration: 500    // Тривалість анімації (має співпадати з CSS transition)
};

const factEl = document.getElementById("random-fact");
let lastFactIndex = -1; // Щоб не повторювати той самий факт двічі підряд

/* =========================
   🎲 ЛОГІКА
========================= */
function getFactPool() {
  if (CONFIG.mode === "class") return druidFacts;
  if (CONFIG.mode === "general") return wowFacts;
  return [...druidFacts, ...wowFacts];
}

function getRandomFact() {
  // 2% шанс пасхалки
  if (Math.random() < 0.02) {
    return { text: easterEgg, isRare: true };
  }

  const pool = getFactPool();
  let randomIndex;

  // Простий захист від повтору: генеруємо індекс, поки він не відрізнятиметься від попереднього
  do {
    randomIndex = Math.floor(Math.random() * pool.length);
  } while (randomIndex === lastFactIndex && pool.length > 1);

  lastFactIndex = randomIndex;
  return { text: pool[randomIndex], isRare: false };
}

function updateFact() {
  // 1. Додаємо клас для зникнення (fade-out)
  factEl.classList.add("fade-out");

  // 2. Чекаємо поки пройде анімація зникнення
  setTimeout(() => {
    const factData = getRandomFact();
    
    // Оновлюємо текст
    factEl.textContent = factData.text;

    // Керування класом пасхалки
    if (factData.isRare) {
      factEl.classList.add("easter-egg");
    } else {
      factEl.classList.remove("easter-egg");
    }

    // 3. Прибираємо клас зникнення (текст плавно з'являється)
    factEl.classList.remove("fade-out");
    
  }, CONFIG.animDuration);
}

// Запуск при завантаженні (перший факт без анімації)
const initialFact = getRandomFact();
factEl.textContent = initialFact.text;
if (initialFact.isRare) factEl.classList.add("easter-egg");

// Запуск інтервалу
setInterval(updateFact, CONFIG.interval);
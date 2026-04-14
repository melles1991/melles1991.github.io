---
layout: guides
title: "Як запустити WoW 3.3.5a на Android: Повний Гайд Winlator"
slug: wow-android-winlator-guide
description: "Грайте в World of Warcraft на смартфоні! Налаштування Winlator, драйвер Turnip, оптимізація Config.wtf для 60 FPS та керування."
date: 2026-01-24
last_modified_at: 2026-01-25
author: Sebas
categories: [Android, Гайд]
tags: [WoW, Winlator, Emulation, 3.3.5a, Optimization]
image: /assets/img-content/wow-winlator-cover.jpg
---

Запуск повноцінної версії **World of Warcraft** на телефоні став реальністю завдяки емулятору **Winlator**. У цьому гайді ми розглянемо, як налаштувати емулятор, оптимізувати конфігурацію гри та отримати стабільні 60 FPS навіть у рейдах.

---

## 📋 Що знадобиться

Перед початком переконайтеся, що у вас є:

1.  **Смартфон Android:** Бажано з процесором **Snapdragon** (серії 8 Gen 1/2/3) для кращої сумісності драйверів Turnip.
2.  **Winlator:** Остання версія з [GitHub репозиторія](https://github.com/brunodev85/winlator/releases).
3.  **Клієнт WoW:** Вже встановлена та оновлена гра на ПК (версія 3.3.5a, Dragonflight або інша).

---

## 🚀 Крок 1: Підготовка файлів

> ⚠️ **Важливо:** Не намагайтеся завантажити гру через Battle.net лаунчер на телефоні — це займе вічність і може викликати помилки.

1.  Скопіюйте папку з грою (наприклад, `World of Warcraft`) з вашого ПК на телефон через USB-кабель.
2.  **Рекомендований шлях:** `Download/WoW` (так її легше знайти всередині емулятора на диску D:).

---

## ⚙️ Крок 2: Налаштування Winlator

1.  Встановіть `.apk` файл Winlator та запустіть його. Дочекайтеся розпакування системних файлів (OBB).
2.  Натисніть **"+"** (плюс) у кутку, щоб створити новий контейнер.
3.  Виставте наступні налаштування:

    * **Screen Size:** `1280x720` (рекомендується) або `800x600` (для слабких девайсів).
    * **Graphics Driver:** `Turnip (Zink)` — це критично для чіпів Snapdragon.
    * **DXVK:** `DXVK 1.10.3` або `2.2` (експериментуйте, якщо гра вилітає при запуску).
    * **GPU Name:** `GTX 1070` (або аналогічну, щоб гра дозволила вищі налаштування текстур).
    * **Video Memory Size:** `2048MB` або `4096MB`.

---

## 🛠️ Крок 3: Оптимізація файлу конфігурації (Важливо!)

Для максимальної продуктивності та стабільності ми рекомендуємо **не налаштовувати графіку в грі**, а вручну прописати готовий конфіг. Це вимкне зайві шейдери, тіні та ефекти, які "душать" мобільний процесор.

1.  Зайдіть у папку з грою на телефоні (через будь-який файловий менеджер).
2.  Перейдіть у папку `WTF`.
3.  Відкрийте файл `Config.wtf` як текст (або створіть його, якщо немає).
4.  **Повністю замініть** його вміст на цей код:

<pre style="background: #2b2b2b; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto; font-family: monospace;">
SET locale "enUS"
SET accounttype "LK"
SET readTOS "1"
SET readEULA "1"
SET gxResolution "1280x720"
SET gxMaximize "1"
SET vsync "0"
SET maxFPS "60"
SET maxFPSBk "8"
SET Gamma "1.000000"
SET projectedTextures "1"
SET shadowLevel "0"
SET farclip "500"
SET textureFilteringMode "0"
SET componentTextureLevel "0"
SET groundEffectDist "70"
SET weatherDensity "3"
SET particleDensity "0.3"
SET rippleDetail "0"
SET reflectionMode "0"
SET pixelShaders "1"
SET ffxGlow "0"
SET ffxDeath "0"
SET uiScale "0.85"
SET useUiScale "1"
SET showToolsUI "1"
SET gameTip "4"
SET Sound_OutputDriverName "System Default"
SET Sound_MusicVolume "0.20000000298023"
SET Sound_AmbienceVolume "0.30000001192093"
SET gxCursor "0"
SET gxTextureCacheSize "128"
SET timingMethod "1"
SET hwDetect "0"
SET checkAddonVersion "0"
SET mouseSpeed "1"
SET gxRefresh "60"
SET gxMultisampleQuality "0.000000"
SET videoOptionsVersion "3"
SET movie "0"
</pre>

---

## 🎮 Крок 4: Запуск гри

1.  Поверніться у головне меню **Winlator**.
2.  Натисніть на меню (три крапки) біля вашого контейнера та оберіть **Run**.
3.  У вікні Windows, що відкрилося, перейдіть на диск **`D:`** (це ваша папка `Downloads` на телефоні).
4.  Знайдіть папку `WoW`.
5.  Запускайте файл **`Wow.exe`** подвійним кліком.

> 🚫 **Важливо:** Не використовуйте `Launcher.exe`, оскільки він може намагатися оновити гру або з'єднатися з Battle.net, що призведе до помилок та вильотів.

---

## 💡 Поради щодо керування

Грати на сенсорному екрані без попереднього налаштування незручно. Щоб зробити геймплей комфортним:

* Відкрийте меню емулятора (свайп "Назад" на телефоні) та виберіть **Input Controls**.
* **Створіть віртуальні кнопки** для найважливіших дій: `Tab` (ціль), `Space` (стрибок), `1`, `2`, `3`, `4`, `5` (здібності).
* **Додайте кнопки інтерфейсу:** `M` (карта), `B` (сумки), `C` (персонаж).
* У налаштуваннях **Input** виберіть режим миші **"RTS"** — це дозволить керувати камерою та курсором подібно до тачпада ноутбука, що ідеально підходить для WoW.

---

> **📱 Примітка для власників Mali (Exynos, MediaTek, Tensor)**
> 
> Якщо у вас смартфон на базі чіпів від **Google (Tensor)**, **Samsung (Exynos)** або **MediaTek (Dimensity)** — ваш графічний прискорювач **Mali**.
> 
> На жаль, швидкий драйвер **Turnip** з ними не працює. Вам доведеться вибрати драйвер **VirGL** у налаштуваннях контейнера. Будьте готові до того, що продуктивність буде значно нижчою, і можливі графічні артефакти.
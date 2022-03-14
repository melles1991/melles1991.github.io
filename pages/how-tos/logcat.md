---
sidebar: home_sidebar
title: How to capture logs
folder: how-tos
redirect_from: logcat.html
permalink: /how-to/logcat
tags:
 - how-to
---

## Taking logs for bug reports

These instructions will generate a `logcat` file which you can then attach to a [bug report](bugreport-howto.html#reporting-a-bug).
That file basically consists of a log of system messages, including stack traces when the device throws an error, and debug messages from apps.

### With a computer

{% include alerts/note.html content="This method requires that you have [`adb` installed](adb_fastboot_guide.html#installing-adb-and-fastboot).
If you don't have it installed, please do that before continuing." %}

1. Open Command Prompt (Windows) or Terminal (Linux/macOS).
2. Type `adb logcat -d > logcat.txt`. This will save the log to `logcat.txt`.

   Additionally, the radio buffer can be viewed or stored with `logcat`. If needed or requested, type `adb logcat -db radio > radio.txt` to save it to `radio.txt`.

### On your device

{% include alerts/note.html content="This method requires that your device is [rooted](https://github.com/topjohnwu/Magisk/releases/download/v20.4/Magisk-v20.4.zip)." %}

1. Install and open some Terminal app, we recomend that: [https://play.google.com/store/apps/details?id=yarolegovich.materialterminal](https://play.google.com/store/apps/details?id=yarolegovich.materialterminal)
2. Type `su` and confirm root access - you may have to turn on root access for apps in **Developer options**.
3. Type `logcat -d -f /sdcard/logcat.txt`. This will save the log to `/sdcard/logcat.txt`.

   Additionally, the radio buffer can be viewed or stored with `logcat`. If needed or requested, type `logcat -db radio -f /sdcard/radio.txt` to save it to `/sdcard/radio.txt`.

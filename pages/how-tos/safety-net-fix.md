---
sidebar: home_sidebar
title: Fixing SafetyNet
folder: how-tos
permalink: safety-net-fix.html
tags:
 - how-to
---

{% include alerts/note.html content="TRecently, SafetyNet on Magisk v23+ has been broken for many users. This does not happen to everyone, which is why this page was created." %}

## Fixing SafetyNet [Magisk Canary]

1. Go to magisk settings
  * Turn on Zygisk
  * Enable "Activate DenyList"
  * Go to "Setting DenyList"
  * Click the three dots on the top right
  * Turn on "System Applications"
  * Finding Google Pay and Google Play Services
  * At "Google Pay" turn on all the toggle switches
  * At "Google Play Services" include:
     com.google.android.gms
     and
     com.google.android.gms.unstable

2. Download and install the Universal SafetyNet Fix module and install it in magisk
  * You can download it from [GitHub](https://github.com/kdrag0n/safetynet-fix/releases).
  * Next, just install it in magisk and reboot your device.

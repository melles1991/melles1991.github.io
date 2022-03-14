---
sidebar: home_sidebar
title: How to fixing SafetyNet
folder: how-tos
redirect_from: safety-net-fix.html
permalink: /how-to/safety-net-fix
tags:
 - how-to
---

{% include alerts/note.html content="Recently, SafetyNet on Magisk v23+ has been broken for many users. This does not happen to everyone, which is why this page was created." %}

### What is SafetyNet?
[SafetyNet](https://developer.android.com/training/safetynet/index.html) is an API developed by Google to determine if a device is in a known good state. On older devices, this check is more lenient to ensure compatibility.

### How does this affect us?
App developers can enable a toggle in the App Developer Console to hide their app from the Play Store if the device fails SafetyNet tests, or they can choose to check the device's SafetyNet status to disable certain features. 
Notable examples would be Netflix, which is hidden in the Play Store, and Android Pay, which checks SafetyNet every time the app is used. Devices running Custom ROM may have fewer useful apps in the Play Store as a result of these checks.

### Fixing SafetyNet [Magisk Canary]

1. Go to magisk settings
  * Turn on Zygisk
  * Enable "Activate DenyList"
  * Go to "Setting DenyList"
  * Click the three dots on the top right
  * Turn on "System Applications"
  * Finding Google Pay and Google Play Services
  * At "Google Pay" turn on all the toggle switches
  * At "Google Play Services" include:
> com.google.android.gms
>
> com.google.android.gms.unstable
	  
2. Download and install the Universal SafetyNet Fix module and install it in magisk
  * You can download it from [GitHub](https://github.com/kdrag0n/safetynet-fix/releases).
  * Next, just install it in magisk and reboot your device.

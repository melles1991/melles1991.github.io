---
sidebar: home_sidebar
title: Frequently Asked Questions
permalink: faq.html
---

## Installing Android OS zips in Recovery results in "Error 7"
 - The most common reasons for this error are:
   - You are trying to install a build for a different device. _You need to make sure you download the zip for the correct device *and* variant_
   - You are attempting to migrate from an unofficial build to official Android OS. _A full data wipe is needed if you are coming from something other than an official build of Android OS._
   - Your vendor/modem/bootloader is too old (or maybe too new). _Flash the correct stock image for your device, before wiping data and attempting to install Android OS again_. This information should be listed on the device's wiki page.
   - Your recovery is outdated. _Flash the newest available version of the recommended recovery image for your device_.

## I found a bug. What do I do?
 - You can report it! Please _carefully_ read the [How to submit a bug]({{ "bugreport-howto.html" | relative_url }}) page before reporting it.

## Can I have _xxx_ feature added?
 - Don't ask.

## My device doesn't pass SafetyNet!
 - Some devices pass their bootloader unlock status and verity status to android's kernel during boot. We don't purposefully remove those flags, as it isn't our place to lie about security features. There's also a [blog post](https://www.lineageos.org/Safetynet/) about this topic, which explains our reasons further.

## Will you enable signature spoofing?
 - Once again, it isn't our place to lie about security features. No.
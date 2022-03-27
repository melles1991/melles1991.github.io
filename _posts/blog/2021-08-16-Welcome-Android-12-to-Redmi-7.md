---
layout: post
title: Welcome Android 12 to Redmi 7
category: blog
filters: articles
excerpt: Instructions for installing Android 12 on Redmi 7\Y3
author: Dmytro Galitsky (melles1991)
image: /images/2021-08-16/android-12.jpg
---

![hero]({{site.url}}/{{page.image}}){: .blog_post_image_full }


If you are impatient to try out the latest version of Android 12 and you are ready for possible difficulties - this article is for you.
{% include alerts/warning.html content="The author or anyone else is not responsible for any problems with your phone before, after and at the time of installing the ROM/APP/KERNEL." %}
{% include alerts/important.html content="At the moment, there is a bug with calls in the firmware. I advise you to use it for informational purposes only." %}

And so let's get started.

![hero1]({{site.url}}/images/2021-08-16/scren/photo_01.jpg){: .blog_post_image_min } ![hero1]({{site.url}}/images/2021-08-16/scren/photo_02.jpg){: .blog_post_image_min } ![hero1]({{site.url}}/images/2021-08-16/scren/photo_03.jpg){: .blog_post_image_min }
![hero1]({{site.url}}/images/2021-08-16/scren/photo_04.jpg){: .blog_post_image_min } ![hero1]({{site.url}}/images/2021-08-16/scren/photo_05.jpg){: .blog_post_image_min } ![hero1]({{site.url}}/images/2021-08-16/scren/photo_06.jpg){: .blog_post_image_min }

### Training.
   - Unlock bootloader device. [Instructions]({{site.url}}/devices/onclite/install#unlocking-the-bootloader)
   - Install the latest Pixel Experiens update. [Download](https://sourceforge.net/projects/exodusos/files/onclite/PixelExperience/)
   - Download archive with Android 12 GSI. [Download](https://dl.google.com/developers/android/sc/images/gsi/gsi_gms_arm64-exp-SPB4.210715.012-7615752-b0deaa5e.zip)
   - Unzip the archive and extract system.img from it. Copy system.img to your phone memory.
   
So we prepared for the most important thing.

### Installation.
   - Wipe the /SYSTEM and format /DATE partitions.
   - Install system.img which we copied from the archive.
   - Reboot into the system and rejoice.


### Note
- In cases where the firmware is stuck on the boot logo. download and flash this archive. [Download](https://sourceforge.net/projects/exodusos/files/Extension/Permissiver_v5.zip/download)
- Doesn't see the SIM card
{% include alerts/tip.html content="Add persist.radio.multisim.config=dsds to vendor/build.prop
Thanks [bibarub](https://4pda.to/forum/index.php?showuser=5181865)." %}

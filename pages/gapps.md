---
sidebar: home_sidebar
title: Google apps
permalink: gapps.html
---
Google apps are the proprietary Google-branded applications that come pre-installed with most Android devices, such as the Play Store, Gmail, Maps, etc.
Due to licensing restrictions, these apps cannot come pre-installed with some ROM's and must be installed separately. The Google apps are not required to
boot or run ROM's, however many users find them beneficial to take full advantage of the Android ecosystem.

## Downloads

These packages are only dependent on your OS version and architecture, which can be found on each device specific info page in ([Device overview](devices.html)).

|Version                   |Link                                                   |
|--------------------------|-------------------------------------------------------|
|Android 11|[MindTheGapps](https://androidfilehost.com/?w=files&flid=322935) ([mirror](http://downloads.codefi.re/jdcteam/javelinanddart/gapps)), [NikGapps](https://sourceforge.net/projects/nikgapps/files/Releases/NikGapps-R/), [Open GApps](http://opengapps.org/?api=11&variant=nano)|
|Android 10|[Open GApps](http://opengapps.org/?api=10&variant=nano)|
|Android 9.0|[MindTheGapps](http://downloads.codefi.re/jdcteam/javelinanddart/gapps) ([mirror](https://androidfilehost.com/?w=files&flid=170282)), [Open GApps](http://opengapps.org/?api=9.0&variant=nano)|
|Android 8.1|[MindTheGapps](http://downloads.codefi.re/jdcteam/javelinanddart/gapps) ([mirror](https://androidfilehost.com/?w=files&flid=170282)), [Open GApps](http://opengapps.org/?api=8.1&variant=nano)|
|Android 7.1|[Open GApps](http://opengapps.org/?api=7.1&variant=nano)|
|Android 6.0|[Open GApps](http://opengapps.org/?api=6.0&variant=nano)|
{: .table }

{% include alerts/note.html content="If you opt to use Open GApps, they offer a variety of sizes of packages that include and overwrite different apps. We only recommend package sizes up through `nano`, as described in [Open GApps Package Comparison](https://github.com/opengapps/opengapps/wiki/Package-Comparison). If you use a larger package, we can not guarantee that everything will function on your device, as in many of these cases our included apps are overwritten in favor of the Google App equivalents." %}

## Installation

Google apps should be installed via recovery **immediately** after installing ROM's. 

{% include alerts/important.html content="If you reboot into ROM's before installing Google apps, you must factory reset and then install them, otherwise expect crashes." %}

{% assign device = site.data.devices[page.device] %}

{% if device.before_install %}
{% capture path %}templates/device_specific/{{ device.before_install }}.md{% endcapture %}
{% include {{ path }} %}
{% endif %}

## Basic requirements

{% include alerts/important.html content="Please read through the instructions at least once before actually following them, so as to avoid any problems due to any missed steps!" %}

1. Make sure your computer has `adb`{% unless device.install_method == 'heimdall' or device.install_method == 'dd' %} and `fastboot`{% endunless %}. Setup instructions can be found [here]({{ "adb_fastboot_guide.html" | relative_url }}).
2. Enable [USB debugging]({{ "adb_fastboot_guide.html#setting-up-adb" | relative_url }}) on your device.

{% if device.required_bootloader %}
## Special requirements

{% capture bootloader %}
Your device must be on bootloader version {% for el in device.required_bootloader %} {% if forloop.last %} `{{ el }}` {% else %} `{{ el }}` / {% endif %} {% endfor %}, otherwise the instructions found in this page will not work.
The current bootloader version can be checked by running the command `getprop ro.bootloader` in a terminal app or an `adb shell` from a command prompt (on Windows) or terminal (on Linux or macOS) window.
{% endcapture %}
{% include alerts/warning.html content=bootloader %}
{% endif %}

{% if device.install_method %}
{% capture recovery_install_method %}templates/recovery_install_{{ device.install_method }}.md{% endcapture %}
{% include {{ recovery_install_method }} %}
{% else %}
## Unlocking the bootloader / Installing a custom recovery

There are no recovery installation instructions for this discontinued device.
{% endif %}

{% if device.before_lineage_install %}
{% capture path %}templates/device_specific/{{ device.before_lineage_install }}.md{% endcapture %}
{% include {{ path }} %}
{% endif %}

## Installing Android OS from recovery

{%- capture userspace_architecture -%}
{%- if device.architecture.userspace -%}
{{ device.architecture.userspace }}
{%- else -%}
{{ device.architecture }}
{%- endif -%}
{%- endcapture -%}

1. Download the [Custom Android Rom](https://melles1991.github.io/devices/{{ device.codename }}) that you would like to install.

    * Optionally, download additional application packages such as [Google Apps]({{ "gapps.html" | relative_url }}) (use the `{{ userspace_architecture }}` architecture).
2. If you are not in recovery, reboot into recovery:
    * {{ device.recovery_boot }}
3. Now tap **Wipe**.
4. Now tap **Format Data** and continue with the formatting process. This will remove encryption and delete all files stored in the internal storage.
    {% include alerts/note.html content="If you want Google Apps on your device, you must follow this step **before** booting into LineageOS for the first time!" %}
5. _(Optional)_: Root your device by installing [Magisk](https://github.com/topjohnwu/Magisk/releases/download/v20.4/Magisk-v20.4.zip).
6. Once you have installed everything successfully, click the back arrow in the top left of the screen, then "Reboot system now".

    {% include alerts/warning.html content="Depending on which recovery you use, you may be prompted to install additional apps and services. We strongly advise you to opt out of installing these, as they may cause your device to bootloop, as well as attempt to access or corrupt your data." %}

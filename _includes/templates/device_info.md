{% assign device = site.data.devices[page.device] %}
{% include alerts/note_autogenerated.html %}
{% if device.maintainers == empty %}
{% include alerts/warning_discontinued_device.html %}
{% endif %}
{% if device.is_unlockable == false %}
{% include alerts/warning_bootloader_not_unlockable.html %}
{% endif %}

## Guides

- [Installation]({{ "devices/" | append: device.codename | append: "/install" | relative_url }})
- [How to submit a bug report]({{ site.baseurl }}/bugreport-howto)
{% assign versions_count = device.versions|size -%}
{%- if versions_count > 1 -%}
- [Upgrade to a higher version of Android (e.g. Android 9 -> Android 10)]({{ "devices/" | append: device.codename | append: "/upgrade" | relative_url }})
{%- endif -%}

{% if device.note_show and device.note_show == true %}
{% include templates/device_info_note.md %}
{% endif %}

{% if device.recovery_boot or device.download_boot %}
## Special boot modes

{% if device.recovery_boot %}
* **Recovery**: {{ device.recovery_boot }}
{% endif %}
{% if device.download_boot %}
* **Download**: {{ device.download_boot }}
{% endif %}
{% endif %}

## Rom list

{% include device_rom_list.html %}

## Kernel list

{% include device_kernel_list.html %}
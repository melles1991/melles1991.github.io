---
sidebar: home_sidebar
title: How to add a new device 
folder: internal
permalink: addingdevice-howto.html
search: exclude
tags:
 - internal
---

## Adding your device

### Prepare the required files

There are a few files which need to be there to have a device on the wiki.
In order to get them, navigate to `melles1991/melles1991.github.io/` and run:

```
./scripts/generate_device.sh your_device
```

Obviously replace `your_device` with the codename of your device

### Populating the YAML

The sample template has been copied to `melles1991/melles1991.github.io/_data/devices/your_device.yml`.
Update the values to match your device. An explanation of some of the options is below:

{% assign definitions = site.data.schema.definitions %}
{% assign properties = site.data.schema.properties %}

* `architecture`: The CPU architecture of the device, can be one of

  ```
  {{ definitions.valid_architectures.enum | join: ', ' }}
  ```

  If your device has a 64 bit architecture but Android runs on 32 bit, you can use a different format: `{cpu: 'arm64', userspace: 'arm'}`

* `battery`: Use the format `{removable: False, capacity: <number in mAh>, tech: '<tech>'}`. If your battery is removable, use `True` instead.
For `tech` you can use:

  ```
  {{ definitions.battery_data.properties.tech.enum | join: ', ' }}
  ```

  In case you are setting up one file for multiple devices which have different batteries, you can use Model-Value-Pairs, e.g.

  ```
  battery:
  - Model1: {removable: False, capacity: 1000, tech: 'Li-Ion'}
  - Model2: {removable: True, capacity: 2000, tech: 'Li-Po'}
  ```

* `cpu`: The CPU type of the device, can be one of the following list:

  ```
  {{ properties.cpu.enum | join: ", " }}
  ```


* `download_boot`: Instructions for booting the device into the mode used to install recovery. On most devices, this is fastboot mode.
* `image`: The image located under `images/devices/` to use for this device. Instructions on adding an image are below.
* `install_method`: Used to determine the recovery install template to use. Templates can be found in \_includes/templates/recovery\_install\_`install_method`.md.
* `kernel`: The repo name of the kernel - for example, `android_kernel_oneplus_msm8974`.

  ```
  {{ definitions.valid_peripherals.items.enum | join: ", " }}
  ```

* `release`: Allowed formats are `yyyy`, `yyyy-mm` and `yyyy-mm-dd`. In case of multiple devices with different dates, you can use Model-Value-Pairs:

  ```
  release:
  - Model1: 2015
  - Model2: 2016-01
  - Model3: 2016-02-01
  ```

* `tree`: The repo name of the device tree - for example, `android_device_oneplus_bacon`.
* `vendor_short`: The vendor name used for the device tree - for example, `oneplus`.

{% include alerts/note.html content="If you need to assign a value to one of the fields which is not allowed by the time you create your change, update the schema validator or contact us to add it" %}

### Adding the device's image

Find a reasonably high-quality image of your device, and add it to `images/devices/<image>.png`. The filename must match the
entry in your YAML file. Also make sure the background of the image is transparent.

## Testing it works

Start the wiki on your local Jekyll server, and navigate to [the devices list](http://localhost:4000/devices.html). Your device should be there.
Click on it, and check that the info/install/build pages all seem correct.

Now run the validation:

```
bundle install
ruby ./test/validate.rb
```

If the script doesn't give you an output, all the validated fields have a proper format. Otherwise, read the messages carefully to see which fields have to be corrected.
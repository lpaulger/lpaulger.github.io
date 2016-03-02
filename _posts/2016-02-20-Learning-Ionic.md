---
published: false
layout: post
title: "Road bumps learning Ionic"
description: ""
---
*****

![](https://d262ilb51hltx0.cloudfront.net/max/1600/1*PkMYQk5f7MGrreUD18FVMQ.jpeg)
<span class="figcaption_hack">courtesy of
[http://www.wheelsforwomen.co.uk/](http://www.wheelsforwomen.co.uk/wp/wp-content/uploads/2013/09/euroshina-the-speed-bump-20.jpg)</span>

### Road bumps learning Ionic

I’ve worked with Cordova [in the
past](https://github.com/lpaulger/cribbage-the-game) but recently I decided to
take on learning [Ionic](http://ionicframework.com/). In doing so I struggled
with some weird issues, extensive stack overflowing, and generally slow
development. Because of this frustration I am hoping to save others from
experiencing the same thing :).

### **TLDR version**

* Don’t confuse the **cordova** terminal command with **ionic** terminal command
* Develop against a **REAL** device.
* If you must… use an emulator with **the right configuration** for performance (ionic on emulators is slow…read below)
* get comfortable debugging with **[chrome dev tools](https://developer.chrome.com/devtools)**
* developing against a local api? **setup a proxy**
* **$cordovaFileTransfer.upload()** doesn’t work with relative URLs *(in case of proxy)*
* **livereload** doesn’t work with **“device files”**, so just don’t livereload when developing that feature
* Don’t use **html5mode** in angular
* **$ionicPlatform.ready()** *may be required inside your services/controllers for device features (camera, etc.)*

*****

### Get your development process nailed down

I’m sure you have an editor of choice, for me its [Atom](https://atom.io/), for
others its [SublimeText](https://www.sublimetext.com/), or perhaps an IDE
([WebStorm](https://www.jetbrains.com/webstorm) comes to mind).

If you’re using a text editor, **get comfortable using the command line.** The command line will be used when building, deploying, or debugging your ionic app.

#### Don’t confuse the **“cordova”** terminal command with **“ionic”** terminal command

Their are some quirky side effects like not updating package files correctly.

#### Develop against a **REAL** device.

Think about what devices to support **(android, iOS, Windows phone)**. From my
experience, having a device on hand is the best to develop against.

* [Android instructions](http://developer.android.com/tools/device.html)
* [iOS
instructions](http://developer.telerik.com/featured/a-concise-guide-to-remote-debugging-on-ios-android-and-windows-phone/#ios)
(didn’t personally follow this)

#### If you must… use an emulator with **the right configuration**

If you have no device available, or want to test alternative devices then look
into *Emulated devices*. There are two primary options for Android:

* [Genymotion](https://www.genymotion.com/)
* [Android Emulator from
Google](http://developer.android.com/tools/help/emulator.html)

When building Ionic apps, it was difficult to **find an emulator (and
configuration) that performed well/decent**.

**Genymotion** is nice because it comes with mockable device features (camera,
location, etc).

My primary issue with Genymotion was
[performance](http://stackoverflow.com/questions/32130738/emulating-ionic-really-slow-even-on-genymotion-just-using-the-tabs-example),
but I did manage to find one configuration that ran okay:

**> HTC One — 4.4.4 — API 19–1080x1920**

I tried devices with version 6.x but they immediately crash when trying to
access the *Camera* device feature.

[The android emulator by
google](http://developer.android.com/tools/help/emulator.html) performs better
(IMO) than Genymotion when running ionic apps; but it is more complicated to
setup.

The best performing solution I found for the android emulator was the following:

1.  Install “Google APIs Intel x86 Atom System Image” for your preferred SDK version
(I’m using 6.0.0)
1.  Create a new AVD with the following settings:

* Target -> Google APIs (Google Inc.) — API Level 23
* CPU/ABI -> Google APIs Intel Atom (x86)
* Memory Option -> RAM -> 1024 *(too much ram causes the emulator not to start)*
* Emulation Options -> Use Host GPU -> **Checked**

**Emulating the device location** is also a bit more difficult. Instead of
setting it from the device gui, you need to run the following command in the
terminal:

    telnet localhost 5554
    geo fix <longitude value> <latitude value>

### Debugging an ionic app

This is pretty essential in understanding what’s going on when your app is
running on a mobile device. **Below are a handful of issues I personally ran
into when developing/debugging.** (I’ll assume the reader can build and
Deploy/Emulate an application)

#### Get comfortable debugging with **[chrome dev tools](https://developer.chrome.com/devtools)**

There most definitely will be times when something isn’t working. Get
comfortable having the dev tools open when the situation arises.

**Go here:** *chrome://inspect/#devices*

Make sure you have your application open in your device/emulated device (If you
are using a real device you will need to [setup remote
debugging](https://developer.chrome.com/devtools/docs/remote-debugging)). Find
your device and click “inspect”.

#### Developing against a local api? **setup a proxy**

When developing a local API alongside the mobile app, it’s important that you
setup the ionic proxy service.

    {
     “name”: “demo-app”,
     “app_id”: “”,
     “proxies”: [{
       “path”: “/api/latest”,
       “proxyUrl”: “
    "
     }]
    }

#### **$cordovaFileTransfer.upload()*** *doesn’t work with relative URLs

If you’re developing against a local api and also want to develop a feature with
file upload, watch out for relative URL’s. **$cordovaFileTransfer.upload()***
*doesn’t support them (and rightfully so…since a deployed app won’t have your
api running on a “host” machine).

The error that ngCordova creates is super vague…

![](https://d262ilb51hltx0.cloudfront.net/max/1600/1*o13-FR8HVY2BsjjcEbMVpQ.png)

but with some digging into the FileTransfer.js file, the true error can be
revealed:

    Relative URIs are not supported.

#### **Livereload** doesn’t work with **“device files”**

Livereload is an awesome feature that can speed up development time, as you
don’t need to re-deploy for every change you make.

    ionic run android -l

But beware of downsides. The one I ran into was that livereload doesn’t work
when touching device files (e.g. images) ([solution
source](https://forum.ionicframework.com/t/image-uris-from-camera-plugin-and-live-reload/18767)).

![](https://d262ilb51hltx0.cloudfront.net/max/1600/1*Id9Dc2ykW-lJqGyZhu6uQg.png)

I believe this is due to how livereload injects the index.html into the
emulator; which makes it path not truly part of the “device”.

### What are you expecting from ionic?

Ionic can be used to wrap a web application, where none of the device features
are taken advantage of. If this is your case, you will most likely save yourself
from a few struggles I found myself with.

If you are looking to take advantage of these features, please understand that
**You’re not writing a web app**. Understand the difference between a web app
and a mobile app.

#### Don’t use **html5mode** in angular

Coming from the web world, I didn’t think twice about how to implement
navigating inside my ionic app. I event went as far as implementing
**html5Mode**. **DON’T DO THIS**. Doing so will cause the deployed version to
have [invalid file paths on the
device](http://stackoverflow.com/questions/35202759/android-asset-www-missing-from-file-paths-when-building-without-livereload/35204296#35204296).

Additionally, in the future in Ionic 2 will enforce a more native form of
navigation: [The navigation
stack](http://ionicframework.com/docs/v2/components/#navigation). So again, keep
this in mind when developing.

#### **$ionicPlatform.ready()*** *inside your services/controllers

In one of my controllers I needed to access *Camera* properties like so:

    var camOptions = {
     destinationType: Camera.DestinationType.FILE_URI,
     sourceType: Camera.PictureSourceType.CAMERA,
    };

But because this code was technically fired before the device was ready, the
*Camera* Object didn’t exist and threw an error. This issue is caused by
*controller* and *service* code running before *$ionicPlatform.ready()* event is
fired. To get around this issue simply wrap the code with the following:

    controller('MyCtrl', function( $ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Your code
        var camOptions = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
        };
      });
    });

Solution source:
[https://github.com/driftyco/ng-cordova/issues/8](https://github.com/driftyco/ng-cordova/issues/8)

**EDIT: **I’ve since removed these references to *Camera* because it seems the
camera works fine without them.

### Conclusion

Like I mentioned before, I wrote this more so out of frustration. I hope this
article can fuel others with better solutions, or solutions to other common
issues that I haven’t encountered yet.

Cheers

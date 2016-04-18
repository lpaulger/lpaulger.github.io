---
layout: post
title: "Repeat Timer LP"
description: "Resulting app from blog post"
category: javascript
tags: [javascript, phonegap, yeoman, grunt, bower, AngularJS]
comments: true
---

<iframe src="http://lucaspaulger.com/timerApp/#/" height="480px"></iframe>

## The app

This is a continuation of my blog post from last month [Mobile Apps Phonegap Yeoman](/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/). I decided to spend a little more time enhancing the application so that I could submit it to iTunes and publish it to the [web](/timerApp/) (try out the app to the left). The iPhone App will be available soon in [the app store](https://itunes.apple.com/us/app/repeat-timer-lp/id730948498?ls=1&mt=8). Feel free to leave comments and let me know what you think. Please find the [Github repository here](https://github.com/lpaulger/timerApp).

## What's new?

### Design

The application design has changed since [last month's blog post](/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/), primarily the clock interface and the timer modal.  I am still learning phonegap myself and the quirks that go with it.

The Clock stands out as my biggest UI change. The design change came to me while creating the app icon, which is a circle clock with arms. It made me feel like I was missing the relationship between the icon and the application and it inspired me to add a css3 only clock to give the app the personality I was looking for.  Check out the code to see how it was done.

When I looked at the time selection modal I noticed that the UI picker wasn't intuitive.  This annoyed me because it didn't feel right on the mobile application, and I needed to account for touch-friendly events and inputs. Allowing a smoother UI that takes advantage of the native keyboard features.

### Development

See the [blog](/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/) for specifics. I've added some unit tests to the main controller. Otherwise I was just trying to clean up my code a bit. I had a realization that if I want to share some work with the world, sometimes I have to accept that it won't be perfect and instead just get it out there for some good ol' feedback from the community :).

## Contributing

I would love for people who want to learn phonegap or angularjs to contribute to this project.  There are tons of little things that could be adjusted/fixed/improved and of course I could give you credit for your work. Start by [forking](https://github.com/lpaulger/timerApp/fork) the repo and then make a [pull request](https://github.com/lpaulger/timerApp/pulls) when you're ready to merge your changes in.

## Getting started

##### Clone the project

    git clone git@github.com:lpaulger/timerApp.git

##### Install global tools
Assuming node, npm and optionally nvm are installed.

    npm install -g yo
    npm install -g cordova

##### run package installers

    npm install
    bower install

##### serve web

    grunt server

##### build web

    grunt build

##### build ios

    cordova plugin add org.apache.cordova.device
    cordova plugin add org.apache.cordova.vibration
    cordova plugin add org.apache.cordova.inappbrowser
    cordova platform add ios
    grunt build:phonegap    

##### serve ios

Open the TimerApp.xcodeproj within platforms/ios/

Run simulator

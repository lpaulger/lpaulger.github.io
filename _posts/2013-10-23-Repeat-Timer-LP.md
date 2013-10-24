---
layout: post
title: "Repeat Timer LP"
description: "Resulting app from blog post"
category: javascript
tags: [javascript, phonegap, yeoman, grunt, bower, AngularJS]
---

<iframe src="http://lucaspaulger.com/timerApp/#/" class="mobile-app"></iframe>

## The app

This is a continuation of my blog post from last month [Mobile Apps Phonegap Yeoman](/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/). I decide to spend a little more time to enhance the application, submit it to iTunes and publish it to the [web](/timerApp/) (try out the app to the left). The iPhone App will be available soon in [the app store](https://itunes.apple.com/us/app/repeat-timer-lp/id730948498?ls=1&mt=8). Feel free to leave comments and let me know what you think. Please find the [Github repository here](https://github.com/lpaulger/timerApp).

## Whats new?

### Design

The application design changed since [last months blog post](/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/). primarily the clock interface and the timer modal.  I am still learning phonegap myself; and the quarks that go with it.

First was the clock, it stands out as my biggest UI change. The design change came to me when creating the app icon; the icon being a clock. It made me feel like I was missing the relationship between the icon and the application and it inspired me to add a css3 only clock to give the app the personality I was looking for.  Check out the code to see how it was done.

Secondly, when looking at the time selection modal I noticed a huge annoyance when accounting for touch friendly events/inputs. To keep things simple I changed the modal windows to use a select element instead of text inputs.  Allowing a smoother UI that takes advantage of the native keyboard features.

### Development

See the [blog](/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/) for specifics. I've added some unit tests to the main controller. otherwise I was just trying to clean up my code a bit. I had a realization that if I want to share some work with the world; sometimes I have to accept that it won't be perfect and instead just get it out there for some good ol' feedback from the community :).

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

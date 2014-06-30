---
layout: post
title: "My Yeoman Generator [grunt, cordova, angularjs]"
description: "Yeoman generator to get you up and running with an angularjs phonegap"
category: javascript
tags: [javascript, phonegap, yeoman, grunt, bower, AngularJS]
---

###[Quicklink - Github](https://github.com/exBerliners/generator-ng-cordova) [![Build Status](https://secure.travis-ci.org/exBerliners/generator-ng-cordova.png?branch=master)](https://travis-ci.org/exBerliners/generator-ng-cordova)

###Introduction - Yeoman Generators

If you're currently developing with [Yeoman](http://yeoman.io) or [Grunt](http://gruntjs.com)  then you probably have heard of or even used a yeoman generator before. After using a generator for a while it's likely to find things you wish were different about the generator or additional features you'd like to see implemented. 

When I first used yeoman and grunt I found myself tweaking the gruntfile.js to fit my preferences and needs. This was great while working on my current project, but when it came time to start the next project I realized I'd have to leave my gruntfile preferneces behind, or copy them to the new project, risking compatibility issues.

###The Aha Moment
Why not create my own generator? It will have my preferences, and meet my needs when developing.  Brilliant idea, but isn't creating a generator hard? I first began by looking at an [existing generators](https://github.com/yeoman/generator-angular) code and it seemed very foreign to me. After discovering and reading the official [generator introduction](http://yeoman.io/generators.html) by yeoman I began understanding the task and realizing it was much easier than I first anticipated.

###Getting Started
To start, visit yeoman's generator [introduction page](http://yeoman.io/generators.html). The documentation seems to be a little outdates as the templating format has changed from using the **prototype chain**:

```
var BlogGenerator = module.exports = function BlogGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  // ...
};
util.inherits(BlogGenerator, yeoman.generators.NamedBase);
```
To using an **extend** model

```
var BlogGenerator = yeoman.generators.Base.extend({
  init: function () {
    // ...
  }
});
module.exports = BlogGenerator;
```

Even so, the turtorial is very useful in explaining the thought process to writing a new generator. Once you get familiar with the basics of writing a generator, check out other generators from which you've used or that are popular. I heavily used the [Angular generator](https://github.com/yeoman/generator-angular) as a reference to solving problems like adding compass or fixing my unit tests. Keep reading below if you're interested in seeing what I created.

###My Yeoman Generator

![](/images/2014-04-09/yeoman-logo.png)
![](/images/2014-04-09/grunt-logo.png)
![](/images/2014-04-09/cordova-logo.png)
![](/images/2014-04-09/angularjs-logo.png)

###To install:

````
$ npm install -g yo
$ npm install -g generator-ng-cordova
````

It's that easy! check out [the repo](https://github.com/lpaulger/generator-ng-cordova) for more details

###Description

I've created this generator to help me setup new [angularjs](http://angularjs.org) and [phonegap](http://phonegap.com/) applications. The idea started with my [yeoman and phonegap](/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman) tutorial receiving some suggestions for a yeoman generator.  Since I'm a bit of a fanboy for [angularjs](http://angularjs.org) I wrote this generator to spcifically template my application around how an angularjs application would be structured.  With tools and libraries like [Ionic](http://ionicframework.com) openly available, it's given me ideas on how I'd like to expand my generator.

###Conclusion
Check out [Yeoman Generators](http://yeoman.io/generators.html) to see how it can improve your development and feel free to get involved with ones already existing.

*Thank you* 
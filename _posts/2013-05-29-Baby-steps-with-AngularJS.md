---
published: true
layout: post
title: "Baby steps with AngularJS"
description: "How I succeeded and failed while using and learning AngularJS"
category: frameworks
tags: [javascript, AngularJS]
comments: true
---

As I dive into front-end web development head first, I'm quickly learning that things don't always work perfectly.  Let me start of by saying AngularJS is a fairly new javascript library/framework compared to others aiming to solve the client side application problem.  When I was tasked at picking a tool/framework, I chose AngularJS for a few reasons.

### Why AngularJS?

To begin, I read [a blog post](https://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/)  written by the creator of [Knockout.js](https://knockoutjs.com/) where I have previous development experience. Anderson the author, in my opinion gave a very non-biased evaluation of libs/frameworks that already exist; and I recommend it for anyone who is looking to understand the differences of these frameworks.

When it came time to deciding, I narrowed my choices to [backbone.js](https://backbonejs.org/) for it's age, size and community; [Knockout.js](https://knockoutjs.com/) because of my previous experience; and of course [AngularJS](https://angularjs.org/) for its emphasis on Design pattens, testing, and its google...  Looking back, I should have considered [Ember.js](https://emberjs.com/) as well, from what I read, it bring comparable features, design patterns and works really well against a RoR back-end.

### My introduction to AngularJS

Once I got my hands dirty in Angular, I started to understand the good parts, and the bad. Now let me explain - When I started building a simple angular app, I experienced getting data from a server, binding data to the DOM and watching the scope (angular concept) change the DOM as I interacted with the application (clicks, inputs, etc..). It was simple, and intuitive.  Understanding Dependency Injection [DI] took some time to understand, but Angular really showed its strengths when used with the jasmine testing framework! [here is my first SO angular question :)](https://stackoverflow.com/questions/14766051/angularjs-issues-mocking-httpget-request).

The next big hurdle I had to accomplish was how to integrate with third party libraries - in my case [fineuploader](fineuploader.com). I wish I had more time to implement my own solution here but I didn't; so I had to figure out the best way to integrate this into my angular app. I think the code below is common practice and allows you to inject the external lib into any module you need:

    /*globals qq*/
    'use strict';

    angular.module('fineUploaderService', []).factory('fineUploader', [function(){
      return qq;
    }]);

But the thing I didn't know at the time is how a 'directive' could also help me in integrating with this third party plugin (more on 'directives' in the next section).  Continuing to integrate fineuploader I had troubles integrating each callback function for the uploading process.  I ended up with a bunch of code that worked, but was a nightmare to test, and I actually decided not to test it (Bad idea for functionality so core to my application!).  

### Directives

Once you understand that directives are the underlying concept within Angular, you start to understand how everything works.  Especially how all the ng-* directives work! Of course every developer starts out, ng-model, on an input, and watches it change a list or something without needing to write any javascript - and our minds are blown!

Directives are powerful because you can easily create functionality that is re-useable throughout your application. For example encapsulating page layout, events, and components (such as a quantity spinner).  What makes this even more powerful is the ability to combine directives together, a common use is to have a custom directive require ng-model so that a directive will throw an error if there is no object to manipulate.

Here is a [link](https://gist.github.com/lpaulger/) to some of my personal gists on github for these kinds of directives. Feel free to suggest improvements as well :).

### Testing

Testing is made easy with Angular - Dependency injection paired with its mocking libraries make it easy and quick to write unit tests!  Paired with googles amazing testing tool - Karma - you can't go wrong!

#### [Karma](https://karma-runner.github.io/)(Formerly Testactular)

Just check out Karmas website - this tool offers so much value, without much work. really all you do is write your tests, and Karma handles testing on multiple browsers, devices, and even makes Continuous integration a breeze!  Check it out!

### Tooling

Yeoman, Grunt, Bower - the trio of front end development!  I can't imagine developing without these. [Check them out!](https://yeoman.io/)

[Heroku](https://devcenter.heroku.com/)  makes getting a web application up and running for free as simple as it gets!

### What I've learned

Angularjs paired with some amazing tools makes developing for the web fast, easy and reliable!  Angularjs is a powerful framework with a somewhat steady learning curve; but once you have a good understanding of its fundamentals, you will be developing faster than you ever have before!  

Look forward to my next article involving [Phonegap](https://phonegap.com/) and what it takes to develop angularjs for mobile applications!

Until next time - Lucas

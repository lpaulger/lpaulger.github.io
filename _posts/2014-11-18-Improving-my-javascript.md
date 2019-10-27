---
published: true
layout: post
title: "How I improved my javascript"
description: "How I spent the last few months working on a small single page application using only javascript* and how I went about testing, integrating and deploying this application."
category: javascript
tags: [javascript, integration, testing, TDD]
comments: true
---
<div style="margin: 0 auto; text-align: center;">
  <img class="mobile-gif" align="center" height="480" src="/images/2014-11-19/cribbage-the-game-demo.gif">
</div>
Here's my **[simple javascript cribbage game](https://lucaspaulger.com/cribbage-the-game/)**, and some things I learned along the way.  
Below is a **quick summary** of the topics:

* problems (and solutions) I found during development
* creating a build/integration cycle for javascript apps
* setting up automated deployments to github pages

About five months ago I began work on this game. I wanted to improve my skills and knowledge of javascript, and I figured what better way to do that than creating a simple game *using* javascript.

*And so it began...*

### Development - Improving my process!

#### Understand the importance of unit tests

Tests really helped me understand the problem I was trying to solve and at a manageable level.  Before I began writing tests, I found myself in what I like to call **the drag**. The drag occurs when code becomes too confusing to follow, and the speed of development comes to a screeching halt.

The best defense against **the drag** was to simply write unit tests. Tests have proven to be powerful asset to a code base. Once some tests were in place, I started to think of the app as a bunch of simple, yet intuitive problems. These problems in turn could be built upon each other to solve the larger, more complex problems as well; but with the stability and foundation that I could trust. Most commonly I would identify a complex problem, then break it down into multiple small but manageable problems that allowed me to keep my development pace steady.

#### Don't prematurely optimize the code

Another mistake I made (also before testing) was deciding to use the *observer pattern* patterns before having a problem that the pattern was designed to solve. I thought that by using this pattern I could preemptively keep my code clean and organized, [Here is a snapshot](https://github.com/lpaulger/cribbage-the-game/blob/a041df9b4f7505bd5c7a16aa97cd2f01e1c83a51). What actually happened was the opposite of my intent, I coupled the game and the ui because I hadn't yet understood the real problem with my decision. In turn this made my code harder to understand.

As I mentioned above, I recognized that I was in **the drag** state, something needed to change if I was to make any more progress. My solution was to remove the design pattern and simply manage communication in a single file (app.js) instead of observing events passed by each module of the code. [snapshot](https://github.com/lpaulger/cribbage-the-game/tree/613ffc0d3c21130f9f2af787a32987ca8edaef19).

#### Refactor when the need arises, don't plan ahead

By limiting when I refactor to only after I've identified a problem, I learned to allow for proper growth of my application.  I decided to bring the **observer pattern** back (as the mediator pattern) once I noticed a problem of responsibility. Some classes were doing too much communicating outside their scope.

The *mediator pattern* fit nicely because I could have one location for intercommunication, This class gives you much insight into the flow of the application, yet is fairly simple to understand.

#### Javascript Skills
Finally, a list of skills I *actually* improved through developing only in javascript.

* ECMAScript Api
 * [query selectors](https://developer.mozilla.org/en-US/docs/Web/API/document.querySelector) (No more jQuery!)
 * [Array iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [Localstorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage) using json stringified data
* module development ([Requirejs](https://requirejs.org/))

### Build & Configuration - Improving my process

Early on I knew about [Travis CI](https://travis-ci.org/) as a free, open-source continuous integration service.  Take a look at my [.travis.yml file](https://github.com/lpaulger/cribbage-the-game/blob/master/.travis.yml) to understand how I configured my CI, along with my [grunt file](https://github.com/lpaulger/cribbage-the-game/blob/master/Gruntfile.js) for what tasks are run by the CI.

The basics
grunt uses node, so travis should do the same.

```shell
  language: node_js
  node_js:
  - '0.10'
```

Environment setup tasks
I use sass (and compass)
grunt for tasks
and bower for package management

```shell
  before_install:
  - gem install compass
  - npm install -g grunt-cli
  - npm install -g bower
  install:
  - npm install
  - bower install
```

The actual CI part
see below for details

```shell
script:
- grunt test:dist
- grunt build:dist
```

grunt test:dist in more detail, [view my Gruntfile.js file](https://github.com/lpaulger/cribbage-the-game/blob/master/Gruntfile.js) for specific task configuration.

```shell
grunt.registerTask('test', function(){
  grunt.task.run([
    'clean:server',
    'concurrent:test',
    'connect:test',
    'jshint',
    'karma',
    'coveralls'
  ]);
});

grunt.registerTask('build', function(){
  grunt.task.run([
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'requirejs',
    'rev',
    'usemin'
  ]);
});

```

The Deploy (automatically to github pages)

```shell
  after_success:
  - git config --global user.name "your name"
  - git config --global user.email "youremail@gmail.com"
  - grunt buildcontrol:pages
  env:
    global:
      secure: ZOUtcOqHNinpRmZ2/SpYWk787Kg6.... //this is explained in the next step

```

### Deployment - Automate it!

How I setup buildcontrol can be seen [here](https://github.com/lpaulger/cribbage-the-game/commit/ee16ef2e7d037c0cc0ef53b57f16e506a22e2378).  I generated an encryption key thats safe to add to github, the steps can be found at [https://docs.travis-ci.com/user/encryption-keys/](https://docs.travis-ci.com/user/encryption-keys/).


### Conclussion
I know I've only captures a fraction of what I learned in this post, but if any readers have questions or would like an explanation to something; please leave a comment!  

This experience was extremely useful in becoming familiar with javascript, javascript tools and development processes in general. To anyone reading this, I would recommend trying to build something on any scale in your free time to expand your knowledge of the web, and whats possible.

**Thanks everyone! - Lucas**

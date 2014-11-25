---
published: false
layout: post
title: "How I improved my javascript"
description: "How I spent the last few months working on a small single page application using only javascript* and how I went about testing, integrating and deploying this application."
category: javascript
tags: [javascript, integration, testing, TDD]
---

<img class="mobile-gif" align="left" height="480" src="/images/2014-11-19/cribbage-the-game-demo.gif">

Here's my **[simple javascript cribbage game](http://lucaspaulger.com/cribbage-the-game/)**, and some things I learned along the way.  
Below there's a **quick summary** of the topics below:

* problems (and solutions) I found during devlopment
* creating a build/integration cycle for javascript apps
* setting up automated deployments to github pages

About five months ago I began work on this game. I wanted to improve my skills and knowledge of javascript, and I figured what better way to do that than creating a simple game *using* javascript. 

*And so it began...*

###Development - Improving my process!

####Understand the importance of unit tests

Tests really helped me understand the problem I was trying to solve and at a managable level.  Before I began writing tests, I found my self in what I like to call **the drag**. The drag occurs when code becomes too confusing to follow, and the speed of development slows down immensly. 

The best defense against **the drag** was to simply write unit tests. Tests have proven to be powerful asset to a code base. Once some tests were in place, I started to think of the app as a bunch of simple, yet intuitive problems. These problems in turn could be built upon each other to solve the larger, more complex problems as well; but with the stability and foundation that I could trust. When the time came to solve another complex problem, I could take that problem and break it down into multiple simpler problems and keep my development pace managed.

####Don't use design patterns before they're needed

Another mistake I made (also before testing) was deciding to use patterns before I needed them, specifically the *observer pattern*. I thought that because I wanted to keep my code organized early on, I should create some grand architecture scheme to seperate my ui from the logic, [Here is a snapshot](https://github.com/lpaulger/cribbage-the-game/blob/a041df9b4f7505bd5c7a16aa97cd2f01e1c83a51). What I actually ended up doing was the opposite of my intent, I coupled the game and the ui because I hadn't yet understood the real problem with my decision.

As I mentioned above, I recognized that I was in **the drag** stage, something needed to change if I was to make any more progress. My solution was to remove the design pattern and simply manage communication in a single file (app.js) instead of through a mediator passing events around. [snapshot](https://github.com/lpaulger/cribbage-the-game/tree/613ffc0d3c21130f9f2af787a32987ca8edaef19).

####Refactor when the need arises, don't plan ahead

By limiting when I refactor to only after I've indentify a problem, I learned to allowe forproper growth of my application.  I decided to bring the **observer pattern** back (as the mediator pattern) once I noticed a problem of responsibility. Some classes were doing too much communicating outside their scope.

####Javascript Skills
Finally, a list of skills I *actually* improved through developing only in javascript.

* ECMAScript Api
 * [query selectors](https://developer.mozilla.org/en-US/docs/Web/API/document.querySelector) (No more jQuery!)
 * [Array iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [Localstorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage) using json stringified data
* module development ([Requirejs](http://requirejs.org/))

###Build & Configuration - Improving my process

Early on I knew about [Travis CI](https://travis-ci.org/) as a free, open-source continuous integration service.  Take a look at my [.travis.yml file](https://github.com/lpaulger/cribbage-the-game/blob/master/.travis.yml) to understand how I configured my CI, along with my [grunt file](https://github.com/lpaulger/cribbage-the-game/blob/master/Gruntfile.js) for what tasks are run by the CI.

The basics
grunt uses node, so travis should do the same.

```shell
  language: node_js
  node_js:
  - '0.10'
```

Enviornment setup tasks
I use sass (and compass)
grunt for tasks
and bower for package managment

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

###Deployment - Automate it!

How I setup buildcontrol can be seen [here](https://github.com/lpaulger/cribbage-the-game/commit/ee16ef2e7d037c0cc0ef53b57f16e506a22e2378).  I generated an encryption key thats safe to add to github, the steps can be found at [http://docs.travis-ci.com/user/encryption-keys/](http://docs.travis-ci.com/user/encryption-keys/).


###Conclussion
I know I've only captures a fraction of what I learned in this post, but if any readers have questions or would like an explanation to something; please leave a comment!  

This experience was extrememly useful in becoming familiar with javascript, javascript tools and development processes in general. To anyone reading this, I would reccomend trying to build something on any scale in your free time to expand your knowledge of the web, and whats possible. 

**Thanks everyone! - Lucas**
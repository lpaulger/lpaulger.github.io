---
layout: post
title: "JSCover Guide"
description: "How to get JSCover running with your project"
category: code-quality
tags: [javascript, JSCover, test, testing]
comments: true
---

I've begun using [JSCover](https://tntim96.github.com/JSCover/) and have found that understanding how it works isn't as straight forward as I initially thought **(I would say I'm a novice at setting up javascript tooling)**. Lets first get JSCover installed and then move on to explaining how it works.

### Installation

1. download from [JSCover Download link](https://sourceforge.net/projects/jscover/files/JSCover-0.2.0.zip/download)
2. run the example-server.sh (In Terminal or CmdPrompt) you may need to modify this script to configure what options the server is run with.
    Mac:
    sh example-server.sh
    Windows:
    example-server.sh
3.  by default go to [demo page](https://localhost:8080/jscoverage.html?/index.html)

### Explanation

Once installed and you've navigated to the link you'll see 5 separate tabs. Lets understand how to think about JSCover.  JSCover simply keeps track of when a specific peice of code is run.  So your unit tests, in theory run and hit your js files. When they hit these js files they are executing code and therefor JSCover tracks when these functions are called hence giving you an understanding of how much of your code is covered by tests.

### Testing using QUnit/Jasmine

It's important to understand that the executing js needs to exist in the incoming directory. All files you wish not to be tracked (src files, libs, test files) need to ignored using --no-instrument=PATH

Example:

    java -jar target/dist/JSCover-all.jar -ws --branch
     --document-root=application/Content/scripts/
     --report-dir=jscover --no-instrument=test --no-instrument=src

Additionally any folders you do not want to be searched you can exclude by adding the --exclude=PATH paramater (can be called multiple times)

Side Note:

   I had JSCover running great on my personal project (not many unit tests) but when I implemented on my larger project at work we had close to 40 js files to run tests on. For some reason I was seeing an encoding error: [link to github issue](https://github.com/tntim96/JSCover/issues/36). After a few quick messages with the owner of JSCover, he notified me of an optional encoding option. Once updating the UTF-8 I fixed my issue, so keep that in mind if when implementing you see a similiar issue.

   Example:

        java -Dfile.encoding=UTF-8 -jar target/dist/JSCover-all.jar -fs [OPTIONS]

So there you have it! I have this running at work with QUnit, and at home with Jasmine. If you have any questions setting up JSCover feel free to leave a message! or just go straight to the project @[JSCover](https://github.com/tntim96/JSCover) or [JSCover Issues](https://github.com/tntim96/JSCover/issues).

Check out my working [example](/target/report/jscoverage.html?jasmine-standalone-1.3.1/SpecRunner.html) against my Jasmine tests

Thanks for reading!

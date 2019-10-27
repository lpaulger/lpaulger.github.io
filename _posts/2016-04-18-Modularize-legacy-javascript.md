---
published: true
layout: post
title: "Modularize legacy javascript"
description: ""
comments: true
---

* * *

### Modularize legacy javascript

I’ve been working on a project that is about four years old. In recent days I moved towards working on new mini applications. In doing so I found myself needing to reference some of the code that exists in the old application. Instead of simply copy and pasting it into the new apps, I pursued figuring out how I could abstract these libraries/utilities. This would allow the code to be used outside that project and only needing to be maintained in one location.

Having knowledge of [CommonJS](http://www.commonjs.org/) and [AMD module systems](http://requirejs.org/docs/whyamd.html), I was stuck wondering how I could “use” modules in older systems that had no module loader, or as I call it “namespace” modules.

While using [NPM packages](http://npmjs.org/) I noticed that more and more front-end modules/libs/packages have appeared there. For example [jQuery](https://www.npmjs.com/package/jquery), [knockout](https://www.npmjs.com/package/knockout) and so on. When loading these packages into a project I noticed that they supported the three scenarios mentioned above (CommonJS, AMD and no module loader). Looking into knockout’s code I saw the code that was solving this problem:

<script src="https://gist.github.com/lpaulger/381ef352bdc285a978ff1294b4419378.js"></script>

After researching, I found that the code above is pretty common, and in fact there was a name for it… [UMD or Universal Module Definition](https://github.com/umdjs/umd). UMD helps in creating javascript modules that are support by all three module scenarios.

Utilizing build tools, you can turn regular code into UMD code.

Before:
<script src="https://gist.github.com/lpaulger/07de7967f7e29a1047b8836041449c34.js"></script>

After it’s been UMDified:
<script src="https://gist.github.com/lpaulger/1ae8a6a828b931831b6884d93309b39d.js"></script>

Now that you have pulled out this snippet of code from the legacy app, you need to reference it again. What I ended up doing was adding the reference into my package.json:

<script src="https://gist.github.com/lpaulger/682646773d0da267f58275c49c11adc5.js"></script>

Adding the package into the build process:

<script src="https://gist.github.com/lpaulger/5c26226b1ba1c49822b6b04f406bbb0d.js"></script>

And referencing the new module where the old namespace code was:

<script src="https://gist.github.com/lpaulger/d5755727576b97c7cc681b8d5f161e6a.js"></script>

Now that the module had been successfully replaced in the legacy code, I could make use of the module in my new application that uses the CommonJS module pattern.

CommonJS seems to be the defacto method going forward. Build tools such as [browserify](http://browserify.org/) and [webpack](https://webpack.github.io/) make full use of the CommonJS pattern.

[ES6 also outlines module loading](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) with their “import” and “export” syntax, which follows the CommonJS pattern.

My drive to write this is to help other developers who may be stuck writing old code, for old websites, and help them move towards writing more modular, future proof javascript.


By [Lucas Paulger](https://medium.com/@lpaulger) on [<time class="dt-published" datetime="2016-04-18T09:23:25.511Z">April 18, 2016</time>](https://medium.com/p/2758ffcdcd3e).

[Canonical link](https://medium.com/@lpaulger/modularize-legacy-javascript-2758ffcdcd3e)

Exported from [Medium](https://medium.com) on October 27, 2019.

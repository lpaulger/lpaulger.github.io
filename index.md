---
layout: page
title: LP Projects
tagline: programming(one_line_at_a_time);
---
{% include JB/setup %}
<div class="span6">
  <div class="hero-unit">
    <h1>I'm Luke (LP)</h1>
    <p>This is a site about me, my work, and what I'm up to!</p>
  </div>

  
</div>



## Hello World!

I've finally updated my site using [Jekyll Bootstrap](http://jekyllbootstrap.com)!  I'm going to leave the default jekyll post on my site in case anyone is curious.

Read [Jekyll Quick Start](http://jekyllbootstrap.com/usage/jekyll-quick-start.html)
    
## Recent Posts

Obviously this isn't very full right now. Lets hope that it fills up quickly as I learn about front end development and design techniques!

{% assign posts = site.posts %} {% assign listing_limit = 3 %} {% include post-listing.html %}


## All my Posts
<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>





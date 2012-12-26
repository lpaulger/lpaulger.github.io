---
layout: page
title: LP Projects
tagline: programming(one_line_at_a_time);
---
{% include JB/setup %}

<section id="home">
  <div class="hero-unit">
    <h1>I'm Luke (LP)</h1>
    <p>This is a site about me, my work, and what I'm up to!</p>
  </div>
  <h2>Hello World!</h2>
  <p>I've finally updated my site using <a href="http://jekyllbootstrap.com">Jekyll Bootstrap</a>!  I'm going to leave the default jekyll post on my site in case anyone is curious.</p>
  <p>Read <a href="http://jekyllbootstrap.com/usage/jekyll-quick-start.html">Jekyll Quick Start</a></p>
  <h2>All my Posts</h2>
  <ul class="posts">
    {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
</section>

<aside>
  <h2>Recent Posts</h2>
  <p>Obviously this isn't very full right now. Lets hope that it fills up quickly as I learn about front end development and design techniques!</p>
  {% assign posts = site.posts %} {% assign listing_limit = 3 %} {% include post-listing.html %}
</aside>





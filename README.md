# lpaulger.github.io

Personal site, built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

## Running locally

Prerequisites: Ruby (3.x recommended) and Bundler.

```sh
bundle install
bundle exec jekyll serve --livereload
```

The site will be available at <http://localhost:4000>. Pass `--drafts` to preview posts in `_drafts/`.

## Layout

- `_posts/` — published posts (`YYYY-MM-DD-title.md`)
- `_layouts/`, `_includes/`, `_sass/` — theme templates and styles
- `assets/`, `images/` — static files
- `_config.yml` — site configuration

## Credits

Based on the [Plain](https://heiswayi.github.io/the-plain.html) Jekyll theme by Heiswayi Nrird, itself based on Leonard Lamprecht's [theme](https://github.com/leo/leo.github.io). MIT licensed.

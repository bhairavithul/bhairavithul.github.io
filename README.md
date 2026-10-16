# Portfolio site: file guide

## Folder structure
```
index.html
favicon.ico                   fallback tab icon (browsers look for it at the top level)
robots.txt                   asks AI training crawlers to stay out; search engines are welcome
404.html                      shown for any broken link (GitHub Pages picks it up)
tinker-village/index.html    case study pages, one folder each
wellguard/index.html
swasbridge/index.html
dg-lock/index.html
css/design-system.css
js/main.js
images/
  shared/                      used on every page
    header-logo.png            header, top-left logo (white); also the home button
    favicon-light.png          browser tab icon, burgundy (light-mode browsers)
    favicon-dark.png           browser tab icon, white (dark-mode browsers)
    apple-touch-icon.png       icon when saved to an iPhone home screen
  home/                        used only on index.html
    hero-portrait.webp         hero section, right side
    clients-infosys-helix.png  "Worked with" marquee (white logos, transparent)
    clients-contra.png
    clients-neom.png
    clients-prudential.png
    clients-tinker-village.png
    clients-trot-studios.png
    clients-non-zero.png
    featured-tinker-village.jpg   Featured card thumbnail       (to add)
    projects-wellguard.jpg        Other projects card thumbnail (to add)
    projects-swasbridge.jpg       Other projects card thumbnail (to add)
    projects-dg-lock.jpg          Other projects card thumbnail (to add)
    spotify-cover.jpg             Spotify tile cover            (to add, optional)
  404/hero-judgy-cat.png       the cat (also built into 404.html so it shows on any URL)
  tinker-village/              one folder per case study page
  wellguard/
  swasbridge/
  dg-lock/
```

## Naming pattern
`images/<page>/<section>-<subject>.<ext>`
- page folder: `home`, a case study name, or `shared` if it appears on every page
- section: where it sits on the page (`header`, `hero`, `clients`, `featured`, `projects`, `spotify`)
- all lowercase, words joined with hyphens, no spaces


## Adding the project thumbnails
Next to each placeholder in `index.html` there is a comment with the exact line to swap in.
Use 4:3 images (for example 1200x900) so they fit the cards without cropping.

## Spotify cover
The tile currently loads the cover from Spotify. To host it yourself, save it as
`images/home/spotify-cover.jpg` and change the `src` of `.spotify__cover` in `index.html`.

## Putting it on GitHub Pages
1. In your repo, choose Add file > Upload files, and drag in the contents of this folder (index.html, css, js, images), not the zip itself.
2. Keep `index.html` at the top level of the repo, not inside another folder.
3. Settings > Pages > Deploy from a branch > main > / (root). Wait a minute, then open the link GitHub shows.
4. File names are case-sensitive on GitHub, so keep everything lowercase as named here.

`index.html` already has the design system and script built into it, so the homepage keeps its
colours even if the css/ or js/ folder is missing. Keep `css/design-system.css` for the case study
pages, which will link to it. If you change the CSS file, ask me to rebuild `index.html` so the copy inside stays in sync.

## Case study pages
Each page uses the same layout: intro, cover, three impact tiles, problem, approach, solution (two screens), outcome and a link to the next project. Text in [ square brackets ] is placeholder copy to replace. Next to each image placeholder is a comment with the exact image line and file name to swap in (for example `images/tinker-village/hero-cover.jpg`). These pages link to `../css/design-system.css`, so upload the `css/` and `js/` folders too.

## Screen sizes (breakpoints)
| Size | Width | What changes |
|---|---|---|
| Desktop | 1024px and up | full bento: featured 5 + other projects 7, testimonials 9 + spotify 3 |
| Medium | 768-1023px | featured and other projects go full width, testimonials 8 + spotify 4, desktop-style type one step smaller |
| Small | 576-767px | everything stacks, a little more side padding, project cards show 2.5 at a time |
| Phone | 575px and down | everything stacks, project cards show 1.5 at a time, stat tiles in one column |

Column classes on each bento block: `d-N` (desktop), `md-N` (medium), `sm-N` (small), `m-N` (phone), where N is 1-12.
If `md-N` is missing, medium uses `d-N`. If `sm-N` is missing, small uses `m-N`.

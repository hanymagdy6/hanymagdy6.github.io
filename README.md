# Hany Magdy, Graphic Designer

![Site screenshot](docs/screenshot.png)

Portfolio website of Hany Magdy, a graphic designer based in Cairo, Egypt. It shows brand identities, social media campaigns and print work.

**Live site:** https://hanymagdy6.github.io/

## The idea

One calm, fast page that lets the work speak. A short intro, a portfolio of projects grouped by type, an about page and a contact section. Each project opens as its own view with a gallery and key facts.

## Design decisions

- Navy (#1b3d5a) and orange (#f79a2d) as the only brand colors.
- English and Arabic versions. Arabic switches the whole page to right-to-left, and the layout mirrors with it. The chosen language is remembered in the browser.
- Images are shown whole, never cropped or compressed.
- Motion is subtle and continuous, and it stops when the visitor's device asks for reduced motion.
- The navigation stays on one line at every screen width.

## Structure

```
index.html        page markup (all views, hash-routed: #about, #work, #contact, #p-<project>)
privacy.html      privacy page
css/style.css     all styles, with a comment above each section
js/content.js     the site text in English and Arabic (edit text here)
js/main.js        behavior: language switch, routing, slider, animations
images/           project and site images
fonts/            web fonts
docs/             README screenshot
```

## Tech

Plain HTML, CSS and JavaScript. No framework and no build step. To run it locally, serve the folder with any static server, for example `python3 -m http.server`, and open http://localhost:8000. It is hosted on GitHub Pages and every push to `main` goes live.

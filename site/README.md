# Muhammad Shafi S — Portfolio

Production build of the approved Claude Design (`Shafi Portfolio.dc.html`).
Static site — no build step, no dependencies. Just serve the folder.

## Run locally

```bash
cd site
python3 -m http.server 8777
# open http://localhost:8777
```

Any static host works (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, nginx…).
Deploy the contents of `site/`.

## Structure

```
site/
├─ index.html          # markup for all 5 pages (Home/About/Skills/Work/Contact)
├─ css/styles.css       # globals, keyframes, responsive + transition rules
├─ js/main.js           # routing, transitions, nav, filters, reels, 9:16 modal
└─ assets/
   ├─ portrait-1.png    # Home hero (grayscale cutout)
   ├─ portrait-2.png    # About portrait (color, framed)
   └─ reels/            # 31 published reels (web-optimized H.264 mp4 + jpg poster each)
```

## Reels

The Work page shows only finished, published reels — no placeholders. Each entry lives
in the `REELS` array at the top of `js/main.js`:

```js
{ title: 'ALDEEK CAFE', catKey: 'PROMOTIONAL', cat: 'Promotional Video', slug: 'aldeek/aldeek-01' }
```

`slug` maps to `assets/reels/<slug>.mp4` and `assets/reels/<slug>.jpg` (poster). The
card shows a muted looping preview; clicking opens the exact-9:16 modal player with
controls and autoplay. `catKey` must be one of `EVENTS`, `PROMOTIONAL`, `SOCIAL MEDIA`,
`CINEMATIC` — these drive the filter chips.

**To add a new reel:** encode it (see below), drop the two files in `assets/reels/`,
and append one object to the `REELS` array. No other code changes needed.

**Encode spec** used for every reel in this repo — matches well against source phone/export
footage while staying small enough for web delivery:

```bash
ffmpeg -i input.mov \
  -vf "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)'" \
  -c:v libx264 -preset medium -crf 27 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart \
  output.mp4
```

Poster (grab a representative frame, ~10% into the clip):

```bash
ffmpeg -ss 2 -i output.mp4 -frames:v 1 output.jpg
```

Raw/unedited source footage (multi-hundred-MB phone exports) is intentionally **not**
committed to this repo — only the compressed, published cut of each reel is.

## Content

All copy, contact details, roles, education and software proficiencies come from the
supplied client information and are set directly in `index.html` / `main.js`.

**Social links:** Instagram points to
[instagram.com/mommad.framez](https://www.instagram.com/mommad.framez?utm_source=qr)
(opens in a new tab) in the rail sidebar, both Home footer layouts, and the About page.
YouTube and LinkedIn are still `href="#"` placeholders — send over the real URLs and
they're a one-line swap in `index.html` (search `aria-label="YouTube"` / `"LinkedIn"`).

## Notes

- **Responsive:** desktop composition above 860px, mobile below (hamburger + full-screen menu).
- **Accessibility:** keyboard-operable nav/filters/reels (Enter/Space), focus-visible rings,
  Escape closes the menu and the reel modal, focus is restored on modal close,
  `prefers-reduced-motion` disables animations.
- **Performance:** hero portrait is preloaded; reel videos use `preload="none"` with a poster
  so nothing downloads until a card is opened.

## Known follow-ups

- **Social links:** YouTube and LinkedIn are still `href="#"` placeholders — send the
  real URLs and they're a one-line swap in `index.html`.

The Skills-page software icons (`assets/icons/` — CapCut, Alight Motion, Premiere Pro,
DaVinci Resolve) are now the real brand icons, rendered inside the proficiency rings.

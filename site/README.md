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
├─ css/styles.css      # globals, keyframes, responsive + transition rules
├─ js/main.js          # routing, transitions, nav, filters, reels, 9:16 modal
└─ assets/
   ├─ portrait-1.png   # Home hero (grayscale cutout)
   ├─ portrait-2.png   # About portrait (color, framed)
   └─ reels/           # ← drop reel videos + posters here
```

## Adding the reel videos (9:16)

Reels are defined once, at the top of `js/main.js` in the `REELS` array. Each card
already renders an **exact 9:16** frame; today it shows a numbered placeholder and the
modal shows "VIDEO COMING SOON". To publish a real reel, drop the files in
`assets/reels/` and fill in the matching entry — no other code changes:

```js
{ n: '01', catKey: 'EVENTS', cat: 'Event Coverage',
  src: 'assets/reels/reel-01.mp4',      // the 9:16 video
  poster: 'assets/reels/reel-01.jpg' }, // still frame shown on the card
```

- `src`  → card shows a muted looping preview; clicking opens the full 9:16 player (with controls, autoplay).
- `poster` (optional) → still image on the card and as the video poster.
- Leave both `null` to keep the placeholder.

Recommended encode: **H.264 MP4, 1080×1920 (9:16)**, ~8–12 Mbps, AAC audio.
Keep posters as 1080×1920 JPG/WebP for a crisp card.

`catKey` must be one of: `EVENTS`, `PROMOTIONAL`, `SOCIAL MEDIA`, `CINEMATIC`
(these drive the filter chips). Add more reels by appending new objects.

## Content

All copy, contact details, roles, education and software proficiencies come from the
supplied client information and are set directly in `index.html` / `main.js`.
Social links (Instagram / YouTube / LinkedIn) are `href="#"` placeholders — replace with
the real URLs when available.

## Notes

- **Responsive:** desktop composition above 860px, mobile below (hamburger + full-screen menu).
- **Accessibility:** keyboard-operable nav/filters/reels (Enter/Space), focus-visible rings,
  Escape closes the menu and the reel modal, focus is restored on modal close,
  `prefers-reduced-motion` disables animations.
- **Performance:** hero portrait is preloaded; other media use `loading`/`decoding` hints;
  reel videos use `preload="none"`.

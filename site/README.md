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
Deploy the contents of `site/`. Currently live at GitHub Pages via
`.github/workflows/deploy-pages.yml` — publishes automatically on every push to `main`.

## Structure

```
site/
├─ index.html          # markup for all 5 pages (Home/About/Skills/Work/Contact)
├─ css/styles.css       # globals, keyframes, responsive + transition rules
├─ js/main.js           # routing, transitions, nav, filters, reels, 9:16 modal, contact form
└─ assets/
   ├─ portrait-1.png    # Home hero (grayscale cutout)
   ├─ portrait-2.png    # About portrait (color, framed)
   ├─ icons/            # real software icons for the Skills page
   └─ reels/            # 38 published reels (web-optimized H.264 mp4 + jpg poster each)
      ├─ mla/            # M. M. Naseer, MLA (Chadayamangalam) — current constituency work
      └─ aldeek/          # Aldeek Container Cafe
```

## Contact form

The "SEND ME A MESSAGE" form on the Contact page delivers to **shafishams08@gmail.com**
via [FormSubmit](https://formsubmit.co) — a free form-relay service, no backend or API
key required. Wired in `js/main.js` (`CONTACT_ENDPOINT`).

**One-time activation:** the *first* message ever sent through the form triggers a
confirmation email from FormSubmit to shafishams08@gmail.com. That email must be opened
and its activation link clicked once — after that, every future submission is delivered
straight to the inbox automatically, with no further action needed. (A wiring test was
run during setup, so check that inbox for the activation email.)

If FormSubmit is ever unreachable, the form shows an inline error with a `mailto:` link
as a fallback — nothing is silently lost.

## Reels

The Work page shows only finished, published reels — no placeholders. Each entry lives
in the `REELS` array at the top of `js/main.js`:

```js
{ title: 'ALDEEK CAFE', catKey: 'PROMOTIONAL', cat: 'Promotional Video', slug: 'aldeek/aldeek-01' }
```

`slug` maps to `assets/reels/<slug>.mp4` and `assets/reels/<slug>.jpg` (poster). The
card shows a muted looping preview; clicking opens the exact-9:16 modal player with
controls and autoplay. `catKey` must be one of `MLA WORKS`, `EVENTS`, `PROMOTIONAL`,
`SOCIAL MEDIA`, `CINEMATIC` — these drive the filter chips.

**MLA WORKS** is the current, most important project — the 7 reels from the PR team of
M. M. Naseer, MLA (Chadayamangalam). They're pinned first in the `REELS` array (so they
lead the "ALL" view) and carry a red "CURRENT PROJECT" badge on their card.

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

**Social / contact icons** — Instagram · Email · WhatsApp · LinkedIn, in the rail sidebar,
both Home footer layouts, and the About page:
- **Instagram** → [instagram.com/mommad.framez](https://www.instagram.com/mommad.framez?utm_source=qr)
- **Email** → opens a pre-filled message to shafishams08@gmail.com
- **WhatsApp** → opens a pre-filled chat to +91 79947 69644
- **LinkedIn** → [linkedin.com/in/muhammed-shafi-698514266](https://www.linkedin.com/in/muhammed-shafi-698514266)

The email and WhatsApp icons pre-fill the same plain-text message: *"Hi Muhammad,
we are ready to hire you for our project. Let's connect and discuss the details."*

**Contact page** lists Email · Call · WhatsApp · Location — all tappable (Call opens the
dialer, WhatsApp opens a pre-filled chat).

## About page assets

The About page uses a pencil-sketch portrait floating on the dark background:
- `assets/portrait-2.png` — the raw sketch you uploaded (source; kept for reference).
- `assets/about-cutout.png` — derived from it: trimmed to the figure and white background
  removed (ImageMagick corner flood-fill) so it sits cleanly on dark, no frame.
- `assets/signature.png` — the red "Shafi." signature with its white background made
  transparent.

To regenerate the cutout after replacing `portrait-2.png`:
```bash
cd site/assets
convert portrait-2.png -bordercolor white -border 1 -fuzz 12% -trim +repage about-portrait.png
convert about-portrait.png -alpha set -fuzz 16% -fill none \
  -draw "matte 0,0 floodfill" -draw "matte %[fx:w-1],0 floodfill" \
  -draw "matte 0,%[fx:h-1] floodfill" -draw "matte %[fx:w-1],%[fx:h-1] floodfill" \
  about-cutout.png
```

## Known follow-ups

- **⚠️ Education wording:** the design mockup labelled education "B.Sc Computer Science
  Background," but the real qualification on file is a **Diploma in Computer Science &
  Engineering (SBTE)** — I kept the accurate one rather than the mockup's placeholder.
  Confirm if that's correct.
- **⚠️ Name spelling:** About page paragraphs no longer mention the MLA by name (the new
  mockup copy is more general), so the Nazeer/Naseer question no longer affects the About
  page. The MLA reels still use "M. M. Naseer" (matching their on-screen graphics) in the
  Work section — confirm that spelling.
- **Cache-busting:** `styles.css` and `main.js` are linked with `?v=2`. Bump this number
  whenever you change either file so browsers/GitHub Pages fetch the new version.

## Notes

- **Responsive:** desktop composition above 860px, mobile below (hamburger + full-screen menu).
- **Accessibility:** keyboard-operable nav/filters/reels (Enter/Space), focus-visible rings,
  Escape closes the menu and the reel modal, focus is restored on modal close,
  `prefers-reduced-motion` disables animations.
- **Performance:** hero portrait is preloaded; reel videos use `preload="none"` with a poster
  so nothing downloads until a card is opened.

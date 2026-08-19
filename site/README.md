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

## Reels — fanned/overlapping stack by category

The Work page groups reels into labelled category sections, each rendered as a
**fanned overlapping card deck**: the center card is enlarged with a red border,
side cards peek out at decreasing scale/opacity, and prev/next arrows (or a mobile
touch swipe) rotate the deck. Tap a peeking card to bring it to center; tap the
center card (or the red **PLAY** button) to open the 9:16 (or 16:9) modal player.

Filter chips at the top act as anchors — clicking a category smooth-scrolls to
that section (and `ALL` filter shows every section, in order).

Each `REELS` entry:

```js
{ title: 'ALDEEK CAFE', catKey: 'PROMOTIONAL', cat: 'Promotional Video', slug: 'aldeek/aldeek-01' }
// or for a landscape clip:
{ title: 'JUNGLE MOVIE REF', catKey: 'REMAKES', cat: 'Cinematic Remake', slug: 'remakes/jungle-movie-ref', ratio: '16:9' }
```

`slug` maps to `assets/reels/<slug>.mp4` and `assets/reels/<slug>.jpg` (poster).
Add `ratio: '16:9'` for landscape clips — the card frame stays uniform 9:16 (the
video letterboxes inside), and the modal opens in the correct wide aspect. Default
ratio is 9:16.

`catKey` must be one of the categories in the `CATEGORIES` array at the top of
`js/main.js`. To add a new category, append `{ key, label, tag }` to that array and
tag your reels with the same `catKey`.

**MLA WORKS** is the current, most important project — the 7 reels from the PR team of
M. M. Naseer, MLA (Chadayamangalam). It's ordered first in `CATEGORIES` so it leads the
"ALL" view.

**REMAKES** is the film-reference / cinematic remakes category — 4 reels (mix of
vertical and landscape).

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
- `assets/portrait-2.png` — the raw sketch (source; kept for reference).
- `assets/about-cutout.png` — the same portrait with its background removed so it sits
  cleanly on dark, no frame. Currently a hand-cleaned cutout — if you replace it, just
  drop the new file in at the same path; no code changes needed as long as the aspect
  ratio stays roughly portrait.
- `assets/signature.png` — the red "Shafi." signature, transparent background.

The signature appears in three places: inside the About page's quote card (both desktop
and mobile), inside the rail sidebar's "Every frame has a purpose" quote (shown on the
Work and Contact pages), and nowhere else — it's deliberately paired with quotes/copy
rather than floating loose over the portrait, so it always has a legible backdrop.

## Behind the Scenes (16:9 process video)

The Work page has a dedicated section below the reel grid — **"TIMELINE → RAW → RENDER"**
— for content that isn't a 9:16 reel: a 16:9 process/comparison video showing the edit
timeline, raw footage and final render side by side inside CapCut. It uses the same
card → modal pattern as the reels, but the modal now supports either aspect ratio.

- Video: `assets/reels/process/timeline-raw-render.mp4` (+ `.jpg` poster)
- Defined once as `PROCESS_VIDEO` near the top of `js/main.js`, with `ratio: '16:9'`
- The modal (`openMedia()` in `main.js`) reads `ratio` and resizes the frame — `9:16`
  reels get the tall frame, `16:9` items get a wide `min(92vw, 960px)` frame

**To add another 16:9 (or any non-reel) video** the same way: transcode it, drop it in
`assets/reels/`, and either add a new card block copying the "BEHIND THE SCENES" markup
in `index.html`, or extend the pattern with more entries.

## Link previews (Open Graph / Twitter Card)

`assets/thumbnail.png` (1668×943) is now wired into `og:image` / `twitter:image` with
absolute URLs, `og:url`, `og:site_name`, image dimensions, and `twitter:card:
summary_large_image` — so sharing the site link on WhatsApp, iMessage, Slack, X, etc.
shows the real thumbnail instead of a bare link or a random image. If you swap the
image, keep the same filename or update the two `og:image`/`twitter:image` URLs in
`index.html`'s `<head>`.

## Known follow-ups

- **⚠️ Education wording:** the design mockup labelled education "B.Sc Computer Science
  Background," but the real qualification on file is a **Diploma in Computer Science &
  Engineering (SBTE)** — I kept the accurate one rather than the mockup's placeholder.
  Confirm if that's correct.
- **⚠️ Name spelling:** the MLA reels use "M. M. Naseer" (matching their on-screen
  graphics) — confirm that spelling is correct.
- **Cache-busting:** `styles.css` and `main.js` are linked with `?v=3`. Bump this number
  whenever you change either file so browsers/GitHub Pages fetch the new version.

## Notes

- **Responsive:** desktop composition above 860px, mobile below (hamburger + full-screen menu).
- **Accessibility:** keyboard-operable nav/filters/reels (Enter/Space), focus-visible rings,
  Escape closes the menu and the reel modal, focus is restored on modal close,
  `prefers-reduced-motion` disables animations.
- **Performance:** hero portrait is preloaded; reel videos use `preload="none"` with a poster
  so nothing downloads until a card is opened.

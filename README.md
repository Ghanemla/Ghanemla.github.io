# ghanemla.github.io

Personal portfolio for **Ghanem Lamloumi** — full-stack developer and IT security technician.
Live at <https://ghanemla.github.io/>.

Hand-authored static site: plain HTML, one stylesheet, one small vanilla-JS file. No framework,
no build step, no third-party scripts, no trackers. Design system: **"Spec Sheet, Warmed"** —
dark is the brand identity, light is a fully designed equal. Bilingual: **Swedish is the default**,
English is one click away.

---

## Website structure

```
/                         index.html              Homepage — hero, pathways, selected work, education, contact
/development/             development/index.html  Development profile — projects, experience, skills
/cybersecurity/           cybersecurity/index.html Cybersecurity profile — qualification, labs, case study, toolset

styles.css                Every style on the site (design tokens → components → responsive)
main.js                   Theme toggle, language toggle, mobile nav, CV menu. Nothing else.

assets/Ghanem.jpg         Portrait (900×675, used in the homepage hero only)
assets/og-image.png       Social preview, 1200×630, dark theme
assets/favicon.svg        Favicon
assets/GL_logo.png        Legacy logo, kept as the apple-touch-icon
assets/cv/                Sanitized public CV PDFs (see "Replacing the CVs")

robots.txt                Allows all crawlers, points at the sitemap
sitemap.xml               The three pages
.nojekyll                 Tells GitHub Pages to serve files as-is, no Jekyll processing
.claude/launch.json       Local preview server definition (dev-only, not published)
```

Education and contact live on the homepage (`/#education`, `/#contact`) and are linked from every
page's navigation — there are no separate pages for them. Both languages live in the same three
pages; there is no `/en/` or `/sv/` URL split.

---

## Local development

Any static file server works. The site uses root-absolute paths (`/styles.css`, `/development/`),
so it must be served from a server root — opening `index.html` from the filesystem will not work.

```bash
python -m http.server 4000
```

Then open <http://localhost:4000/>.

Alternatives: `npx serve -l 4000` or `php -S localhost:4000`.

There is no build step and no production build to run. What is in the repository is what ships.

---

## Deployment

GitHub Pages serves the `main` branch from the repository root. Pushing to `main` publishes the
site; there is no workflow, no build and no output directory.

```bash
git add -A
git commit -m "Describe the change"
git push origin main
```

Pages usually reflects the change within a minute. Because `.nojekyll` is present, files and folders
are served exactly as committed.

### GitHub Pages behaviour to know about

- This is a **user site** (`Ghanemla.github.io`), so it is served at the domain root. Root-absolute
  paths like `/development/` are correct. If the site were ever moved to a project repository, every
  root-absolute path would need a `/repo-name` prefix.
- Directory URLs work because each folder contains an `index.html`. `/development` (no trailing
  slash) is redirected to `/development/` by Pages.
- There is no server-side redirect or 404 page configured; add `404.html` at the root if one is wanted.
- Fonts load from Google Fonts. Everything else is served from this repository.

---

## Language system

Swedish is the site's default and English is a toggle in the navigation.

**How it works.** Every piece of copy exists twice in the markup, side by side, and CSS hides the
one that isn't active:

```html
<h3><span lang="sv">Härdad server</span><span lang="en">Hardened server</span></h3>
```

```css
html[data-lang="sv"] [lang="en"],
html[data-lang="en"] [lang="sv"] { display: none; }
```

Consequences worth knowing:

- **It works without JavaScript.** The document ships as `<html lang="sv" data-lang="sv">`, so a
  visitor with JS disabled gets a complete Swedish site rather than a page showing both languages.
- **The hidden language is genuinely hidden** — `display: none` removes it from the box tree *and*
  from the accessibility tree, so screen readers and Ctrl+F only ever see one language.
- **Both languages are in the HTML source**, which is what lets search engines see the Swedish and
  English copy without a second set of URLs.
- The choice is saved in `localStorage` under the key `lang`, and the inline `<head>` script applies
  it before first paint. Clearing that key returns the site to Swedish.
- Unlike the theme, the language does **not** follow a browser/OS setting. Swedish is always the
  starting point until the visitor chooses otherwise.

**Adding or editing bilingual copy.** Write the Swedish first, then the English, as adjacent
elements. Put the `lang` attribute on the element itself when the whole element differs (the CV
button rows on the profile pages do this, because the two languages point at different PDFs), or on
a pair of inner `<span>`s when only the text differs.

Text that lives in an *attribute* can't use this pattern, so those carry a data attribute instead
and `main.js` swaps them:

| Attribute | Swedish | English |
|---|---|---|
| Page title | `<title>` content | `data-en` on `<title>` |
| Meta description | `content` | `data-en` |
| Image alt text | `alt` | `data-alt-en` |
| `aria-label` | `aria-label` | `data-aria-en` |

Words that are identical in both languages (React, Nmap, `Apache · PHP · MariaDB`) are written once
with no `lang` attribute at all — don't duplicate those.

The Swedish copy uses the terminology from the source CVs: **LIA** rather than "praktik",
**YH-poäng**, **härdning**, **minsta privilegium**, **sårbarhetsanalys**. Keep it consistent if you
edit — the point is that the Swedish reads like a Swedish CV, not like a translation.

**Open Graph tags stay Swedish.** Link previews are generated from the static HTML by crawlers that
don't run the toggle, so they show the default language. `assets/og-image.png` is Swedish to match.

---

## Editing projects

Projects are written directly in the HTML — there is no data file to keep in sync. **Every edit
needs both languages** (see "Language system" above).

| What | Where |
|---|---|
| Homepage "Selected work" (3 cards) | `index.html`, `.work-grid` — **and** `.work-list` directly below it, which is the mobile-only list version of the same three projects |
| Featured development projects | `development/index.html`, inside `<section>` "Featured projects" |
| Supporting projects | `development/index.html`, `.support-grid` |
| Security entries, case study, toolset | `cybersecurity/index.html` |

When editing the homepage, remember the two representations: `.work-grid` (cards, shown above 480px)
and `.work-list` (rows, shown at 480px and below). Keep them telling the same story.

### Honesty badges

Every project and security entry carries exactly one context badge. Use the existing classes:

- `badge badge--dev` (amber) — Självständigt projekt / LIA / Examensprojekt · solo
- `badge badge--sec` (steel) — Formell utbildning / Handledd LIA / Kontrollerad labbmiljö / Teamprojekt
- `badge` (neutral) — Självstudier / Utvecklingserfarenhet / LIA · medutvecklare

The labels are the credibility feature of this site. Do not describe education or lab work as
professional experience, and do not add a live-demo link for anything that is not actually live.

---

## Replacing project images

Projects currently ship with **branded covers**, not screenshots: project name, a short accent rule,
and a mono category/technology line over a subtle grid. This is deliberate — no fabricated
interfaces, no fake browser chrome.

A cover looks like this:

```html
<div class="cover cover--md">
  <span class="cover__name">Postbox</span>
  <span class="cover__rule"></span>
  <span class="cover__meta">Social platform · Next.js · Prisma</span>
</div>
```

To drop in a real screenshot later, put an `<img>` inside the same container and delete the three
spans. The container has a fixed height, so nothing else moves:

```html
<div class="cover cover--md">
  <img src="/assets/projects/postbox.png" alt="Postbox feed showing a post with comments">
</div>
```

`.cover > img` is already styled to fill the container (`object-fit: cover`). Cover heights:
`cover--sm` 150px (homepage), `cover--md` 200px, `cover--lg` 300px; the Vanta card uses the side
variant, which sizes itself. Screenshots keep their own colours in both themes.

Suggested shots when they exist: Nebula editor + galaxy view (16:9), Vanta studio view, Postbox
feed (4:3, seeded demo content only — never real user data), Nimbus chat with presence and a file
upload (4:3), fitness app phone screens.

The hardened-server case study does **not** get a screenshot. Its visual is the HTML/CSS
architecture diagram in `cybersecurity/index.html`, which shows verified components only.

---

## Replacing the CVs

Four CV links point at these exact paths:

```
assets/cv/ghanem-lamloumi-developer-cv-en.pdf
assets/cv/ghanem-lamloumi-developer-cv-sv.pdf
assets/cv/ghanem-lamloumi-cybersecurity-cv-en.pdf
assets/cv/ghanem-lamloumi-cybersecurity-cv-sv.pdf
```

Drop the files in with those names and every link — nav menu, mobile nav, and the CV buttons on both
profile pages — starts working. No code change needed.

**These must be sanitized copies.** The public contact block is limited to: name, Sweden, the
professional email address, GitHub and LinkedIn. Never publish a CV containing a phone number, a
town, a personal identity number, a signature, or a QR code, and never publish diplomas, grade
documents or any scanned certificate.

---

## Theme system

- **First visit** follows the operating system via `prefers-color-scheme`.
- A visible toggle in the navigation switches dark ⇄ light. It is a real `<button>` with
  `aria-pressed` and a text label for assistive technology.
- The manual choice is saved in `localStorage` under the key `theme` and wins on return visits.
- Clearing that key returns the site to following the OS. While no choice is saved, the site
  reacts live to the OS switching themes.
- **Dark stays the brand-primary theme** — it is what the social preview image shows.
- A tiny inline script in each page's `<head>` applies the theme before first paint, so there is no
  flash of the wrong theme. If JavaScript is unavailable the site renders dark.

Tokens live as CSS custom properties on `:root` (dark) and `[data-theme="light"]` (light) at the top
of `styles.css`. Light is a designed theme — warm paper, darker accent pair, card shadows — not an
inversion. Change a colour there and it changes everywhere.

`prefers-reduced-motion: reduce` disables every transition on the site.

---

## Accessibility notes

Worth preserving when editing: one `<h1>` per page, logical heading order, semantic landmarks, a
skip-to-content link, a 2px steel-blue focus ring at 3px offset on every interactive element, touch
targets of at least 44px on mobile, descriptive link text (`Developer CV — English (PDF)`, never
"click here"), alt text on the portrait and on any screenshot added later, and pathway distinction
by number and label rather than colour alone.

---

## Licence

Content and images © Ghanem Lamloumi. Code may be reused as a reference.

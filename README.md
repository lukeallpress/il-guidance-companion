# Illinois AI Guidance Companion

**Live site: https://lukeallpress.github.io/il-guidance-companion/**

An unofficial **navigational companion** to the Illinois State Board of Education's
*Artificial Intelligence Guidance* (June 2026, 408 pages). It answers one question fast:
**where do I start?** Each role gets a staged, page-numbered reading path into the official
document — Start Here → First Pass → Deep Dive → Reference Shelf → Send Along.

**This site creates no new guidance.** Every section title, FAQ question, and page reference is
ISBE's, unchanged. Reading paths are a suggested order through the official material, built from
ISBE's own Quick Start FAQ audience tags.

- Official landing page: https://www.isbe.net/AIGuidance
- Official Quick Start FAQ: https://www.isbe.net/Pages/AI-Guidance-FAQ.aspx

## Files

| File | What it is |
|---|---|
| `index.html` | The site: Reading paths · Read the guidance · Every section · Handoff bundles |
| `newtrier.html` | Case study page for New Trier Township High School District 203 (district-green branding) |
| `data.js` | **All content**: roles, paths, FAQ entry points, source map, bundles. Edit here. |
| `app.js` | View logic (vanilla JS, no build step) |
| `reader.js` | In-page PDF reader: one page at a time so the site stays scrollable around it, with a route-aware path strip ("stop N of M", next-stop, jump to any stop) and position resume |
| `view.html` + `view.js` | Standalone full-document viewer ("open in new tab" target) — always renders in-browser, so managed browsers that force-download PDFs still work |
| `styles.css` | Design tokens + components. New Trier District 203 branding (navy `#002855`, green `#2C5234`, silver `#C1C6C8`, Libre Baskerville + Roboto — from newtrier.k12.il.us); the case-study page swaps green to the fore in-page. |
| `AIGuidance.pdf` | The official ISBE document (hosted here so page links work) |
| `illinois-ai-guidance-role-reading-paths.md` | The reading-paths spec this site implements |

## Editing content

Everything readers see lives in `data.js` — roles, stage steps, page ranges, FAQ entry points,
grade-band bundles, handoff bundles. As feedback comes in from users across the state, update the
paths there; no HTML changes needed.

**Fidelity rules** (from the spec — please keep):
- Use ISBE's exact section titles and page ranges; don't paraphrase official content into new guidance.
- Printed page numbers align with PDF page numbers (cover = PDF p. 1), so `#page=N` targets work directly.
- Keep the ISBE non-endorsement note (p. 243) visible wherever resource listings surface
  (items with `note: "resources"` in `data.js` render it automatically).

## View locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/ (the PDF reader needs http, not file://).

## Deploy

GitHub Pages serves this folder as-is from `main` — no build step. To publish changes:

```bash
git add -A && git commit -m "Update reading paths" && git push
```

Pages rebuilds in about a minute. The 16 MB PDF is fine for GitHub (limit is 100 MB/file) and Pages
handles statewide traffic comfortably.

## Deep links

- `index.html#role=technology-operations` — open a role's path (used by the handoff bundles)
- `index.html#p=144` — open the embedded reader at a page
- `view.html?page=144` — the standalone viewer at a page (what "open in a new tab" uses)
- `AIGuidance.pdf#page=144` — direct PDF fallback (desktop browsers with inline PDF viewing)

*Unofficial reading aid. All guidance content © Illinois State Board of Education.*

# Imami Partners

> Leadership. Philanthropy. Partnerships. Impact. — A Texas-based advisory firm for nonprofits, foundations, and mission-driven organizations nationwide.

---

## What it is

A single-page brand site for **Imami Partners**, an advisory firm that helps nonprofit leaders move from plan to execution — strategy, board development, fundraising architecture, and organizational design.

Built as a standalone HTML page with embedded CSS and JS. Deployed to Cloudflare Pages with a Vercel serverless contact form.

---

## Features

- **Editorial, trust-forward design** — Cinzel wordmark, Newsreader headings, Source Sans 3 body. Teal, gold, and stone palette.
- **Responsive** — works from 375px mobile to ultrawide. Sticky nav with backdrop blur.
- **Accessible** — semantic HTML, ARIA labels, focus-visible outlines, reduced-motion support.
- **Contact form** — posts to `/api/contact` (Vercel serverless function → Resend email). Progressive enhancement: works with JS off.
- **No frameworks** — zero dependencies, no build step. One HTML file, one serverless function.

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | HTML5 + CSS custom properties + vanilla JS |
| Contact API | Vercel Serverless Function (Node.js) |
| Email | Resend |
| Hosting | Cloudflare Pages |
| Fonts | Google Fonts (Cinzel, Newsreader, Source Sans 3) |
| Analytics | None (privacy-respecting) |

---

## Project structure

```
imami-partners/
├── index.html              # Full site — HTML, CSS, JS inline
├── api/
│   └── contact.js          # Vercel serverless contact handler
├── uploads/                # Team headshots and brand assets
├── Imami Partners V1/      # Earlier iteration snapshots
└── PROGRESS.md             # Session log
```

---

## Setup

No build step. Open `index.html` in a browser to preview locally.

For the contact form to work, you need:

```bash
# 1. Set environment variables (Vercel dashboard or .env.local)
RESEND_API_KEY=re_xxxxxxxx
TO_EMAIL=maliha@imamipartners.com      # optional
FROM_EMAIL=hello@imamipartners.com     # optional

# 2. Deploy to Cloudflare Pages or serve statically
```

---

## Deploy

```bash
# Cloudflare Pages (recommended)
npx wrangler pages deploy . --project-name=imami-partners

# Or any static host — it's a single HTML file + /api directory
```

---

## Sections

1. **Hero** — value proposition with bridge mark
2. **What We Do** — services: strategy, board development, fundraising, organizational design
3. **Our Approach** — philosophy and methodology
4. **Our Partners** — team bios with headshots
5. **Impact** — proof points and outcomes
6. **Contact** — form with Resend backend

---

## Author

Built for **Imami Partners** — San Antonio, Texas.

Site by Kasim Alam.

---

## License

All rights reserved. This is a proprietary brand site for Imami Partners.

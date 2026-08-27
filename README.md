# Central Corridor website

A high-fidelity, responsive implementation of the supplied CCTTFA Figma website. The project includes the homepage plus About, Corridor, Projects, News, Resources, Tenders, Stakeholder Portal, Contact, and Feedback routes.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS 4 with a shared CSS token/component layer
- `next/image` for responsive image delivery
- Locally bundled Inter and Gabarito variable fonts
- Lucide React for generic interface icons

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production validation:

```bash
npm run typecheck
npm run lint
npm run build
```

## Architecture

- `src/app/` contains route-level Server Components and page metadata.
- `src/components/site-chrome.tsx` contains the responsive header and footer.
- `src/components/ui.tsx` contains reusable page heroes, cards, form fields, navigation, and data-display patterns.
- `src/components/interactive.tsx` isolates the small amount of client-side state used for news filtering, ratings, and frontend-only form feedback.
- `src/data/site.ts` contains strongly typed static content shared across routes.
- `src/app/globals.css` contains the extracted visual tokens and responsive component layer.
- `public/images/` contains locally committed Figma exports so the site does not depend on expiring asset URLs.
- `docs/design-system.md` documents the extracted visual system.

## Responsive and accessibility approach

The layout is built around a 1280px content container, fluid gutters, semantic sections, one `h1` per route, labelled form controls, visible focus states, keyboard-accessible navigation, reduced-motion support, and deliberate mobile alternatives for tables, sidebars, project pipelines, grids, and forms.

All forms are intentionally frontend-only. Their buttons show interface state without pretending to send data to a production service.

## Image handling and deployment

Meaningful images include descriptive alternative text; decorative imagery uses empty alt text. Above-the-fold imagery is prioritized selectively. Next.js provides responsive AVIF/WebP delivery at runtime.

Deploy to any current Node-compatible Next.js host by running `npm run build` followed by `npm run start`, or use the platform's standard Next.js preset.

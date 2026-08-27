# Central Corridor design system

This implementation is derived from the ten 1440px Figma frames in the supplied Central Corridor file. The shared tokens live in `src/app/globals.css`.

## Foundations

- Body font: Inter Variable, with Gabarito Variable for display headings.
- Primary text: `#183744`; deep brand surface: `#0d4056`; cyan action color: `#00adef`.
- Supporting text: `#646e5e`; muted surface: `#f5f6f4`; success: `#219654`.
- Type scale: 12px eyebrows and metadata, 14–16px body, 20px card titles, fluid 32–44px section headings, and fluid 40–66px page/display headings.
- Spacing is based on 4/8px increments. Major sections use a fluid 64–96px rhythm.
- Site content uses a maximum 1280px width and fluid horizontal gutter from 20px to 80px.
- Radii: 8px controls, 12px cards, 20px feature panels, and pill-shaped buttons.
- Shadows are deliberately restrained: a small card shadow and a medium lifted-feature shadow.

## Reusable patterns

- Public and portal navigation variants are selected by route in a shared header.
- `PageHero` controls image crop, overlay, eyebrow, title, and supporting copy.
- Sidebars become horizontally scrollable in-page navigation below 928px.
- Card families cover editorial, project, resource, metric, country, leadership, contact, and improvement content.
- Forms share labelled fields, focus treatment, two-column desktop layouts, and one-column mobile layouts.
- The tender desktop table transforms into accessible mobile cards below 672px.
- The project pipeline becomes a vertical list below 672px.

## Breakpoints and motion

- Large/tablet adjustment: 1120px.
- Navigation/tablet layout: 928px.
- Mobile layout: 672px.
- Interaction transitions are 180–350ms and are disabled under `prefers-reduced-motion`.

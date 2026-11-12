# RESPONSEDOTOK

A presentation layer for displaying and sharing development projects: a single page that lists hand-picked projects, with a page per project showing its live site (where it can be embedded) and its rendered GitHub README.

Built with Next.js 16 (App Router, Turbopack), Tailwind CSS v4, Biome and Vitest. Deployed on Vercel.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server at <http://localhost:3000> |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Biome lint + format check |
| `npm run format` | Biome format (writes) |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |

## Styles

All stylesheets live in `src/css/`:

- `globals.css`: entry point (imported by the root layout); project-wide tokens, breakpoints, utilities.
- `fonts.css`: self-hosted Karla (body) and Bitter (headings), in `src/fonts/`.
- `colors.css`: palette, light/dark role tokens, Tailwind color mapping. Contrast is enforced by `src/test/contrast.test.ts`.
- `defaults.css`: baseline styles for bare HTML elements.

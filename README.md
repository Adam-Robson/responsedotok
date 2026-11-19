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

## Projects and GitHub data

The project list lives in `src/content/projects.ts` (array order is display order). Each entry is merged with live data from the GitHub API (`src/lib/github/`): description, homepage, language, topics, and the rendered README. Config values win over GitHub's. If GitHub is unreachable or a repo is renamed, the page falls back to config-only content.

Set `GITHUB_TOKEN` (a fine-grained token with public read access is enough) in `.env.local` and in Vercel to avoid the 60-requests-per-hour anonymous limit. Results are cached for about an hour.

## Styles

All stylesheets live in `src/css/`:

- `globals.css`: entry point (imported by the root layout); project-wide tokens, breakpoints, utilities.
- `fonts.css`: self-hosted Karla (body), Bitter (headings) and Atkinson Hyperlegible Mono (code), in `src/fonts/`.
- `colors.css`: palette, light/dark role tokens, Tailwind color mapping. Contrast is enforced by `test/css/palette-contrast.test.ts`.
- `defaults.css`: baseline styles for bare HTML elements.

CSS keeps relative `@import`/`url()` paths: Tailwind's CSS loader does not resolve the `@/` alias. TypeScript modules always use `@/` (src) or `@test/` (test).

## Lint exceptions

`biome.json` turns off `security/noDangerouslySetInnerHtml` for one file only, `src/components/projects/project-readme.tsx`. The README HTML it injects comes from GitHub's renderer, which sanitizes it, and only for repos listed in the config. Every other file keeps the rule.

## Layout

Code follows the folder conventions in `CLAUDE.md`: `api/` (cached data loaders), `clients/` (GitHub HTTP), `config/` (env), `lib/{types,constants,models,protocols}`, `services/` (domain logic), `utils/` (helpers). Tests live in `test/`, mirroring `src/`. Plans live in `docs/`.

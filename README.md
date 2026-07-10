# Edwin Levinson Mejía Marcelino — Portfolio

Vue 3 + TypeScript + Vite + Tailwind CSS portfolio, deployed to GitHub Pages.

## Data sources

All portfolio content is **hardcoded JSON** — edit the files directly, no external data source, no sync step, no secrets.

| File | Contents | How to update |
|---|---|---|
| `public/data/projects.json` | Project case studies (title, description, challenge, solution, impact, image, tags) | Edit the file directly |
| `public/data/skills.json` | Skills grouped by category (Frontend / Backend / Databases / DevOps) | Edit the file directly |
| `public/data/certs.json` | Certifications (name, provider, achievement, url) | Edit the file directly |

The portfolio reads these three files at runtime via `fetch("/data/*.json")` through `src/utils/PortfolioService.ts`.

## Development

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # type-check + production build to dist/
pnpm preview    # preview the production build
pnpm test       # run vitest
```

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`/`master`. No secrets are required — the build reads committed `public/data/*.json`.
# Akhil Neelam Portfolio

Vercel-hosted static React SPA with MCP agent surface. See [README.md](./README.md) for commands and layout.

## Edit content

Change files under `client/src/data/`, then `npm run generate:llms` or any build. Do not hand-edit `client/public/llms.txt` or `api/llms-content.js`.

## Deploy

```bash
npm run build
npx tsc --noEmit
vercel --prod
```

`attached_assets/` is gitignored; run `npm run optimize:images` locally before build if images change.

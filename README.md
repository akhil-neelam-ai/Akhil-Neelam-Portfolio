# Akhil Neelam Portfolio

Static React portfolio deployed on Vercel at [akhilneelam.com](https://akhilneelam.com).

## Stack

- **Frontend:** React 18, Vite, Tailwind, Framer Motion (hero + mobile nav only)
- **Deploy:** Vercel static `dist/` output
- **Agent surface:** `client/public/llms.txt`, `agent.md`, `api/mcp.js`, edge `middleware.js`

## Commands

```bash
npm install
npm run dev          # generates llms.txt + dev server
npm run build        # optimize images, generate llms, production build
npm run check        # TypeScript
```

## Content source of truth

Portfolio copy lives in `client/src/data/`. The build generates:

- `client/public/llms.txt` (public agent summary)
- `api/llms-content.js` (MCP + edge middleware)

Edit data files, then run `npm run generate:llms` or any build.

## Images

Source JPEGs in `attached_assets/` (gitignored). `npm run optimize:images` writes WebP/AVIF to `client/public/images/`.

## Project layout

```
client/           Vite app root (index.html, src/, public/)
api/mcp.js        Vercel serverless MCP endpoint
middleware.js     Agent discovery Link headers + markdown negotiate on /
scripts/          generate-llms.ts, optimize-images.mjs
vercel.json       Build output, security headers, rewrites
```

## MCP

`POST /api/mcp` implements JSON-RPC for `get_portfolio_summary`. Content is synced from `client/src/data/` at build time.

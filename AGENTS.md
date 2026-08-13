<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Stack: Next.js 16 App Router, Tailwind v4, shadcn, Clerk, Convex, `@convex-dev/stripe`. Design system in `DESIGN.md` (SABLE).
- Install: `npm ci` (or `npm install`). Do not commit secrets.
- Verify: `npm run lint` and `npm run build` should pass with zero env vars. Marketing pages are static; app routes fail at runtime with clear missing-env errors.
- Auth: the Clerk JWT template must be named exactly `convex`. The Convex deployment needs `CLERK_JWT_ISSUER_DOMAIN` and `SITE_URL` set in its environment.
- Billing: Stripe via `@convex-dev/stripe`. The webhook endpoint is `https://<deployment>.convex.site/stripe/webhook`.
- Prefer the Convex + Clerk official patterns already in `convex/` and `proxy.ts`. Do not invent a second auth path.
- Demo production: Vercel project `saas-starter`, Convex deployment `precious-tern-51`. Do not rotate those without asking.
- When changing UI, respect `DESIGN.md` (Ink/Bone/Mid palette, radius 0, Archivo).

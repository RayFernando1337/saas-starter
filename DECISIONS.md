# Decisions

Major choices made while building this template, and why.

| # | Decision | Rationale |
| --- | --- | --- |
| 1 | **npm** as the package manager | Zero-install-friction default; every doc command works verbatim on a fresh machine. Swap to pnpm/bun freely — nothing depends on npm specifics. |
| 2 | **Next.js 16 with `proxy.ts`** instead of `middleware.ts` | Next 16 renamed the network boundary file. Clerk v7 documents `proxy.ts` for Next 16+; contents are identical to the old middleware. |
| 3 | **Clerk providers live in route-group layouts** (`(auth)`, `(app)`), not the root layout | Keeps marketing pages fully static and lets `next build` pass with zero env vars. Auth-dependent trees are `force-dynamic`, so missing keys fail at request time with a clear message instead of breaking CI. |
| 4 | **Runtime env validation** (`lib/env.ts`) instead of build-time schema validation | Template cloners must be able to build/deploy before configuring services. Errors name the exact variable and point to `.env.example`. |
| 5 | **`convex/_generated` is committed** | Convex's own guidance ("your code won't typecheck without it"). Cloners get a green `npm run build` before ever running `npx convex dev`. |
| 6 | **`@convex-dev/stripe` component** owns all Stripe state | Webhook handling, signature verification, and table sync are maintained upstream. App code only calls `StripeSubscriptions` methods and the component's public queries. |
| 7 | **Component queries wrapped in `convex/billing.ts`** with narrowed return validators | UI never touches component internals; wrappers enforce auth, strip metadata, and give the client a stable typed shape. |
| 8 | **Users keyed by `tokenIdentifier`, Stripe records keyed by Clerk `subject`** | `tokenIdentifier` (issuer+subject) is the canonical Convex identity key; the component's `userId` linking uses the bare Clerk user ID, which also survives issuer changes between dev/prod Clerk instances. |
| 9 | **Subscription entitlement = `active`, `trialing`, or `past_due`** (`lib/subscription.ts`) | Graceful degradation: users keep access during payment retries instead of being cut off the second a card fails. Tighten in one place if you disagree. |
| 10 | **`SITE_URL` env var on the Convex deployment** for checkout redirect URLs | Actions run in Convex, which can't see the Next.js origin. Explicit beats inferring from headers, and works for CLI-triggered actions. |
| 11 | **shadcn/ui (radix base) with radius forced to 0** and SABLE tokens mapped to the shadcn CSS variables | All shadcn components inherit the design system automatically — no per-component restyling, and future `shadcn add` output matches too. |
| 12 | **Archivo via `next/font`**, single family | DESIGN.md specifies it; one variable font family covers 10px labels to 300px wordmark. Self-hosted by Next at build, no layout shift. |
| 13 | **Curtain-wipe reveal instead of clip-path** for lookbook imagery | Chromium skips lazy-loading images whose visible area is zero, so `clip-path: inset(100%)` left images permanently unloaded. An overlay that slides away is visually identical and keeps native lazy loading. |
| 14 | **Marketing CTAs are plain links** to `/sign-up` / `/sign-in`, no Clerk components on marketing pages | Keeps the landing static (fast, CDN-cacheable) and key-independent. The signed-in redirect happens after auth. |
| 15 | **Demo brand "SABLE"** kept from DESIGN.md | The landing reads like a real product, which is the point of the template. Rebrand notes live in README → Customizing. |
| 16 | **Free tier is implicit** (no Stripe object) | No subscription row = free plan. Avoids seeding Stripe with a $0 price and keeps the paid path the only Stripe-coupled path. |

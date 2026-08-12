/**
 * Clerk ← → Convex JWT handshake.
 *
 * CLERK_JWT_ISSUER_DOMAIN is your Clerk Frontend API URL
 * (e.g. https://your-app.clerk.accounts.dev) — set it on the Convex
 * deployment, not in .env.local. The applicationID must match the name of the
 * JWT template you create in the Clerk dashboard: "convex".
 */
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};

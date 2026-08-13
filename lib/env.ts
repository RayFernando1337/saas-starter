/**
 * Runtime env access with actionable errors.
 *
 * NEXT_PUBLIC_* vars are inlined at build time, so they are read directly and
 * validated where used. This keeps `next build` green without real keys while
 * failing loudly the moment a missing key would actually matter.
 */

export function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. ` +
        `Copy .env.example to .env.local and fill it in — see README "Setup".`,
    );
  }
  return value;
}

export function convexUrl(): string {
  return requireEnv("NEXT_PUBLIC_CONVEX_URL", process.env.NEXT_PUBLIC_CONVEX_URL);
}

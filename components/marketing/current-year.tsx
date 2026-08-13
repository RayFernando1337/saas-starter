"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getYear = () => new Date().getFullYear();

/**
 * Client island: marketing pages are statically prerendered, so a server-side
 * year would freeze at build time. `serverYear` is serialized alongside the
 * prerendered HTML, so hydration always matches the static markup; the client
 * snapshot then corrects the year after hydration.
 */
export function CurrentYear({ serverYear }: { serverYear: number }) {
  const year = useSyncExternalStore(emptySubscribe, getYear, () => serverYear);
  return <>{year}</>;
}

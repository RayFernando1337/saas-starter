"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getYear = () => new Date().getFullYear();

/**
 * Client island: marketing pages are statically prerendered, so a server-side
 * year would freeze at build time. The server snapshot matches the prerendered
 * HTML; the client snapshot corrects it after hydration.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(emptySubscribe, getYear, getYear);
  return <>{year}</>;
}

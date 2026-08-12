"use client";

import { type ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";
import { convexUrl } from "@/lib/env";

// Module-level singleton so remounting the (app) layout reuses one websocket
// instead of leaking connections. Created lazily (not at module scope) so
// `next build` succeeds without NEXT_PUBLIC_CONVEX_URL; a missing key throws
// a descriptive error the first time the provider renders.
let client: ConvexReactClient | undefined;

function getConvexClient(): ConvexReactClient {
  client ??= new ConvexReactClient(convexUrl());
  return client;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={getConvexClient()} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

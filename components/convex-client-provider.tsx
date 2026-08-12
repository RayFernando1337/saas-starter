"use client";

import { useMemo, type ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";
import { convexUrl } from "@/lib/env";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // Created lazily so `next build` succeeds without NEXT_PUBLIC_CONVEX_URL;
  // a missing key throws a descriptive error on first authenticated request.
  const client = useMemo(() => new ConvexReactClient(convexUrl()), []);

  return (
    <ConvexProviderWithClerk client={client} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

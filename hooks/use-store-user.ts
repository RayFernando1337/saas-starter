"use client";

import { useEffect } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

/** Upserts the Clerk user into Convex once the session is authenticated. */
export function useStoreUser() {
  const { isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (!isAuthenticated) return;
    void storeUser({});
  }, [isAuthenticated, storeUser]);
}

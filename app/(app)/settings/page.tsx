"use client";

import { UserProfile } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  const user = useQuery(api.users.current);

  return (
    <div className="space-y-12">
      <div>
        <p className="label-sable text-mid">Settings</p>
        <h1 className="heading-sable mt-3 text-[clamp(32px,4.4vw,56px)]">Account</h1>
      </div>

      <section className="border border-line p-8 max-md:p-6">
        <p className="label-sable text-mid">Convex record</p>
        <p className="mt-2 text-[13.5px] text-mid">
          The row synced into your <code className="text-[12px]">users</code> table on first
          sign-in (convex/users.ts).
        </p>
        {user === undefined ? (
          <Skeleton className="mt-6 h-24 w-full" />
        ) : user === null ? (
          <p className="mt-6 text-[13.5px] text-mid">
            Syncing… if this persists, check that your Clerk JWT template is named{" "}
            <code className="text-[12px]">convex</code> and{" "}
            <code className="text-[12px]">CLERK_JWT_ISSUER_DOMAIN</code> is set on the Convex
            deployment.
          </p>
        ) : (
          <dl className="mt-6 grid grid-cols-3 gap-8 max-md:grid-cols-1">
            <div>
              <dt className="label-sable text-mid">Name</dt>
              <dd className="mt-2 text-[15px]">{user.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="label-sable text-mid">Email</dt>
              <dd className="mt-2 text-[15px]">{user.email ?? "—"}</dd>
            </div>
            <div>
              <dt className="label-sable text-mid">Clerk user ID</dt>
              <dd className="mt-2 font-mono text-[13px]">{user.clerkUserId}</dd>
            </div>
          </dl>
        )}
      </section>

      <section>
        <p className="label-sable text-mid">Profile &amp; security</p>
        <div className="mt-5">
          <UserProfile
            routing="hash"
            appearance={{
              elements: {
                rootBox: { width: "100%" },
                cardBox: {
                  width: "100%",
                  boxShadow: "none",
                  border: "1px solid rgba(16,16,16,0.14)",
                },
              },
            }}
          />
        </div>
      </section>
    </div>
  );
}

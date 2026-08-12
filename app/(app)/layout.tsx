import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { AppShell } from "@/components/app/app-shell";
import { Toaster } from "@/components/ui/sonner";
import { clerkAppearance } from "@/lib/clerk-appearance";

// Auth-gated pages render per-request; builds succeed before keys exist.
export const dynamic = "force-dynamic";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <ConvexClientProvider>
        <AppShell>{children}</AppShell>
        <Toaster position="bottom-right" />
      </ConvexClientProvider>
    </ClerkProvider>
  );
}

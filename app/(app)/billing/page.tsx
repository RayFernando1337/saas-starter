import { Suspense } from "react";
import { BillingView } from "@/components/app/billing/billing-view";

export default function BillingPage() {
  return (
    <Suspense>
      <BillingView />
    </Suspense>
  );
}

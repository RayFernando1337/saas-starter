"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatAmount, formatStripeDate } from "@/lib/subscription";

type Invoice = {
  stripeInvoiceId: string;
  status: string;
  amountDue: number;
  amountPaid: number;
  created: number;
};

export function InvoicesTable({ invoices }: { invoices: Invoice[] | undefined }) {
  if (invoices === undefined) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="border border-line p-8 text-center">
        <p className="label-sable text-mid">No invoices yet</p>
        <p className="mt-2 text-[13.5px] text-mid">
          Invoices appear here after your first checkout, synced by the Stripe
          webhook.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-line">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="label-sable">Invoice</TableHead>
            <TableHead className="label-sable">Date</TableHead>
            <TableHead className="label-sable">Status</TableHead>
            <TableHead className="label-sable text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.stripeInvoiceId}>
              <TableCell className="font-mono text-[12px]">
                {invoice.stripeInvoiceId.slice(0, 18)}…
              </TableCell>
              <TableCell className="text-[13.5px]">
                {formatStripeDate(invoice.created)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={invoice.status === "paid" ? "default" : "outline"}
                  className="label-sable"
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell
                className="text-right text-[13.5px]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatAmount(invoice.amountPaid || invoice.amountDue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TransactionsTable from "@/components/dealer/TransactionsTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions | Dealer Portal",
  description: "View all transactions across the distribution network.",
};

export default function TransactionsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Transactions" />
      <TransactionsTable />
    </div>
  );
}
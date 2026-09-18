import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StockTable from "@/components/dealer/StockTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airtime Stock | Dealer Portal",
  description: "Track Orange, Mascom and BTC airtime & mobile money stock.",
};

export default function StockPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Stock" />
      <StockTable />
    </div>
  );
}
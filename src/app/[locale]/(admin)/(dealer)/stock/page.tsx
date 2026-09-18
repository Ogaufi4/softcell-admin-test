import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StockTable from "@/components/dealer/StockTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock & Inventory | Dealer Portal",
  description: "Track available, allocated and in-transit stock.",
};

export default function StockPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Stock" />
      <StockTable />
    </div>
  );
}
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DealerRestocking from "@/components/dealer/DealerRestocking";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restocking | Dealer Portal",
  description:
    "Place network restock orders and manage sub-dealer restock requests.",
};

export default function RestockingPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Restocking" />
      <DealerRestocking />
    </div>
  );
}
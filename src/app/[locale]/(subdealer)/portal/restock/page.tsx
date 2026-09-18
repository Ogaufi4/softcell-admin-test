import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SubDealerRestock from "@/components/subdealer/SubDealerRestock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restock | Sub-Dealer Portal",
  description: "Request airtime & mobile money stock from your dealer.",
};

export default function SubDealerRestockPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Restock" />
      <SubDealerRestock />
    </div>
  );
}
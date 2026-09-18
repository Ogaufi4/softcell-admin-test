import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SubDealerOverview from "@/components/subdealer/SubDealerOverview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview | Sub-Dealer Portal",
  description: "Your virtual stock and restock overview.",
};

export default function SubDealerOverviewPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Overview" />
      <SubDealerOverview />
    </div>
  );
}
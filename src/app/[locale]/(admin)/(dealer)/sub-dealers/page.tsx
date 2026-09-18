import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SubDealersTable from "@/components/dealer/SubDealersTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sub-Dealers | Dealer Portal",
  description: "Manage sub-dealers in the distribution network.",
};

export default function SubDealersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Sub-Dealers" />
      <SubDealersTable />
    </div>
  );
}
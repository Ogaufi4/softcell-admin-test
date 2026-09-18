import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ApplicationsTable from "@/components/dealer/ApplicationsTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications | Dealer Portal",
  description: "Stock and credit applications from sub-dealers.",
};

export default function ApplicationsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Applications" />
      <ApplicationsTable />
    </div>
  );
}
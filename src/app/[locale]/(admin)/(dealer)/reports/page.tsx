import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ReportsExports from "@/components/dealer/ReportsExports";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Exports | Dealer Portal",
  description: "Generate and download distribution reports.",
};

export default function ReportsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Reports & Exports" />
      <ReportsExports />
    </div>
  );
}
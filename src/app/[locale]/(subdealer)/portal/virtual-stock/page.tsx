import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SubDealerVirtualStock from "@/components/subdealer/SubDealerVirtualStock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Stock | Sub-Dealer Portal",
  description: "View your credit/float with each network.",
};

export default function SubDealerVirtualStockPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Virtual Stock" />
      <SubDealerVirtualStock />
    </div>
  );
}
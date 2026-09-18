import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DealerVirtualStock from "@/components/dealer/DealerVirtualStock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Stock | Dealer Portal",
  description: "Your credit/float with each network.",
};

export default function VirtualStockPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Virtual Stock" />
      <DealerVirtualStock />
    </div>
  );
}
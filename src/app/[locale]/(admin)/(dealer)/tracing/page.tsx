import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StockTraceTree from "@/components/dealer/StockTraceTree";
import TraceActivityLog from "@/components/dealer/TraceActivityLog";
import TraceMetrics from "@/components/dealer/TraceMetrics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Tracing | Dealer Portal",
  description:
    "Follow every airtime dispatch from the dealer down to individual sub-dealer user activity.",
};

export default function TracingPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <PageBreadcrumb pageTitle="Stock Tracing" />
      </div>
      <div className="col-span-12">
        <TraceMetrics />
      </div>
      <div className="col-span-12 xl:col-span-6">
        <StockTraceTree />
      </div>
      <div className="col-span-12 xl:col-span-6">
        <TraceActivityLog />
      </div>
    </div>
  );
}
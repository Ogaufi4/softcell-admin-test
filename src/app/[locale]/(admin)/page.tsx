import { DealerMetrics } from "@/components/dealer/DealerMetrics";
import PendingApplications from "@/components/dealer/PendingApplications";
import RecentTransactions from "@/components/dealer/RecentTransactions";
import StockDistributionChart from "@/components/dealer/StockDistributionChart";
import TopSubDealersChart from "@/components/dealer/TopSubDealersChart";
import { monthlyDistribution, stockItems, subDealers, transactions } from "@/data/dealer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealer Overview | Dealer Portal",
  description: "Analytics and stock distribution overview for the dealer portal.",
};

export default function DealerOverview() {
  const stockOnHand = stockItems.reduce((sum, s) => sum + s.available, 0);
  const distribution = monthlyDistribution.reduce(
    (sum, m) => sum + m.distributed,
    0,
  );

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <DealerMetrics
          stockOnHand={stockOnHand}
          distribution={distribution}
          subDealers={subDealers.length}
          transactions={transactions.length}
        />
      </div>

      <div className="col-span-12 xl:col-span-8">
        <StockDistributionChart />
      </div>

      <div className="col-span-12 xl:col-span-4">
        <TopSubDealersChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <PendingApplications />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentTransactions />
      </div>
    </div>
  );
}
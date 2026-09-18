"use client";

import { subDealerVirtualStock } from "@/data/dealer";
import { useTranslations } from "next-intl";
import { useRestockOrders } from "@/hooks/useRestockOrders";
import { Link } from "@/i18n/navigation";
import SubDealerVirtualStock from "./SubDealerVirtualStock";

export default function SubDealerOverview() {
  const t = useTranslations("subdealer.overview");
  const { orders } = useRestockOrders();

  const totalAvailable = subDealerVirtualStock.reduce(
    (sum, s) => sum + s.available,
    0,
  );
  const myRequests = orders.filter((o) => o.source === "subDealer");
  const pendingRequests = myRequests.filter((o) => o.status === "pending");
  const approvedRequests = myRequests.filter(
    (o) => o.status === "approved" || o.status === "fulfilled",
  );

  const metrics = [
    {
      label: t("metrics.virtualCredit"),
      value: `P${subDealerVirtualStock
        .reduce((sum, s) => sum + s.credit, 0)
        .toLocaleString()}`,
    },
    {
      label: t("metrics.available"),
      value: `P${totalAvailable.toLocaleString()}`,
    },
    {
      label: t("metrics.pendingRequests"),
      value: pendingRequests.length.toLocaleString(),
    },
    {
      label: t("metrics.approvedRequests"),
      value: approvedRequests.length.toLocaleString(),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metric.label}
            </span>
            <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
              {metric.value}
            </h4>
          </div>
        ))}
      </div>

      <SubDealerVirtualStock />

      <div className="flex justify-end">
        <Link
          href="/portal/restock"
          className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 text-theme-sm font-medium text-white hover:bg-brand-600"
        >
          {t("placeRestock")}
        </Link>
      </div>
    </div>
  );
}
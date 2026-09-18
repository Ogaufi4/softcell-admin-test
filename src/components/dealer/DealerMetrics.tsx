"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  DollarLineIcon,
  GroupIcon,
} from "@/icons";
import { useTranslations } from "next-intl";
import Badge from "../ui/badge/Badge";

interface DealerMetricsProps {
  stockOnHand: number;
  distribution: number;
  subDealers: number;
  transactions: number;
}

export const DealerMetrics: React.FC<DealerMetricsProps> = ({
  stockOnHand,
  distribution,
  subDealers,
  transactions,
}) => {
  const t = useTranslations("dealer.overview.metrics");

  const metrics = [
    {
      label: t("stockOnHand"),
      value: stockOnHand.toLocaleString(),
      icon: <BoxIconLine className="size-6 text-gray-800 dark:text-white/90" />,
      trend: "+12.4%",
      up: true,
    },
    {
      label: t("distribution"),
      value: distribution.toLocaleString(),
      icon: <DollarLineIcon className="size-6 text-gray-800 dark:text-white/90" />,
      trend: "+8.2%",
      up: true,
    },
    {
      label: t("subDealers"),
      value: subDealers.toLocaleString(),
      icon: <GroupIcon className="size-6 text-gray-800 dark:text-white/90" />,
      trend: "+2",
      up: true,
    },
    {
      label: t("transactions"),
      value: transactions.toLocaleString(),
      icon: <BoxIconLine className="size-6 text-gray-800 dark:text-white/90" />,
      trend: "-3.1%",
      up: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
            {metric.icon}
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.label}
              </span>
              <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
                {metric.value}
              </h4>
            </div>
            <Badge color={metric.up ? "success" : "error"}>
              {metric.up ? (
                <ArrowUpIcon />
              ) : (
                <ArrowDownIcon className="text-error-500" />
              )}
              {metric.trend}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
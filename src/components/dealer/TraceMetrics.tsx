"use client";

import { dealerEvents, traceBranches } from "@/data/dealer";
import { BoxIconLine, GroupIcon, ListIcon, LockIcon } from "@/icons";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <h4 className="mt-2 text-title-md font-bold text-gray-800 dark:text-white/90">
            {value}
          </h4>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-brand-500 dark:bg-orange-500/10">
          {icon}
        </span>
      </div>
    </div>
  );
}

export default function TraceMetrics() {
  const t = useTranslations("dealer.tracing.metrics");

  const uniqueUsers = new Set(dealerEvents.map((e) => e.actor)).size;
  const totalUnits = traceBranches.reduce((sum, b) => sum + b.units, 0);
  const logins = dealerEvents.filter((e) => e.action === "login").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label={t("activeBranches")}
        value={String(traceBranches.length)}
        icon={<ListIcon />}
      />
      <MetricCard
        label={t("uniqueUsers")}
        value={String(uniqueUsers)}
        icon={<GroupIcon />}
      />
      <MetricCard
        label={t("totalUnits")}
        value={totalUnits.toLocaleString()}
        icon={<BoxIconLine />}
      />
      <MetricCard
        label={t("logins")}
        value={String(logins)}
        icon={<LockIcon />}
      />
    </div>
  );
}
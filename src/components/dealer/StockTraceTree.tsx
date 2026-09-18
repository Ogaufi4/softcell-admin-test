"use client";

import { traceBranches } from "@/data/dealer";
import { useTranslations } from "next-intl";
import Badge from "../ui/badge/Badge";

const statusColor: Record<string, "success" | "warning" | "error" | "primary"> =
  {
    inTransit: "primary",
    received: "warning",
    partiallySold: "warning",
    soldOut: "success",
  };

const actionDotClass: Record<string, string> = {
  login: "bg-brand-500",
  receive: "bg-success-500",
  sale: "bg-warning-500",
  allocation: "bg-orange-500",
  approval: "bg-success-500",
  rejection: "bg-error-500",
};

export default function StockTraceTree() {
  const t = useTranslations("dealer.tracing");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {t("treeTitle")}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("treeSubtitle")}
        </p>
      </div>

      <ul className="space-y-4">
        {traceBranches.map((branch) => {
          const firstSale = branch.events.find((e) => e.action === "sale");
          return (
            <li
              key={branch.id}
              className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-white/2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 font-semibold text-white">
                    {branch.subDealer
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                      {branch.subDealer}
                    </p>
                    <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                      {branch.product} · {branch.reference} ·{" "}
                      {branch.allocatedAt}
                    </p>
                  </div>
                </div>
                <Badge color={statusColor[branch.status]} size="sm">
                  {t(`tree.branchStatuses.${branch.status}`)}
                </Badge>
              </div>

              <div className="mt-3 rounded-lg bg-white p-3 dark:bg-gray-900/60">
                {firstSale ? (
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-success-500" />
                    </span>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-300">
                      {branch.units.toLocaleString()} units allocated ·{" "}
                      {branch.events.length} activities · sold by{" "}
                      <span className="font-semibold text-gray-800 dark:text-white/90">
                        {firstSale.actor}
                      </span>{" "}
                      via {t(`channels.${firstSale.channel}`)}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-500" />
                    </span>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {branch.units.toLocaleString()} units allocated · awaiting
                      receipt by {branch.subDealer}
                    </p>
                  </div>
                )}
              </div>

              <ul className="mt-3 space-y-1.5">
                {branch.events.map((ev) => (
                  <li key={ev.id} className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        actionDotClass[ev.action] ?? "bg-gray-400"
                      }`}
                    />
                    <span className="text-theme-xs text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {ev.actor}
                      </span>{" "}
                      {t(`actions.${ev.action}`)} · {ev.timestamp}
                      {ev.units > 0 ? ` · ${ev.units.toLocaleString()} units` : ""}{" "}
                      · {t(`channels.${ev.channel}`)} · {ev.session}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
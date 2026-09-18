"use client";

import { applications as seedApplications } from "@/data/dealer";
import { CheckLineIcon, CloseLineIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Badge from "../ui/badge/Badge";
import { Link } from "@/i18n/navigation";

export default function PendingApplications() {
  const t = useTranslations("dealer");
  const [items, setItems] = useState(() =>
    seedApplications.filter((a) => a.status === "pending"),
  );

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a)),
    );
  };

  const handleReject = (id: string) => {
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a)),
    );
  };

  const pending = items.filter((a) => a.status === "pending");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t("overview.pendingApplications.title")}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("overview.pendingApplications.subtitle")}
          </p>
        </div>
        <Link
          href="/applications"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3"
        >
          {t("overview.pendingApplications.viewAll")}
        </Link>
      </div>

      {pending.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {t("overview.pendingApplications.noApplications")}
        </p>
      ) : (
        <div className="space-y-3">
          {pending.map((app) => (
            <div
              key={app.id}
              className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <Badge
                  color={app.type === "stock" ? "primary" : "warning"}
                  size="sm"
                >
                  {t(`applications.types.${app.type}`)}
                </Badge>
                <div>
                  <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                    {app.subDealer}
                  </p>
                  <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                    {app.reference} · {app.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                  {app.type === "stock" && app.units != null
                    ? `${app.units.toLocaleString()} units`
                    : app.amount != null
                      ? `P${app.amount.toLocaleString()}`
                      : "-"}
                </span>
                <button
                  onClick={() => handleApprove(app.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-success-500 px-3 py-2 text-theme-xs font-medium text-white hover:bg-success-600"
                >
                  <CheckLineIcon className="size-4" />
                  {t("applications.actions.approve")}
                </button>
                <button
                  onClick={() => handleReject(app.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-error-500 px-3 py-2 text-theme-xs font-medium text-error-500 hover:bg-error-500 hover:text-white dark:hover:text-white"
                >
                  <CloseLineIcon className="size-4" />
                  {t("applications.actions.reject")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
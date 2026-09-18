"use client";

import { subDealerVirtualStock } from "@/data/dealer";
import { useTranslations } from "next-intl";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function SubDealerVirtualStock() {
  const t = useTranslations("subdealer.virtualStock");

  const statusOf = (item: (typeof subDealerVirtualStock)[number]) => {
    if (item.available <= 0) return "exhausted";
    if (item.available < item.threshold) return "low";
    return "healthy";
  };

  const statusColor: Record<
    string,
    "success" | "warning" | "error"
  > = {
    healthy: "success",
    low: "warning",
    exhausted: "error",
  };

  const totalCredit = subDealerVirtualStock.reduce(
    (sum, s) => sum + s.credit,
    0,
  );
  const totalAvailable = subDealerVirtualStock.reduce(
    (sum, s) => sum + s.available,
    0,
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("totalCredit")}
          </span>
          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            P{totalCredit.toLocaleString()}
          </h4>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("totalAvailable")}
          </span>
          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            P{totalAvailable.toLocaleString()}
          </h4>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t("title")}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.network")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.credit")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.used")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.available")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.status")}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {subDealerVirtualStock.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-3">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {item.network}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      P{item.credit.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      P{item.used.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      P{item.available.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge color={statusColor[statusOf(item)]} variant="light">
                      {t(`statuses.${statusOf(item)}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
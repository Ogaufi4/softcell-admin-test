"use client";

import { transactions } from "@/data/dealer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function RecentTransactions() {
  const t = useTranslations("dealer");

  const typeColor: Record<string, "primary" | "success" | "warning" | "error"> =
    {
      dispatch: "primary",
      payment: "success",
      return: "warning",
      adjustment: "error",
    };
  const statusColor: Record<
    string,
    "success" | "warning" | "error" | "info"
  > = {
    completed: "success",
    pending: "warning",
    inTransit: "info",
    cancelled: "error",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {t("overview.recentTransactions.title")}
        </h3>
        <Link
          href="/transactions"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3"
        >
          {t("overview.viewAll")}
        </Link>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("overview.recentTransactions.subDealer")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("overview.recentTransactions.type")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("overview.recentTransactions.amount")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("overview.recentTransactions.date")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("overview.recentTransactions.status")}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {transactions.slice(0, 5).map((tr) => (
              <TableRow key={tr.id}>
                <TableCell className="py-3">
                  <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                    {tr.subDealer}
                  </p>
                  <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                    {tr.reference}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={typeColor[tr.type]} size="sm">
                    {t(`transactionTypes.${tr.type}`)}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  P{tr.amount.toLocaleString()}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {tr.date}
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={statusColor[tr.status]} size="sm">
                    {t(`transactionStatuses.${tr.status}`)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
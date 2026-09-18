"use client";

import { transactions } from "@/data/dealer";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

const typeColor: Record<string, "primary" | "success" | "warning" | "error"> = {
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

export default function TransactionsTable() {
  const t = useTranslations("dealer");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return transactions.filter((tr) => {
      const matchesQuery =
        !q ||
        tr.reference.toLowerCase().includes(q) ||
        tr.subDealer.toLowerCase().includes(q);
      const matchesStatus =
        status === "all" || tr.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const statusOptions = ["all", "completed", "pending", "cancelled"];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t("transactions.title")}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("transactions.subtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("transactions.searchPlaceholder")}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden sm:w-72 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pe-11 text-sm shadow-theme-xs focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden sm:w-44 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
            >
              {statusOptions.map((s) => (
                <option
                  key={s}
                  value={s}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {t(`transactions.statusOptions.${s}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("transactions.table.reference")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("transactions.table.subDealer")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("transactions.table.type")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("transactions.table.units")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("transactions.table.amount")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("transactions.table.date")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("transactions.table.status")}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((tr) => (
              <TableRow key={tr.id}>
                <TableCell className="py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                  {tr.reference}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {tr.subDealer}
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={typeColor[tr.type]} size="sm">
                    {t(`transactionTypes.${tr.type}`)}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {tr.units ? tr.units.toLocaleString() : "-"}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  ${tr.amount.toLocaleString()}
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
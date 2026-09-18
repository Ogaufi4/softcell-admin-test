"use client";

import { applications as seedApplications } from "@/data/dealer";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

const typeColor: Record<string, "primary" | "warning"> = {
  stock: "primary",
  credit: "warning",
};
const statusColor: Record<string, "success" | "warning" | "error"> = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

export default function ApplicationsTable() {
  const t = useTranslations("dealer.applications");
  const [items, setItems] = useState(seedApplications);

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

  return (
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
                {t("table.reference")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.subDealer")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.type")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.units")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.amount")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.date")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.status")}
              </TableCell>
              <TableCell isHeader className="py-3 text-end text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.actions")}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {items.length === 0 && (
              <TableRow>
                <TableCell
                  className="py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                  colSpan={8}
                >
                  {t("noResults")}
                </TableCell>
              </TableRow>
            )}
            {items.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                  {app.reference}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {app.subDealer}
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={typeColor[app.type]} size="sm">
                    {t(`types.${app.type}`)}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {app.units != null ? app.units.toLocaleString() : "-"}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {app.amount != null ? `$${app.amount.toLocaleString()}` : "-"}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {app.date}
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={statusColor[app.status]} size="sm">
                    {t(`statuses.${app.status}`)}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  {app.status === "pending" ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" onClick={() => handleApprove(app.id)}>
                        {t("actions.approve")}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(app.id)}
                        className="!border-error-500 !text-error-500 hover:!bg-error-500 hover:!text-white dark:hover:!text-white"
                      >
                        {t("actions.reject")}
                      </Button>
                    </div>
                  ) : (
                    <span className="block text-end text-theme-xs text-gray-400 dark:text-gray-500">
                      -
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
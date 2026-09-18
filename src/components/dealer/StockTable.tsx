"use client";

import { stockItems } from "@/data/dealer";
import { useTranslations } from "next-intl";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function StockTable() {
  const t = useTranslations("dealer.stock");

  const statusOf = (item: (typeof stockItems)[number]) => {
    if (item.available <= 0) return "outOfStock";
    if (item.available < item.threshold) return "lowStock";
    return "inStock";
  };

  const statusColor: Record<string, "success" | "warning" | "error"> = {
    inStock: "success",
    lowStock: "warning",
    outOfStock: "error",
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
                {t("table.product")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.sku")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.category")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.available")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.allocated")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.inTransit")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.status")}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {stockItems.map((item) => {
              const status = statusOf(item);
              return (
                <TableRow key={item.id}>
                  <TableCell className="py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                    {item.name}
                  </TableCell>
                  <TableCell className="py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                    {item.sku}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {t(`categories.${item.category}`)}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                    {item.available.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {item.allocated.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {item.inTransit.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge color={statusColor[status]} size="sm">
                      {t(`statuses.${status}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
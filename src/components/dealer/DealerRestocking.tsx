"use client";

import { useRestockOrders } from "@/hooks/useRestockOrders";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

const products = [
  { name: "Orange Airtime", network: "Orange" },
  { name: "Smega Airtime", network: "Mascom" },
  { name: "MyZaka Wallet", network: "BTC" },
  { name: "BTC Airtime (Motlhakase)", network: "BTC" },
  { name: "Prange Money", network: "Prange" },
  { name: "CashPlus", network: "CashPlus" },
];

const unitRate = 150;

export default function DealerRestocking() {
  const t = useTranslations("dealer.restocking");
  const { orders, addOrder, setStatus } = useRestockOrders();
  const [product, setProduct] = useState(products[0]);
  const [units, setUnits] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const networkOrders = orders.filter((o) => o.source === "network");
  const subDealerRequests = orders.filter((o) => o.source === "subDealer");

  const amount = Number(units || 0) * unitRate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unitCount = Number(units);
    if (!unitCount || unitCount <= 0) return;

    const today = new Date().toISOString().slice(0, 10);
    addOrder({
      reference: `RSK-${today.replace(/-/g, "")}-${Math.floor(
        100 + Math.random() * 900,
      )}`,
      source: "network",
      origin: product.network,
      product: product.name,
      units: unitCount,
      amount,
      date: today,
      status: "pending",
    });
    setUnits("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const statusColor: Record<string, "success" | "warning" | "error" | "info"> = {
    pending: "warning",
    approved: "info",
    fulfilled: "success",
    rejected: "error",
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {t("formTitle")}
        </h3>
        <p className="mt-1 mb-6 text-sm text-gray-500 dark:text-gray-400">
          {t("formSubtitle")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2.5 block text-theme-sm font-medium text-gray-700 dark:text-gray-400">
              {t("product")}
            </label>
            <select
              value={product.name}
              onChange={(e) =>
                setProduct(
                  products.find((p) => p.name === e.target.value) ?? products[0],
                )
              }
              className="h-12 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              {products.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2.5 block text-theme-sm font-medium text-gray-700 dark:text-gray-400">
              {t("units")}
            </label>
            <input
              type="number"
              min={1}
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder={t("unitsPlaceholder")}
              className="h-12 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-white/5">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("estimatedAmount")}
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
              P{amount.toLocaleString()}
            </span>
          </div>
          {submitted && (
            <p className="rounded-lg bg-success-50 px-4 py-3 text-theme-sm font-medium text-success-600 dark:bg-success-500/10 dark:text-success-500">
              {t("successMessage")}
            </p>
          )}
          <Button className="w-full" size="sm">
            {t("submit")}
          </Button>
        </form>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t("networkOrdersTitle")}
          </h3>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.reference")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.product")}
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
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {networkOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="py-3">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {order.reference}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      {order.product}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      {order.units.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      P{order.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      {order.date}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge color={statusColor[order.status]} variant="light">
                      {t(`statuses.${order.status}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t("subDealerRequestsTitle")}
          </h3>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.reference")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.origin")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.product")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.units")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.date")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.status")}
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  {t("table.actions")}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {subDealerRequests.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="py-3">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {order.reference}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      {order.origin}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      {order.product}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      {order.units.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      {order.date}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge color={statusColor[order.status]} variant="light">
                      {t(`statuses.${order.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    {order.status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => setStatus(order.id, "approved")}
                        >
                          {t("actions.approve")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setStatus(order.id, "rejected")}
                        >
                          {t("actions.reject")}
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
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
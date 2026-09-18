"use client";

import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import ComponentCard from "@/components/common/ComponentCard";
import { monthlyDistribution, payments, transactions } from "@/data/dealer";
import { DownloadIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import Button from "../ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function ReportsExports() {
  const t = useTranslations("dealer.reports");
  const tDealer = useTranslations("dealer");

  const [reportType, setReportType] = useState("distribution");
  const [period, setPeriod] = useState("thisYear");

  const reportTypeOptions = [
    { value: "distribution", label: t("reportTypes.distribution") },
    { value: "transactions", label: t("reportTypes.transactions") },
    { value: "payments", label: t("reportTypes.payments") },
  ];
  const periodOptions = [
    { value: "thisMonth", label: t("periods.thisMonth") },
    { value: "lastMonth", label: t("periods.lastMonth") },
    { value: "thisQuarter", label: t("periods.thisQuarter") },
    { value: "thisYear", label: t("periods.thisYear") },
  ];

  const visibleMonths = useMemo(() => {
    if (period === "thisMonth") return monthlyDistribution.slice(-1);
    if (period === "lastMonth") return monthlyDistribution.slice(-2, -1);
    if (period === "thisQuarter") return monthlyDistribution.slice(-3);
    return monthlyDistribution;
  }, [period]);

  const summary = useMemo(() => {
    const totalDistributed = visibleMonths.reduce(
      (sum, m) => sum + m.distributed,
      0,
    );
    const totalTransactions = transactions.length;
    const totalCollected = payments
      .filter((p) => p.status === "received")
      .reduce((sum, p) => sum + p.amount, 0);
    return { totalDistributed, totalTransactions, totalCollected };
  }, [visibleMonths]);

  const exportCsv = () => {
    const rows: string[][] =
      reportType === "distribution"
        ? visibleMonths.map((m) => [m.month, String(m.distributed)])
        : reportType === "payments"
          ? payments.map((p) => [p.reference, p.subDealer, p.method, String(p.amount), p.dueDate, p.status])
          : transactions.map((tr) => [
              tr.reference,
              tr.subDealer,
              tr.type,
              String(tr.units),
              String(tr.amount),
              tr.date,
              tr.status,
            ]);

    const header =
      reportType === "distribution"
        ? ["Month", "Distributed"]
        : reportType === "payments"
          ? ["Reference", "Sub-Dealer", "Method", "Amount", "Due Date", "Status"]
          : ["Reference", "Sub-Dealer", "Type", "Units", "Amount", "Date", "Status"];

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell)}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportType}-report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <ComponentCard title={t("title")} desc={t("subtitle")}>
        <Form onSubmit={() => {}} className="flex flex-col gap-6 lg:flex-row lg:items-end">
          <div className="w-full lg:max-w-72">
            <Label>{t("reportTypeLabel")}</Label>
            <Select
              options={reportTypeOptions}
              defaultValue="distribution"
              onChange={(value) => setReportType(value)}
            />
          </div>
          <div className="w-full lg:max-w-72">
            <Label>{t("periodLabel")}</Label>
            <Select
              options={periodOptions}
              defaultValue="thisYear"
              onChange={(value) => setPeriod(value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button startIcon={<DownloadIcon className="size-5" />} onClick={exportCsv}>
              {t("exportCsv")}
            </Button>
            <Button variant="outline" startIcon={<DownloadIcon className="size-5" />} onClick={exportPdf}>
              {t("exportPdf")}
            </Button>
          </div>
        </Form>
      </ComponentCard>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("table.totalDistributed")}
          </span>
          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            {summary.totalDistributed.toLocaleString()}
          </h4>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("table.totalTransactions")}
          </span>
          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            {summary.totalTransactions.toLocaleString()}
          </h4>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("table.totalCollected")}
          </span>
          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            ${summary.totalCollected.toLocaleString()}
          </h4>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
          {t(`reportTypes.${reportType}`)}
        </h3>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                {(reportType === "distribution"
                  ? ["Reference", "Month", "Distributed"]
                  : reportType === "payments"
                    ? ["Reference", "Sub-Dealer", "Method", "Amount", "Due Date", "Status"]
                    : ["Reference", "Sub-Dealer", "Type", "Units", "Amount", "Date", "Status"]
                ).map((cell) => (
                  <TableCell key={cell} isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {reportType === "distribution" &&
                visibleMonths.map((m) => (
                  <TableRow key={m.month}>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      UI-{m.month.toUpperCase()}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                      {tDealer(`months.${m.month}`)}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {m.distributed.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              {reportType === "payments" &&
                payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                      {p.reference}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {p.subDealer}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {p.method}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      ${p.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {p.dueDate}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {p.status}
                    </TableCell>
                  </TableRow>
                ))}
              {reportType === "transactions" &&
                transactions.map((tr) => (
                  <TableRow key={tr.id}>
                    <TableCell className="py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                      {tr.reference}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {tr.subDealer}
                    </TableCell>
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {tDealer(`transactionTypes.${tr.type}`)}
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
                    <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {tDealer(`transactionStatuses.${tr.status}`)}
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
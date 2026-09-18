"use client";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { dealerEvents, traceBranches } from "@/data/dealer";
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

const actionColor: Record<
  string,
  "primary" | "success" | "warning" | "error" | "info"
> = {
  login: "primary",
  logout: "primary",
  allocation: "warning",
  dispatch: "warning",
  receive: "success",
  sale: "warning",
  return: "error",
  approval: "success",
  rejection: "error",
};

const channelOptions = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile App" },
  { value: "ussd", label: "USSD" },
];

export default function TraceActivityLog() {
  const t = useTranslations("dealer.tracing");
  const [query, setQuery] = useState("");
  const [action, setAction] = useState("all");
  const [channel, setChannel] = useState("all");

  const actionOptions = [
    { value: "all", label: t("filterAll") },
    ...Object.keys(t.raw("actions") as Record<string, string>).map((key) => ({
      value: key,
      label: t(`actions.${key}`),
    })),
  ];

  const branchSubDealers = useMemo(
    () => Array.from(new Set(traceBranches.map((b) => b.subDealer))),
    [],
  );

  const events = useMemo(() => {
    return dealerEvents.filter((ev) => {
      const matchesQuery =
        query === "" ||
        [ev.actor, ev.subDealer, ev.reference]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesAction = action === "all" || ev.action === action;
      const matchesChannel = channel === "all" || ev.channel === channel;
      return matchesQuery && matchesAction && matchesChannel;
    });
  }, [query, action, channel]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {t("logTitle")}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("logSubtitle")}
        </p>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <Label htmlFor="trace-query">{t("searchPlaceholder")}</Label>
          <Input
            id="trace-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
          />
        </div>
        <div>
          <Label>{t("filterAction")}</Label>
          <Select
            options={actionOptions}
            onChange={(value) => setAction(value)}
            defaultValue={action}
          />
        </div>
        <div>
          <Label>Channel</Label>
          <Select
            options={channelOptions}
            onChange={(value) => setChannel(value)}
            defaultValue={channel}
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.actor")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.subDealer")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.action")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.product")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.units")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.channel")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.reference")}
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                {t("table.timestamp")}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {events.length === 0 && (
              <TableRow>
                <TableCell className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t("empty")}
                </TableCell>
              </TableRow>
            )}
            {events.map((ev) => (
              <TableRow key={ev.id}>
                <TableCell className="py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                  {ev.actor}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ev.subDealer}
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={actionColor[ev.action] ?? "primary"} size="sm">
                    {t(`actions.${ev.action}`)}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ev.product}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {ev.units > 0 ? ev.units.toLocaleString() : "-"}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {t(`channels.${ev.channel}`)}
                </TableCell>
                <TableCell className="py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                  {ev.reference}
                </TableCell>
                <TableCell className="py-3 text-theme-xs text-gray-500 dark:text-gray-400">
                  {ev.timestamp}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-2 text-theme-xs text-gray-400">
        {branchSubDealers.length} sub-dealers ·{" "}
        {dealerEvents.length} recorded activities
      </p>
    </div>
  );
}
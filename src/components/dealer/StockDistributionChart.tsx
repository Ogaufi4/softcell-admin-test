"use client";

import { ApexOptions } from "apexcharts";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { monthlyDistribution } from "@/data/dealer";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TrendingUpIcon = () => (
  <svg
    className="fill-white stroke-current 2xsm:h-[17px] 2xsm:w-[17px]"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.7855 3.04237C15.0589 2.31547 13.8644 2.31517 13.1375 3.04182L9.55154 6.62564L4.86259 1.93693C4.13603 1.21037 2.94193 1.21009 2.21506 1.93629C1.4882 2.66248 1.48791 3.85658 2.21447 4.58314L6.90342 9.27185L3.31779 12.8557C2.59093 13.5823 2.59063 14.7764 3.31719 15.5032C4.04374 16.23 5.23784 16.2303 5.9647 15.5037L14.3681 7.10026C15.0949 6.3734 15.0952 5.1793 14.3686 4.45274L15.7855 3.04237Z"
      fill=""
      stroke=""
      strokeWidth="0.8"
    />
  </svg>
);

export default function StockDistributionChart() {
  const t = useTranslations("dealer");
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465fff", "#22c55e"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 310,
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: monthlyDistribution.map((m) => t(`months.${m.month}`)),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val.toLocaleString()}`,
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
  };
  const series = [
    {
      name: t("overview.distribution.series"),
      data: monthlyDistribution.map((m) => m.distributed),
    },
    {
      name: t("overview.distribution.restocked"),
      data: monthlyDistribution.map((m) => m.restocked),
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-theme-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <TrendingUpIcon />
            {t("overview.metrics.vsLastMonth")}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white/90">
            {t("overview.distribution.title")}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
              {t("overview.distribution.series")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-success-500" />
            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
              {t("overview.distribution.restocked")}
            </span>
          </div>
        </div>
      </div>
      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <div className="min-w-150 pl-2 xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
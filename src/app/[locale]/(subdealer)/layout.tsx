"use client";

import { useAuth } from "@/context/AuthContext";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

const navItems = [
  { key: "overview", path: "/portal" },
  { key: "virtualStock", path: "/portal/virtual-stock" },
  { key: "restock", path: "/portal/restock" },
];

export default function SubDealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isInitialized, role, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("subdealer");

  useEffect(() => {
    if (isInitialized) {
      if (!isAuthenticated) {
        router.replace("/signin");
      } else if (role === "dealer") {
        router.replace("/");
      }
    }
  }, [isAuthenticated, isInitialized, role, router]);

  if (isInitialized && (!isAuthenticated || role !== "subdealer")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-(--breakpoint-2xl) items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/portal" className="flex items-center gap-2">
            <Image
              src="/images/logo/logo-icon.svg"
              alt="SoftCell"
              width={32}
              height={32}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="hidden text-sm font-semibold text-gray-800 sm:block dark:text-white/90">
              {t("brand")}
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.path
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200",
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => {
              logout();
              router.replace("/signin");
            }}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
          >
            {t("signOut")}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">{children}</main>
    </div>
  );
}
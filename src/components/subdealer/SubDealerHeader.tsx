"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SubDealerHeader: React.FC = () => {
  const t = useTranslations("subdealer");
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { logout } = useAuth();
  const router = useRouter();

  const handleToggle = () => {
    if (window.innerWidth >= 1280) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white xl:border-b dark:border-gray-800 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-4 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-6 dark:border-gray-800">
        <button
          className={`z-99999 flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 lg:h-11 lg:w-11 lg:bg-transparent xl:border dark:border-gray-800 dark:text-gray-400 dark:lg:bg-transparent ${
            isMobileOpen ? "bg-gray-100 dark:bg-white/3" : ""
          }`}
          onClick={handleToggle}
          aria-label={t("nav.toggle")}
        >
          <svg
            className="rtl:-scale-x-100"
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <Link href="/portal" className="xl:hidden">
          <Image
            width={154}
            height={32}
            src="/images/logo/logo.svg"
            alt="Logo"
          />
        </Link>

        <div className="flex items-center gap-2 2xsm:gap-3">
          <ThemeToggleButton />
          <button
            onClick={() => {
              logout();
              router.replace("/signin");
            }}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
          >
            {t("signOut")}
          </button>
        </div>
      </div>
    </header>
  );
};

export default SubDealerHeader;
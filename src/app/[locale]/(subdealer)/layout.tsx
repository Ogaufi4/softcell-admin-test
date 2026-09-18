"use client";

import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import { useRouter } from "@/i18n/navigation";
import Backdrop from "@/layout/Backdrop";
import SubDealerHeader from "@/components/subdealer/SubDealerHeader";
import SubDealerSidebar from "@/components/subdealer/SubDealerSidebar";
import { useEffect } from "react";

export default function SubDealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isInitialized, role } = useAuth();
  const router = useRouter();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

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

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <SubDealerSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <SubDealerHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
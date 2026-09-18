import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RegisterSubDealerForm from "@/components/dealer/RegisterSubDealerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Sub-Dealer | Dealer Portal",
  description: "Register a new sub-dealer to distribute stock to.",
};

export default function RegisterPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Register" />
      <div className="mx-auto max-w-4xl">
        <RegisterSubDealerForm />
      </div>
    </div>
  );
}
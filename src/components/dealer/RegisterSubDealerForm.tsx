"use client";

import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import ComponentCard from "@/components/common/ComponentCard";
import { CheckCircleIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "../ui/button/Button";

export default function RegisterSubDealerForm() {
  const t = useTranslations("dealer.register");
  const [submitted, setSubmitted] = useState(false);
  const [businessName, setBusinessName] = useState("");

  const regionOptions = [
    { value: "north", label: t("form.regionOptions.north") },
    { value: "south", label: t("form.regionOptions.south") },
    { value: "east", label: t("form.regionOptions.east") },
    { value: "west", label: t("form.regionOptions.west") },
    { value: "central", label: t("form.regionOptions.central") },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <ComponentCard title={t("title")}>
        <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
          <CheckCircleIcon className="size-16 text-success-500" />
          <h4 className="text-title-sm font-semibold text-gray-800 dark:text-white/90">
            {t("title")}
          </h4>
          <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
            {t(
              "successMessage",
              businessName ? { name: businessName } : { name: "Sub-Dealer" },
            )}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setBusinessName("");
            }}
          >
            {t("form.submit")}
          </Button>
        </div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard title={t("title")} desc={t("subtitle")}>
      <Form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
            <Label htmlFor="businessName">{t("form.businessName")}</Label>
            <Input
              id="businessName"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={t("form.businessNamePlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="contactPerson">{t("form.contactPerson")}</Label>
            <Input
              id="contactPerson"
              type="text"
              placeholder={t("form.contactPersonPlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="email">{t("form.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("form.emailPlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="phone">{t("form.phone")}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={t("form.phonePlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="region">{t("form.region")}</Label>
            <Select
              options={regionOptions}
              placeholder={t("form.region")}
              onChange={() => {}}
            />
          </div>
          <div>
            <Label htmlFor="initialStock">{t("form.initialStock")}</Label>
            <Input id="initialStock" type="number" min={0} placeholder="0" />
          </div>
          <div>
            <Label htmlFor="creditLimit">{t("form.creditLimit")}</Label>
            <Input id="creditLimit" type="number" min={0} placeholder="P0" />
          </div>
          <div className="xl:col-span-2">
            <Label htmlFor="address">{t("form.address")}</Label>
            <Input
              id="address"
              type="text"
              placeholder={t("form.addressPlaceholder")}
            />
          </div>
          <div className="xl:col-span-2">
            <Label htmlFor="notes">{t("form.notes")}</Label>
            <textarea
              id="notes"
              rows={4}
              placeholder={t("form.notesPlaceholder")}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
        </div>
        <div>
          <Button>{t("form.submit")}</Button>
        </div>
      </Form>
    </ComponentCard>
  );
}
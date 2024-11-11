"use client";

import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import homeIcon from "@/public/images/house.svg";
import searchIcon from "@/public/images/search.svg";
import filterIcon from "@/public/images/filter.svg";
import plusIcon from "@/public/images/plus.svg";

export default function InvoicesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-[#6B6E7F] text-xl">
        <span>{t("dashboard.invoices")}</span>
        <span className="mx-3 text-gray-300">|</span>
        <div className="flex items-center gap-2">
          <Image src={homeIcon} alt="Home" width={18} height={18} />
          <span className="mx-1">•</span>
          <span>{t("breadcrumbs.dashboard")}</span>
          <span className="mx-1">•</span>
          <span>{t("breadcrumbs.invoices")}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Header with matching style */}
        <div className="px-6 py-4 border-b bg-[#C9B5001A]">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-[#6B6E7F]">
              <h2 className="text-xl font-semibold">{t("invoices.title")}</h2>
              <p className="ml-4 text-xs">{t("invoices.overview")}</p>

              <div className="relative ml-8">
                <input
                  type="text"
                  placeholder={t("table.search")}
                  className="pl-10 pr-4 py-2 border border-[#D9D9D9] rounded-[15px] focus:outline-none text-sm w-full"
                />
                <Image
                  src={searchIcon}
                  alt="Search Icon"
                  width={14}
                  height={14}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image
                  src={filterIcon}
                  alt="Filter Icon"
                  width={20}
                  height={20}
                />
              </button>
              <button className="bg-[#C9B500] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#B89A00]">
                <Image
                  src={plusIcon}
                  alt="Add Invoice Icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {t("invoices.noInvoices")}
            </h3>
            <p className="text-gray-500">
              {t("invoices.noInvoicesDescription")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import homeIcon from "@/public/images/house.svg";
import Image from "next/image";
import Button from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export default function DashboardPage() {
  const router = useRouter();
  const { t, locale } = useTranslation();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

    router.push(`/${locale}/login`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-[#6B6E7F] text-xl">
        <span>{t("dashboard.analytics")}</span>
        <span className="mx-3 text-gray-300">|</span>
        <div className="flex items-center gap-2">
          <Image src={homeIcon} alt="Home" width={18} height={18} />
          <span className="mx-1">•</span>
          <span>{t("breadcrumbs.dashboard")}</span>
          <span className="mx-1">•</span>
          <span>{t("breadcrumbs.analytics")}</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {t("dashboard.welcome")}
        </h2>
        <p className="text-gray-600">{t("dashboard.selectOption")}</p>

        <Button onClick={handleLogout} className="mt-4">
          {t("dashboard.logout")}
        </Button>
      </div>
    </div>
  );
}

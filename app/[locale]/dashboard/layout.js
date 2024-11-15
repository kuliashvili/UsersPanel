"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import searchIcon from "@/public/images/search.svg";
import ringIcon from "@/public/images/ring.svg";
import saveIcon from "@/public/images/save.svg";
import invoicesIcon from "@/public/images/invoices.svg";
import usersIcon from "@/public/images/users.svg";
import analyticsIcon from "@/public/images/analytics.svg";
import enFlag from "@/public/images/en-flag.svg";
import geFlag from "@/public/images/ge-flag.svg";
import { useTranslation } from "@/hooks/useTranslation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentLang, setCurrentLang] = useState("en");
  const { t, locale } = useTranslation();

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    if (userCookie) {
      setUser(JSON.parse(decodeURIComponent(userCookie.split("=")[1])));
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = locale === "en" ? "ka" : "en";
    const newPath = pathname.replace(`/${locale}/`, `/${newLang}/`);
    setCurrentLang(newLang);
    router.push(newPath);
  };

  const getLocalizedPath = (path) => {
    return path.replace("/en/", `/${locale}/`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow z-10 relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Image
                width={190}
                height={42}
                src={Logo}
                alt="Binary Forge Logo"
              />
              <h1 className="text-xl ml-10 font-semibold">
                {t("dashboard.title")}
              </h1>
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                <Image
                  src={searchIcon}
                  width={25}
                  height={25}
                  alt="Search Icon"
                  className="ml-9"
                />
                <Image
                  src={ringIcon}
                  width={25}
                  height={25}
                  alt="Ring Icon"
                  className="ml-9"
                />
                <Image
                  src={saveIcon}
                  width={20}
                  height={20}
                  alt="Save Icon"
                  className="ml-9"
                />
                <button onClick={toggleLanguage} className="ml-9">
                  <Image
                    src={locale === "en" ? enFlag : geFlag}
                    width={25}
                    height={25}
                    alt={locale === "en" ? "English flag" : "Georgian flag"}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white h-[calc(100vh-5rem)] shadow-sm">
          <nav className="mt-5 px-4 space-y-6">
            <div>
              <h3 className="text-gray-500 text-sm mb-2">
                {t("dashboard.dashboard")}
              </h3>
              <Link
                href={getLocalizedPath("/en/dashboard")}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  pathname === getLocalizedPath("/en/dashboard")
                    ? "bg-[#C9B5001A]"
                    : "hover:bg-gray-50"
                }`}
              >
                <Image
                  src={analyticsIcon}
                  width={20}
                  height={20}
                  alt="Analytics Icon"
                  className="mr-3"
                />
                {t("dashboard.analytics")}
              </Link>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm mb-2">
                {t("dashboard.pages")}
              </h3>
              <div className="space-y-1">
                <Link
                  href={getLocalizedPath("/en/dashboard/invoices")}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                    pathname === getLocalizedPath("/en/dashboard/invoices")
                      ? "bg-[#C9B5001A]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Image
                    src={invoicesIcon}
                    width={20}
                    height={20}
                    alt="Invoices Icon"
                    className="mr-3"
                  />
                  {t("dashboard.invoices")}
                </Link>

                <Link
                  href={getLocalizedPath("/en/dashboard/users")}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                    pathname === getLocalizedPath("/en/dashboard/users")
                      ? "bg-[#C9B5001A]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Image
                    src={usersIcon}
                    width={20}
                    height={20}
                    alt="Users Icon"
                    className="mr-3"
                  />
                  {t("dashboard.users")}
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import searchIcon from "@/public/images/search.svg";
import ringIcon from "@/public/images/ring.svg";
import saveIcon from "@/public/images/save.svg";
import enFlag from "@/public/images/en-flag.svg";
import geFlag from "@/public/images/ge-flag.svg";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    if (userCookie) {
      setUser(JSON.parse(decodeURIComponent(userCookie.split("=")[1])));
    }
  }, []);

  const menuItems = [
    { href: "/en/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/en/dashboard/users", label: "Users", icon: "👥" },
    { href: "/en/dashboard/analytics", label: "Analytics", icon: "📈" },
    { href: "/en/dashboard/invoices", label: "Invoices", icon: "📄" },
  ];

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
              ></Image>
              <h1 className="text-xl ml-10 font-semibold">Admin Panel</h1>
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
                <Image
                  src={enFlag}
                  width={25}
                  height={25}
                  alt="English flag"
                  className="ml-9"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white h-[calc(100vh-4rem)] shadow-sm">
          <nav className="mt-5 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 my-1 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

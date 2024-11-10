"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold">Binary Forge</h1>
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-sm text-gray-500">{user.email}</span>
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

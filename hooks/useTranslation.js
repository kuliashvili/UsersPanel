"use client"
import { usePathname } from "next/navigation";
import { translations } from "../translations";

export function useTranslation() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, locale };
}

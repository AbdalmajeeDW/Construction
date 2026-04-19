"use client";

import { useEffect, useState } from "react";
import i18n from "@/i18n/i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang).then(() => {
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}

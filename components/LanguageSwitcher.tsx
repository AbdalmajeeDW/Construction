"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState<"en" | "nl">("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as "en" | "nl" | null;

    if (savedLang) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = language === "nl" ? "en" : "nl";

    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/40 text-white hover:bg-white hover:text-teal-600 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm uppercase">{language}</span>
      </motion.button>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Logo from "../public/1.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("links.home"), href: "/" },
    { name: t("links.services"), href: "/services" },
    { name: t("links.projects"), href: "/projects" },
    { name: t("links.about"), href: "/about" },
    { name: t("links.contact"), href: "/contact" },
  ];

  const getNavbarStyle = () => {
    if (isScrolled) {
      return "bg-gray-400 backdrop-blur-md shadow-sm";
    }
    if (isHome) {
      return "bg-transparent";
    }
    return "bg-gray-400 backdrop-blur-sm";
  };

  const getLinkColor = () => {
    if (isScrolled) {
      return "text-white hover:text-teal-600";
    }
    if (isHome) {
      return "text-white hover:text-teal-600";
    }
    return "text-white hover:text-teal-600";
  };

  const getActiveLinkColor = () => {
    if (isScrolled) {
      return "text-teal-600 font-semibold";
    }
    return "text-teal-600 font-semibold";
  };

  return (
    <>
      <div className="h-20 bg-gray-400"></div>
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-500 ${getNavbarStyle()}`}
      >
        <div className="px-4 sm:px-6 lg:px-8 mx-auto h-full">
          <div className="flex justify-between items-center h-full lg:hidden">
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <motion.a
                href="/"
                className="text-3xl font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <span className="inline-block">
                  <Image src={Logo} width={75} height={75} alt="Logo" />
                </span>
              </motion.a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="hidden lg:flex justify-between items-center h-full">
            <motion.a
              href="/"
              className="text-3xl md:text-4xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="inline-block">
                <Image src={Logo} width={75} height={75} alt="Logo" />
              </span>
            </motion.a>

            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 text-base font-medium ${
                    pathname === link.href
                      ? getActiveLinkColor()
                      : getLinkColor()
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-5 py-3 transition-colors mx-2 rounded-xl ${
                    pathname === link.href
                      ? "bg-teal-50 text-teal-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
}
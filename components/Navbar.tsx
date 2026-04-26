"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Logo from "../public/1.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

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

  return (
    <>
    <div className="h-20 bg-gray-400 backdrop-blur-md"></div>
      
<motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.5 }}
  className={`fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-500 ${
    isScrolled 
      ? "bg-black/70 backdrop-blur-md" 
      : "bg-transparent"
  }`}
>
        <div className="px-4 sm:px-6 lg:px-8 mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <motion.a
              href="#"
              className="text-3xl md:text-4xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-teal-600">
                <Image src={Logo} width={75} height={75} alt="Logo" />
              </span>
            </motion.a>
            
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-white text-xl hover:text-teal-600 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-4 py-4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-gray-800 hover:bg-teal-50 hover:text-teal-600 transition-colors"
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
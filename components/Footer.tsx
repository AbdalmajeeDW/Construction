"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "../public/1.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function Footer() {
  const { t } = useTranslation();

  const contactInfo = {
    phone: "+31 68 5218315",
    email: "info@rivoaannemerbedrijf.nl",
    address: "Doctor Struyckenstraat 179A, 4812 BC Breda, Netherlands",
  };

  const quickLinks = [
    { href: "/", label: "footer.home", isHash: false },
    { href: "#categories", label: "footer.products", isHash: true },
    { href: "#featured", label: "footer.features", isHash: true },
    { href: "#about", label: "footer.aboutUs", isHash: true },
  ];

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-linear-to-b from-white to-slate-50 text-gray-700 pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <div className="flex justify-center sm:justify-start mb-3 sm:mb-4">
              <Image 
                src={Logo} 
                width={75} 
                height={75} 
                alt="Logo"

              />
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-md mx-auto sm:mx-0">
              {t("footer.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center sm:text-left"
          >
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-teal-600">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-slate-600">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  {link.isHash ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleHashClick(e, link.href)}
                      className="hover:text-teal-600 transition-colors duration-300 text-sm sm:text-base"
                    >
                      {t(link.label)}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-teal-600 transition-colors duration-300 text-sm sm:text-base"
                    >
                      {t(link.label)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-teal-600">
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-slate-600">
              {/* Phone */}
              <li className="flex items-center justify-center sm:justify-start gap-3 group">
                <div className="bg-teal-50 p-1.5 sm:p-2 rounded-lg group-hover:bg-teal-600 transition-colors duration-300 shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="group-hover:text-teal-600 transition-colors text-sm sm:text-base"
                >
                  {contactInfo.phone}
                </a>
              </li>
              
              <li className="flex items-center justify-center sm:justify-start gap-3 group">
                <div className="bg-teal-50 p-1.5 sm:p-2 rounded-lg group-hover:bg-teal-600 transition-colors duration-300 shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="group-hover:text-teal-600 transition-colors text-sm sm:text-base break-all"
                >
                  {contactInfo.email}
                </a>
              </li>
              
              <li className="flex items-start justify-center sm:justify-start gap-3 group">
                <div className="bg-teal-50 p-1.5 sm:p-2 rounded-lg group-hover:bg-teal-600 transition-colors duration-300 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <span className="group-hover:text-teal-600 transition-colors text-xs sm:text-sm leading-relaxed">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

 
      </div>
    </footer>
  );
}
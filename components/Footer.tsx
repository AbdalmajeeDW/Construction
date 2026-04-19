"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "../public/1.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const contactInfo = {
    phone: "+31 68 5218315",
    email: "info@",
    address: "Doctor Struyckenstraat 179A, 4812 BC Breda, Netherlands",
  };

  return (
    <footer className="bg-linear-to-b from-white to-slate-50 shadow text-gray-700 pt-16 pb-8">
      <div className="container px-4 mx-auto ">
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <Image src={Logo} width={75} height={75} alt="Logo" />
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {t("footer.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-teal-600">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a
                  href="#"
                  className="hover:text-teal-600 transition-colors duration-300"
                >
                  {t("footer.home")}
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="hover:text-teal-600 transition-colors duration-300"
                >
                  {t("footer.products")}
                </a>
              </li>
              <li>
                <a
                  href="#featured"
                  className="hover:text-teal-600 transition-colors duration-300"
                >
                  {t("footer.features")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-teal-600 transition-colors duration-300"
                >
                  {t("footer.aboutUs")}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-teal-600">
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center gap-3 group">
                <div className="bg-teal-50 p-2 rounded-lg group-hover:bg-teal-600 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-teal-600 group-hover:text-white" />
                </div>
                <span className="group-hover:text-teal-600 transition-colors">
                  {contactInfo.phone}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-teal-50 p-2 rounded-lg group-hover:bg-teal-600 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-teal-600 group-hover:text-white" />
                </div>
                <span className="group-hover:text-teal-600 transition-colors">
                  {contactInfo.email}
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="bg-teal-50 p-2 rounded-lg group-hover:bg-teal-600 transition-colors duration-300 mt-1">
                  <MapPin className="w-4 h-4 text-teal-600 group-hover:text-white" />
                </div>
                <span className="group-hover:text-teal-600 transition-colors text-sm">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border-t border-slate-200 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              {/* &copy; 2024 Benaa.Sam. {t("footer.allRightsReserved")} */}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

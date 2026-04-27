"use client";

import heroHome from "../public/heroHome.jpg";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  LucideIcon,
  Settings,
  Folder,
  Users,
  Mail,
  Home,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

interface HeroProps {
  title?:string
  badgeKey?: string;
  titlePrefixKey?: string;
  titleHighlightKey?: string;
  titleSuffixKey?: string;
  descriptionKey?: string;
  statsKeys?: string[];
  floatingLabelKey?: string;
  heroImage?: React.ReactNode | string;
  statsIcons?: LucideIcon[];
}

export default function Hero({
  title,
  badgeKey = "heroSection.badge",
  titlePrefixKey = "heroSection.title1",
  titleHighlightKey = "heroSection.titleHighlight",
  titleSuffixKey = "heroSection.title2",
  descriptionKey = "heroSection.description",
  statsKeys = ["heroSection.stat1", "heroSection.stat2", "heroSection.stat3"],
  floatingLabelKey = "heroSection.floatingLabel",
  heroImage,
  statsIcons = [CheckCircle, TrendingUp, Award],
}: HeroProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getPageTitle = () => {
    switch (pathname) {
      case "/services":
        return t("links.services");
      case "/projects":
        return t("links.projects");
      case "/about":
        return t("links.about");
      case "/contact":
        return t("links.contact");
      default:
        return "";
    }
  };

  const getPageIcon = () => {
    switch (pathname) {
      case "/services":
        return <Settings className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />;
      case "/projects":
        return <Folder className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />;
      case "/about":
        return <Users className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />;
      case "/contact":
        return <Mail className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />;
      default:
        return <Home className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />;
    }
  };

  if (isHome) {
    const finalHeroImage = heroImage || (
      <Image
        src={heroHome}
        alt="hero"
        className="w-full h-full object-cover hidden lg:block rounded-2xl shadow-xl"
        priority
      />
    );

    return (
      <section className="relative overflow-hidden py-5 sm:py-5 md:py-5 flex items-center bg-linear-to-br from-gray-100 via-teal-100 to-gray-100">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-gray-800/10 backdrop-blur-sm rounded-full text-gray-700 text-xs sm:text-sm mb-4">
                  {t(badgeKey)}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold text-gray-800 mb-4 leading-tight"
              >
                <span>{t(titlePrefixKey)} </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-teal-700 px-1">
                  {t(titleHighlightKey)}
                </span>
                <span> {t(titleSuffixKey)}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed"
              >
                {t(descriptionKey)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/services"
                  className="bg-teal-600 cursor-pointer text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
                >
                  {t("heroSection.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/projects"
                  className="border cursor-pointer border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                  {t("heroSection.secondary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200"
              >
                {statsKeys.map((statKey, idx) => {
                  const Icon = statsIcons[idx % statsIcons.length];
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <Icon className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-600 text-xs sm:text-sm text-center">
                        {t(statKey)}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block mt-6 lg:mt-0"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto lg:max-w-none">
                {finalHeroImage}
                <div className="absolute inset-0 bg-linear-to-t from-gray-100/30 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-4 -right-4 bg-teal-600 rounded-xl p-3 shadow-xl"
              >
                <div className="text-white text-xs sm:text-sm text-center whitespace-nowrap">
                  {t(floatingLabelKey)}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const pageTitle = getPageTitle();
  const pageIcon = getPageIcon();

  return (
    <section className="relative overflow-hidden py-5 sm:py-5 md:py-5 bg-linear-to-br from-teal-700 via-teal-600 to-teal-800">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="absolute top-8 left-4 sm:left-8 lg:left-12 z-30">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <Link
            href="/"
            className="inline-flex items-center cursor-pointer gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t("heroSection.backToHome") || "Back to Home"}</span>
          </Link> */}
        </motion.div>
      </div>

      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
        
           <Link
            href="/"
            className="inline-flex items-center cursor-pointer gap-2 text-white/80 hover:text-white hover:bg-black/30 backdrop-blur-sm  rounded-full transition-all duration-300 text-sm  group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t("heroSection.backToHome") }</span>
          </Link>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
            {pageTitle || title}
          </h1>
            <motion.div
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/30 mb-6 absolute bottom-1"
          >
            {pageIcon}
          </motion.div>
          <div className="w-24 h-1 bg-white/40 mx-auto rounded-full mt-6" />
        </motion.div>
      </div>
    </section>
  );
}
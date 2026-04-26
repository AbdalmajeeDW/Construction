"use client";

import heroHome from "../public/heroHome.jpg";
import heroServices from "../public/services.jpg";
import heroProjects from "../public/project.jpg";
import heroAbout from "../public/about.jpg";
import heroContact from "../public/contact.jpg";
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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

interface HeroProps {
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

  const getDefaultImage = () => {
    switch (pathname) {
      case "/services":
        return heroServices;
      case "/projects":
        return heroProjects;
      case "/about":
        return heroAbout;
      case "/contact":
        return heroContact;
      default:
        return heroHome;
    }
  };

  const getPageIcon = () => {
    switch (pathname) {
      case "/services":
        return <Settings className="w-4 h-4" />;
      case "/projects":
        return <Folder className="w-4 h-4" />;
      case "/about":
        return <Users className="w-4 h-4" />;
      case "/contact":
        return <Mail className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  const getBadgeText = () => {
    switch (pathname) {
      case "/services":
        return "Services";
      case "/projects":
        return "Projects";
      case "/about":
        return "About Us";
      case "/contact":
        return "Contact";
      default:
        return "Home";
    }
  };

  const finalHeroImage = heroImage || (
    <Image
      src={getDefaultImage()}
      alt="hero"
      className="w-full h-full object-cover"
      priority
    />
  );

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center bg-linear-to-br from-gray-100 via-gray-200 to-gray-100">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="text-left">
            
            {/* Mobile Badge with Animated Icon */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:hidden mb-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 rounded-full shadow-md">
                <motion.span
                  animate={{ 
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-white flex items-center"
                >
                  {getPageIcon()}
                </motion.span>
                <span className="text-white font-medium text-sm tracking-wide">
                  {getBadgeText()}
                </span>
              </div>
            </motion.div>

            {/* Desktop Badge - Original Style */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700 px-1">
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
                href={pathname === "/services" ? "/contact" : "/services"}
                className="bg-teal-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
              >
                {pathname === "/services" ? t("links.contact") : t("heroSection.cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={pathname === "/projects" ? "/about" : "/projects"}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                {pathname === "/projects" ? t("links.about") : t("heroSection.secondary")}
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

          {/* Image Section - Desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mt-6 hidden lg:block lg:mt-0"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto lg:max-w-none">
              {finalHeroImage}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-100/30 to-transparent" />
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
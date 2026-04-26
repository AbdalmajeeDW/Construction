"use client";
import heroHome from '../public/heroHome.jpg'
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  LucideIcon,
} from "lucide-react";
import Image from 'next/image';
import React from 'react';
import { useTranslation } from "react-i18next";

interface HeroProps {
  badgeKey?: string;
  titlePrefixKey?: string;
  titleHighlightKey?: string;
  titleSuffixKey?: string;
  descriptionKey?: string;
  btnQuoteKey?: string;
  btnGalleryKey?: string;
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
  heroImage = <Image src={heroHome} alt='paint' className="w-full h-auto rounded-2xl"/>,
  statsIcons = [CheckCircle, TrendingUp, Award],
}: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-gray-100 via-gray-400 to-gray-100">
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/10 backdrop-blur-sm rounded-full text-gray-700 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
                {t(badgeKey)}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="
                text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xlxl 2xl:text-7xl
                font-bold text-gray-800 mb-4 sm:mb-6 leading-tight
              "
            >
              <span className=" sm:inline">{t(titlePrefixKey)}</span>
              <span className="
                text-transparent bg-clip-text px-1 bg-teal-600
                 sm:inline-block
              ">
                {t(titleHighlightKey)}
              </span>
              <span className=" sm:inline">{t(titleSuffixKey)}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="
                text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                text-gray-600 leading-relaxed
              "
            >
              {t(descriptionKey)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="
                grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-10 
                mt-8 sm:mt-10 md:mt-12 
                pt-6 sm:pt-8 border-t border-gray-300
              "
            >
              {statsKeys.map((statKey, idx) => {
                const Icon = statsIcons[idx % statsIcons.length];
                return (
                  <div
                    key={idx}
                    className="flex flex-col  items-center   gap-1"
                  >
                    <Icon className="w-4 h-4 sm:w-5 md:h-5 md:w-5 sm:h-5 text-teal-600 shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm md:text-sm lg:text-md text-nowrap">
                      {t(statKey)}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {
                heroImage
              }
        
              <div className="absolute inset-0 bg-linear-to-t from-gray-100/50 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-teal-600 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl"
            >
              <div className="text-white text-center">
                <div className="text-xs sm:text-sm whitespace-nowrap">
                  {t(floatingLabelKey)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
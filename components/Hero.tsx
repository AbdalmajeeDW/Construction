"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  LucideIcon,
} from "lucide-react";
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
  heroImage?: string;
  statsIcons?: LucideIcon[];
}

export default function Hero({
  badgeKey = "heroSection.badge",
  titlePrefixKey = "heroSection.title1",
  titleHighlightKey = "heroSection.titleHighlight",
  titleSuffixKey = "heroSection.title2",
  descriptionKey = "heroSection.description",
  btnQuoteKey = "heroSection.btnQuote",
  btnGalleryKey = "heroSection.btnGallery",
  statsKeys = ["heroSection.stat1", "heroSection.stat2", "heroSection.stat3"],
  floatingLabelKey = "heroSection.floatingLabel",
  heroImage = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
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

      <div className="relative container mx-auto px-4 pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gray-800/10 backdrop-blur-sm rounded-full text-gray-700 text-sm mb-6">
                {t(badgeKey)}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight"
            >
              {t(titlePrefixKey)}
              <span className="text-transparent bg-clip-text px-0.5 bg-teal-600">
                {t(titleHighlightKey)}
              </span>
              <br />
              {t(titleSuffixKey)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600  leading-relaxed"
            >
              {t(descriptionKey)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-12  pt-8 border-t border-gray-300"
            >
              {statsKeys.map((statKey, idx) => {
                const Icon = statsIcons[idx % statsIcons.length];
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-2"
                  >
                    <Icon className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-600 text-sm">{t(statKey)}</span>
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
              <img
                src={heroImage}
                alt="Hero visual"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-100/50 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -top-6 -right-6 bg-teal-600 rounded-xl p-4 shadow-xl"
            >
              <div className="text-white text-center">
                {/* <div className="text-2xl font-bold">98%</div> */}
                <div className="text-sm">{t(floatingLabelKey)}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

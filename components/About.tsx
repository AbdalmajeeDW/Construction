"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Target, Eye, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-4 sm:px-6 bg-linear-to-b from-slate-50 to-white"
    >
      <div className="container px-4 mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm mb-4">
            {t("aboutSection.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("aboutSection.title")}
            <span className="text-teal-600">
              {t("aboutSection.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg px-4">
            {t("aboutSection.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          <div className="bg-white rounded-2xl p-6 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full group flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300 shrink-0">
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800">
                {t("aboutSection.whoWeAre.title")}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {t("aboutSection.whoWeAre.description")}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full group flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300 shrink-0">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800">
                {t("aboutSection.ourMission.title")}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {t("aboutSection.ourMission.description")}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full group flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300 shrink-0">
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800">
                {t("aboutSection.ourVision.title")}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {t("aboutSection.ourVision.description")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
              {t("aboutSection.experience.title")}
              <span className="text-teal-600">
                {t("aboutSection.experience.titleHighlight")}
              </span>
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
              {t("aboutSection.experience.description")}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0" />
                <span className="text-sm md:text-base">
                  {t("aboutSection.experience.features1")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0" />
                <span className="text-sm md:text-base">
                  {t("aboutSection.experience.features2")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0" />
                <span className="text-sm md:text-base">
                  {t("aboutSection.experience.features3")}
                </span>
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 h-full min-h-[280px] md:min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"
              alt="Bouwmaterialen"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-teal-600 rounded-lg px-3 py-1">
              <span className="text-white text-xs font-semibold">
                {t("aboutSection.imageBadge")}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <button className="bg-teal-600 text-white px-6 md:px-8 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all hover:shadow-lg hover:scale-105 inline-flex items-center gap-2 text-sm md:text-base">
            {t("aboutSection.buttonText")}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

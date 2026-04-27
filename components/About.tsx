"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Target, Eye, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Motion from "./Motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-b from-slate-50 to-white"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Motion className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-700 rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
            {t("aboutSection.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 sm:mb-4 px-4">
            {t("aboutSection.title")}
            <span className="text-teal-600 block sm:inline">
              {t("aboutSection.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            {t("aboutSection.subtitle")}
          </p>
        </Motion>

        <Motion
         
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-16"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full group flex flex-col">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300 shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800">
                {t("aboutSection.whoWeAre.title")}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {t("aboutSection.whoWeAre.description")}
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full group flex flex-col">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300 shrink-0">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800">
                {t("aboutSection.ourMission.title")}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {t("aboutSection.ourMission.description")}
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full group flex flex-col">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300 shrink-0">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800">
                {t("aboutSection.ourVision.title")}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {t("aboutSection.ourVision.description")}
            </p>
          </div>
        </Motion>

        <Motion
  
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">
              {t("aboutSection.experience.title")}
              <span className="text-teal-600">
                {t("aboutSection.experience.titleHighlight")}
              </span>
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              {t("aboutSection.experience.description")}
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-600">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-sm sm:text-base">
                  {t("aboutSection.experience.features1")}
                </span>
              </div>
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-600">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-sm sm:text-base">
                  {t("aboutSection.experience.features2")}
                </span>
              </div>
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-600">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-sm sm:text-base">
                  {t("aboutSection.experience.features3")}
                </span>
              </div>
            </div>
          </div>

          <div className="relative bg-slate-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-slate-100 h-full min-h-60 sm:min-h-70 md:min-h-80">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"
              alt="Bouwmaterialen"
              width={800}
              height={600}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 to-transparent" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-teal-600 rounded-lg px-2 py-0.5 sm:px-3 sm:py-1">
              <span className="text-white text-[10px] sm:text-xs font-semibold">
                {t("aboutSection.imageBadge")}
              </span>
            </div>
          </div>
        </Motion>

        <Motion
   
          className="text-center mt-10 sm:mt-12 md:mt-16"
        >
          <button
            onClick={() => router.push("/contact")}
            className="
              bg-teal-600 text-white 
              px-5 sm:px-6 md:px-8 
              py-2.5 sm:py-3 
              text-sm sm:text-base font-semibold 
              rounded-lg sm:rounded-xl 
              hover:bg-teal-700 
              transition-all duration-300 
              hover:shadow-lg hover:scale-105 
              active:scale-95
              inline-flex items-center gap-2
            "
          >
            {t("aboutSection.buttonText")}
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
        </Motion>
      </div>
    </section>
  );
}

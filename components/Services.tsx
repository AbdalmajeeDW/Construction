"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { categories } from "@/data/services";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Motion from "./Motion";
interface card {
  onView?: (id: number) => void;
}
export default function Services({ onView }: card) {
  const ref = useRef(null);
  const { t } = useTranslation();
  const path = usePathname();
  const router = useRouter();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const categoriesData = categories(t);
  
    const flagLink = path === "/services";
  const sliceCategoriesData = !flagLink
    ? categoriesData.slice(0, 4)
    : categoriesData;
  const handleView = async (id: number) => {
    if (flagLink) {
      onView!(id);
    } else router.push(`/service/${id}`);

  };
  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-b from-white to-slate-50"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Motion className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-700 rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
            {t("servicesSection.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 sm:mb-4 px-4">
            {t("servicesSection.title")}{" "}
            <span className="text-teal-600">
              {t("servicesSection.titleHighlight")}
            </span>{" "}
            <span className="block sm:inline">
              {t("servicesSection.titleSuffix")}
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            {t("servicesSection.description")}
          </p>
        </Motion>
     

        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          2xl:grid-cols-5
          gap-4 sm:gap-5 md:gap-6
        "
        >
          {sliceCategoriesData.map((category, idx) => (
            
            <Motion
              key={category.id}
             
              className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group h-full flex flex-col"
            >
              <div className="relative h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden bg-slate-100 shrink-0">
                <Image
                  width={400}
                  height={400}
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 shadow-sm">
                  <category.icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg sm:text-xl text-slate-800 mb-1 sm:mb-2 line-clamp-1">
                  {category.name}
                </h3>

                <p className="text-slate-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {category.subServices.slice(0, 3).map((service, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-xs bg-slate-100 text-slate-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap"
                    >
                      {service.length > 15
                        ? service.slice(0, 12) + "..."
                        : service}
                    </span>
                  ))}
                  {category.subServices.length > 3 && (
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === category.id ? null : category.id,
                        )
                      }
                      className="text-[10px] sm:text-xs text-teal-600 hover:text-teal-700 font-medium"
                    >
                      {expandedId === category.id
                        ? t("servicesSection.showLess") || "Minder"
                        : `+${category.subServices.length - 3} ${
                            t("servicesSection.more") || "meer"
                          }`}
                    </button>
                  )}
                </div>

                {expandedId === category.id &&
                  category.subServices.length > 3 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-3 pt-2 border-t border-slate-100"
                    >
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {category.subServices.slice(3).map((service, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-xs bg-slate-100 text-slate-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                          >
                            {service.length > 15
                              ? service.slice(0, 12) + "..."
                              : service}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                <button
                  onClick={() => handleView(category.id!)}
                  className="text-teal-600 cursor-pointer text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1 group-hover:gap-2 transition-all mt-auto"
                >
                  {t("projectsSection.buttonExplore")}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </Motion>
          ))}
        </div>

        {path != "/services" && (
          <Motion
  
            className="text-center mt-8 sm:mt-10 md:mt-12"
          >
            <button
              onClick={() => router.push("/services")}
              className="
                 border-2 border-teal-600 text-white 
                px-6 sm:px-8 py-2.5 sm:py-3 
                text-sm sm:text-base font-semibold 
                rounded-lg sm:rounded-xl 
                bg-teal-600 hover:text-white 
                transition-all duration-300 
                hover:shadow-lg hover:scale-105
                active:scale-95
                inline-flex items-center gap-2
              "
            >
              {t("servicesSection.viewAll")}
            </button>
          </Motion>
        )}
      </div>
    </section>
  );
}

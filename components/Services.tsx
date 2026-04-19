"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { categories } from "@/data/services";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Categories() {
  const ref = useRef(null);
  const { t } = useTranslation();
  const path = usePathname();
  const router = useRouter();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const categoriesData = categories(t);
  const sliceCategoriesData =
    path != "/services" ? categoriesData.slice(0, 3) : categoriesData;

  return (
    <section ref={ref} className="py-24 bg-linear-to-b from-white to-slate-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm mb-4">
            {t("servicesSection.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("servicesSection.title")}{" "}
            <span className="text-teal-600">
              {t("servicesSection.titleHighlight")}
            </span>{" "}
            {t("servicesSection.titleSuffix")}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t("servicesSection.description")}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliceCategoriesData.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-slate-100 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <category.icon className="w-5 h-5 text-teal-600" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-xl text-slate-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {category.subServices.slice(0, 3).map((service, i) => (
                    <span
                      key={i}
                      className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                    >
                      {service.length > 20
                        ? service.slice(0, 18) + "..."
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
                      className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                    >
                      {expandedId === category.id
                        ? "Minder"
                        : `+${category.subServices.length - 3} meer`}
                    </button>
                  )}
                </div>

                {expandedId === category.id &&
                  category.subServices.length > 3 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 pt-2 border-t border-slate-100"
                    >
                      <div className="flex flex-wrap gap-2">
                        {category.subServices.slice(3).map((service, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                          >
                            {service.length > 20
                              ? service.slice(0, 18) + "..."
                              : service}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </div>
            </motion.div>
          ))}
        </div>
        {path != "/services" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => router.push("/services")}
              className="bg-white border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-xl font-semibold hover:bg-teal-600 hover:text-white transition-all hover:shadow-lg inline-flex items-center gap-2"
            >
              {t("servicesSection.viewAll")}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

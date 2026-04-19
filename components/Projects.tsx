"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image, { StaticImageData } from "next/image";
import { projects } from "@/data/projects";
import { useRouter, usePathname } from "next/navigation";
interface card {
  onView?: (id: number) => void;
}
export default function Projects({ onView }: card) {
  const path = usePathname();
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation();
  const projectsdata = projects(t);

  const flagLink = path === "/projects";
  const sliceCategoriesData = !flagLink
    ? projectsdata.slice(0, 3)
    : projectsdata;
  const handleView = async (id: number) => {
    if (flagLink) {
      onView!(id);
    } else router.push(`/project/${id}`);
  };
  return (
    <section ref={ref} className="py-24  bg-linear-to-b from-slate-50 to-white">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("projectsSection.title")}
            <span className="text-teal-600">
              {" "}
              {t("projectsSection.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t("projectsSection.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliceCategoriesData.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  {product.image.slice(0, 1).map((e, i) => (
                    <Image
                      key={i}
                      src={e as StaticImageData}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ))}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 text-center">
                  <h3 className="font-bold text-xl text-slate-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="w-12 h-0.5 bg-teal-600 mx-auto mb-3 transition-all duration-300 group-hover:w-24" />
                  <button
                    onClick={() => {
                      // onView(product.id);
                      handleView(product.id!);
                    }}
                    className="text-teal-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    {t("projectsSection.buttonExplore")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          {!flagLink && (
            <button
              onClick={() => router.push("/projects")}
              className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all hover:shadow-lg hover:scale-105"
            >
              {t("projectsSection.buttonViewAll")}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

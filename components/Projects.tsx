"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image, { StaticImageData } from "next/image";
import { projects } from "@/data/projects";
import { useRouter, usePathname } from "next/navigation";
import Motion from "./Motion";

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
    ? projectsdata.slice(0, 4)
    : projectsdata;

  const handleView = async (id: number) => {
    if (flagLink) {
      onView!(id);
    } else router.push(`/project/${id}`);
  };

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-b from-slate-50 to-white"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Motion className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 sm:mb-4">
            {t("projectsSection.title")}
            <span className="text-teal-600">
              {" "}
              {t("projectsSection.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            {t("projectsSection.description")}
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
          {sliceCategoriesData.map((product, idx) => (
            
            <Motion key={product.id} className="group h-full">
              <div className="flex flex-col h-full cursor-pointer"  onClick={() => handleView(product.id!)}>
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden bg-gray-100">
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

                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-teal-600 text-white text-[10px] sm:text-xs font-semibold rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 text-center flex-1 flex flex-col">
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-slate-800 mb-1 sm:mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="w-10 sm:w-12 h-0.5 bg-teal-600 mx-auto mb-2 sm:mb-3 transition-all duration-300 group-hover:w-16 sm:group-hover:w-24" />

                  <button
                    onClick={() => handleView(product.id!)}
                    className="text-teal-600 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1 group-hover:gap-2 transition-all mt-auto"
                  >
                    {t("projectsSection.buttonExplore")}
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              </div>
            </Motion>
          ))}
        </div>

        {!flagLink && (
          <Motion className="text-center mt-8 sm:mt-10 md:mt-12">
            <button
              onClick={() => router.push("/projects")}
              className="
                bg-teal-600 text-white 
                px-6 sm:px-8 py-2.5 sm:py-3 
                text-sm sm:text-base font-semibold 
                rounded-lg sm:rounded-xl 
                hover:bg-teal-700 
                transition-all duration-300 
                hover:shadow-lg hover:scale-105
                active:scale-95
              "
            >
              {t("projectsSection.buttonViewAll")}
            </button>
          </Motion>
        )}
      </div>
    </section>
  );
}

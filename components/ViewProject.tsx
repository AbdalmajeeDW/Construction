"use client";

import Hero from "@/components/Hero";
import { projects } from "@/data/projects";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const projectByID = projects(t);
  const project = projectByID.find((e) => e.id === Number(params.id));

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            {t('project.notFound')}
          </h2>
          <button
            onClick={() => router.back()}
            className="mt-4 text-teal-600 hover:text-teal-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = Array.isArray(project.image) ? project.image : [project.image];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Hero />

      <section className="py-16 bg-linear-to-b from-slate-50 to-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{t('project.backToProjects')}</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
              <FolderOpen className="w-4 h-4" />
              <span>{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
              {project.name}
            </h1>
            <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div
              onClick={() => openLightbox(0)}
              className="relative aspect-video lg:aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group mb-6 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Image
                src={images[0]}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-4 py-2 rounded-full text-sm transition-all duration-300">
                  {t('project.clickFullscreen')}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {images.slice(1, 7).map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    onClick={() => openLightbox(idx + 1)}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
                  >
                    <Image
                      src={image}
                      alt={`${project.name} - ${idx + 2}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
               {t('project.projectOverview')}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {t('project.textB')} <span className="px-1">
                {project.category.toLowerCase()}
                </span>{t('project.textA')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span>{t('project.completed')}: 2024</span>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-teal-600 to-teal-700 rounded-2xl p-8 shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">{t('project.projectDetails')}</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="opacity-90">{t('project.category')}:</span>
                  <span className="font-semibold">{project.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="opacity-90">
{t('project.totalImages')}:


                  </span>
                  <span className="font-semibold">{images.length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="opacity-90">            {t('project.projectId')}
:</span>
                  <span className="font-semibold">#{project.id}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-teal-400 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-teal-400 transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div
            className="relative w-full max-w-7xl h-full max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentImageIndex]}
              alt={`${project.name} - ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-teal-400 transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </>
  );
}

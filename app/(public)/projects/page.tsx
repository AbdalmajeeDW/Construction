"use client";

import React from "react";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import Image from "next/image";
import project from '../../../public/project.jpg'
export default function ProjectsPage() {
  const router = useRouter();

  const handleView = async (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <div>
      <Hero
        badgeKey="projectsHero.badge"
        titlePrefixKey="projectsHero.titlePrefix"
        titleHighlightKey="projectsHero.titleHighlight"
        titleSuffixKey="projectsHero.titleSuffix"
        descriptionKey="projectsHero.description"
        btnQuoteKey="projectsHero.btnQuote"
        btnGalleryKey="projectsHero.btnGallery"
        statsKeys={[
          "projectsHero.stat1",
          "projectsHero.stat2",
          "projectsHero.stat3",
        ]}
        floatingLabelKey="projectsHero.floatingLabel"
 heroImage={<Image src={project} alt="Contact Us" className="w-full h-auto rounded-2xl" />}      />

      <Projects onView={handleView} />
    </div>
  );
}

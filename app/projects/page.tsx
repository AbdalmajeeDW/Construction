"use client";

import React from "react";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";

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
        heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
      />

      <Projects onView={handleView} />
    </div>
  );
}

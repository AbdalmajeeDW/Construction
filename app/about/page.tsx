import About from "@/components/About";
import Hero from "@/components/Hero";
import React from "react";

export default function AboutPage() {
  return (
    <div>
      <Hero
        badgeKey="aboutHero.badge"
        titlePrefixKey="aboutHero.titlePrefix"
        titleHighlightKey="aboutHero.titleHighlight"
        titleSuffixKey="aboutHero.titleSuffix"
        descriptionKey="aboutHero.description"
        btnQuoteKey="aboutHero.btnQuote"
        btnGalleryKey="aboutHero.btnGallery"
        statsKeys={["aboutHero.stat1", "aboutHero.stat2", "aboutHero.stat3"]}
        floatingLabelKey="aboutHero.floatingLabel"
        heroImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
      />

      <About />
    </div>
  );
}

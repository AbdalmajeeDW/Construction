"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Services";

export default function page() {
  return (
    <section id="categories">
      <Navbar />
      <Hero
        badgeKey="servicesHero.badge"
        titlePrefixKey="servicesHero.titlePrefix"
        titleHighlightKey="servicesHero.titleHighlight"
        titleSuffixKey="servicesHero.titleSuffix"
        descriptionKey="servicesHero.description"
        btnQuoteKey="servicesHero.btnQuote"
        btnGalleryKey="servicesHero.btnGallery"
        statsKeys={[
          "servicesHero.stat1",
          "servicesHero.stat2",
          "servicesHero.stat3",
        ]}
        floatingLabelKey="servicesHero.floatingLabel"
        heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
      />
      <Categories />
    </section>
  );
}

"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Services";
import Image from "next/image";
import services from '../../../public/services.jpg'
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
        heroImage={<Image src={services} alt="Contact Us" className="w-full h-auto rounded-2xl" />}
      />
      <Categories />
    </section>
  );
}

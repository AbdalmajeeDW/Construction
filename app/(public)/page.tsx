// app/(public)/page.tsx
"use client";

import Hero from "@/components/Hero";
import Categories from "@/components/Services";
import FeaturedProducts from "@/components/Projects";
import About from "@/components/About";
import ScrollToTop from "@/components/ScrollToTop";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  return (
    <>
      <ScrollToTop />
      <Hero />
      <section id="categories">
        <Categories />
      </section>
      <section id="featured">
        <FeaturedProducts />
      </section>
      <section id="about">
        <About />
      </section>
    </>
  );
}

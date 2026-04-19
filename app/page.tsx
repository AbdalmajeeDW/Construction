"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Services";
import FeaturedProducts from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
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
      <ContactForm />
      {/* <Footer /> */}
    </main>
  );
}

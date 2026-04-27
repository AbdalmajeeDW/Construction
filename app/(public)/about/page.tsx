import About from "@/components/About";
import Hero from "@/components/Hero";
import Image from "next/image";
import about from '../../../public/about.jpg'
export default function AboutPage() {
  return (
    <div>
      <Hero
      />

      <About />
    </div>
  );
}

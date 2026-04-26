import About from "@/components/About";
import Hero from "@/components/Hero";
import Image from "next/image";
import about from '../../../public/about.jpg'
export default function AboutPage() {
  return (
    <div>
      <Hero
        badgeKey="aboutHero.badge"
        titlePrefixKey="aboutHero.titlePrefix"
        titleHighlightKey="aboutHero.titleHighlight"
        titleSuffixKey="aboutHero.titleSuffix"
        descriptionKey="aboutHero.description"
        statsKeys={["aboutHero.stat1", "aboutHero.stat2", "aboutHero.stat3"]}
        floatingLabelKey="aboutHero.floatingLabel"
        heroImage={<Image src={about} alt="Contact Us" className="w-full h-auto rounded-2xl" />}
      />

      <About />
    </div>
  );
}

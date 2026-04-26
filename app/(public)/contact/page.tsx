import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import contact from '../../../public/contact.jpg'
import Image from "next/image";
export default function page() {
  return (
    <div>
      <Hero
        badgeKey="contactHero.badge"
        titlePrefixKey="contactHero.titlePrefix"
        titleHighlightKey="contactHero.titleHighlight"
        titleSuffixKey="contactHero.titleSuffix"
        descriptionKey="contactHero.description"
        btnQuoteKey="contactHero.btnQuote"
        btnGalleryKey="contactHero.btnGallery"
        statsKeys={[
          "contactHero.stat1",
          "contactHero.stat2",
          "contactHero.stat3",
        ]}
        floatingLabelKey="contactHero.floatingLabel"
        heroImage={
          <Image src={contact} alt="Contact Us" className="w-full h-auto rounded-2xl" />
        }
      />
      <ContactForm />
    </div>
  );
}

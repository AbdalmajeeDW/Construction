"use client";

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import { useRouter } from "next/navigation";
export default function page() {
    const router = useRouter();
  
  const handleView = async (id: number) => {
    router.push(`/service/${id}`);
  };
  return (
    <section id="categories">
      <Hero
 
      />
      <Services onView={handleView}/>
    </section>
  );
}

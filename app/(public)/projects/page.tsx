"use client";

import React from "react";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import Image from "next/image";
import project from '../../../public/project.jpg'
export default function ProjectsPage() {
  const router = useRouter();

  const handleView = async (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <div>
      <Hero
    />

      <Projects onView={handleView} />
    </div>
  );
}

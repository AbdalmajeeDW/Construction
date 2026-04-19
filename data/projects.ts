import { TFunction } from "i18next";
import Painting from "../public/Painting/firstProject/1.jpeg";
import Painting1 from "../public/Painting/firstProject/2.jpeg";
import Painting2 from "../public/Painting/firstProject/3.jpeg";
import Painting3 from "../public/Painting/firstProject/4.jpeg";
import Painting4 from "../public/Painting/firstProject/5.jpeg";
import Painting5 from "../public/Painting/firstProject/6.jpeg";
import Painting6 from "../public/Painting/firstProject/7.jpeg";

import Firstpathroom from "../public/Bathroom/firstProject/1.jpeg";
import Firstpathroom2 from "../public/Bathroom/firstProject/2.jpeg";
import Firstpathroom3 from "../public/Bathroom/firstProject/3.jpeg";
import Firstpathroom4 from "../public/Bathroom/firstProject/4.jpeg";

import Secondpathroom from "../public/Bathroom/secondProject/1.jpeg";
import Secondpathroom2 from "../public/Bathroom/secondProject/2.jpeg";
import Secondpathroom3 from "../public/Bathroom/secondProject/3.jpeg";
import Secondpathroom4 from "../public/Bathroom/secondProject/4.jpeg";
import Secondpathroom5 from "../public/Bathroom/secondProject/5.jpeg";

import FirstFacade from "../public/Facade/firstProject/1.jpeg";
import FirstFacade2 from "../public/Facade/firstProject/2.jpeg";
import FirstFacade3 from "../public/Facade/firstProject/3.jpeg";

import Flooring1 from "../public/Flooring/firstProject/1.jpeg";
import Flooring2 from "../public/Flooring/firstProject/2.jpeg";
import FirstFlooring from "../public/Flooring/firstProject/3.jpeg";
import Flooring4 from "../public/Flooring/firstProject/4.jpeg";
import Flooring3 from "../public/Flooring/firstProject/5.jpeg";
import Flooring6 from "../public/Flooring/firstProject/6.jpeg";
import Flooring7 from "../public/Flooring/firstProject/7.jpeg";
import SecondFlooring from "../public/Flooring/secondProject/1.jpeg";
import SecondFlooring2 from "../public/Flooring/secondProject/2.jpeg";
import SecondFlooring3 from "../public/Flooring/secondProject/3.jpeg";
import SecondFlooring4 from "../public/Flooring/secondProject/4.jpeg";
import SecondFlooring5 from "../public/Flooring/secondProject/5.jpeg";
import SecondFlooring6 from "../public/Flooring/secondProject/6.jpeg";
import SecondFlooring7 from "../public/Flooring/secondProject/7.jpeg";

import { StaticImageData } from "next/image";

interface Project {
  id: number;
  name: string;
  category: string;
  image: StaticImageData[];
  t?: TFunction;
}
export const projects = (t: TFunction): Project[] => [
  {
    id: 1,
    name: t("projectsSection.projects1.name"),
    category: t("projectsSection.projects1.category"),
    image: [
      FirstFlooring,
      Flooring1,
      Flooring2,
      Flooring3,
      Flooring4,
      Flooring6,
      Flooring7,
    ],
  },
  {
    id: 2,
    name: t("projectsSection.projects2.name"),
    category: t("projectsSection.projects2.category"),
    image: [
      SecondFlooring,
      SecondFlooring2,
      SecondFlooring3,
      SecondFlooring4,
      SecondFlooring5,
      SecondFlooring6,
      SecondFlooring7,
    ],
  },

  {
    id: 3,
    name: t("projectsSection.projects3.name"),
    category: t("projectsSection.projects3.category"),
    image: [FirstFacade, FirstFacade2, FirstFacade3],
  },

  {
    id: 4,
    name: t("projectsSection.projects4.name"),
    category: t("projectsSection.projects4.category"),
    image: [
      Painting,
      Painting1,
      Painting2,
      Painting3,
      Painting4,
      Painting5,
      Painting6,
    ],
  },
  {
    id: 5,
    name: t("projectsSection.projects5.name"),
    category: t("projectsSection.projects5.category"),
    image: [Firstpathroom, Firstpathroom2, Firstpathroom3, Firstpathroom4],
  },
  {
    id: 6,
    name: t("projectsSection.projects6.name"),
    category: t("projectsSection.projects6.category"),
    image: [
      Secondpathroom,
      Secondpathroom2,
      Secondpathroom3,
      Secondpathroom4,
      Secondpathroom5,
    ],
  },
];

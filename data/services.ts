import { TFunction } from "i18next";
import {
  DoorOpen,
  Droplets,
  Grid3x3,
  Home,
  Palette,
  Sparkles,
  Thermometer,
  Zap,
} from "lucide-react";
import Firstpathroom from "../public/Bathroom/secondProject/2.jpeg";
import Firstpathroom3 from "../public/Bathroom/secondProject/3.jpeg";
import FirstFlooring from "../public/Flooring/firstProject/3.jpeg";
import Painting from "../public/Painting/firstProject/1.jpeg";

export const categories = (t: TFunction) => [
  {
    id: 1,
    name: t("servicesCard.categories.roughConstruction.name"),
    icon: Home,
    description: t("servicesCard.categories.roughConstruction.description"),
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600",
    subServices: [
      t("servicesCard.categories.roughConstruction.subServices.demolition"),
      t("servicesCard.categories.roughConstruction.subServices.preparatory"),
      t(
        "servicesCard.categories.roughConstruction.subServices.roughConstruction",
      ),
      t("servicesCard.categories.roughConstruction.subServices.masonry"),
      t("servicesCard.categories.roughConstruction.subServices.concrete"),
      t("servicesCard.categories.roughConstruction.subServices.carpentry"),
    ],
  },
  {
    id: 2,
    name: t("servicesCard.categories.electrical.name"),
    icon: Zap,
    description: t("servicesCard.categories.electrical.description"),
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600",
    subServices: [
      t("servicesCard.categories.electrical.subServices.electrical"),
    ],
  },

  {
    id: 3,
    name: t("servicesCard.categories.plumbing.name"),
    icon: Droplets,
    description: t("servicesCard.categories.plumbing.description"),
    image: Firstpathroom,
    subServices: [t("servicesCard.categories.plumbing.subServices.plumbing")],
  },
  {
    id: 4,
    name: t("servicesCard.categories.insulation.name"),
    icon: Thermometer,
    description: t("servicesCard.categories.insulation.description"),
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600",
    subServices: [
      t("servicesCard.categories.insulation.subServices.insulation"),
    ],
  },
  {
    id: 5,
    name: t("servicesCard.categories.finishing.name"),
    icon: Palette,
    description: t("servicesCard.categories.finishing.description"),
    image: Painting,
    subServices: [
      t("servicesCard.categories.finishing.subServices.gypsumWalls"),
      t("servicesCard.categories.finishing.subServices.falseCeilings"),
      t("servicesCard.categories.finishing.subServices.plastering"),
      t("servicesCard.categories.finishing.subServices.painting"),
    ],
  },
  {
    id: 6,
    name: t("servicesCard.categories.flooring.name"),
    icon: Grid3x3,
    description: t("servicesCard.categories.flooring.description"),
    image: FirstFlooring,
    subServices: [
      t("servicesCard.categories.flooring.subServices.flooring"),
      t("servicesCard.categories.flooring.subServices.tiling"),
    ],
  },
  {
    id: 7,
    name: t("servicesCard.categories.installation.name"),
    icon: DoorOpen,
    description: t("servicesCard.categories.installation.description"),
    image: "https://images.unsplash.com/photo-1583845112203-2932996b3b68?w=600",
    subServices: [
      t("servicesCard.categories.installation.subServices.doorsFrames"),
      t("servicesCard.categories.installation.subServices.kitchen"),
      t("servicesCard.categories.installation.subServices.bathroom"),
    ],
  },
  {
    id: 8,
    name: t("servicesCard.categories.delivery.name"),
    icon: Sparkles,
    description: t("servicesCard.categories.delivery.description"),
    image: Firstpathroom3,
    subServices: [
      t("servicesCard.categories.delivery.subServices.finishing"),
      t("servicesCard.categories.delivery.subServices.cleaning"),
    ],
  },
];

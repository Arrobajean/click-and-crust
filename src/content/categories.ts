import type { Category } from "@/lib/types";

export const CATEGORIES: readonly Category[] = [
  {
    id: "panes",
    name: "Panes de masa madre",
    description: "Hogazas de fermentación larga: payés, espelta, centeno, semillas.",
    image: "/images/products/pan-de-semillas-1.webp",
  },
  {
    id: "molde",
    name: "Molde y bocadillo",
    description: "Pan de molde y de hamburguesa para el día a día.",
    image: "/images/products/viena-molde-1.webp",
  },
  {
    id: "bolleria",
    name: "Bollería",
    description: "Croissants, palmeras, donuts y hojaldres de mantequilla.",
    image: "/images/products/croissant-de-mantequilla-1.webp",
  },
  {
    id: "dulces",
    name: "Bizcochos y galletas",
    description: "Magdalenas, galletas, plumcake y bizcocho para llevar.",
    image: "/images/products/plumcake-de-limon-1.webp",
  },
];

export const PHILOSOPHY = {
  title: "Filosofía",
  intro: "Pan hecho con pocos ingredientes y mucho tiempo.",
  sections: [
    {
      title: "Pocos ingredientes",
      text: "Harina, agua, sal y masa madre. Las harinas son de trigo, espelta o centeno según el pan, y varias son ecológicas.",
    },
    {
      title: "Masa madre",
      text: "La mayoría de los panes se leva solo con masa madre propia. Es lo que da al pan su sabor y una miga que no se parece a la de un pan rápido.",
    },
    {
      title: "Tiempo",
      text: "Los panes de masa madre fermentan hasta un día entero antes de entrar al horno. Esa espera no se acorta.",
    },
    {
      title: "Horno de piedra",
      text: "Se cuecen en horno de piedra, que deja una corteza rústica y una miga tierna.",
    },
    {
      title: "Formado a mano",
      text: "Cada pieza se forma a mano. Por eso no hay dos hogazas exactamente iguales.",
    },
  ],
  images: [
    { src: "/images/products/pan-de-payes-1.webp", alt: "Pan de payés sobre un paño de lino" },
    { src: "/images/products/pan-de-pasas-y-nueces-1.webp", alt: "Pan de pasas y nueces con la corteza enharinada" },
  ],
} as const;

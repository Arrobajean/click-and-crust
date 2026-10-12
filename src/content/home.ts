import { LEAD_MINUTES } from "@/lib/slots";

export const HERO = {
  title: "Pan de masa madre, listo cuando llegues.",
  text: "Elige tus panes, reserva una hora de recogida y llega a por ellos sin hacer cola.",
  image: "/images/products/pan-de-espelta-1.webp",
  imageAlt: "Hogaza de pan de espelta sobre un paño de lino",
} as const;

export const STEPS = [
  { verb: "Elige", text: "Panes y bollería de la carta, con el corte y el formato que prefieras." },
  { verb: "Reserva", text: `Escoge día y hora de recogida, con ${LEAD_MINUTES / 60} horas de antelación como mínimo.` },
  { verb: "Recoge", text: "Pasa a tu hora y llévate el pedido preparado, sin cola." },
] as const;

export const PHILOSOPHY_TEASER = {
  title: "Tiempo, masa madre y horno de piedra",
  text: "Harina, agua, sal y masa madre. Cada pieza se forma a mano, fermenta hasta un día entero y se cuece en horno de piedra. No hay atajos.",
  images: [
    { src: "/images/products/pan-de-centeno-1.webp", alt: "Hogaza de centeno con la corteza muy tostada" },
    { src: "/images/products/pan-de-kalamata-1.webp", alt: "Pan con aceitunas kalamata sobre un paño" },
  ],
} as const;

export const CLOSING = {
  title: "Tu pedido, listo a la hora que elijas.",
} as const;

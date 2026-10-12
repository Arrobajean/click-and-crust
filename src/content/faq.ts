import { HORIZON_DAYS, LEAD_MINUTES } from "@/lib/slots";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: readonly FaqItem[] = [
  {
    question: "¿Con cuánta antelación debo reservar?",
    answer: `Al menos ${LEAD_MINUTES / 60} horas antes de la recogida. Puedes reservar hasta ${HORIZON_DAYS} días vista.`,
  },
  {
    question: "¿Cómo se paga?",
    answer: "Esto es una demostración y no se cobra nada. En una tienda real, el pago se haría al recoger.",
  },
  {
    question: "¿Puedo elegir cómo cortan el pan?",
    answer: "Sí. En los panes puedes elegir entre entero y rebanado en la ficha de cada producto.",
  },
  {
    question: "¿Cómo sé si un producto lleva alérgenos?",
    answer: "Cada ficha lista los ingredientes y los alérgenos del producto antes de añadirlo a la cesta.",
  },
  {
    question: "¿Cuánto dura el pan?",
    answer: "Cada ficha explica cómo conservarlo. Un pan grande bien guardado aguanta hasta cinco días en buenas condiciones.",
  },
];

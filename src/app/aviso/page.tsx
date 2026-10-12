import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso sobre esta demo",
  description: "Qué es Click & Crust, qué datos guarda y qué no está cubierto por la licencia del código.",
};

const SECTIONS = [
  {
    title: "Qué es esto",
    paragraphs: [
      "Click & Crust es un proyecto de demostración de una tienda de recogida para una panadería artesanal. No es el sitio de ningún negocio real: los pedidos no se preparan, no se cobran y no se envía ningún correo.",
    ],
  },
  {
    title: "Qué se guarda y dónde",
    paragraphs: [
      "La cesta, el justificante de tus últimos pedidos y el tema claro u oscuro se guardan en el almacenamiento local de tu navegador. No se usan cookies de seguimiento ni analítica.",
      "El servidor recibe el pedido para validarlo y reservar la franja, pero lo conserva solo en memoria: se pierde al reiniciar el servicio.",
    ],
  },
  {
    title: "Fotografías y textos",
    paragraphs: [
      "La licencia MIT del repositorio cubre el código. Las fotografías y los textos de producto no están cubiertos por esa licencia.",
    ],
  },
] as const;

export default function NoticePage() {
  return (
    <div className="container-page grid gap-12 py-12 md:py-20">
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Aviso sobre esta demo</h1>
      <div className="grid max-w-3xl gap-10">
        {SECTIONS.map((section) => (
          <section key={section.title} className="grid gap-3">
            <h2 className="font-display text-2xl font-semibold">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

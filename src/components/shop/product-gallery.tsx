"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  name: string;
  images: readonly string[];
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0] ?? "";

  return (
    <div className="grid gap-3 lg:grid-cols-[84px_1fr] lg:items-start">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-surface-2 lg:order-2">
        <Image
          key={current}
          src={current}
          alt={`${name}, foto ${index + 1} de ${images.length}`}
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="settle object-cover object-bottom"
        />
      </div>

      {images.length > 1 && (
        <ul className="flex gap-2 lg:order-1 lg:flex-col" aria-label="Fotos del producto">
          {images.map((image, position) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setIndex(position)}
                aria-label={`Ver foto ${position + 1}`}
                aria-pressed={position === index}
                className={`relative block size-16 overflow-hidden rounded-[var(--radius-field)] border-2 transition-colors lg:size-[84px] ${position === index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <Image src={image} alt="" fill sizes="84px" className="object-cover object-bottom" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

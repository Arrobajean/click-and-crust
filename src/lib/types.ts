// Tipos compartidos entre cliente y servidor. Sin lógica.

export type CategoryId = "panes" | "molde" | "bolleria" | "dulces";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  /** object-position de la foto al recortarla en horizontal: apunta al producto. */
  imagePosition: string;
}

/** Una forma de comprar el producto: pieza suelta, pack de 3, tarta entera... */
export interface ProductFormat {
  id: string;
  label: string;
  /** Siempre en céntimos: nunca se opera con decimales. */
  priceCents: number;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  images: readonly string[];
  formats: readonly ProductFormat[];
  /** Opciones de corte (p. ej. entero o rebanado). Vacío si no aplica. */
  cuts: readonly string[];
  ingredients: string;
  allergens: readonly string[];
  storage: string;
  pairing: string;
  related: readonly string[];
  featured?: boolean;
}

export interface CartLine {
  slug: string;
  formatId: string;
  cut: string | null;
  quantity: number;
}

export interface Cart {
  lines: readonly CartLine[];
}

/** Línea de cesta con datos de catálogo y precio ya resueltos. */
export interface PricedLine extends CartLine {
  key: string;
  name: string;
  image: string;
  formatLabel: string;
  unitCents: number;
  lineCents: number;
}

export type SlotStatus = "available" | "full" | "too_soon";

export interface Slot {
  time: string;
  status: SlotStatus;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
}

export interface Pickup {
  /** Fecha local de la panadería, AAAA-MM-DD. */
  date: string;
  /** Hora de inicio de la franja, HH:MM. */
  time: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: Customer;
  pickup: Pickup;
  notes: string;
  lines: readonly PricedLine[];
  totalCents: number;
}

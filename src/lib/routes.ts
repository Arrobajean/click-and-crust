import type { CategoryId } from "./types";

/** Todas las rutas salen de aquí: ningún href escrito a mano en los componentes. */
export const ROUTES = {
  home: "/",
  menu: "/carta",
  menuByCategory: (category: CategoryId) => `/carta?categoria=${category}`,
  product: (slug: string) => `/carta/${slug}`,
  cart: "/cesta",
  checkout: "/reservar",
  order: (id: string) => `/pedido/${id}`,
  philosophy: "/filosofia",
  notice: "/aviso",
} as const;

/** Carta con filtros en la URL: ?categoria=...&q=... */
export function menuUrl({ category, query }: { category?: CategoryId | null; query?: string } = {}): string {
  const params = new URLSearchParams();
  if (category) params.set("categoria", category);
  if (query?.trim()) params.set("q", query.trim());
  const search = params.toString();
  return search ? `/carta?${search}` : ROUTES.menu;
}

export const API = {
  orders: "/api/pedidos",
  slots: "/api/franjas",
} as const;

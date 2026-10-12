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

export const API = {
  orders: "/api/pedidos",
  slots: "/api/franjas",
} as const;

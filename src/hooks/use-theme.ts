"use client";

import { useCallback } from "react";
import { THEME_STORAGE_KEY, nextTheme } from "@/lib/theme";

/** Alterna claro/oscuro. El icono se resuelve por CSS a partir de data-theme, sin estado de React. */
export function useTheme() {
  const toggle = useCallback(() => {
    const next = nextTheme(document.documentElement.dataset.theme);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Almacenamiento bloqueado: el cambio vale solo para esta visita.
    }
  }, []);

  return { toggle };
}

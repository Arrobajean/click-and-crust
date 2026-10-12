"use client";

import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre tema claro y oscuro"
      className="grid size-11 place-items-center rounded-full transition-colors hover:bg-surface-2 active:scale-95"
    >
      {/* Se muestra uno u otro por CSS según data-theme: sin estado, sin desajuste de hidratación. */}
      <Sun className="theme-sun" size={20} aria-hidden />
      <Moon className="theme-moon" size={20} aria-hidden />
    </button>
  );
}

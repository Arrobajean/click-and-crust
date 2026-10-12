export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "cc:theme";

/**
 * Se ejecuta en <head> antes de pintar para fijar el tema y evitar el parpadeo.
 * Respeta la elección guardada y, si no hay, la preferencia del sistema.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})()`;

export function nextTheme(current: string | undefined): Theme {
  return current === "light" ? "dark" : "light";
}

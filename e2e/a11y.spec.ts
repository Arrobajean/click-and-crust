import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

const PAGES = [
  ["inicio", "/"],
  ["carta", "/carta"],
  ["ficha", "/carta/pan-de-payes"],
  ["ficha con formatos", "/carta/palmera-de-mantequilla"],
  ["cesta vacía", "/cesta"],
  ["reserva sin cesta", "/reservar"],
  ["filosofía", "/filosofia"],
  ["aviso", "/aviso"],
  ["404", "/no-existe"],
] as const;

for (const theme of ["dark", "light"] as const) {
  test.describe(`accesibilidad (WCAG 2.1 AA) con tema ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((value) => localStorage.setItem("cc:theme", value), theme);
    });

    for (const [name, path] of PAGES) {
      test(name, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const summary = results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(" | ")}`);
        expect(summary).toEqual([]);
      });
    }
  });
}

test("con la cesta llena, la reserva también cumple", async ({ page }) => {
  await page.goto("/carta/pan-de-payes");
  await page.getByRole("button", { name: "Añadir a la cesta" }).click();
  await page.goto("/reservar");
  await expect(page.getByRole("heading", { name: "Tu pedido" })).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations.map((violation) => violation.id)).toEqual([]);
});

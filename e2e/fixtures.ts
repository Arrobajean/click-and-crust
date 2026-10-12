import { expect, test as base, type APIRequestContext, type Page } from "@playwright/test";

let counter = 0;
// La API limita por IP (6 pedidos cada 10 min): cada test simula la suya.
const uniqueIp = () => `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${(counter += 1) % 250 || 1}`;

export const test = base.extend<{ api: APIRequestContext }>({
  context: async ({ context }, provide) => {
    await context.setExtraHTTPHeaders({ "x-forwarded-for": uniqueIp() });
    await provide(context);
  },
  api: async ({ playwright, baseURL }, provide) => {
    const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: { "x-forwarded-for": uniqueIp() } });
    await provide(api);
    await api.dispose();
  },
});

export { expect };

/** Añade un producto con las opciones por defecto desde su ficha. */
export async function addProduct(page: Page, slug: string, quantity = 1) {
  await page.goto(`/carta/${slug}`);
  for (let index = 1; index < quantity; index += 1) await page.getByRole("button", { name: "Añadir una unidad" }).click();
  await page.getByRole("button", { name: "Añadir a la cesta" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Añadido" })).toBeVisible();
}

/** Elige un día (el segundo disponible, para no depender de la hora actual) y la franja `nth` entre las libres. */
export async function pickPickup(page: Page, nth = 0) {
  const date = page.getByLabel("Día", { exact: true });
  await expect(date.locator("option")).not.toHaveCount(1); // los días se calculan tras hidratar
  const value = await date.locator("option").nth(2).getAttribute("value");
  await date.selectOption(value ?? "");

  const free = page.getByRole("group", { name: "Hora" }).locator("label:has(input:not([disabled]))");
  await expect(free.first()).toBeVisible();
  await free.nth(nth).click();
}

export async function fillCustomer(page: Page) {
  await page.getByLabel("Nombre", { exact: true }).fill("Marta Ibáñez");
  await page.getByLabel("Teléfono").fill("612 345 678");
  await page.getByLabel("Correo").fill("marta@example.com");
}

import { addProduct, expect, fillCustomer, pickPickup, test } from "./fixtures";

test.describe("compra de principio a fin", () => {
  test("carta, ficha, cesta, reserva y confirmación", async ({ page }) => {
    // Carta: filtrar por categoría y abrir una ficha.
    await page.goto("/carta");
    await page.getByRole("link", { name: /^Bollería/ }).click();
    await expect(page.getByTestId("results-count")).toHaveText("8 productos");
    await page.getByRole("link", { name: /Palmera de Mantequilla/ }).click();

    // Ficha: formato y cantidad cambian el total en vivo.
    await page.locator("label", { hasText: "Pack 3 uds" }).click();
    await expect(page.getByLabel(/Pack 3 uds/)).toBeChecked();
    await page.getByRole("button", { name: "Añadir una unidad" }).click();
    await page.getByRole("button", { name: "Añadir a la cesta" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Añadido" })).toBeVisible();
    await expect(page.getByTestId("cart-count")).toHaveText("2");

    // Cesta: 2 packs de 3 a 7,50 EUR.
    await page.getByRole("link", { name: "Ir a la cesta" }).click();
    await expect(page.getByTestId("cart-line")).toHaveCount(1);
    await expect(page.getByTestId("cart-total")).toContainText("15,00");

    // Reserva.
    await page.getByRole("link", { name: "Reservar recogida" }).click();
    await fillCustomer(page);
    await pickPickup(page, 0);
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Confirmar reserva" }).click();

    // Confirmación: número de pedido, total y cesta vaciada.
    await expect(page).toHaveURL(/\/pedido\/CC-[A-Z2-9]{6}$/);
    await expect(page.getByRole("heading", { name: "Reserva registrada" })).toBeVisible();
    await expect(page.getByTestId("order-total")).toContainText("15,00");
    await expect(page.getByTestId("cart-count")).toHaveCount(0);

    // El justificante sobrevive a una recarga (vive en el navegador).
    const id = await page.getByTestId("order-id").textContent();
    await page.reload();
    await expect(page.getByTestId("order-id")).toHaveText(id ?? "");
  });

  test("un pedido de otro navegador no se encuentra", async ({ page }) => {
    await page.goto("/pedido/CC-ZZZZZZ");
    await expect(page.getByTestId("receipt-missing")).toBeVisible();
  });
});

test.describe("carta", () => {
  test("la búsqueda ignora tildes y mayúsculas, y vacía muestra una salida", async ({ page }) => {
    await page.goto("/carta");
    await page.getByLabel("Buscar en la carta").fill("ESPELTA");
    await expect(page).toHaveURL(/q=ESPELTA/);
    await expect(page.getByRole("link", { name: /Pan de Espelta/ })).toBeVisible();

    await page.getByLabel("Buscar en la carta").fill("zzzz");
    await expect(page.getByTestId("empty-results")).toBeVisible();
    await page.getByRole("link", { name: "Quitar filtros" }).click();
    await expect(page.getByTestId("results-count")).toHaveText("28 productos");
  });

  test("una ficha inexistente muestra la página 404", async ({ page }) => {
    const response = await page.goto("/carta/no-existe");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Esta página no existe" })).toBeVisible();
  });
});

test.describe("cesta", () => {
  test("se conserva al recargar y se puede vaciar", async ({ page }) => {
    await addProduct(page, "pan-de-payes", 2);
    await page.goto("/cesta");
    await expect(page.getByTestId("cart-total")).toContainText("9,98");

    await page.reload();
    await expect(page.getByTestId("cart-line")).toHaveCount(1);

    await page.getByRole("button", { name: "Quitar Pan de Payés" }).click();
    await expect(page.getByTestId("empty-cart")).toBeVisible();
  });

  test("bajar la cantidad a cero no existe: el mínimo es 1 y quitar es explícito", async ({ page }) => {
    await addProduct(page, "pan-de-payes");
    await page.goto("/cesta");
    await expect(page.getByRole("button", { name: "Quitar una unidad" })).toBeDisabled();
  });

  test("datos corruptos en el almacenamiento no rompen la página", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("cc:cart:v1", "{esto no es json"));
    await page.goto("/cesta");
    await expect(page.getByTestId("empty-cart")).toBeVisible();
  });
});

test.describe("reserva", () => {
  test("sin cesta no hay nada que reservar", async ({ page }) => {
    await page.goto("/reservar");
    await expect(page.getByRole("heading", { name: "No hay nada que reservar" })).toBeVisible();
  });

  test("enviar vacío muestra todos los errores y lleva el foco al primero", async ({ page }) => {
    await addProduct(page, "pan-de-payes");
    await page.goto("/reservar");
    await page.getByRole("button", { name: "Confirmar reserva" }).click();

    await expect(page.getByText("Escribe tu nombre.")).toBeVisible();
    await expect(page.getByText(/teléfono válido/)).toBeVisible();
    await expect(page.getByText(/correo válido/)).toBeVisible();
    await expect(page.getByText("Elige un día de recogida.")).toBeVisible();
    await expect(page.getByText("Debes aceptar para continuar.")).toBeVisible();
    await expect(page.getByLabel("Nombre", { exact: true })).toBeFocused();
  });

  test("corregir un campo elimina su error", async ({ page }) => {
    await addProduct(page, "pan-de-payes");
    await page.goto("/reservar");
    await page.getByRole("button", { name: "Confirmar reserva" }).click();
    await expect(page.getByText("Escribe tu nombre.")).toBeVisible();

    await page.getByLabel("Nombre", { exact: true }).fill("Marta");
    await expect(page.getByText("Escribe tu nombre.")).toHaveCount(0);
  });

  test("cambiar de día reinicia la hora elegida", async ({ page }) => {
    await addProduct(page, "pan-de-payes");
    await page.goto("/reservar");
    await pickPickup(page, 0);
    await expect(page.getByRole("group", { name: "Hora" }).locator("input:checked")).toHaveCount(1);

    const days = page.getByLabel("Día", { exact: true });
    await days.selectOption({ index: 3 });
    await expect(page.getByRole("group", { name: "Hora" }).locator("input:checked")).toHaveCount(0);
  });

  test("si falla la carga de franjas se puede reintentar", async ({ page }) => {
    await addProduct(page, "pan-de-payes");
    await page.goto("/reservar");

    let calls = 0;
    await page.route("**/api/franjas*", (route) => (calls++ === 0 ? route.abort() : route.continue()));
    await page.getByLabel("Día", { exact: true }).selectOption({ index: 2 });

    await expect(page.getByRole("alert").filter({ hasText: "No hay conexión" })).toBeVisible();
    await page.getByRole("button", { name: "Reintentar" }).click();
    await expect(page.getByRole("group", { name: "Hora" })).toBeVisible();
  });
});

test.describe("tema", () => {
  test("el selector cambia y recuerda el tema", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const before = await html.getAttribute("data-theme");

    await page.getByRole("button", { name: "Cambiar entre tema claro y oscuro" }).click();
    const after = await html.getAttribute("data-theme");
    expect(after).not.toBe(before);

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", after ?? "");
  });
});

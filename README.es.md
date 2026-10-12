# Click & Crust

> English version: [README.md](README.md)

Tienda de recogida para una panadería artesanal: consultas la carta, montas una cesta y reservas una franja para recoger. Es un **proyecto de demostración, no un negocio real**: los pedidos no se preparan, no se cobran y no se envían por correo.

**Demo en vivo:** aún sin desplegar. Ejecútalo en local (ver [Cómo ejecutarlo](#cómo-ejecutarlo)).

![Portada](docs/img/home.webp)

## Qué demuestra

- **El servidor nunca se fía de los precios del cliente.** La cesta solo envía identificadores y cantidades. `POST /api/pedidos` rechaza campos desconocidos (un `price` en el cuerpo es un 400, no se ignora), recalcula cada línea desde el catálogo y rechaza el pedido entero si una línea no es válida.
- **Franjas de recogida con reglas reales.** Horario por día de la semana, franjas de 30 minutos, 3 horas de antelación, 14 días de horizonte y 8 pedidos por franja, todo evaluado en la zona horaria de la panadería (`Europe/Madrid`) y no en la del servidor. Con pruebas en torno a medianoche y al cambio de hora de octubre.
- **Estado sin efectos.** La cesta y los justificantes viven en `localStorage`, se validan con zod al leerlos y se exponen con `useSyncExternalStore`. Sin hidratación por `useEffect`, sin parpadeo de cesta vacía, y un almacenamiento corrupto vuelve a vacío en lugar de romper la página.
- **Lógica separada de la interfaz.** Funciones puras en `src/lib`, estado en `src/hooks`, presentación en `src/components`. Ningún componente llama a `fetch`; hay un solo cliente de API.
- **Accesibilidad como test, no como afirmación.** axe revisa 9 páginas en los dos temas, en escritorio y móvil, con WCAG 2.1 AA y buenas prácticas, y la suite falla ante cualquier violación.
- **Contenido como datos tipados.** Los 28 productos están en `src/content`. Un test comprueba que existe cada foto, que los slugs son únicos, que los precios son enteros positivos y que los productos relacionados existen (detectó dos productos que se recomendaban a sí mismos).

## Calidad

| Qué | Cómo | Cantidad |
|---|---|---|
| Tests unitarios y de rutas | Vitest | 152 en 16 ficheros |
| End-to-end, contrato de la API y accesibilidad | Playwright + axe | 60 |
| Tipos | `tsc --noEmit`, `strict` + `noUncheckedIndexedAccess` | limpio |
| Lint | ESLint 9, `next/core-web-vitals` | limpio |

La CI (`.github/workflows/ci.yml`) ejecuta lint, tipos, tests unitarios, build y Playwright en cada push y pull request.

### Rendimiento medido

Lighthouse 12.8.2, emulación móvil con throttling simulado, build de producción servido en local (`next start`, sin CDN), mediana de 3 pasadas (5 en la carta), 12-10-2026.

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Portada | 93 | 100 | 100 | 100 | 3,2 s | 0 | 53 ms |
| Carta | 92 | 100 | 100 | 100 | 3,3 s | 0 | 47 ms |
| Ficha | 93 | 100 | 100 | 100 | 3,3 s | 0 | 50 ms |

Son datos de laboratorio en localhost. Un sitio desplegado tras una CDN dará otros números, y los datos de usuarios reales dirían más que todo esto.

## Limitaciones conocidas

- **Los pedidos no son duraderos.** Viven en la memoria del servidor, y la página de confirmación lee un justificante del navegador que hizo el pedido.
- **La comprobación de aforo no es atómica.** Dos peticiones simultáneas pueden pasarla a la vez. Una base de datos real necesita una transacción en `OrderRepository.save`; está documentado en la interfaz.
- **Sin pagos, correos ni gestión de pedidos.** No hay vista de pedidos entrantes para la panadería.
- **Sin festivos.** El horario es solo semanal.
- **Solo en español**, con precios en euros.
- **El reloj del cliente solo se usa para listar los días.** El servidor revalida cada franja con el suyo.

## Cómo ejecutarlo

```bash
pnpm install
cp .env.example .env.local   # opcional: fija la URL pública para las etiquetas SEO
pnpm dev                     # http://localhost:3000
```

Scripts: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build && pnpm test:e2e` y `pnpm images` (convierte los originales de `images-src/`, no versionados, a WebP).

## Sobre este repositorio

Es una reescritura desde cero de un prototipo anterior. No se conservó nada de su código; el contenido de producto y las fotografías se trasladaron y se limpiaron. El historial de aquí es el historial real de la construcción.

## Licencia

El código es MIT (ver [LICENSE](LICENSE)). Las fotografías y los textos de producto de `public/images` y `src/content/products.ts` **no** están cubiertos por esa licencia.

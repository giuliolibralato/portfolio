# PRD — Portafolio personal (Product Designer)

> Estado: v0.3 · 2026-11-09 · Referencias: Darina Usanova (principal), Andrei Alikimovich (principal), Charles Honig, Billy Sweeney.

## 1. Objetivo
Un portafolio que un reclutador o design lead entienda en **< 30 s** (quién soy, qué hago, en qué soy fuerte) y que permita profundizar en **3–5 casos** con impacto medible.

## 2. Usuarios
| Usuario | Qué busca | Tiempo que da |
|---|---|---|
| Reclutador | Rol, seniority, empresa actual, CV | 15–30 s |
| Design lead / director | Proceso, decisiones, craft | 3–8 min por caso |
| PM / Engineer | Colaboración, impacto, cómo se construyó | 2–4 min |

## 3. Principios (sacados del análisis)
1. **Una columna, texto primero** (Darina, Aliki): bio corta arriba, sin hero gigante.
2. **El título del caso es un logro**, no un nombre de proyecto (Aliki: "redesigned an entire product in six weeks").
3. **Metadatos visibles** en cada caso: Empresa · Rol · Año · Scope · Status (Darina, Charles).
4. **Números grandes al final o arriba** del caso (Darina: 93% / 86% / −35%; Charles: bloque "Impact").
5. **Pestañas por tipo de trabajo:** `selected · cases · websites · apps · passion projects · visual`, con contador; un tab vacío no se muestra (cambio del 2026-11-09).
6. **Foco por audiencia** (Billy: selector "For anyone / Recruiters / Design Directors…") → base para elegir casos según el foco de cada aplicación.

## 4. Alcance MVP
### Páginas
- `/` Home, una sola página con secciones: **intro** (avatar, nombre, rol, bio, intro por audiencia, CTA, links) · **work** (7 tabs) · **experience** · **references** · **resume** (descarga PDF EN/ES) · **contact**.
- `/work/[slug]` Caso de estudio (plantilla única, ver §5).
- No hay `/playground` ni `/about`: viven como tabs y secciones del home.

### Navegación
- Desktop: barra lateral izquierda con wordmark, secciones, switch de tema y `en · es` (Billy).
- Móvil: barra superior con wordmark y menú.

### Componentes del home
- Tarjeta de caso: imagen/mock + título-logro + 1 frase + fila meta. 2 columnas en desktop, 1 en móvil.
- Tab `visual`: pila de tarjetas (Card Swap) + lista con enlaces directos a Behance.
- Tarjetas sin chip de estado (shipped/concept): solo tipo y año.
- CTA de contacto: `let's talk` + copiar email + "open to full-time roles and freelance projects".
- References: citas reales de otras personas, con permiso.
- Footer vivo: ciudad + hora local + "last updated" (Darina).

### Fuera de alcance MVP
- "Ask AI"/chat sobre el portafolio (Aliki *andreiGPT*, Charles *Ask AI*) → v2.
- (Movido al MVP el 2026-11-09: modo oscuro con toggle; el tema sigue al sistema. Ver DESIGN.md §2.)
- (Movido al MVP el 2026-11-09: toggle Full / TL;DR e índice sticky en casos. Ver DESIGN.md §6–7.)

## 5. Plantilla de caso de estudio
Orden fijo, cada sección opcional salvo las marcadas (*):
1. `← Index` (*)
2. Título-logro + 1 frase de contexto (*)
3. Tabla meta: Scope · Team · Role · Status · Año (*)
4. **Challenge** — problema + restricción (ej. "teníamos 2 semanas") (*)
5. **My role** — qué hice yo exactamente (*)
6. Research / hipótesis (lista numerada)
7. Decisiones de diseño: cada una = subtítulo-acción + 2–3 líneas + imagen con caption
8. Lo que descartamos / pospusimos (Darina "Defer the Learning Center")
9. **Results** — 2–4 métricas grandes (*)
10. **Learnings** — 2–3 frases
11. Navegación al siguiente caso / lista de casos (Aliki repite el índice al final)

Navegación interna: índice lateral sticky en desktop solo si el caso tiene > 6 secciones (Charles).

## 6. Sistema de "foco" (para fase 2)
Cada caso lleva tags en su frontmatter:
```yaml
focus: [b2b-saas, ai, design-systems, 0-to-1, growth, mobile]
seniority_signal: [ownership, leadership, craft, research]
```
El home puede filtrarse/ordenarse por `?focus=ai` para mandar un link distinto según la vacante.

## 7. Stack sugerido
- Next.js (App Router) o Astro + MDX para casos (contenido en archivos, fácil de editar).
- Deploy: Vercel.
- Analytics ligero (Vercel Analytics / Plausible).
- SEO con la API de metadata de Next.js (ver §12).

## 8. Métricas de éxito
- Lighthouse ≥ 95 en Performance y Accesibilidad.
- LCP < 2 s en 4G.
- % de visitas que abren ≥ 1 caso.
- Clicks en CV / email.

## 9. Hitos
| # | Entregable | Estimado |
|---|---|---|
| 1 | Elegir 3–5 casos + redactar con la plantilla §5 | 1–2 semanas (lo más largo) |
| 2 | Tokens + home estático | 1 día |
| 3 | Plantilla de caso en MDX | 1 día |
| 4 | Playground + responsive + a11y | 1 día |
| 5 | Deploy + dominio | 2 h |

## 10. Idiomas (decidido 2026-11-06)
- Sitio bilingüe **EN / ES**. Inglés por defecto.
- Rutas: `/en/...` y `/es/...`; selector `EN · ES` en la nav, recuerda la elección.
- Cada caso es un MDX por idioma (`case.en.mdx`, `case.es.mdx`) con el mismo `slug` y frontmatter.
- Si falta la traducción de un caso, se muestra en inglés con aviso "Disponible solo en inglés".

## 11. Tipos de proyecto
| Tab | Qué va | Formato |
|---|---|---|
| selected | Selección de lo mejor (3–5) | Tarjeta → caso |
| cases | Casos de estudio completos | Tarjeta → caso |
| websites | Sitios web | Tarjeta → link o caso corto |
| apps | Apps móviles y apps hechas con IA | Tarjeta → demo, link o caso corto |
| passion projects | Proyectos propios | Tarjeta → caso corto (estilo Aliki) |
| visual | Logos, identidades y piezas de campaña | Card Swap + lista; cada pieza enlaza a su proyecto en Behance |

Campo nuevo en el frontmatter: `tab: [cases, websites, apps, passion, logos, design]` y `featured: true` para que aparezca en `work`.


### 11.1 Embed de Figma en casos
- Componente `FigmaEmbed` para mostrar pantallas o prototipos interactivos dentro de un caso (zoom, arrastrar, navegar), como en Behance.
- Usa el embed oficial de Figma (`https://embed.figma.com/proto/<file>?node-id=…&embed-host=gslo`) en un `iframe`.
- **Carga al hacer clic:** primero se ve una imagen estática con el botón "open interactive prototype". El iframe pesa varios MB y frena la página si carga solo.
- Siempre lleva un link "open in Figma" debajo y un `title` accesible.
- El archivo de Figma debe estar compartido como "anyone with the link can view" y **sin nombres ni colores de clientes**: se usa una copia anónima, nunca el archivo de trabajo.
- Máximo 1–2 embeds por caso. En móvil, solo imagen + link.

### 11.2 Pruebas técnicas de empresas
- Se pueden incluir si: (1) la prueba no pedía confidencialidad ni cedía los derechos, (2) se quita la marca de la empresa o se pide permiso, y (3) se etiquetan como `design challenge` (no como trabajo con cliente ni como lanzado).
- No incluir pruebas de procesos que siguen abiertos.
- Máximo 1 en el home; el resto en `cases` con su etiqueta.

### 11.3 Proyecto Konecta (landings)
- Una tarjeta en `websites` que abre un panel con la lista de landings (links externos) y 1–2 capturas por landing.
- Sin datos de campañas ni marcas de clientes que no sean públicas.

## 12. SEO
Objetivo: que aparezca al buscar "giulio libralato", "product designer lima" o "ux/ui designer peru", y que el link se vea bien al compartirlo.

| Pieza | Qué |
|---|---|
| Metadata por página | `title` (≤ 60 caracteres) y `description` (≤ 155) por idioma. Home: "Giulio Libralato · Product Designer". Caso: título-logro. |
| Idiomas | `hreflang` en / es / x-default en cada página; `<html lang>` correcto. |
| URL canónica | Una por página; `?focus=` y `?tab=` apuntan a la URL limpia. |
| Datos estructurados | JSON-LD `Person` en el home (nombre, rol, ciudad, `sameAs` LinkedIn y GitHub). `CreativeWork` o `Article` en cada caso. |
| Compartir | Open Graph + Twitter card con imagen 1200 × 630 (DESIGN.md §10.1). Generada con `next/og`. |
| Archivos | `sitemap.xml` y `robots.txt` generados por Next.js. |
| Contenido | Texto real en HTML (no dentro de imágenes); `alt` en todas las imágenes; casos en MDX que se renderizan en el servidor. |
| Rendimiento | Lighthouse ≥ 95 en Performance, Accessibility y Best Practices; **100 en SEO**. |
| Después del deploy | Alta en Google Search Console; enviar el sitemap. |

## 13. Preguntas abiertas
- ¿Foco principal de la búsqueda (industria / tipo de rol)?
- ¿Qué proyectos tienen métricas reales disponibles?
- ¿Qué proyectos de Designli se pueden mostrar públicamente (NDA)?

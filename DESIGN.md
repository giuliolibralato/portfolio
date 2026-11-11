# DESIGN.md — Portafolio Giulio Libralato

> v1.4 · 2026-11-11 · Base: tokens de **shadcn/ui** (Tailwind v4) con neutros **Slate**.
> Referencias: **Darina** (tamaño de texto, jerarquía, contenido centrado, tarjetas) · **Billy** (menú lateral, wordmark simple, intro por audiencia, referencias) · **Charles** (índice sticky, TL;DR) · **Aliki** (títulos-logro).
> Decisiones cerradas: acento **azul iOS** · neutros **Slate** · **Geist + DM Mono** · títulos y labels en **minúsculas** · menú en **barra lateral izquierda** · contenido centrado en **2 columnas** en desktop · 7 tabs · íconos **Hugeicons** · micro-interacciones de **React Bits**.
> Versión navegable: https://claude.ai/artifact/41VwnstPWq3D3VBhT8hWUL

---

## 1. Principios
1. **Texto primero, tamaño contenido.** Casi todo el texto mide 15 px (Darina). La jerarquía sale del peso y del color, no del tamaño. Solo el nombre y los títulos crecen.
2. **Un solo acento.** El azul aparece en links, foco, highlight, estado activo, el switch y la aurora del home. Nunca como bloque sólido grande.
3. **Movimiento que se nota poco.** Fades y desplazamientos de 4–8 px. Las micro-interacciones (segmento, select, tooltip) son la única parte "elástica" y duran menos de 350 ms.
4. **Escaneable en 1–3 min.** Cada caso tiene que entenderse leyendo solo el TL;DR (criterio de portfolio-checker).
5. **Mismo diseño en claro y oscuro.** Ningún componente tiene colores sueltos; todo sale de tokens.
6. **El efecto no tapa el contenido.** Aurora, cursor y video se apagan con `prefers-reduced-motion`, en touch y dentro de los casos.

---

## 2. Color

Nombres de tokens = shadcn. Neutros = **Slate de Tailwind**. Acento, rojo y verde = paleta de sistema de **iOS** (más clara e intensa).

### Light
| Token shadcn | Slate | Hex | Uso |
|---|---|---|---|
| `--background` | white | `#FFFFFF` | Página |
| `--foreground` | 900 | `#0F172A` | Texto principal (17.9:1) |
| `--card` | 50 | `#F8FAFC` | Contenedor de portadas e imágenes |
| `--muted` | 100 | `#F1F5F9` | Pista del segmento, chips, filas meta, callout |
| `--muted-foreground` | 600 | `#475569` | Texto secundario, captions, meta (7.6:1 en blanco, 6.9:1 en `--muted`) |
| `--border` / `--input` | 200 | `#E2E8F0` | Divisores |
| `--primary` | 900 | `#0F172A` | Botón principal (oscuro, no azul) |
| `--primary-foreground` | white | `#FFFFFF` | |
| `--secondary` / `--accent` | 100 | `#F1F5F9` | Botón secundario, hover de fila |
| `--brand` | iOS blue | `#007AFF` | **Sin texto:** switch encendido, punto activo, foco, íconos, aurora (4.0:1 en blanco, pasa 3:1) |
| `--brand-text` | iOS blue oscurecido | `#0064D2` | **Texto:** links, ítem activo del menú, highlight (5.6:1 en blanco, 5.1:1 en `--muted`) |
| `--brand-soft` | | `rgb(0 122 255 / 0.10)` | Fondo del highlight inline |
| `--ring` | iOS blue | `#007AFF` | Foco |
| `--status-done` | iOS green (accesible) | `#248A3D` | Glifo de Status Mark "shipped" (4.4:1, glifo) |
| `--destructive` | iOS red oscurecido | `#E5241B` | Errores (4.6:1) |
| `--aurora-1/2/3` | | `#9CCBFF` · `#64D2FF` · `#99F6E4` | Solo la aurora del home (azul + celeste + un toque de teal) |

Slate-500 (`#64748B`) **no** se usa para texto: sobre `--muted` da 4.3:1 y no llega a AA.
El azul iOS puro (`#007AFF`) **no** se usa para texto de 15 px: da 4.0:1. Para texto va `--brand-text`.

### Dark
| Token | Slate | Hex |
|---|---|---|
| `--background` | 950 | `#020617` |
| `--foreground` | 100 | `#F1F5F9` (18.4:1) |
| `--card` | 900 | `#0F172A` |
| `--muted` / `--secondary` / `--accent` | 800 | `#1E293B` |
| `--muted-foreground` | 400 | `#94A3B8` (7.9:1 en fondo, 5.7:1 en `--muted`) |
| `--border` / `--input` | 800 | `#1E293B` |
| `--primary` | 100 | `#F1F5F9` |
| `--primary-foreground` | 950 | `#020617` |
| `--brand` / `--ring` | iOS blue dark | `#0A84FF` (5.5:1) |
| `--brand-text` | iOS blue accesible | `#409CFF` |
| `--brand-soft` | | `rgb(10 132 255 / 0.18)` |
| `--status-done` | iOS green dark | `#30D158` (10:1) |
| `--destructive` | iOS red dark | `#FF453A` (5.9:1) |
| `--aurora-1/2/3` | | `#0A84FF` · `#64D2FF` · `#2DD4BF` |

### Reglas
- Portadas e imágenes de casos sobre `--card`; en dark el mock no se invierte.
- Colores de marca de clientes: **no aparecen**. Los mocks usan la paleta neutral de las copias en `anon/`.
- Cambio de tema: `background-color`, `color` y `border-color` con transición de 200 ms (`--ease-out`).

---

## 3. Tipografía
- **Sans:** Geist (400, 500, 600). **Mono:** **DM Mono** (400, 500), más redonda que Geist Mono. Se usa poco: números de métricas, keycaps y hora local. La fila meta pasa a sans.
- Alternativa de mono si DM Mono no convence: JetBrains Mono. Cambia una sola variable (`--font-mono`).
- **Minúsculas** en menú, tabs, labels, títulos de sección y títulos de caso ("cut 60 destinations into one sidebar"). Se respetan siglas y nombres propios (AI, B2B, Lima). Párrafos en frase normal.
- `text-wrap: balance` en títulos, `pretty` en párrafos.

Escala al estilo Darina: un tamaño base y la jerarquía por peso y color.

| Rol | Tamaño / interlineado | Peso | Color | Uso |
|---|---|---|---|---|
| `display` | 32 / 36 (móvil 28 / 32) | 600 · -0.02em | foreground | Nombre en el home y título de caso |
| `h1` | 24 / 32 | 600 · -0.01em | foreground | Títulos de sección: work, experience, references |
| `title` | 15 / 22 | 500 | foreground | Título de tarjeta, subtítulo de decisión, wordmark |
| `body` | 15 / 22 | 400 | foreground | Bio, párrafos, descripción de tarjeta |
| `body` muted | 15 / 22 | 400 | muted-foreground | Rol bajo el nombre, links de contacto, menú inactivo, tabs inactivos |
| `small` | 13 / 18 | 400 | muted-foreground | Fila meta, captions, footer |
| `metric` (mono) | 40 / 44 (móvil 32) | 500 · -0.02em | foreground | Números grandes, `tabular-nums` |

Ancho de lectura: máx. 600 px en párrafos.

---

## 4. Espaciado, layout y radios

### Escala (Tailwind, base 4 px)
`1=4 · 2=8 · 3=12 · 4=16 · 6=24 · 8=32 · 12=48 · 16=64 · 24=96`

### Layout
| Token | Valor |
|---|---|
| `--rail` | **200 px**. Barra lateral izquierda fija (Billy), solo ≥ 1024 |
| `--col` | **600 px**. Bio y párrafos (Darina) |
| `--col-wide` | **920 px**. Contenedor centrado del home; la grilla de tarjetas usa 2 columnas |
| `--col-media` | 840 px. Imágenes de caso |
| `--toc` | 180 px. Índice del caso; en desktop vive dentro de la barra lateral |
| Gutter | `max(16px, env(safe-area-inset-*))` móvil · 24 px tablet · 32 px entre columnas |
| Padding superior | 64 px móvil · 96 px desktop |

El contenido se centra en el espacio que queda a la derecha de la barra. La bio no se estira: se queda en `--col` alineada a la izquierda del contenedor.

### Breakpoints (Tailwind)
| Nombre | Ancho | Qué cambia |
|---|---|---|
| base | < 640 | Una columna. Barra superior con wordmark y botón de menú. Métricas apiladas |
| `sm` | ≥ 640 | Métricas en fila de 2–3 |
| `md` | ≥ 768 | Tarjetas en **2 columnas**. Gutter 24 px |
| `lg` | ≥ 1024 | Aparece la **barra lateral**; desaparece la barra superior |
| `xl` | ≥ 1280 | Solo más aire; nada se ensancha |

### Radios (shadcn `--radius: 0.75rem`)
`sm 6 px` chips · `md 8 px` botones, inputs · `lg 12 px` tarjetas e imágenes (Darina) · `full` avatar, pills de tabs, switch.

### Espaciado vertical
- Home: bio → tabs 48 px · filas de tarjetas 48 px · entre secciones 96 px.
- Caso: entre secciones 64 px · título → texto 8 px · texto → imagen 24 px · imagen → caption 8 px.

---

### 4.1 Grilla del home (2026-11-11, desde Claude Design)
- Contenido centrado de **880 px** (816 px útiles + 32 px de padding a cada lado), a la derecha de la barra lateral.
- **12 columnas de ~38.7 px con gutter de 32 px.** Tarjetas = 6 + 6. Bio = 9 columnas (~600 px). Etiquetas de experience y resume = 3 columnas (180 px).
- Portadas de tarjeta en 16:10. Al pasar el mouse: zoom 3.5 % del mockup, marco azul tipo selección de Figma, con 6–8 px de margen, en `--brand` (#007AFF); las tarjetas no muestran medida.
- **Cursor propio en toda la página**, estilo multiplayer de Figma: flecha + etiqueta "visitor" / "visitante" según el idioma; sobre tarjetas cambia a "view case" / "ver caso" o "visit ↗" / "visitar ↗". El visitante elige el color (azul, morado, rosa, naranja, verde, grafito) desde un tercer botón redondo en la barra lateral. En touch se usa el cursor nativo. En producción: guardar el color en `localStorage` y respetar `prefers-reduced-motion`.
- Pie de la barra lateral: tres botones redondos de 40 px solo con ícono (color del cursor, sol/luna para el tema, globo para el idioma), como los de Billy.
- Foto de la intro 76 × 76.
- Contact: dos columnas como Billy; a la izquierda estado + frase + filas de contacto, a la derecha la foto cuadrada.
- Aurora apagada por defecto (prueba de look más clásico).
- **Entrada (estilo Billy + Darina):** portada a pantalla completa "giulio libralato / —product designer" (40–96 px). A los 1.1 s sube y sale en 1.5 s (`cubic-bezier(0.33,0,0.2,1)`). Mientras sube, los bloques de la intro aparecen en cascada: fade + 8 px, 380 ms, `cubic-bezier(0.32,0.72,0,1)`, 90 ms entre bloques (foto, nombre, rol, estado, bio, links, tabs, tarjetas). La foto entra con escala 0.6 → 1 y blur. La barra lateral aparece con fade de 1 s y 0.75 s de retraso. Sin portada con reduced-motion.
- **Intro tipo Darina:** foto 76 × 76 (marco "img" y badge de medida afuera), nombre 20/28 500, rol 16/24 muted, bio 15/24 con 8 px entre párrafos, links en una fila separados por " · ".
- **Títulos de sección** 20/28 500, con el link de la sección alineado a la derecha en `brand-text`.
- **Movimiento (review-animations):** hover de tarjetas 300 ms y solo con mouse; pila de visual 400 ms sin rebote, oscurecida con capa de opacidad; popovers con `@starting-style` (150 ms, escala 0.97 desde su botón); botones con `:active` 0.97; tema 200 ms; reduced-motion mantiene fundidos.
- **Aviso legal** debajo del footer (EN/ES): trabajo de cliente con fines de portafolio, derechos de Designli, Konecta y sus clientes, datos cambiados.
- Copia de trabajo del canvas: `design-canvas/Main.dc.html`. Cursores en SVG: `assets/cursors/`.

## 5. Movimiento

### Tokens
| Token | Valor | De dónde |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.33, 0, 0.2, 1)` | Billy (nav y header) |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Salidas |
| `--dur-1` | 150 ms | Hover, color |
| `--dur-2` | 300 ms | Text appear por letra, tabs |
| `--dur-3` | 600 ms | Fade de bloques al entrar |
| `--dur-4` | 1000 ms | Nav y footer al cargar (Billy) |
| `--stagger-char` | 10 ms | Por letra (Billy) |
| `--stagger-word` | 30 ms | Por palabra |
| `--stagger-block` | 60 ms | Entre bloques/tarjetas |

### Coreografía
| Momento | Qué pasa |
|---|---|
| **Carga del home** | 1) Nombre `display`: letras aparecen con opacity 0→1 y `translateX(4px)→0`, 300 ms, +10 ms por letra. 2) Bio: fade + `translateY(8px)→0`, 600 ms, delay 200 ms. 3) Nav y footer: fade 1 s, delay 750 ms. |
| **Scroll** | Cada tarjeta/sección entra con fade + `translateY(8px)`, 600 ms, una sola vez, stagger 60 ms. El estado en reposo es visible: si JS falla, todo se ve. |
| **Tabs del home** | Rubber Segment: el pulgar se estira hacia el destino y se asienta (≈300 ms); contenido hace cross-fade 200 ms sin salto de altura. |
| **Aurora (solo home)** | Cortina azul en los primeros ~320 px del área de contenido, detrás de la nav. Máscara radial: se desvanece a `--background` en los cuatro bordes, sin límite visible. Entra con fade de 1 s junto con la nav. Velocidad 0.4, amplitud 0.6. Se pausa fuera de pantalla. |
| **Cursor sobre un caso** | Target Cursor: 4 esquinas se ajustan a la portada en 200 ms y aparece la etiqueta "View case". Fuera de las tarjetas, cursor normal. |
| **Portada en video** | Reproduce al entrar en pantalla (o en hover en desktop), sin sonido, en loop. Pausa al salir. |
| **Switch de tema** | Squish Switch: el pulgar se alarga con la velocidad y se aplasta al llegar. Los colores cruzan en 320 ms. |
| **Logos y Design** | Card Swap: la tarjeta del frente pasa atrás cada 4 s, o al arrastrarla. Pausa en hover. |
| **Tooltips** | Warm Tooltip: el primero espera 400 ms; los vecinos abren al instante durante 300 ms. |
| **Select** | Glide Select: el menú crece desde su esquina (180 ms) y el resaltado se desliza entre filas (220 ms). |
| **Hover tarjeta** | Imagen `scale(1.015)` 300 ms; título → `--brand`; flecha `→` se mueve 4 px. |
| **Hover link** | Subrayado de 1 px crece de izquierda a derecha 150 ms. |
| **Cambio de tema** | Colores transicionan 200 ms; ícono sol/luna rota 90° y hace fade 150 ms. |
| **Cambio de idioma** | Texto hace fade 150 ms; no hay recarga visible. |
| **Navegación entre páginas** | View Transitions API: fade 200 ms; la imagen de la tarjeta hace morph al hero del caso (si el navegador lo soporta). |
| **Índice del caso** | El ítem activo cambia color a `--brand` y una barra de 2 px se desliza 200 ms. |
| **Métricas** | Contador de 0 al valor, 800 ms, `--ease-out`, solo la primera vez que entran en pantalla. |

### Reglas
- `prefers-reduced-motion: reduce` → sin desplazamientos ni stagger; solo fades de 150 ms. Contadores muestran el valor final. Aurora = un frame estático. Videos = póster. Target Cursor no se monta. Card Swap = grilla fija sin autoplay.
- Touch (`pointer: coarse`) → Target Cursor no se monta; tooltips no existen (los íconos llevan `aria-label`).
- Nada se anima más de una vez por visita.
- Implementación: CSS + `IntersectionObserver`. Los componentes de React Bits traen su propia animación (ver §6.1).

---

## 6. Componentes

Base: shadcn/ui. Ajustes indicados.

| Componente | Base shadcn | Ajustes |
|---|---|---|
| **Barra lateral** | — (custom) | (Billy) Fija a la izquierda, 200 px, ≥ 1024. Arriba: wordmark `giulio libralato` en `title`. Centro: `intro · work · experience · references · resume · contact`, 15 px, inactivo `--muted-foreground`, activo `--foreground`; sigue el scroll. Abajo, lado a lado y en vertical: switch de tema y `en · es`. Sin borde ni fondo. En un caso, la lista se cambia por el índice del caso. |
| **Barra superior (móvil)** | `Sheet` | < 1024: wordmark a la izquierda, botón de menú (Hugeicons `Menu01Icon`) a la derecha. Abre un panel con la misma lista, el switch y el idioma. |
| **Switch de tema** | React Bits **Squish Switch** | **Vertical**, 24 × 44 px. Sol arriba = claro, luna abajo = oscuro (Hugeicons). `aria-label="dark mode"`. |
| **Switch idioma** | Segmento vertical (custom) | `en` arriba, `es` abajo, al lado del switch de tema. En móvil va dentro del menú. |
| **Intro por audiencia** | React Bits **Glide Select** | (Billy) En la bio: "portfolio for `anyone ▾`" con `anyone · recruiters · design leads · PMs · engineers`. Cambia el segundo párrafo de la bio y el orden de los casos. Selección única. |
| **CTA de contacto** | `Button` | En la bio y en la sección contact. Principal: `let's talk` (abre email). Secundario: `copy email`. Encima, línea de disponibilidad con punto `--status-done`: "open to full-time roles and freelance projects". |
| **Tabs home** | React Bits **Rubber Segment** `md` | 7 opciones: `work · cases · websites · apps · passion projects · logos · design`. En móvil la fila hace scroll horizontal. La elección va en la URL (`?tab=`). |
| **Tarjeta de caso** | `Card` | Sin borde. Portada (video o mockup, §6.2) en `--card` radio 12 px, clase `.cursor-target`. Debajo: título `title`, 1–2 líneas `body`, fila `small` con estado · tipo · año. En ≥ 768 van 2 por fila. Toda la tarjeta es un solo link. |
| **Pila de piezas** | React Bits **Card Swap** | Solo en los tabs `logos` y `design`: piezas que no necesitan caso. Cada tarjeta = imagen sobre `--card` + nombre + año. Debajo de la pila, la lista completa en texto. |
| **Chip de tipo** | `Badge` outline | 12 px: `impact week`, `solution lab`, `delivery`. |
| **Estado del caso** | React Bits **Status Mark** | `Shipped` = done · `In progress` = running · `Concept` = pending. Siempre con la palabra al lado. Declara el tipo de caso (portfolio-checker lo pide). |
| **Selector de audiencia** | React Bits **Glide Select** | En la bio (idea de Billy): `For anyone · Recruiters · Design leads · PMs · Engineers`. Cambia el orden de casos y una línea de la bio. Es de selección única. |
| **Tooltip** | React Bits **Warm Tooltip** | En botones de ícono: copiar email, descargar CV, LinkedIn. Fondo `--foreground`, texto `--background`. |
| **Cursor de caso** | React Bits **Target Cursor** | Solo sobre `.cursor-target` (portadas con caso o link). Etiqueta "view case". |
| **Aurora** | React Bits **Aurora** | Solo en el home, arriba. Colores `--aurora-1/2/3`. |
| **Tabla meta del caso** | — | Grid 2 col: label `small` 96 px + valor. Filas: Role · Team · Timeline · Scope · Status. |
| **TL;DR / Full** | React Bits **Rubber Segment** `sm` | Arriba del caso. TL;DR muestra: problema, rol, 3 decisiones, resultado, aprendizaje. Recuerda la elección en `localStorage`. |
| **Índice del caso** | — | ≥ 1024, dentro de la barra lateral, debajo de `← work`. 15 px, activo en `--foreground`. Oculto en TL;DR. |
| **Highlight inline** | — | `background: --brand-soft`, radio 4 px, padding 0 4 px (Darina "two weeks"). |
| **Imagen con caption** | — | Contenedor `--card` radio 12 px. Caption `small` `--muted-foreground`. Click → lightbox (`Dialog`). |
| **Antes / después** | `Tabs` o slider | Para Camino de Vida y Keyway. |
| **Métrica** | — | Número `metric` + label `small`. Fila de 2–4. Si es estimado: etiqueta "estimado" (no inventar medidas). |
| **Callout de decisión** | `Alert` | Fondo `--muted`, radio 12 px, sin borde lateral. Tres filas con label `small`: `Decision` · `Because` · `Ruled out`. |
| **Next case** | — | Al pie: siguiente caso + lista completa (Aliki). |
| **Experience / resume** | — | Lista: empresa · rol · años · ciudad + 1 frase de logro. Al final, botón `download resume` (PDF, EN y ES) con ícono Hugeicons `Download01Icon`. |
| **References** | — | (Billy) Citas de otras personas: 2–4 líneas, nombre, cargo y relación ("PM on the same team"). 2 columnas en desktop. Solo citas reales y con permiso; si no hay, la sección no se publica. Link a las recomendaciones de LinkedIn. |
| **Contact** | — | Última sección: frase corta + CTA + LinkedIn. |
| **Footer** | — | `Lima · 3:42 pm · last updated nov 2026` en `small`. |
| **Botón** | `Button` | `default` oscuro, `secondary`, `ghost`, `link` (`--brand-text`). Altura 36 px, radio 8 px. |
| **Íconos** | **Hugeicons** (`@hugeicons/react`, set free, stroke) | 18 px en botones, 16 px en línea. Trazo 1.5. Siempre con `aria-label` o texto. |

### 6.1 Componentes de React Bits
Se instalan con el CLI de shadcn (copian el código al repo, se pueden editar). Todos reciben colores por props: se pasan los tokens, nunca hex sueltos.

| Componente | Dónde | Props clave | Dependencia | Se apaga cuando |
|---|---|---|---|---|
| **Aurora** | Home, primeros ~320 px | `colorStops` = aurora-1/2/3 · `amplitude 0.6` · `blend 0.6` · `height 0.35` · `speed 0.4` · `glow 0.4` · modo claro activo en light | `ogl` (WebGL) | reduced-motion (frame fijo), fuera de pantalla, casos |
| **Squish Switch** | Tema claro/oscuro | `trackColor` border · `trackOnColor` brand · `width 24` · `height 44` (el pulgar viaja en Y) · `colorDuration 320` | `motion` | reduced-motion: sin estirar |
| **Card Swap** | Tabs logos y design | `width 360` · `height 270` · `visibleCards 3` · `delay 4000` · `skewAmount 4` · `cardRadius 12` · `theme` según tema · `pauseOnHover` | `gsap` | reduced-motion: grilla fija |
| **Rubber Segment** | Tabs home (7), TL;DR/Full, en·es | `trackColor` muted · `thumbColor` background · `radius 10` · `inset 3` | — | reduced-motion: salto sin estirar |
| **Glide Select** | Intro por audiencia; "Ir a sección" en móvil | `surfaceColor` muted · `highlightColor` border · `size lg` en móvil (44 px) | `@hugeicons/react` | — |
| **Warm Tooltip** | Íconos de nav y footer | `delay 400` · `warmWindow 300` · `surfaceColor` foreground · `inkColor` background | — | touch |
| **Status Mark** | Estado del caso en tarjeta y tabla meta | `status` · `label` · `doneColor` status-done · `color` currentColor · `size 16` | — | reduced-motion: sin giro |
| **Target Cursor** | Portadas con caso o link | `targetSelector ".cursor-target"` · `cursorColor` foreground · `hideDefaultCursor false` · `spinDuration 0` · etiqueta "View case" | `gsap` | touch, reduced-motion, teclado |

Ajuste necesario en **Target Cursor**: por defecto reemplaza el cursor en toda la página. Aquí solo se muestra mientras el puntero está sobre una portada (como Darina).

### 6.2 Portadas de proyecto
| Tipo | Cuándo | Especificación |
|---|---|---|
| **Video corto** (Screen Studio o Cursorful) | El caso tiene prototipo que funciona: Beacon, Keyway, apps propias | 6–10 s, loop, sin audio, 16:10, 1680×1050. Un solo flujo por video (el del título del caso). Fondo liso `--card`, sin wallpaper ni sombra grande. Export MP4 (H.264) + WebM, ≤ 1.5 MB, más póster AVIF. |
| **Mockup simple** | No hay prototipo o el valor es estático: Camino de Vida (antes/después del menú) | Captura dentro de un marco de navegador o teléfono de 1 px `--border`, sobre `--card`, padding 24–32 px. |

- Se graba **siempre desde las copias en `anon/`**, nunca desde el prototipo original.
- El zoom automático de Screen Studio se usa máximo 1 vez por video. El cursor se ve.
- `<video muted playsinline loop preload="none" poster>`; se carga al acercarse a pantalla. Con reduced-motion se queda el póster.
- Cursorful es gratis (extensión de Chrome). Screen Studio es de pago (Mac). Cualquiera sirve si se respeta la especificación.

### 6.3 Layout del home (Darina centrado + barra de Billy)
```
≥ 1024
┌ rail 200 ──────┬──────────── contenido centrado, máx 920 ────────────┐
│ giulio         │ [aurora ~320 px detrás]                             │
│ libralato      │ avatar                                              │
│                │ giulio libralato            (display)               │
│                │ product designer            (body muted)            │
│ intro          │ bio 2 párrafos, máx 600 px                          │
│ work           │ portfolio for [anyone ▾]                            │
│ experience     │ ● open to roles and freelance   [let's talk] [copy] │
│ references     │ linkedin · resume · email                           │
│ resume         │                                                     │
│ contact        │ (work)(cases)(websites)(apps)(passion)(logos)(design)│
│                │ ┌ tarjeta ┐ ┌ tarjeta ┐   ← 2 columnas              │
│                │ └─────────┘ └─────────┘                             │
│ ☀  en          │ experience · references (2 col) · resume · contact  │
│ ◯  es          │ footer                                              │
└────────────────┴─────────────────────────────────────────────────────┘

< 1024: barra superior (wordmark + menú). Todo en una columna.
```

### 6.4 Qué muestra cada tab
| Tab | Contenido | Formato |
|---|---|---|
| `work` | Selección de lo mejor de todos los tipos (3–5 piezas) | Tarjeta de caso, 2 columnas |
| `cases` | Casos de estudio completos | Tarjeta de caso, 2 columnas |
| `websites` | Sitios web | Tarjeta con mockup de navegador; link al sitio o caso corto |
| `apps` | Apps móviles y apps hechas con IA | Tarjeta con mockup de teléfono o video |
| `passion projects` | Proyectos propios | Tarjeta; caso corto |
| `logos` | Logos | **Card Swap** + lista |
| `design` | Diseño visual, piezas sueltas | **Card Swap** + lista |

Un tab sin contenido no se muestra.

---

## 7. Plantilla de caso (Darina + Charles)

```
← work                                   [ tl;dr | full ]
Chip tipo · Chip programa
H1 título-logro
1 frase de contexto
Tabla meta: Role · Team · Timeline · Scope · Status
Imagen hero
──────────────
Challenge         (problema + restricción)
My role           (qué hice yo / qué hizo el equipo)
Research          (método, con quién, hallazgos numerados)
Decisions         (3–5 callouts: decisión · porque · alternativa)
What we deferred  (lo que no entró y por qué)
Validation        (cómo se probó: test, review con cliente, criterios)
Results           (métricas o resultados cualitativos; "estimado" si aplica)
Learnings         (2–3 frases)
──────────────
next case → · all work
```

---

## 8. Responsive
- Diseñar primero a 390 px. Probar en 390, 768, 1024, 1440.
- La barra lateral no existe bajo 1024: se cambia por la barra superior con menú.
- Tarjetas: 1 columna < 768, 2 columnas ≥ 768. References igual.
- Tabs: scroll horizontal con el tab activo siempre a la vista.
- Card Swap en móvil: 280 × 210, se puede arrastrar.
- El índice del caso no existe en móvil: se reemplaza por un `Select` "Ir a sección" arriba del caso.
- Métricas: 1 columna < 640, fila ≥ 640.
- Imágenes con `sizes` correctos y formato AVIF/WebP; nada causa scroll horizontal.
- Áreas táctiles ≥ 44 px en móvil.

---

## 9. Accesibilidad
- Contraste AA verificado: `--muted-foreground` 7.6:1 (light) · 7.9:1 (dark); `--brand-text` 5.6:1 en blanco y 5.1:1 sobre `--muted`. `--brand` (#007AFF) da 4.0:1: solo para elementos sin texto.
- La barra lateral es un `<nav>` con `aria-current` en la sección activa. Link "skip to content" al inicio.
- Card Swap: cada tarjeta es alcanzable con teclado y la lista de texto de abajo repite todo su contenido.
- El texto nunca va encima de la aurora sin un fondo: el nombre y la bio empiezan donde la aurora ya se desvaneció, o llevan `--background` detrás.
- Foco visible: `outline 2px --ring`, offset 2 px. El Target Cursor no reemplaza el foco de teclado.
- Tabs, toggles, select e índice con roles ARIA y teclado (flechas).
- Status Mark siempre con texto; el color no es la única señal.
- `alt` descriptivo en cada imagen; los videos de portada llevan `aria-label` con lo que muestran.
- `lang="en"` / `lang="es"` según ruta.

---

## 10. Implementación (tokens en Tailwind v4)
```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --radius: 0.75rem;
  --background:#FFFFFF; --foreground:#0F172A;
  --card:#F8FAFC; --card-foreground:#0F172A;
  --muted:#F1F5F9; --muted-foreground:#475569;
  --border:#E2E8F0; --input:#E2E8F0;
  --primary:#0F172A; --primary-foreground:#FFFFFF;
  --secondary:#F1F5F9; --secondary-foreground:#0F172A;
  --accent:#F1F5F9; --accent-foreground:#0F172A;
  --brand:#007AFF; --brand-text:#0064D2; --brand-soft:rgb(0 122 255 / .10);
  --ring:#007AFF; --destructive:#E5241B; --status-done:#248A3D;
  --aurora-1:#9CCBFF; --aurora-2:#64D2FF; --aurora-3:#99F6E4;
  --ease-out:cubic-bezier(.33,0,.2,1); --ease-in:cubic-bezier(.4,0,1,1);
}
.dark {
  --background:#020617; --foreground:#F1F5F9;
  --card:#0F172A; --card-foreground:#F1F5F9;
  --muted:#1E293B; --muted-foreground:#94A3B8;
  --border:#1E293B; --input:#1E293B;
  --primary:#F1F5F9; --primary-foreground:#020617;
  --secondary:#1E293B; --secondary-foreground:#F1F5F9;
  --accent:#1E293B; --accent-foreground:#F1F5F9;
  --brand:#0A84FF; --brand-text:#409CFF; --brand-soft:rgb(10 132 255 / .18);
  --ring:#0A84FF; --destructive:#FF453A; --status-done:#30D158;
  --aurora-1:#0A84FF; --aurora-2:#64D2FF; --aurora-3:#2DD4BF;
}
@theme inline {
  --color-background:var(--background); --color-foreground:var(--foreground);
  --color-card:var(--card); --color-muted:var(--muted); --color-muted-foreground:var(--muted-foreground);
  --color-border:var(--border); --color-primary:var(--primary); --color-brand:var(--brand);
  --color-brand-text:var(--brand-text); --color-brand-soft:var(--brand-soft); --color-ring:var(--ring);
  --font-sans:"Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono:"DM Mono", ui-monospace, monospace;
  --radius-sm:6px; --radius-md:8px; --radius-lg:12px;
}
```
Los hex son los de Slate; en código también valen `var(--color-slate-900)`, etc.
Tema: script en `<head>` lee `localStorage.theme` o `prefers-color-scheme` y pone `.dark` antes de pintar (sin flash).

---

### 10.1 SEO (cómo se ve en buscadores y al compartir)
- Un `<h1>` por página: el nombre en el home, el título-logro en cada caso. Secciones en `<h2>`.
- Imagen para compartir (Open Graph) de 1200 × 630: fondo `--background`, aurora suave, nombre y rol en Geist 600, minúsculas. Una por caso con su título-logro y la portada.
- Todas las imágenes con `alt` que describe la pantalla, no "image".
- Fuentes con `display=swap` y portadas en AVIF/WebP con tamaño fijo para no mover el layout.

## 11. No hacer
- Hero a pantalla completa, partículas, más de un efecto de fondo.
- Header horizontal en desktop. El menú vive en la barra lateral.
- Texto base más grande que 15 px. MAYÚSCULAS en títulos o labels.
- Aurora en casos. Aurora con colores fuera de `--aurora-*`. Aurora con borde recto visible.
- Azul `--brand` puro en texto de 15 px (usar `--brand-text`). Azul como bloque sólido grande.
- Cursor custom fuera de las portadas.
- Card Swap para casos, websites o apps: esos necesitan título y contexto visibles.
- Videos de portada con audio, wallpaper de colores o más de un flujo.
- Callouts con barra de color a la izquierda.
- Referencias inventadas o sin permiso de la persona.
- Párrafos de más de 4 líneas en casos.
- Títulos de caso con el nombre del cliente. Siempre logro + verbo.
- Métricas sin fuente o presentadas como medidas cuando son estimadas.

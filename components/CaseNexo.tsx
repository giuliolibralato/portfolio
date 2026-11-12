"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { Crop, Frame, Pane, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("nexo");
const Img = ({ src, alt, className }: { src: string; alt: string; className?: string }) => <Crop src={`${IMG}/${src}`} alt={alt} className={className} />;

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <img className="cover-shot" src={`${IMG}/hero.webp`} alt={es ? "El hero de nexosummit.pe: fecha, sede, modalidad y precio desde el primer vistazo" : "The nexosummit.pe hero: date, venue, format and price at first glance"} />;

  const enasei = (
    <Frame className="rows" caption={es ? "La landing de ENASEI 2025, hecha antes de que yo entrara: foto genérica de la ciudad, mucho texto y una grilla larga de sponsors." : "The ENASEI 2025 landing, made before I joined: a stock city photo, dense text and a long sponsor grid."}>
      <Pane label={es ? "antes · landing de enasei 2025" : "before · the enasei 2025 landing"}><Img src="enasei.webp" alt={es ? "Landing de ENASEI 2025: hero con la ciudad, ejes temáticos, speakers, programa y sponsors" : "ENASEI 2025 landing: city hero, themes, speakers, programme and sponsors"} /></Pane>
    </Frame>
  );

  const transition = (
    <Frame className="rows" caption={es ? "Mi propuesta de landing de transición, en la línea de ENASEI como pidió el cliente: misma excelencia, mayor impacto. Su historia terminó dentro de la home del sitio nuevo." : "My transition landing proposal, kept in ENASEI's look as the client asked: same excellence, more impact. Its story ended up inside the new site's home."}>
      <Pane label={es ? "propuesta · landing de transición" : "proposal · transition landing"}><Img src="transition.webp" alt={es ? "ENASEI ahora es Nexo Summit: fecha, sede, video y la evolución" : "ENASEI is now Nexo Summit: date, venue, video and the evolution"} /></Pane>
    </Frame>
  );

  const hero = (
    <Frame className="cols-wide" caption={es ? "Qué es, cuándo, dónde, en qué formato y desde cuánto: todo antes del primer scroll, en escritorio y en el teléfono." : "What it is, when, where, in what format and from how much: all before the first scroll, on desktop and on the phone."}>
      <Pane accent label={es ? "escritorio" : "desktop"}><Img src="hero.webp" alt={es ? "Hero de Nexo Summit 2026 en escritorio" : "Nexo Summit 2026 hero on desktop"} /></Pane>
      <Pane label={es ? "teléfono" : "phone"}><Img src="mobile.webp" alt={es ? "Hero de Nexo Summit 2026 en el teléfono" : "Nexo Summit 2026 hero on the phone"} /></Pane>
    </Frame>
  );

  const pages = (
    <Frame className="cols-2" caption={es ? "Cuatro subpáginas con la misma cabecera: cada una profundiza lo que la home solo adelanta." : "Four subpages with the same header: each one goes deeper on what the home only previews."}>
      <Pane label="speakers"><Img src="page-speakers.webp" alt="Speakers" /></Pane>
      <Pane label="agenda"><Img src="page-agenda.webp" alt="Agenda" /></Pane>
      <Pane label={es ? "sede" : "venue"}><Img src="page-sede.webp" alt={es ? "Sede" : "Venue"} /></Pane>
      <Pane label="sponsors"><Img src="page-sponsors.webp" alt="Sponsors" /></Pane>
    </Frame>
  );

  const tickets = (
    <Frame className="rows" caption={es ? "VIP al centro, Ejecutiva al lado y los asociados derivados a una conversación, porque su tarifa se cierra con contacto." : "VIP in the middle, Executive beside it, and associates routed to a conversation, because their rate is closed by contact."}>
      <Pane accent label={es ? "entradas" : "tickets"}><Img src="tickets.webp" alt={es ? "Tres opciones: Ejecutiva S/1,600, VIP S/2,800 y Asociados" : "Three options: Executive S/1,600, VIP S/2,800 and Associates"} /></Pane>
    </Frame>
  );

  const sponsors = (
    <Frame className="rows" caption={es ? "Cada categoría en su bloque y en carrusel: logos de formatos muy distintos, ordenados sin pelearse por espacio." : "Each tier in its own block and carousel: logos of very different shapes, in order without fighting for space."}>
      <Pane label="sponsors"><Img src="sponsors.webp" alt={es ? "Main partner y gold partners en bloques" : "Main partner and gold partners in blocks"} /></Pane>
    </Frame>
  );

  const plugins = (
    <Frame className="cols-2" caption={es ? "Speakers y agenda son plugins propios: el cliente los edita desde WordPress sin tocar el diseño." : "Speakers and agenda are my own plugins: the client edits them from WordPress without touching the design."}>
      <Pane label={es ? "plugin de speakers" : "speakers plugin"}><Img src="experts.webp" alt={es ? "Carrusel de speakers con bandera y cargo" : "Speakers carousel with flag and role"} /></Pane>
      <Pane label={es ? "plugin de agenda" : "agenda plugin"}><Img src="agenda.webp" alt={es ? "Agenda de dos días por bloques" : "Two-day agenda in blocks"} /></Pane>
    </Frame>
  );

  const wires = (
    <Frame className="rows" caption={es ? "Wireframes de media fidelidad de las cinco páginas, escritos como PRD y generados en Figma Make antes de aplicar la marca." : "Mid-fidelity wireframes of the five pages, written as a PRD and generated in Figma Make before the brand went on."}>
      <Pane label="wireframes"><Img src="wireframes.webp" alt={es ? "Wireframes de home, speakers, agenda, sede y sponsors" : "Wireframes of home, speakers, agenda, venue and sponsors"} /></Pane>
    </Frame>
  );

  const boards = (
    <Frame className="cols-2" caption={es ? "El tablero de trabajo, con marca, piezas de redes, fotos de speakers y logos ordenados antes de las páginas, y el moodboard de sitios de conferencias que se presentó al cliente." : "The working board, with brand, social pieces, speaker photos and logos sorted before the pages, and the moodboard of conference sites shown to the client."}>
      <Pane label={es ? "wip · el tablero" : "wip · the board"}><Img src="wip.webp" alt={es ? "Tablero de trabajo en Figma con exploraciones, piezas y pantallas" : "Figma working board with explorations, pieces and screens"} /></Pane>
      <Pane label="moodboard"><Img src="mood.webp" alt={es ? "Moodboard de sitios de conferencias: hero, speakers, agenda, entradas, sponsors y sede" : "Moodboard of conference sites: hero, speakers, agenda, tickets, sponsors and venue"} /></Pane>
    </Frame>
  );

  const buy = (
    <Frame className="cols-2" caption={es ? "El modal de compra del plugin, con datos ficticios: entradas y asistentes, facturación, resumen con IGV y paso a Mercado Pago." : "The plugin's purchase modal, with fictional data: tickets and attendees, billing, a summary with tax, and the hand-off to Mercado Pago."}>
      <Pane accent label={es ? "1 · entradas y asistentes" : "1 · tickets and attendees"}><Img src="buy-1.webp" alt={es ? "Paso 1: Ejecutiva y VIP en la misma compra, cada asistente en un panel plegable" : "Step 1: Executive and VIP in one purchase, each attendee in a collapsible panel"} /></Pane>
      <Pane label={es ? "2 · facturación" : "2 · billing"}><Img src="buy-2.webp" alt={es ? "Paso 2: datos del comprador, boleta o factura, RUC y razón social solo con factura" : "Step 2: buyer details, receipt or invoice, tax ID only for invoices"} /></Pane>
      <Pane label={es ? "3 · pago" : "3 · payment"}><Img src="buy-3.webp" alt={es ? "Paso 3: resumen con subtotal, IGV y total, Mercado Pago y términos" : "Step 3: summary with subtotal, tax and total, Mercado Pago and terms"} /></Pane>
      <Pane label={es ? "listo · al checkout" : "done · to checkout"}><Img src="buy-4.webp" alt={es ? "Confirmación: las entradas están en el carrito, sigue el pago con Mercado Pago" : "Confirmation: tickets are in the cart, payment continues with Mercado Pago"} /></Pane>
    </Frame>
  );

  const system = (
    <Frame className="rows" caption={es ? "El sistema salió del manual de marca y de los referentes: color por proporción de superficie, Bebas Neue solo para titulares y DM Sans para todo lo demás, en tokens para shadcn." : "The system came from the brand manual and the references: color by share of surface, Bebas Neue only for headlines and DM Sans for everything else, as tokens for shadcn."}>
      <Pane label={es ? "design system" : "design system"}><Img src="system.webp" alt={es ? "Colores por superficie (60% cream y blanco, 20% coral, 12% navy, 8% secundarios) y la escala tipográfica" : "Color by surface (60% cream and white, 20% coral, 12% navy, 8% secondary) and the type scale"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["Descubrir", "sitio previo, marca, benchmark"], ["Definir", "PRD, UX writing, tokens"], ["Prototipar", "Figma Make y Figma"], ["Aprobar", "textos y concepto UI"], ["Construir", "widgets por componente"], ["Productizar", "plugins administrables"], ["Endurecer", "logs, auditoría, recuperación"]]
    : [["Discover", "old site, brand, benchmark"], ["Define", "PRD, UX writing, tokens"], ["Prototype", "Figma Make and Figma"], ["Approve", "texts and UI concept"], ["Build", "widgets, one component at a time"], ["Productize", "client-editable plugins"], ["Harden", "logs, audits, recovery"]]} />;

  const tools: [string, string?][] = [["Figma", "figma"], ["Figma Make", "figma"], ["WordPress", "wordpress"], ["Elementor", "elementor"], ["WooCommerce", "woocommerce"], ["Mercado Pago", "mercadopago"], ["Claude Code", "claude"], ["Claude", "claude"], ["Rank Math"]];

  if (!es) return {
    project: "Nexo Summit — case study",
    subtitle: "from ENASEI to Nexo Summit, in one site",
    tldr: "ENASEI, the Peruvian real-estate sector's yearly conference, became Nexo Summit after its guilds merged into CODIP. As a freelancer I designed and built the change, {{from the design system to ticket sales}}: discovery, UX writing, tokens, wireframes in Figma Make, five pages in WordPress and my own plugins for speakers, agenda, FAQ and tickets with Mercado Pago. It launched on 6 July with ticket sales open, and I kept it running through the event in September.",
    meta: [
      ["client", "CODIP · Confederation of Real Estate Developers of Peru"],
      ["role", "Freelance product designer and developer: UX/UI in Figma, build in WordPress and Elementor, SEO and plugins"],
      ["team", "CODIP's marketing and communications team, their hosting provider, and me"],
      ["timeline", "June–September 2026 · launched on 6 July, event on 9–10 September"],
      ["scope", "Five pages, a transition landing proposal and four plugins (speakers, agenda, FAQ, tickets)"],
      ["status", "Live at nexosummit.pe; the old ENASEI domain redirects to it"],
    ],
    tools,
    site: { href: "https://nexosummit.pe", label: "visit the website" },
    chips: ["case study", "website", "freelance", "live"], okChip: 3,
    cover,
    challenge: {
      intro: "The event was taking a new name, and the old site wasn't ready to carry it:",
      list: ["dense text and little visual impact, with a stock skyline as the hero", "dozens of sponsor logos of every shape in one long grid", "speaker photos with different backgrounds, crops and quality", "a lot of information to read fast: two days of agenda, dozens of speakers, three ticket types", "tickets had to sell online, with VIP, Executive and a CODIP affiliate rate that needs a conversation"],
      end: "And there was a {{fixed launch date, 6 July}}, with a domain move in the middle.",
      fig: enasei,
    },
    role: "{{I designed and built it end to end}}: discovery, UX writing, design tokens, wireframes, the UI in Figma, the build in WordPress with Elementor, SEO, and four plugins of my own, coded with Claude Code and refined in conversation with Claude. CODIP's team owned the content, the brand manual and the approvals; their hosting provider gave server access.",
    research: {
      items: ["An audit of the previous site and the new brand manual: what was too dense, what had no impact, where people got lost.", "A benchmark of event sites. The team ruled out the first reference as too flat and chose two to combine: generous spacing, big type, full-width sections with navy and cream.", "A review meeting that set the landing's job: answer what it is, what it's for, where, when and how much.", "A build-or-buy call for every block: speakers, agenda, sponsors, ticker and countdown built to measure; ticket PDFs possible, but not worth the effort yet.", "A moodboard and a working board in Figma, where the brand, social pieces, speaker photos and sponsor logos were sorted before any page was drawn."],
      extraTitle: "how the work moved",
      extra: <>{order}{boards}</>,
    },
    decisions: [
      { t: "write the words before the pages", because: "I wrote the UX writing section by section before designing: short, declarative copy with one accented phrase per headline, “launch price” instead of “phase 1”, and a countdown to when that price ends, not to the event. A quote first drafted under one person's name became an institutional CODIP statement, worded from what was actually said in the meeting.", fig: transition },
      { t: "the plan changed: one launch instead of two", because: "the plan was a teaser landing on the old domain first and the full site later. When the full site and ticket sales were ready for 6 July, we dropped the teaser: the transition story moved into the home, and the old domain now redirects." },
      { t: "the hero answers the five questions", because: "the review asked for what, when, where and how much without scrolling. Date, venue, format and the starting price sit in the hero, which scales with the shorter side of the screen so it fits a laptop and a phone alike.", ruled: "a city photo as the hero. It looked like every other conference and said nothing about this one.", fig: hero },
      { t: "one system, written down before the pages", because: "the brand manual set the colors and the references set the feel. I turned both into tokens: how much of each color a page can use, which typeface does what, spacing, radius and shadows, so every page and plugin looked like one event.", ruled: "styling page by page in Elementor. It would have drifted between the five pages and the four plugins.", fig: system },
      { t: "subpages instead of one endless home", because: "speakers, agenda, venue and sponsors each need room. The home previews each one with a button; the subpage carries the detail and a ticket button.", fig: pages },
      { t: "VIP in the middle, affiliates to a conversation", because: "VIP and Executive are bought on the site, with VIP in the middle. The CODIP affiliate rate depends on membership, so only that card sends people to WhatsApp.", fig: tickets },
      { t: "a three-step purchase inside the site", because: "companies often buy for a team, so one purchase can mix Executive and VIP and list each attendee in a panel that folds away. Billing asks for a tax ID only for an invoice, the summary shows tax before paying, and Mercado Pago takes the payment through a styled WooCommerce checkout. WooCommerce is only the payment engine; the plugin is the source of truth for every attendee, and it never swaps billing data in for an attendee's.", ruled: "an embedded payment iframe or my own payment integration. More risk, and nothing the buyer would notice.", fig: buy },
      { t: "remove the header that kept breaking", because: "the sticky header went through ten versions: transparent to glass on scroll, moved out of transformed containers, navy with a spacer. When it started covering the checkout's sticky summary, I removed the fixed position, the button and the cart from it.", ruled: "an eleventh patch. A plain header was cleaner than one more fix." },
      { t: "sponsors by tier, in carousels", because: "a single grid gave every logo the same weight and broke with odd shapes. Each tier got its own block, so the main partners lead.", fig: sponsors },
      { t: "my own plugins, so the client can edit", because: "speakers and the agenda change until the last week. The plugins keep the design fixed while CODIP edits the content. The agenda alone took about ten visual rounds, from dark glass to a departures board, before landing on two white cards in cascade over a slate texture.", fig: plugins },
    ],
    decisionsTail: wires,
    validation: {
      items: ["Review meetings with CODIP on the references, the structure and the ticket offer, plus written approval of the texts and the UI concept before development.", "A UX and accessibility review of the finished design.", "Every widget and plugin change approved first as an HTML preview, then shipped as a numbered version.", "No test purchases on the live site once real buyers were using it.", "SEO with Rank Math, from 66 to 75 out of 100 on the home, plus event structured data."],
    },
    results: [["observed", "{{It launched on 6 July with ticket sales open}}, and ran through the event on 9–10 September. When attendee details went missing from 13 orders, I audited the plugin, recovered them and fixed the root cause in the next release."], ["2027", "After the event, CODIP asked for a visual redesign for 2027."], ["measured", "I don't have traffic or sales numbers I can share."]],
    learn: ["{{When a feature keeps breaking, remove it instead of patching it again.}} The fixed header taught me that a clean solution beats a clever one.", "A cleanup job has to check the data is stored somewhere else before it deletes it. That rule came from recovering the 13 orders.", "Asking for photo standards before the photos arrived saved rounds of retouching."],
    legal: "Freelance work for CODIP. Nexo Summit, ENASEI and their brands belong to CODIP.",
  };

  return {
    project: "Nexo Summit — caso de estudio",
    subtitle: "de ENASEI a Nexo Summit, en un solo sitio",
    tldr: "ENASEI, la conferencia anual del sector inmobiliario peruano, pasó a llamarse Nexo Summit tras la fusión de sus gremios en CODIP. Como freelance diseñé y construí el cambio, {{del design system a la venta de entradas}}: discovery, UX writing, tokens, wireframes en Figma Make, cinco páginas en WordPress y plugins propios de speakers, agenda, preguntas frecuentes y entradas con Mercado Pago. Se lanzó el 6 de julio con la venta abierta y lo sostuve hasta el evento en septiembre.",
    meta: [
      ["cliente", "CODIP · Confederación de Desarrolladores Inmobiliarios del Perú"],
      ["rol", "Diseñador de producto y desarrollador freelance: UX/UI en Figma, desarrollo en WordPress y Elementor, SEO y plugins"],
      ["equipo", "El equipo de marketing y comunicaciones de CODIP, su proveedor de hosting y yo"],
      ["duración", "Junio–septiembre 2026 · lanzado el 6 de julio, evento el 9 y 10 de septiembre"],
      ["alcance", "Cinco páginas, una propuesta de landing de transición y cuatro plugins (speakers, agenda, preguntas frecuentes, entradas)"],
      ["estado", "En vivo en nexosummit.pe; el dominio de ENASEI redirige ahí"],
    ],
    tools,
    site: { href: "https://nexosummit.pe", label: "ver la web" },
    chips: ["caso de estudio", "sitio web", "freelance", "en vivo"], okChip: 3,
    cover,
    challenge: {
      intro: "El evento cambiaba de nombre y el sitio anterior no estaba listo para cargarlo:",
      list: ["mucho texto y poco impacto visual, con una foto genérica de la ciudad como hero", "decenas de logos de sponsors de todos los formatos en una sola grilla larga", "fotos de speakers con fondos, encuadres y calidades distintas", "mucha información para leer rápido: dos días de agenda, decenas de speakers, tres tipos de entrada", "las entradas tenían que venderse online: VIP, Ejecutiva y una tarifa de afiliados CODIP que requiere conversar"],
      end: "Y había una {{fecha de lanzamiento fija, el 6 de julio}}, con un cambio de dominio en el medio.",
      fig: enasei,
    },
    role: "{{Lo diseñé y construí de punta a punta}}: discovery, UX writing, design tokens, wireframes, la UI en Figma, el desarrollo en WordPress con Elementor, SEO y cuatro plugins propios, programados con Claude Code y ajustados conversando con Claude. El equipo de CODIP se encargó del contenido, el manual de marca y las aprobaciones; su proveedor de hosting dio el acceso al servidor.",
    research: {
      items: ["Una auditoría del sitio anterior y del manual de marca nuevo: qué era muy denso, qué no tenía impacto y dónde se perdía la gente.", "Un benchmark de sitios de eventos. El equipo descartó la primera referencia por plana y eligió combinar dos: espacios generosos, tipografía grande, secciones a todo el ancho con navy y crema.", "Una reunión de revisión que definió el trabajo de la landing: responder qué es, para qué sirve, dónde, cuándo y cuánto cuesta.", "Una decisión de construir o comprar por bloque: speakers, agenda, sponsors, ticker y countdown hechos a medida; el PDF de la entrada era posible, pero no valía el esfuerzo todavía.", "Un moodboard y un tablero de trabajo en Figma, donde se ordenaron la marca, las piezas de redes, las fotos de speakers y los logos de sponsors antes de dibujar cualquier página."],
      extraTitle: "cómo avanzó el trabajo",
      extra: <>{order}{boards}</>,
    },
    decisions: [
      { t: "escribir las palabras antes que las páginas", because: "hice el UX writing sección por sección antes de diseñar: copy corto y declarativo con una sola frase acentuada por titular, “precio de lanzamiento” en vez de “fase 1” y un countdown al vencimiento de ese precio, no al evento. Una cita que primero iba con el nombre de una persona pasó a ser una declaración institucional de CODIP, escrita con lo que realmente se dijo en la reunión.", fig: transition },
      { t: "el plan cambió: un lanzamiento en vez de dos", because: "el plan era primero una landing teaser en el dominio anterior y después el sitio completo. Cuando el sitio y la venta de entradas estuvieron listos para el 6 de julio, se eliminó el teaser: la historia de la transición pasó a la home y el dominio anterior ahora redirige." },
      { t: "el hero responde las cinco preguntas", because: "la revisión pidió qué, cuándo, dónde y cuánto sin hacer scroll. Fecha, sede, modalidad y precio desde están en el hero, que escala con el lado más corto de la pantalla para entrar igual en una laptop y en un teléfono.", ruled: "una foto de la ciudad como hero. Se parecía a cualquier conferencia y no decía nada de esta.", fig: hero },
      { t: "un sistema escrito antes de las páginas", because: "el manual de marca fijó los colores y los referentes, la sensación. Llevé ambos a tokens: cuánto de cada color puede usar una página, qué hace cada tipografía, espaciado, bordes y sombras, para que cada página y cada plugin se vieran como un mismo evento.", ruled: "diseñar página por página en Elementor. Se habría desviado entre las cinco páginas y los cuatro plugins.", fig: system },
      { t: "subpáginas en lugar de una home infinita", because: "speakers, agenda, sede y sponsors necesitan espacio. La home adelanta cada uno con un botón; la subpágina lleva el detalle y un botón de entradas.", fig: pages },
      { t: "VIP al centro, afiliados a una conversación", because: "VIP y Ejecutiva se compran en la web, con VIP al centro. La tarifa de afiliado CODIP depende de la membresía, así que solo esa tarjeta lleva a WhatsApp.", fig: tickets },
      { t: "una compra de tres pasos dentro del sitio", because: "las empresas suelen comprar para un equipo, así que una sola compra puede mezclar Ejecutiva y VIP y registrar a cada asistente en un panel plegable. La facturación pide RUC solo si se quiere factura, el resumen muestra el IGV antes de pagar y Mercado Pago cobra en un checkout de WooCommerce rediseñado. WooCommerce es solo el motor de pago; el plugin es la fuente de verdad de cada asistente y nunca reemplaza sus datos por los de facturación.", ruled: "un iframe de pago o una integración propia. Más riesgo, y nada que el comprador notara.", fig: buy },
      { t: "quitar el header que se seguía rompiendo", because: "el header fijo pasó por diez versiones: transparente a vidrio al hacer scroll, fuera de contenedores transformados, navy con un espaciador. Cuando empezó a tapar el resumen fijo del checkout, le quité la posición fija, el botón y el carrito.", ruled: "un undécimo parche. Un header simple era más limpio que un arreglo más." },
      { t: "sponsors por categoría, en carrusel", because: "una sola grilla le daba el mismo peso a todos los logos y se rompía con los formatos raros. Cada categoría tiene su bloque y los main partners van primero.", fig: sponsors },
      { t: "plugins propios, para que el cliente edite", because: "los speakers y la agenda cambian hasta la última semana. Los plugins mantienen el diseño fijo mientras CODIP edita el contenido. Solo la agenda pasó por unas diez rondas visuales, del vidrio oscuro a un tablero de salidas, hasta quedar en dos tarjetas blancas en cascada sobre una textura pizarra.", fig: plugins },
    ],
    decisionsTail: wires,
    validation: {
      items: ["Reuniones de revisión con CODIP sobre los referentes, la estructura y la oferta de entradas, más la aprobación escrita de los textos y del concepto UI antes de desarrollar.", "Una revisión de UX y accesibilidad del diseño terminado.", "Cada cambio de widget o plugin aprobado primero como preview en HTML y luego publicado como una versión numerada.", "Ninguna compra de prueba en el sitio en vivo una vez que había compradores reales.", "SEO con Rank Math, de 66 a 75 sobre 100 en la home, más datos estructurados del evento."],
    },
    results: [["observado", "{{Se lanzó el 6 de julio con la venta de entradas abierta}} y funcionó hasta el evento del 9 y 10 de septiembre. Cuando faltaron los datos de asistentes de 13 pedidos, audité el plugin, los recuperé y corregí la causa raíz en la siguiente versión."], ["2027", "Después del evento, CODIP pidió un rediseño visual para 2027."], ["medido", "No tengo números de tráfico o ventas que pueda compartir."]],
    learn: ["{{Cuando algo se sigue rompiendo, quitarlo en vez de parcharlo otra vez.}} El header fijo me enseñó que una solución limpia le gana a una ingeniosa.", "Un proceso de limpieza tiene que verificar que el dato está guardado en otro lado antes de borrarlo. Esa regla salió de recuperar los 13 pedidos.", "Pedir el estándar de fotos antes de que llegaran las fotos ahorró rondas de retoque."],
    legal: "Trabajo freelance para CODIP. Nexo Summit, ENASEI y sus marcas pertenecen a CODIP.",
  };
}

export default function CaseNexo() {
  return <CaseLayout content={content} />;
}

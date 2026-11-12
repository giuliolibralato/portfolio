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
    <Frame className="rows" caption={es ? "Mi rediseño de la landing de ENASEI, en su línea como pidió el cliente, para contar el cambio antes del sitio nuevo: misma excelencia, mayor impacto." : "My redesign of the ENASEI landing, kept in its look as the client asked, to tell the change before the new site: same excellence, more impact."}>
      <Pane label={es ? "después · landing de transición" : "after · transition landing"}><Img src="transition.webp" alt={es ? "ENASEI ahora es Nexo Summit: fecha, sede, video y la evolución" : "ENASEI is now Nexo Summit: date, venue, video and the evolution"} /></Pane>
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

  const order = <Steps items={es
    ? [["Antes", "la landing de ENASEI 2025"], ["Transición", "rediseño en la línea de ENASEI"], ["Referentes", "3 opciones, se combinaron 2"], ["Sistema", "tokens y tipografías"], ["Wireframes", "5 páginas, PRD + Figma Make"], ["Build", "WordPress y plugins propios"]]
    : [["Before", "the ENASEI 2025 landing"], ["Transition", "redesign in ENASEI's look"], ["References", "3 options, 2 combined"], ["System", "tokens and type"], ["Wireframes", "5 pages, PRD + Figma Make"], ["Build", "WordPress and my own plugins"]]} />;

  const tools: [string, string?][] = [["Figma", "figma"], ["Figma Make", "figma"], ["WordPress", "wordpress"], ["Elementor", "elementor"], ["WooCommerce", "woocommerce"], ["Mercado Pago", "mercadopago"], ["Claude Code", "claude"], ["Claude", "claude"]];

  if (!es) return {
    project: "Nexo Summit — case study",
    subtitle: "from ENASEI to Nexo Summit, in one site",
    tldr: "ENASEI, the Peruvian real-estate sector's yearly conference, became Nexo Summit after its guilds merged into CODIP. As a freelancer I designed and built the move: a redesign of the ENASEI landing that tells people the event changed its name, kept in ENASEI's look as the client asked, and the new site, {{from the design system to ticket sales}}: five pages in WordPress and my own plugins for speakers, agenda and tickets with Mercado Pago.",
    meta: [
      ["client", "CODIP · Confederation of Real Estate Developers of Peru"],
      ["role", "Freelance product designer and developer: design system, UX/UI, WordPress build, SEO and plugins"],
      ["team", "CODIP's marketing and communications team, their tech provider for the domain, and me"],
      ["timeline", "2026 · launched on 6 July, ahead of the event on 9–10 September"],
      ["scope", "Five pages, a transition landing and four plugins (speakers, agenda, FAQ, tickets)"],
      ["status", "Live at nexosummit.pe"],
    ],
    tools,
    site: { href: "https://nexosummit.pe", label: "visit the website" },
    chips: ["case study", "website", "freelance", "live"], okChip: 3,
    cover,
    challenge: {
      intro: "After seven editions as ENASEI, the event was taking a new name, and the old site wasn't ready to carry it:",
      list: ["dense text and little visual impact, with a stock skyline as the hero", "dozens of sponsor logos of every shape in one long grid", "speaker photos with different backgrounds, crops and quality", "tickets had to sell online, with VIP, Executive and an associate rate that needs a conversation"],
      end: "And there was a {{fixed launch date}}, with a domain migration in the middle.",
      fig: enasei,
    },
    role: "{{I designed and built it end to end}}: references, design system, wireframes, the high-fidelity concept, the WordPress build with Elementor, SEO, and four plugins of my own, coded with Claude Code and refined in conversation with Claude. CODIP's team owned the content, the brand manual and the approvals; their tech provider handled the domain.",
    research: {
      items: ["A review of the previous edition's site with the client: what was too dense, what had no impact, and where people got lost.", "Three reference sites. The team ruled out the first as too flat and asked to combine the other two: wide spacing, big type, organised and modern.", "A review meeting that set the landing's job: answer what it is, what it's for, where, when and how much.", "The brand manual and the updated logos, all signed “by CODIP”."],
      extraTitle: "the order of the work",
      extra: order,
    },
    decisions: [
      { t: "tell the change before showing the new site", because: "people knew ENASEI, not Nexo Summit. A transition landing in the old palette said it plainly: the same excellence, more impact, and the date.", fig: transition },
      { t: "the hero answers the five questions", because: "the review asked for what, when, where and how much without scrolling. Date, venue, format and the starting price sit in the hero; the ticker repeats the theme.", ruled: "a city photo as the hero. It looked like every other conference and said nothing about this one.", fig: hero },
      { t: "subpages instead of one endless home", because: "speakers, agenda, venue and sponsors each need room. The home previews each one with a button; the subpage carries the detail and a ticket button.", fig: pages },
      { t: "VIP in the middle, associates to a conversation", because: "the client wanted VIP to stand out and Executive to stay visible. The associate rate depends on membership, so that card asks for contact instead of a price.", fig: tickets },
      { t: "sponsors by tier, in carousels", because: "a single grid gave every logo the same weight and broke with odd shapes. Each tier got its own block, so the main partners lead.", fig: sponsors },
      { t: "my own plugins, so the client can edit", because: "speakers and the agenda change until the last week. The plugins keep the design fixed while CODIP edits the content; the tickets plugin sells several ticket types in one Mercado Pago payment, shows tax and collects every attendee's details.", fig: plugins },
    ],
    decisionsTail: wires,
    validation: {
      items: ["Review meetings with CODIP's team on the references, the structure and the ticket offer.", "A text-approval round for the transition landing before it went live.", "A high-fidelity concept approved before the build, so development didn't redo design."],
    },
    results: [["observed", "{{It launched on the agreed date, 6 July}}, and the old ENASEI domain now redirects to nexosummit.pe: five pages, the transition story and ticket sales through Mercado Pago, ahead of the event."], ["measured", "I don't have traffic or sales numbers I can share."]],
    learn: ["{{Ask for photo standards before the photos arrive.}} Agreeing on background, framing and quality for speakers saved rounds of retouching.", "Writing the wireframes as a PRD let Figma Make draft five pages fast, so my time went to the decisions, not the boxes."],
    legal: "Freelance work for CODIP. Nexo Summit, ENASEI and their brands belong to CODIP.",
  };

  return {
    project: "Nexo Summit — caso de estudio",
    subtitle: "de ENASEI a Nexo Summit, en un solo sitio",
    tldr: "ENASEI, la conferencia anual del sector inmobiliario peruano, pasó a llamarse Nexo Summit tras la fusión de sus gremios en CODIP. Como freelance diseñé y construí el cambio: un rediseño de la landing de ENASEI que cuenta que el evento cambió de nombre, en la línea de ENASEI como pidió el cliente, y el sitio nuevo, {{del design system a la venta de entradas}}: cinco páginas en WordPress y plugins propios de speakers, agenda y entradas con Mercado Pago.",
    meta: [
      ["cliente", "CODIP · Confederación de Desarrolladores Inmobiliarios del Perú"],
      ["rol", "Diseñador de producto y desarrollador freelance: design system, UX/UI, desarrollo en WordPress, SEO y plugins"],
      ["equipo", "El equipo de marketing y comunicaciones de CODIP, su proveedor técnico para el dominio y yo"],
      ["duración", "2026 · lanzado el 6 de julio, antes del evento del 9 y 10 de septiembre"],
      ["alcance", "Cinco páginas, una landing de transición y cuatro plugins (speakers, agenda, preguntas frecuentes, entradas)"],
      ["estado", "En vivo en nexosummit.pe"],
    ],
    tools,
    site: { href: "https://nexosummit.pe", label: "ver la web" },
    chips: ["caso de estudio", "sitio web", "freelance", "en vivo"], okChip: 3,
    cover,
    challenge: {
      intro: "Después de siete ediciones como ENASEI, el evento cambiaba de nombre y el sitio anterior no estaba listo para cargarlo:",
      list: ["mucho texto y poco impacto visual, con una foto genérica de la ciudad como hero", "decenas de logos de sponsors de todos los formatos en una sola grilla larga", "fotos de speakers con fondos, encuadres y calidades distintas", "las entradas tenían que venderse online: VIP, Ejecutiva y una tarifa de asociados que requiere conversar"],
      end: "Y había una {{fecha de lanzamiento fija}}, con una migración de dominio en el medio.",
      fig: enasei,
    },
    role: "{{Lo diseñé y construí de punta a punta}}: referentes, design system, wireframes, el concepto en alta fidelidad, el desarrollo en WordPress con Elementor, SEO y cuatro plugins propios, programados con Claude Code y ajustados conversando con Claude. El equipo de CODIP se encargó del contenido, el manual de marca y las aprobaciones; su proveedor técnico, del dominio.",
    research: {
      items: ["Una revisión del sitio de la edición anterior con el cliente: qué era muy denso, qué no tenía impacto y dónde se perdía la gente.", "Tres sitios de referencia. El equipo descartó el primero por plano y pidió combinar los otros dos: espacios amplios, tipografía grande, ordenado y moderno.", "Una reunión de revisión que definió el trabajo de la landing: responder qué es, para qué sirve, dónde, cuándo y cuánto cuesta.", "El manual de marca y los logos actualizados, todos con la firma “por CODIP”."],
      extraTitle: "el orden del trabajo",
      extra: order,
    },
    decisions: [
      { t: "contar el cambio antes de mostrar el sitio nuevo", because: "la gente conocía ENASEI, no Nexo Summit. Una landing de transición con la paleta anterior lo dijo claro: la misma excelencia, mayor impacto, y la fecha.", fig: transition },
      { t: "el hero responde las cinco preguntas", because: "la revisión pidió qué, cuándo, dónde y cuánto sin hacer scroll. Fecha, sede, modalidad y precio desde están en el hero; el ticker repite el tema.", ruled: "una foto de la ciudad como hero. Se parecía a cualquier conferencia y no decía nada de esta.", fig: hero },
      { t: "subpáginas en lugar de una home infinita", because: "speakers, agenda, sede y sponsors necesitan espacio. La home adelanta cada uno con un botón; la subpágina lleva el detalle y un botón de entradas.", fig: pages },
      { t: "VIP al centro, asociados a una conversación", because: "el cliente quería destacar VIP sin esconder Ejecutiva. La tarifa de asociados depende de la membresía, así que esa tarjeta pide contacto en vez de mostrar un precio.", fig: tickets },
      { t: "sponsors por categoría, en carrusel", because: "una sola grilla le daba el mismo peso a todos los logos y se rompía con los formatos raros. Cada categoría tiene su bloque y los main partners van primero.", fig: sponsors },
      { t: "plugins propios, para que el cliente edite", because: "los speakers y la agenda cambian hasta la última semana. Los plugins mantienen el diseño fijo mientras CODIP edita el contenido; el de entradas vende varios tipos en un solo pago con Mercado Pago, muestra el IGV y pide los datos de cada asistente.", fig: plugins },
    ],
    decisionsTail: wires,
    validation: {
      items: ["Reuniones de revisión con el equipo de CODIP sobre los referentes, la estructura y la oferta de entradas.", "Una ronda de aprobación de textos para la landing de transición antes de publicarla.", "Un concepto en alta fidelidad aprobado antes del desarrollo, para que construir no significara rediseñar."],
    },
    results: [["observado", "{{Se lanzó en la fecha acordada, el 6 de julio}}, y el dominio de ENASEI ahora redirige a nexosummit.pe: cinco páginas, la historia de la transición y la venta de entradas con Mercado Pago, antes del evento."], ["medido", "No tengo números de tráfico o ventas que pueda compartir."]],
    learn: ["{{Pedir el estándar de fotos antes de que lleguen las fotos.}} Acordar fondo, encuadre y calidad para los speakers ahorró rondas de retoque.", "Escribir los wireframes como PRD dejó que Figma Make armara cinco páginas rápido, y mi tiempo fue a las decisiones, no a las cajas."],
    legal: "Trabajo freelance para CODIP. Nexo Summit, ENASEI y sus marcas pertenecen a CODIP.",
  };
}

export default function CaseNexo() {
  return <CaseLayout content={content} />;
}

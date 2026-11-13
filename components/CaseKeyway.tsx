"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { CoverVideo } from "./CoverVideo";
import { Crop, FilmFig, Frame, Metrics, Pane, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("keyway");
const Img = ({ src, alt, className }: { src: string; alt: string; className?: string }) => <Crop src={`${IMG}/${src}`} alt={alt} className={className} />;

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <CoverVideo src={`${IMG}/cover`} poster={`${IMG}/cover-poster.webp`} label={es ? "Una columna larga de campos se reparte en los cuatro actos del flujo" : "One long column of fields drops into the flow's four acts"} />;
  const actsFilm = <FilmFig src={`${IMG}/acts`} caption={es ? "El cuestionario como una sola columna larga (aquí con las etiquetas reales de los campos) se reparte en los cuatro actos, y el acto 1 se abre en su primer paso." : "The questionnaire as one long column (shown with the real field labels) drops into the four acts, and act 1 opens into its first step."} />;

  const questionnaire = (
    <Metrics
      label={es ? "el cuestionario que había que conservar" : "the questionnaire that had to survive"}
      items={es
        ? [["332", "campos que llenan los formularios legales del estado"], ["193", "de ellos aparecen solo según una respuesta anterior"], ["12", "pasos en una sola columna, sin pausa"]]
        : [["332", "fields that fill the state's legal forms"], ["193", "of them appear only after an earlier answer"], ["12", "steps in one column, with no pause"]]}
      caption={es ? "Ningún campo podía moverse de paso: cada uno imprime un casillero en un formulario de Tennessee." : "No field could move to another step: each one prints a box on a Tennessee form."}
    />
  );

  const acts = (
    <Frame className="rows" caption={es ? "Cada acto abre con una portada de cinco elementos: número, título, una línea, tres etiquetas y un botón. Sin duración: nadie la había medido." : "Each act opens with a five-part cover: number, title, one line, three chips and a button. No duration: nobody had measured it."}>
      <Pane label={es ? "portada del acto 1" : "act 1 cover"}><Img src="cover-act1.webp" alt={es ? "Portada del acto 1: Let's get to know your home" : "Act 1 cover: Let's get to know your home"} /></Pane>
    </Frame>
  );

  const pacing = (
    <Frame className="cols-nav" caption={es ? "Pantallas de una pregunta para respirar; pantallas densas donde la ley pide muchos datos seguidos." : "One-question screens to breathe; dense screens where the law asks for many answers in a row."}>
      <Pane label={es ? "pausada · una pregunta" : "paced · one question"}><Img src="type.webp" alt={es ? "Modal con seis tipos de propiedad" : "Modal with six property types"} /></Pane>
      <Pane label={es ? "densa · la declaración legal" : "dense · the legal disclosure"}><Img src="dense.webp" alt={es ? "Declaración del estado de la propiedad, un ítem a la vez" : "Property condition disclosure, one item at a time"} /></Pane>
    </Frame>
  );

  const card = (
    <Frame className="cols-2" caption={es ? "La tarjeta es el aviso que verá el comprador, armándose con cada respuesta. Lo que falta dice en qué acto llega, no que está mal." : "The card is the listing the buyer will see, assembling with each answer. What is missing says which act it arrives in, not that it is wrong."}>
      <Pane label={es ? "con dirección y datos básicos" : "with address and basics"}><Img className="narrow" src="card-partial.webp" alt={es ? "Tarjeta del aviso sin foto, con dirección, 3 dormitorios, 2 baños y 2,450 pies cuadrados" : "Listing card without a photo, with address, 3 beds, 2 baths and 2,450 sqft"} /></Pane>
      <Pane accent label={es ? "con la primera foto" : "with the first photo"}><Img className="narrow" src="card-photo.webp" alt={es ? "La misma tarjeta con la foto de la fachada" : "The same card with the front photo"} /></Pane>
    </Frame>
  );

  const value = (
    <Frame className="rows" caption={es ? "En el prototipo: tres precios sugeridos a partir de ventas comparables, marcados como estimación y no como tasación." : "In the prototype: three suggested prices from comparable sales, marked as an estimate, not an appraisal."}>
      <Pane label={es ? "valuación" : "valuation"}><Img src="value.webp" alt={es ? "Tres precios sugeridos: 944,000, 960,000 y 977,000 dólares" : "Three suggested prices: $944,000, $960,000 and $977,000"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["Mapa", "82 capturas del flujo actual"], ["Referentes", "Airbnb y Zillow en Mobbin"], ["Prototipo", "clicable, de punta a punta"], ["Sprint review", "feedback del cliente"], ["Auditoría", "177 preguntas contra 129 tickets"]]
    : [["Map", "82 captures of today's flow"], ["References", "Airbnb and Zillow on Mobbin"], ["Prototype", "clickable, end to end"], ["Sprint review", "client feedback"], ["Audit", "177 questions against 129 tickets"]]} />;

  const audit = (
    <Metrics
      label={es ? "auditoría · contra el diseño nuevo" : "audit · against the new design"}
      items={es
        ? [["177", "preguntas de hoy que el diseño nuevo no hacía, en 6 módulos"], ["129", "tickets y decisiones escritas, cruzados con cada una"], ["61", "necesitaban un arreglo además de volver"]]
        : [["177", "questions asked today that the new design didn't ask, across 6 modules"], ["129", "tickets and written decisions, checked against each one"], ["61", "needed a fix on top of coming back"]]}
      caption={es ? "Tres preguntas salieron de la lista porque el diseño tenía razón y la lista no. Quedaron anotadas con su porqué." : "Three questions came off the list because the design was right and the list was wrong. They stayed on record with the reason."}
    />
  );

  if (!es) return {
    project: "Keyway — case study",
    subtitle: "332 legal fields in 4 acts",
    tldr: "A home-selling product lets owners list their home without an agent. Its listing questionnaire fills Tennessee's legal forms: 332 fields in 12 steps with no pause. I redesigned it as {{four acts with a listing card that assembles as you answer}}, built a clickable prototype to test the feel, and audited every question against 129 tickets so nothing the forms need was lost.",
    meta: [
      ["company", "Designli", true],
      ["role", "Product designer, owner of the flow redesign and the audit"],
      ["team", "PO, development team and me; a Design Lead and a PO Lead gave feedback"],
      ["timeline", "Delivery sprints · August–September 2026"],
      ["scope", "Responsive web flow: entry, four acts, preview and signing"],
      ["status", "Prototype approved; not launched while I was at Designli"],
    ],
    chips: ["case study", "delivery", "prototype approved"], okChip: 2,
    cover, coverFilm: true,
      tools: [["Figma", "figma"], ["Claude Code", "claude"], ["Mobbin"], ["Jira", "jira"]],
    challenge: {
      intro: "Owners list their own home and save the agent's commission. To publish, they answer a questionnaire that prints onto Tennessee's property condition disclosure and listing forms:",
      list: ["332 fields, 193 of them gated by an earlier answer", "12 steps in a long list, with no sense of how far along you are", "money questions mixed with legal ones, with no reason given for either"],
      end: "The product owner saw it: the flow was long not because the questions were unnecessary but because they were disordered, and the layout, adjusted by a developer with AI, wasn't the work of someone who does UX. Nobody set exact targets, but the goals were clear: less abandonment, less time, a less saturating experience and the chance to save progress. Sellers aren't real-estate people. The flow had to {{feel shorter without asking less}}: the law decides the questions, design only decides how they arrive.",
      fig: <>{actsFilm}{questionnaire}</>,
    },
    role: "{{I owned the redesign of the listing flow and the audit of its questions.}} I mapped the current flow, studied references, wrote the build spec, made the clickable prototype with Claude Code and the Figma MCP on top of the product's design system, and wrote the briefs the Figma agent used to update the frames. I decided the grouping and the names myself. The PO passed me the client's requirements and artifacts, and the development team the tickets.",
    research: {
      items: ["82 captures of the live product across every step: the source of truth for what the flow asks today.", "A reference study on Mobbin: Airbnb's 20-screen listing flow and Zillow's address-first prefill. Where they disagreed with our constraints, I wrote down why we went our way.", "A requirements document written by the client, passed on by the product owner with the artifacts that came from his talks with the client.", "The client's sprint review on 18 September, from the verbatim transcript, not the meeting summary. I wasn't in the meeting."],
      extraTitle: "the order of the work",
      extra: order,
    },
    decisions: [
      { t: "twelve steps grouped into four acts", because: "four parts are easy to hold in your head; twelve aren't. I grouped by category and type of question. Three would have been ideal, but some questions don't share a category; five stretched it again. No field moved between steps, so every legal form still prints the same.", ruled: "regrouping questions by topic. It read better, but it would have broken the mapping to the state forms.", fig: acts },
      { t: "paced screens and dense screens, on purpose", because: "one question per screen is calm, but 332 of them would be hundreds of screens. Act covers mark the change of rhythm.", ruled: "Airbnb's one-question-per-screen pattern. It works for 20 screens with no legal forms behind them.", fig: pacing },
      { t: "a listing card that assembles as you answer", because: "the seller should see what they're building, not a progress bar. The product already had a listing card; the decision was to make it the thread of the flow, filling in as the seller answers. Neither reference had anything like it, which is why it went into a prototype instead of frames.", fig: card },
      { t: "savings shown as a range, and the largest thing on the page", because: "the client decided it should be big: it is what pushes a seller to finish the listing and pay the fees. It compares the general fee on another platform with listing here. A range is honest about an estimate; a single number would promise more than the data can.", fig: value },
      { t: "one line of why under every section", because: "sellers stop when they don't know why they're asked something. Twelve words at most, and a compliment never looks like a warning." },
    ],
    validation: {
      items: ["The clickable prototype, from the property type to signing. The PO asked for a link; I shared the GitHub repo instead, with the client's content, images and the project's design system, and he said it was much better. The client saw two prototyped ideas in the sprint review.", "An audit of the new design against the current questionnaire: every question the new flow didn't ask, cross-checked against 129 tickets and decisions."],
      extra: audit,
    },
    results: [["observed", "{{The client liked the prototyped ideas}} (“That's awesome, really like that idea”) and the audit went to the PO as the restoration list: each question comes back, or is removed on purpose with a ticket. The surprise was how many requirements sat behind these flows. The Design Lead and the PO Lead liked the work, and it kept being built after I left."], ["measured", "Nothing yet. There were no sellers or drop-off data to start from (only the owners and clients tested and asked for changes), and it hadn't launched when I left Designli."], ["next", "Have five sellers complete Act 1 in the prototype, timed, and ask whether the listing card felt like progress or decoration."]],
    learn: ["{{Write the restoration list as “everything comes back”}} and strike things off on purpose. Things get lost by omission, not by decision.", "Static frames couldn't tell us if the listing card felt like company or decoration. Only filling in fields and watching it fill could.", "{{I would prototype on my own sooner, with the design system.}} Some flows I drew by hand using Figma Make as a reference and many PRDs, to keep them consistent; other tickets I would start straight in Claude Code."],
    legal: "A Designli project. Client names, brand, colors and data have been changed. Screens are from a prototype with fictional data. All rights belong to Designli and its client.",
  };

  return {
    project: "Keyway — caso de estudio",
    subtitle: "332 campos legales en 4 actos",
    tldr: "Un producto de venta de casas permite a los dueños publicar sin agente. Su cuestionario llena los formularios legales de Tennessee: 332 campos en 12 pasos sin pausa. Lo rediseñé como {{cuatro actos con una tarjeta del aviso que se arma mientras respondes}}, construí un prototipo clicable para probar la sensación y audité cada pregunta contra 129 tickets para no perder nada que pidan los formularios.",
    meta: [
      ["empresa", "Designli", true],
      ["rol", "Diseñador de producto, dueño del rediseño del flujo y de la auditoría"],
      ["equipo", "PO, equipo de desarrollo y yo; un Design Lead y un PO Lead dieron feedback"],
      ["duración", "Sprints de Delivery · agosto–septiembre 2026"],
      ["alcance", "Flujo web responsive: entrada, cuatro actos, vista previa y firma"],
      ["estado", "Prototipo aprobado; no se lanzó mientras estuve en Designli"],
    ],
    chips: ["caso de estudio", "delivery", "prototipo aprobado"], okChip: 2,
    cover, coverFilm: true,
      tools: [["Figma", "figma"], ["Claude Code", "claude"], ["Mobbin"], ["Jira", "jira"]],
    challenge: {
      intro: "Los dueños publican su casa y se ahorran la comisión del agente. Para publicar responden un cuestionario que se imprime en la declaración del estado de la propiedad y en los formularios de Tennessee:",
      list: ["332 campos, 193 de ellos condicionados a una respuesta anterior", "12 pasos en una lista larga, sin idea de cuánto falta", "preguntas de dinero mezcladas con las legales, sin decir el porqué de ninguna"],
      end: "El product owner lo vio: el flujo era largo no porque sobraran preguntas, sino porque estaban desordenadas, y el layout, ajustado por un desarrollador con IA, no era el trabajo de alguien que sabe de UX. Nadie fijó metas exactas, pero los objetivos eran claros: menos abandono, menos tiempo, una experiencia menos saturada y poder guardar el progreso. Los vendedores no son del rubro. El flujo tenía que {{sentirse más corto sin preguntar menos}}: la ley decide las preguntas; el diseño solo decide cómo llegan.",
      fig: <>{actsFilm}{questionnaire}</>,
    },
    role: "{{Fui dueño del rediseño del flujo de publicación y de la auditoría de sus preguntas.}} Mapeé el flujo actual, estudié referentes, escribí el spec, hice el prototipo clicable con Claude Code y el MCP de Figma sobre el design system del producto, y escribí los briefs con los que el agente de Figma actualizó los frames. Las agrupaciones y los nombres los decidí yo. El PO me pasó los requerimientos y artefactos del cliente, y el equipo de desarrollo, los tickets.",
    research: {
      items: ["82 capturas del producto en vivo, en todos los pasos: la fuente de verdad de lo que el flujo pregunta hoy.", "Un estudio de referentes en Mobbin: el flujo de 20 pantallas de Airbnb y el autocompletado por dirección de Zillow. Donde chocaban con nuestras restricciones, dejé escrito por qué fuimos por otro lado.", "Un documento de requerimientos escrito por el cliente, pasado por el product owner junto con los artefactos de sus conversaciones con él.", "El sprint review del cliente del 18 de septiembre, desde la transcripción literal, no el resumen. No estuve en la reunión."],
      extraTitle: "el orden del trabajo",
      extra: order,
    },
    decisions: [
      { t: "doce pasos agrupados en cuatro actos", because: "cuatro partes se recuerdan; doce no. Agrupé por categoría y tipo de pregunta. Tres habría sido lo ideal, pero algunas preguntas no comparten categoría; cinco volvía a alargarlo. Ningún campo cambió de paso, así que cada formulario legal se sigue imprimiendo igual.", ruled: "reagrupar las preguntas por tema. Se leía mejor, pero rompía el mapeo con los formularios del estado.", fig: acts },
      { t: "pantallas pausadas y pantallas densas, a propósito", because: "una pregunta por pantalla es tranquilo, pero 332 serían cientos de pantallas. Las portadas de cada acto marcan el cambio de ritmo.", ruled: "el patrón de Airbnb de una pregunta por pantalla. Funciona en 20 pantallas sin formularios legales detrás.", fig: pacing },
      { t: "una tarjeta del aviso que se arma mientras respondes", because: "el vendedor debe ver lo que está construyendo, no una barra de progreso. El producto ya tenía una tarjeta del aviso; la decisión fue volverla el hilo del flujo, que se llena mientras el vendedor responde. Ningún referente tenía algo así; por eso fue a un prototipo y no a frames.", fig: card },
      { t: "el ahorro como rango, y lo más grande de la página", because: "el cliente decidió que fuera grande: es lo que empuja al vendedor a terminar de publicar y pagar las comisiones. Compara la comisión general de otra plataforma con publicar aquí. Un rango es honesto con una estimación; un número exacto promete más de lo que los datos pueden.", fig: value },
      { t: "una línea de porqué bajo cada sección", because: "el vendedor se detiene cuando no sabe por qué le preguntan algo. Doce palabras como máximo, y un elogio nunca se ve como una advertencia." },
    ],
    validation: {
      items: ["El prototipo clicable, del tipo de propiedad a la firma. El PO pidió un enlace; compartí en cambio el repo de GitHub, con el contenido del cliente, las imágenes y el design system del proyecto, y dijo que era mucho mejor. El cliente vio dos ideas prototipadas en el sprint review.", "Una auditoría del diseño nuevo contra el cuestionario actual: cada pregunta que el flujo nuevo no hacía, cruzada con 129 tickets y decisiones."],
      extra: audit,
    },
    results: [["observado", "{{Al cliente le gustaron las ideas prototipadas}} («That's awesome, really like that idea») y la auditoría pasó al PO como la lista de restauración: cada pregunta vuelve, o sale a propósito con un ticket. Lo sorprendente fue la cantidad de requerimientos detrás de estos flujos. Al Design Lead y al PO Lead les gustó el trabajo, y siguió construyéndose después de mi salida."], ["medido", "Nada aún. No había vendedores ni datos de abandono de los que partir (solo los dueños y clientes probaban y pedían cambios), y no se había lanzado cuando dejé Designli."], ["siguiente", "Que cinco vendedores completen el acto 1 en el prototipo, con tiempo medido, y preguntarles si la tarjeta del aviso se sintió como avance o como adorno."]],
    learn: ["{{Escribir la lista como “todo vuelve”}} y tachar a propósito. Las cosas se pierden por omisión, no por decisión.", "Los frames no podían decirnos si la tarjeta se sentía como compañía o como adorno. Solo llenar campos y verla llenarse podía.", "{{Prototiparía por mi cuenta antes, con el design system.}} Algunos flujos los hice a mano usando Figma Make de referencia y muchos PRDs, para mantener la consistencia; otros tickets los habría empezado directo en Claude Code."],
    legal: "Proyecto de Designli. Se cambiaron los nombres, la marca, los colores y los datos del cliente. Las pantallas son de un prototipo con datos ficticios. Todos los derechos pertenecen a Designli y su cliente.",
  };
}

export default function CaseKeyway() {
  return <CaseLayout content={content} />;
}

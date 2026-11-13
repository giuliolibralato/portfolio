"use client";

import { CaseLayout, type CaseContent, type Decision } from "./CaseLayout";
import { CallLoop, NavSprawl, OneBrain, OneScore, Phones, Timeline, Tests, Trust } from "./BeaconFigures";
import { CoverVideo } from "./CoverVideo";
import { imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("beacon");

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <CoverVideo src={`${IMG}/cover`} poster={`${IMG}/cover-poster.webp`} label={es ? "Today se arma al abrir la plataforma y Brain se acopla a la derecha" : "Today composing itself as the platform opens, then Brain docking on the right"} />;
  // the figure that supports each decision, shown right after it (full case only)
  const figs = [<NavSprawl key="nav" lang={lang} />, <CallLoop key="loop" lang={lang} />, <OneScore key="score" lang={lang} />, <Trust key="trust" lang={lang} />, <OneBrain key="brain" lang={lang} />, null];
  const withFigs = (ds: Decision[]) => ds.map((d, i) => ({ ...d, fig: figs[i] }));
  const tour = (cap: string) => (
    <figure className="frame-fig tour-fig">
      <div className="cover film-cover"><CoverVideo src={`${IMG}/tour`} poster={`${IMG}/tour-poster.webp`} label={cap} /></div>
      <figcaption className="small muted">{cap}</figcaption>
    </figure>
  );
  const mobile = (h: string, p: string) => (
    <div className="decision-group">
      <h3 className="sub">{h}</h3>
      <p>{p}</p>
      <Phones lang={lang} />
    </div>
  );
  if (lang === "en") {
    const decisions: Decision[] = [
      { t: "one sidebar replaced 13 tabs and a launcher", because: "the same destination appeared in up to three places. Grouped in the broker's own order; views are tabs inside a page, never extra sidebar items." },
      { t: "today became the place where the day starts", because: "the broker's first question is “who do I call first”, not “which tool do I open”.", ruled: "three menus as the first view. They kept the catalogue feeling and pushed the answer one click away." },
      { t: "one score per building, one rank per person", because: "two scores for the same contact made brokers distrust both." },
      { t: "trust on every claim", because: "brokers repeat this information out loud on calls. A claim should never look more certain than its evidence." },
      { t: "one assistant, everywhere", because: "seven assistants with different names split the same job.", ruled: "the assistant as a separate area. Brokers would have to leave their work to use it, and they wouldn't." },
      { t: "keep their vocabulary", because: "we changed the structure, not the words. Labels and order stayed the ones brokers already use." },
    ];
    return {
      project: "Beacon — case study",
      subtitle: "one sidebar for 60 destinations",
      tldr: "A commercial real-estate brokerage asked us to redesign the internal portal its brokers use to decide who to call. In a 5-day Impact Week I turned about 60 navigation destinations into one grouped sidebar, merged 7+ AI assistants into one, and replaced two conflicting scores with one score per building. {{The client asked to keep going}}: the work continued as a Traction Lab.",
      meta: [
      ["company", "Designli", true],
      ["role", "UX/UI designer, owner of the product spec"],
      ["team", "Tech Lead, Solutions Architect and me"],
      ["timeline", "5-day Impact Week, then iterations to version 3.0 · 2026"],
      ["scope", "Responsive web (15 screens) and a mobile app concept (14 screens)"],
      ["status", "Validated with the client; the Traction Lab continued after my time at Designli"]
    ],
      chips: ["case study", "impact week", "validated with the client"], okChip: 2,
      cover, coverFilm: true,
      tools: [["Figma", "figma"], ["Claude Code", "claude"], ["Mobbin"]],
      challenge: { intro: "Brokers open the portal every morning to answer one question: who is most likely to sell, and why now? The portal had grown into a catalogue of tools:", list: ["about 60 places to go: 13 tabs, a drawer with 36 links and 22 tiles", "7+ AI assistants with different names", "two scores that disagreed for the same contact"], end: "We had {{5 days}} to show a direction the client could react to. Brokers are on the phone all day and not technical, so anything new had to feel familiar." },
      role: "{{I owned the product spec and the design}}, from the first walkthrough to the prototype: navigation, information architecture, success tests, the web platform, the mobile concept and the interactive prototype. The Tech Lead and Solutions Architect shaped the technical proposal.",
      research: { items: ["Three recorded walkthroughs of the current portal by the main broker (~90 min), turned into a gap analysis with every request, its timestamp and a priority (P1–P3).", "Workshops and design reviews with the client during the week.", "Five orientation documents the client shared after the first review. Version 3.0 follows them."], extraTitle: "the order of the work", extra: <Timeline lang={lang} /> },
      decisionsLead: tour("One morning, one owner: Today puts Daniel Marchetti first, his row opens into his case file, and Ask Brain docks beside it with the why now and its sources."),
      decisions: withFigs(decisions),
      decisionsTail: mobile("a phone app as field mode", "The same data, assistant and call loop on a 390 × 844 phone, limited to what makes sense in the street: Today, owners near me, approvals and the case file."),
      validation: { items: ["Client workshops and design reviews. The prototype went through three versions, each documented with what changed and why.", "Internal design review: 69 screenshots, 13 screens, light and dark, 3 breakpoints. It caught a “Verified” card next to a disputed fact, fixed before the client saw it."], extra: <Tests lang={lang} /> },
      results: [["observed", "After the Impact Week {{the client asked to continue}}: the project became a Traction Lab, and the client sent the documents that shaped version 3.0."], ["expected", "The success tests are the targets for the first release."], ["measured", "None yet. I didn’t get to continue into the Traction Lab, so I have no post-launch numbers."], ["next", "Time the Today loop with five brokers against the three success tests: one click to the first owner, two to log a missed call, and any area found at the first try."]],
      learn: ["{{Writing the success tests on day one}} made every review shorter: we argued about the tests, not about taste.", "The walkthrough recordings were worth more than any brief. The best ideas came from what the broker did, not what he asked for."],
      legal: "A Designli project. Client names, brand, colors and data have been changed. Screens are from a prototype with fictional data. All rights belong to Designli and its client.",
    };
  }
  {
    const decisions: Decision[] = [
      { t: "un sidebar reemplazó 13 pestañas y un lanzador", because: "el mismo destino aparecía hasta en tres lugares. Agrupado en el orden del broker; las vistas son pestañas dentro de una página, nunca ítems extra." },
      { t: "today pasó a ser donde empieza el día", because: "la primera pregunta del broker es “a quién llamo primero”, no “qué herramienta abro”.", ruled: "tres menús como primera vista. Mantenían la sensación de catálogo y dejaban la respuesta a un clic más." },
      { t: "un puntaje por edificio, un ranking por persona", because: "dos puntajes para el mismo contacto hacían que no confiaran en ninguno." },
      { t: "confianza en cada dato", because: "los brokers repiten esta información en voz alta en las llamadas. Un dato nunca debe parecer más seguro que su evidencia." },
      { t: "un asistente, en todas partes", because: "siete asistentes con nombres distintos se repartían el mismo trabajo.", ruled: "el asistente como un área aparte. Los brokers tendrían que dejar su trabajo para usarlo, y no lo harían." },
      { t: "mantener su vocabulario", because: "cambiamos la estructura, no las palabras. Las etiquetas y el orden siguieron siendo los que ya usaban." },
    ];
    return {
      project: "Beacon — caso de estudio",
      subtitle: "un sidebar para 60 destinos",
      tldr: "Una corredora inmobiliaria comercial nos pidió rediseñar el portal interno que usan sus brokers para decidir a quién llamar. En una Impact Week de 5 días convertí unos 60 destinos de navegación en un solo sidebar agrupado, uní más de 7 asistentes de IA en uno y reemplacé dos puntajes que se contradecían por un puntaje por edificio. {{El cliente pidió seguir}}: el trabajo continuó como Traction Lab.",
      meta: [
      ["empresa", "Designli", true],
      ["rol", "Diseñador UX/UI, dueño del spec de producto"],
      ["equipo", "Tech Lead, Solutions Architect y yo"],
      ["duración", "Impact Week de 5 días, luego iteraciones hasta la versión 3.0 · 2026"],
      ["alcance", "Web responsive (15 pantallas) y concepto de app móvil (14 pantallas)"],
      ["estado", "Validado con el cliente; el Traction Lab siguió después de mi etapa en Designli"]
    ],
      chips: ["caso de estudio", "impact week", "validado con el cliente"], okChip: 2,
      cover, coverFilm: true,
      tools: [["Figma", "figma"], ["Claude Code", "claude"], ["Mobbin"]],
      challenge: { intro: "Los brokers abren el portal cada mañana para responder una pregunta: ¿quién tiene más probabilidad de vender, y por qué ahora? El portal se había vuelto un catálogo de herramientas:", list: ["unos 60 lugares a donde ir: 13 pestañas, un cajón con 36 enlaces y 22 mosaicos", "más de 7 asistentes de IA con nombres distintos", "dos puntajes que se contradecían para el mismo contacto"], end: "Teníamos {{5 días}} para mostrar una dirección a la que el cliente pudiera reaccionar. Los brokers pasan el día al teléfono y no son técnicos, así que lo nuevo tenía que sentirse familiar." },
      role: "{{Fui dueño del spec de producto y del diseño}}, del primer walkthrough al prototipo: navegación, arquitectura de información, tests de éxito, la plataforma web, el concepto móvil y el prototipo interactivo. El Tech Lead y el Solutions Architect definieron la propuesta técnica.",
      research: { items: ["Tres walkthroughs grabados del portal actual por el broker principal (~90 min), convertidos en un análisis de brechas con cada pedido, su minuto y una prioridad (P1–P3).", "Workshops y design reviews con el cliente durante la semana.", "Cinco documentos de orientación que el cliente compartió tras la primera revisión. La versión 3.0 los sigue."], extraTitle: "el orden del trabajo", extra: <Timeline lang={lang} /> },
      decisionsLead: tour("Una mañana, un dueño: Today pone primero a Daniel Marchetti, su fila se abre en su ficha y Ask Brain se acopla al lado con el porqué y sus fuentes."),
      decisions: withFigs(decisions),
      decisionsTail: mobile("una app como modo de campo", "Los mismos datos, asistente y ciclo de llamada en un teléfono de 390 × 844, limitado a lo que tiene sentido en la calle: Today, dueños cerca, aprobaciones y la ficha."),
      validation: { items: ["Workshops y design reviews con el cliente. El prototipo pasó por tres versiones, cada una documentada con qué cambió y por qué.", "Design review interno: 69 capturas, 13 pantallas, claro y oscuro, 3 breakpoints. Detectó una tarjeta “Verified” junto a un dato en disputa, corregida antes de que la viera el cliente."], extra: <Tests lang={lang} /> },
      results: [["observado", "Tras la Impact Week {{el cliente pidió seguir}}: el proyecto pasó a Traction Lab y el cliente envió los documentos que dieron forma a la versión 3.0."], ["esperado", "Los tests de éxito son los objetivos del primer release."], ["medido", "Nada aún. No llegué a continuar en el Traction Lab, así que no tengo números después del lanzamiento."], ["siguiente", "Medir el ciclo de Today con cinco brokers contra los tres tests de éxito: un clic al primer dueño, dos para registrar una llamada sin respuesta y cualquier área encontrada al primer intento."]],
      learn: ["{{Escribir los tests de éxito el primer día}} acortó cada revisión: discutíamos los tests, no gustos.", "Las grabaciones de los walkthroughs valieron más que cualquier brief. Las mejores ideas salieron de lo que el broker hacía, no de lo que pedía."],
      legal: "Proyecto de Designli. Se cambiaron los nombres, la marca, los colores y los datos del cliente. Las pantallas son de un prototipo con datos ficticios. Todos los derechos pertenecen a Designli y su cliente.",
    };
  }
}

export default function CaseBeacon() {
  return <CaseLayout content={content} />;
}

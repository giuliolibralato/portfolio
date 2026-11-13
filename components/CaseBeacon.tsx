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
      { t: "one sidebar replaced 13 tabs and a launcher", because: "the same destination appeared in up to three places. I grouped them by what the recordings showed he opened first and how many clicks each step took, checked against UX patterns for admin and CRM dashboards. Views are tabs inside a page, never extra sidebar items." },
      { t: "today became the place where the day starts", because: "the broker's first question is “who do I call first”, not “which tool do I open”.", ruled: "three menus as the first view. They kept the catalogue feeling and pushed the answer one click away." },
      { t: "one score per building, one rank per person", because: "two scores sat on the same contact: one told the rest of the team how a property stood, the other rated the client. Each gets one clear place, one per building and one rank per person." },
      { t: "trust on every claim", because: "brokers repeat this information out loud on calls. A claim should never look more certain than its evidence." },
      { t: "one assistant, everywhere", because: "the client never asked for seven assistants; he wanted Brain to do the job and, with its learning mode, learn the platform and answer under seven roles. The roles live in the chat bar. None was discarded, only moved.", ruled: "the assistant as a separate area. Brokers would have to leave their work to use it, and they wouldn't." },
      { t: "keep their vocabulary", because: "we changed the structure, not the words. Labels and order stayed the ones brokers already use." },
    ];
    return {
      project: "Beacon — case study",
      subtitle: "one sidebar for 60 destinations",
      tldr: "A commercial real-estate broker ran his whole day in a custom-built platform: CRM, email, calls, news, analytics and more, grown without clear flows. We were first asked to redesign the flows; in a 5-day Impact Week I redesigned the whole platform instead. About 60 navigation destinations became one grouped sidebar, 7 assistant roles moved into one Brain, and the two scores got one clear place each. {{The client approved the first proposal with no changes}} and asked to keep going: the work continued as a Traction Lab.",
      meta: [
      ["company", "Designli", true],
      ["role", "UX/UI designer, owner of the product spec"],
      ["team", "Tech Lead, Solutions Architect and me; the Design Lead (outside the project) gave feedback"],
      ["timeline", "5-day Impact Week, then iterations to version 3.0 · 2026"],
      ["scope", "Responsive web (15 screens) and a mobile app concept (14 screens)"],
      ["status", "Validated with the client; the Traction Lab continued after my time at Designli"]
    ],
      chips: ["case study", "impact week", "validated with the client"], okChip: 2,
      cover, coverFilm: true,
      tools: [["Figma", "figma"], ["Claude Code", "claude"], ["Mobbin"]],
      challenge: { intro: "Brokers open the portal every morning to answer one question: who is most likely to sell, and why now? The portal had grown into a catalogue of tools:", list: ["about 60 places to go: 13 tabs, a drawer with 36 links and 22 tiles", "7+ AI assistants with different names", "two scores on the same contact: one for the property, one for the client"], end: "The platform was built to measure for a single user, who knew exactly where everything was, but it had no clear flows. We had {{5 days}} to show a direction the client could react to. Brokers are on the phone all day and not technical, so anything new had to feel familiar." },
      role: "{{I owned the product spec and the design}}. With the Solutions Architect I set the scope of the week and organized the two design workshops where we showed progress. I debriefed the request from the call transcripts, picked the points of value and decided how to move through a platform that large. Then I designed all of it: navigation, information architecture, success tests, the web platform, the mobile concept and the prototype, built with AI (vibe coding in HTML, CSS and JS, plus Mobbin MCP and skills) because an Impact Week only allows fast prototypes. The Tech Lead focused on the back end, and the Solutions Architect and an outside Design Lead reviewed my work.",
      research: { items: ["Three recorded walkthroughs of the current portal by the main broker (~90 min), turned into a gap analysis with every request, its timestamp and a priority (P1–P3).", "Workshops and design reviews with the client during the week.", "Five orientation documents the client shared after the first review. Version 3.0 follows them."], extraTitle: "the order of the work", extra: <Timeline lang={lang} /> },
      decisionsLead: tour("One morning, one owner: Today puts Daniel Marchetti first, his row opens into his case file, and Ask Brain docks beside it with the why now and its sources."),
      decisions: withFigs(decisions),
      decisionsTail: mobile("a phone app as field mode", "The same data, assistant and call loop on a 390 × 844 phone, limited to what makes sense in the street: Today, owners near me, approvals and the case file."),
      validation: { items: ["Client workshops and design reviews. The prototype went through three versions, each documented with what changed and why. After the first one, most of the change was iteration on details, layouts and quality, not structure.", "Internal design review: 69 screenshots, 13 screens, light and dark, 3 breakpoints. It caught a “Verified” card next to a disputed fact, fixed before the client saw it."], extra: <Tests lang={lang} /> },
      results: [["observed", "The client liked the first proposal and changed nothing. After the Impact Week {{he asked to continue}}: the project became a Traction Lab, I joined it for one full-time week, and the client sent five documents. The scope moved from an assistant to a platform for client details and tools that could scale to others in his office, and a mailing plan came in. Today became the first screen, with Approvals as its own view; labels stayed as they were."], ["expected", "The success tests are the targets for the first release."], ["measured", "None yet. I left the project after that week without a hand-off, so I don't know what shipped or how brokers use it."], ["next", "Time the Today loop with five brokers against the three success tests: one click to the first owner, two to log a missed call, and any area found at the first try."]],
      learn: ["{{Writing the success tests on day one}} made every review shorter: we argued about the tests, not about taste.", "The walkthrough recordings were worth more than any brief. The best ideas came from what the broker did, not what he asked for.", "{{He knew exactly where everything was}}: it was built to measure for him. That is why we changed the structure and kept his words.", "With so little time the result was good quality but could have been more my own, and the week should have started with more time on the client's real pain points."],
      legal: "A Designli project. Client names, brand, colors and data have been changed. Screens are from a prototype with fictional data. All rights belong to Designli and its client.",
    };
  }
  {
    const decisions: Decision[] = [
      { t: "un sidebar reemplazó 13 pestañas y un lanzador", because: "el mismo destino aparecía hasta en tres lugares. Los agrupé según lo que las grabaciones mostraban que abría primero y cuántos clics tomaba cada paso, contrastado con patrones de UX de paneles admin y CRM. Las vistas son pestañas dentro de una página, nunca ítems extra." },
      { t: "today pasó a ser donde empieza el día", because: "la primera pregunta del broker es “a quién llamo primero”, no “qué herramienta abro”.", ruled: "tres menús como primera vista. Mantenían la sensación de catálogo y dejaban la respuesta a un clic más." },
      { t: "un puntaje por edificio, un ranking por persona", because: "dos puntajes convivían sobre el mismo contacto: uno le decía al resto del equipo cómo estaba una propiedad y el otro calificaba al cliente. Cada uno tiene un lugar claro, uno por edificio y un ranking por persona." },
      { t: "confianza en cada dato", because: "los brokers repiten esta información en voz alta en las llamadas. Un dato nunca debe parecer más seguro que su evidencia." },
      { t: "un asistente, en todas partes", because: "el cliente nunca pidió siete asistentes; quería que Brain cumpliera la función y, con su modo de aprendizaje, entendiera la plataforma y respondiera bajo siete roles. Los roles viven en la barra del chat. Ninguno se descartó, solo se acomodó.", ruled: "el asistente como un área aparte. Los brokers tendrían que dejar su trabajo para usarlo, y no lo harían." },
      { t: "mantener su vocabulario", because: "cambiamos la estructura, no las palabras. Las etiquetas y el orden siguieron siendo los que ya usaban." },
    ];
    return {
      project: "Beacon — caso de estudio",
      subtitle: "un sidebar para 60 destinos",
      tldr: "Un broker inmobiliario comercial llevaba todo su día en una plataforma hecha a su medida: CRM, correo, llamadas, noticias, analíticas y más, crecida sin flujos claros. Primero nos pidieron rediseñar los flujos; en una Impact Week de 5 días rediseñé toda la plataforma. Unos 60 destinos de navegación pasaron a un solo sidebar agrupado, 7 roles de asistente se juntaron en un solo Brain y cada puntaje tiene ahora un lugar claro. {{El cliente aprobó la primera propuesta sin cambios}} y pidió seguir: el trabajo continuó como Traction Lab.",
      meta: [
      ["empresa", "Designli", true],
      ["rol", "Diseñador UX/UI, dueño del spec de producto"],
      ["equipo", "Tech Lead, Solutions Architect y yo; el Design Lead (fuera del proyecto) dio feedback"],
      ["duración", "Impact Week de 5 días, luego iteraciones hasta la versión 3.0 · 2026"],
      ["alcance", "Web responsive (15 pantallas) y concepto de app móvil (14 pantallas)"],
      ["estado", "Validado con el cliente; el Traction Lab siguió después de mi etapa en Designli"]
    ],
      chips: ["caso de estudio", "impact week", "validado con el cliente"], okChip: 2,
      cover, coverFilm: true,
      tools: [["Figma", "figma"], ["Claude Code", "claude"], ["Mobbin"]],
      challenge: { intro: "Los brokers abren el portal cada mañana para responder una pregunta: ¿quién tiene más probabilidad de vender, y por qué ahora? El portal se había vuelto un catálogo de herramientas:", list: ["unos 60 lugares a donde ir: 13 pestañas, un cajón con 36 enlaces y 22 mosaicos", "más de 7 asistentes de IA con nombres distintos", "dos puntajes sobre el mismo contacto: uno de la propiedad y otro del cliente"], end: "La plataforma estaba hecha a medida para un solo usuario, que sabía exactamente dónde estaba todo, pero no tenía flujos claros. Teníamos {{5 días}} para mostrar una dirección a la que el cliente pudiera reaccionar. Los brokers pasan el día al teléfono y no son técnicos, así que lo nuevo tenía que sentirse familiar." },
      role: "{{Fui dueño del spec de producto y del diseño}}. Con el Solutions Architect definí el alcance de la semana y organicé los dos workshops de diseño donde mostramos avances. Hice el debriefing del pedido con las transcripciones de las llamadas, hallé los puntos de valor y decidí cómo avanzar ante una plataforma tan grande. Luego diseñé todo: navegación, arquitectura de información, tests de éxito, la plataforma web, el concepto móvil y el prototipo, armado con IA (vibe coding en HTML, CSS y JS, más Mobbin MCP y skills) porque una Impact Week solo permite prototipos rápidos. El Tech Lead se enfocó en el back, y el Solutions Architect y un Design Lead externo revisaron mi trabajo.",
      research: { items: ["Tres walkthroughs grabados del portal actual por el broker principal (~90 min), convertidos en un análisis de brechas con cada pedido, su minuto y una prioridad (P1–P3).", "Workshops y design reviews con el cliente durante la semana.", "Cinco documentos de orientación que el cliente compartió tras la primera revisión. La versión 3.0 los sigue."], extraTitle: "el orden del trabajo", extra: <Timeline lang={lang} /> },
      decisionsLead: tour("Una mañana, un dueño: Today pone primero a Daniel Marchetti, su fila se abre en su ficha y Ask Brain se acopla al lado con el porqué y sus fuentes."),
      decisions: withFigs(decisions),
      decisionsTail: mobile("una app como modo de campo", "Los mismos datos, asistente y ciclo de llamada en un teléfono de 390 × 844, limitado a lo que tiene sentido en la calle: Today, dueños cerca, aprobaciones y la ficha."),
      validation: { items: ["Workshops y design reviews con el cliente. El prototipo pasó por tres versiones, cada una documentada con qué cambió y por qué. Después de la primera, casi todo el cambio fue iterar detalles, layouts y calidad, no la estructura.", "Design review interno: 69 capturas, 13 pantallas, claro y oscuro, 3 breakpoints. Detectó una tarjeta “Verified” junto a un dato en disputa, corregida antes de que la viera el cliente."], extra: <Tests lang={lang} /> },
      results: [["observado", "Al cliente le gustó la primera propuesta y no cambió nada. Tras la Impact Week {{pidió seguir}}: el proyecto pasó a Traction Lab, me sumé una semana a tiempo completo y el cliente envió cinco documentos. El alcance pasó de un asistente a una plataforma para el detalle de clientes y herramientas que escalara a otros de su oficina, y entró un plan de mailing. Today pasó a ser la primera pantalla, con Approvals como su propia vista; las etiquetas se mantuvieron."], ["esperado", "Los tests de éxito son los objetivos del primer release."], ["medido", "Nada aún. Dejé el proyecto tras esa semana sin un traspaso, así que no sé qué se lanzó ni cómo lo usan los brokers."], ["siguiente", "Medir el ciclo de Today con cinco brokers contra los tres tests de éxito: un clic al primer dueño, dos para registrar una llamada sin respuesta y cualquier área encontrada al primer intento."]],
      learn: ["{{Escribir los tests de éxito el primer día}} acortó cada revisión: discutíamos los tests, no gustos.", "Las grabaciones de los walkthroughs valieron más que cualquier brief. Las mejores ideas salieron de lo que el broker hacía, no de lo que pedía.", "{{Sabía exactamente dónde estaba todo}}: estaba hecha a su medida. Por eso cambiamos la estructura y mantuvimos sus palabras.", "Con tan poco tiempo salió algo de buena calidad, pero pudo ser más propio, y la semana debió empezar con más tiempo en los dolores reales del cliente."],
      legal: "Proyecto de Designli. Se cambiaron los nombres, la marca, los colores y los datos del cliente. Las pantallas son de un prototipo con datos ficticios. Todos los derechos pertenecen a Designli y su cliente.",
    };
  }
}

export default function CaseBeacon() {
  return <CaseLayout content={content} />;
}

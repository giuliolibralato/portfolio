"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { RubberTabs } from "./RubberTabs";
import { Shell, useSite } from "./Shell";
import { CallLoop, NavSprawl, OneBrain, OneScore, Phones, Timeline, Tests, Trust } from "./BeaconFigures";
import { CoverVideo } from "./CoverVideo";
import { Cursor } from "./Cursor";
import { T } from "@/lib/i18n";
import type { Lang } from "@/lib/data";

type Mode = "tldr" | "full";
const SECTIONS = ["challenge", "role", "research", "decisions", "validation", "results", "learnings"] as const;
const TLDR_SECTIONS = new Set(["challenge", "role", "decisions", "results", "learnings"]);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const IMG = `${BASE}/cases/beacon`;

const rise = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const } },
};

type Copy = {
  back: string; type: string; title: string; tldr: string;
  meta: [string, string][];
  challengeH: string; challenge: string; challengeList: string[]; challengeEnd: string;
  roleH: string; role: string;
  researchH: string; research: string[];
  beforeAfter: string; before: string; after: string;
  decisionsH: string; decisions: { t: string; because: string; ruled?: string }[];
  ruledL: string;
  loopCap: string; darkCap: string; mobileH: string; mobile: string;
  validationH: string; validation: string[];
  resultsH: string; results: [string, string][];
  learnH: string; learn: string[];
  legal: string; next: string;
  nav: Record<(typeof SECTIONS)[number], string>; work: string; chips: string[]; mode: Record<Mode, string>;
};

const C: Record<Lang, Copy> = {
  en: {
    back: "giulio libralato",
    type: "case study · impact week · 2026",
    title: "one sidebar for 60 destinations",
    tldr: "A commercial real-estate brokerage asked us to redesign the internal portal its brokers use to decide who to call. In a 5-day Impact Week I turned about 60 navigation destinations into one grouped sidebar, merged 7+ AI assistants into one, and replaced two conflicting scores with one score per building. {{The client asked to keep going}}: the work continued as a Traction Lab.",
    meta: [
      ["role", "UX/UI designer, owner of the product spec"],
      ["team", "Tech Lead, Solutions Architect and me"],
      ["timeline", "5-day Impact Week, then iterations to version 3.0 · 2026"],
      ["scope", "Responsive web (15 screens) and a mobile app concept (14 screens)"],
      ["status", "Validated with the client; the Traction Lab continued after my time at Designli"],
    ],
    challengeH: "the problem",
    challenge: "Brokers open the portal every morning to answer one question: who is most likely to sell, and why now? The portal had grown into a catalogue of tools:",
    challengeList: ["about 60 places to go: 13 tabs, a drawer with 36 links and 22 tiles", "7+ AI assistants with different names", "two scores that disagreed for the same contact"],
    challengeEnd: "We had {{5 days}} to show a direction the client could react to. Brokers are on the phone all day and not technical, so anything new had to feel familiar.",
    roleH: "my role",
    role: "{{I owned the product spec and the design}}, from the first walkthrough to the prototype: navigation, information architecture, success tests, the web platform, the mobile concept and the interactive prototype. The Tech Lead and Solutions Architect shaped the technical proposal.",
    researchH: "research",
    research: ["Three recorded walkthroughs of the current portal by the main broker (~90 min), turned into a gap analysis with every request, its timestamp and a priority (P1–P3).", "Workshops and design reviews with the client during the week.", "Five orientation documents the client shared after the first review. Version 3.0 follows them."],
    beforeAfter: "before and after",
    before: "before · the current portal, a grid of tools",
    after: "after · Today, where the day starts",
    decisionsH: "key decisions",
    ruledL: "ruled out",
    decisions: [
      { t: "one sidebar replaced 13 tabs and a launcher", because: "the same destination appeared in up to three places. Grouped in the broker's own order; views are tabs inside a page, never extra sidebar items." },
      { t: "today became the place where the day starts", because: "the broker's first question is “who do I call first”, not “which tool do I open”.", ruled: "three menus as the first view. They kept the catalogue feeling and pushed the answer one click away." },
      { t: "one score per building, one rank per person", because: "two scores for the same contact made brokers distrust both." },
      { t: "trust on every claim", because: "brokers repeat this information out loud on calls. A claim should never look more certain than its evidence." },
      { t: "one assistant, everywhere", because: "seven assistants with different names split the same job.", ruled: "the assistant as a separate area. Brokers would have to leave their work to use it, and they wouldn't." },
      { t: "keep their vocabulary", because: "we changed the structure, not the words. Labels and order stayed the ones brokers already use." },
    ],
    loopCap: "One morning, one owner: Daniel Marchetti from Today to the database, the side peek, his case file, Brain, the calendar and his email.",
    darkCap: "Light and dark, one family of screens.",
    mobileH: "a phone app as field mode",
    mobile: "The same data, assistant and call loop on a 390 × 844 phone, limited to what makes sense in the street: Today, owners near me, approvals and the case file.",
    validationH: "validation",
    validation: ["Client workshops and design reviews. The prototype went through three versions, each documented with what changed and why.", "Internal design review: 69 screenshots, 13 screens, light and dark, 3 breakpoints. It caught a “Verified” card next to a disputed fact, fixed before the client saw it."],
    resultsH: "results",
    results: [["observed", "After the Impact Week {{the client asked to continue}}: the project became a Traction Lab, and the client sent the documents that shaped version 3.0."], ["expected", "The success tests are the targets for the first release."], ["measured", "None yet. I didn’t get to continue into the Traction Lab, so I have no post-launch numbers."]],
    learnH: "what i learned",
    learn: ["{{Writing the success tests on day one}} made every review shorter: we argued about the tests, not about taste.", "The walkthrough recordings were worth more than any brief. The best ideas came from what the broker did, not what he asked for."],
    legal: "Client names, brand, colors and data have been changed. Screens are from a prototype with fictional data. All rights belong to Designli and its client.",
    next: "back to all work",
    nav: { challenge: "challenge", role: "my role", research: "research", decisions: "decisions", validation: "validation", results: "results", learnings: "learnings" },
    work: "work",
    chips: ["case study", "impact week", "validated with the client"],
    mode: { tldr: "tl;dr", full: "full case" },
  },
  es: {
    back: "giulio libralato",
    type: "caso de estudio · impact week · 2026",
    title: "un sidebar para 60 destinos",
    tldr: "Una corredora inmobiliaria comercial nos pidió rediseñar el portal interno que usan sus brokers para decidir a quién llamar. En una Impact Week de 5 días convertí unos 60 destinos de navegación en un solo sidebar agrupado, uní más de 7 asistentes de IA en uno y reemplacé dos puntajes que se contradecían por un puntaje por edificio. {{El cliente pidió seguir}}: el trabajo continuó como Traction Lab.",
    meta: [
      ["rol", "Diseñador UX/UI, dueño del spec de producto"],
      ["equipo", "Tech Lead, Solutions Architect y yo"],
      ["duración", "Impact Week de 5 días, luego iteraciones hasta la versión 3.0 · 2026"],
      ["alcance", "Web responsive (15 pantallas) y concepto de app móvil (14 pantallas)"],
      ["estado", "Validado con el cliente; el Traction Lab siguió después de mi etapa en Designli"],
    ],
    challengeH: "el problema",
    challenge: "Los brokers abren el portal cada mañana para responder una pregunta: ¿quién tiene más probabilidad de vender, y por qué ahora? El portal se había vuelto un catálogo de herramientas:",
    challengeList: ["unos 60 lugares a donde ir: 13 pestañas, un cajón con 36 enlaces y 22 mosaicos", "más de 7 asistentes de IA con nombres distintos", "dos puntajes que se contradecían para el mismo contacto"],
    challengeEnd: "Teníamos {{5 días}} para mostrar una dirección a la que el cliente pudiera reaccionar. Los brokers pasan el día al teléfono y no son técnicos, así que lo nuevo tenía que sentirse familiar.",
    roleH: "mi rol",
    role: "{{Fui dueño del spec de producto y del diseño}}, del primer walkthrough al prototipo: navegación, arquitectura de información, tests de éxito, la plataforma web, el concepto móvil y el prototipo interactivo. El Tech Lead y el Solutions Architect definieron la propuesta técnica.",
    researchH: "investigación",
    research: ["Tres walkthroughs grabados del portal actual por el broker principal (~90 min), convertidos en un análisis de brechas con cada pedido, su minuto y una prioridad (P1–P3).", "Workshops y design reviews con el cliente durante la semana.", "Cinco documentos de orientación que el cliente compartió tras la primera revisión. La versión 3.0 los sigue."],
    beforeAfter: "antes y después",
    before: "antes · el portal actual, una grilla de herramientas",
    after: "después · Today, donde empieza el día",
    decisionsH: "decisiones clave",
    ruledL: "descartado",
    decisions: [
      { t: "un sidebar reemplazó 13 pestañas y un lanzador", because: "el mismo destino aparecía hasta en tres lugares. Agrupado en el orden del broker; las vistas son pestañas dentro de una página, nunca ítems extra." },
      { t: "today pasó a ser donde empieza el día", because: "la primera pregunta del broker es “a quién llamo primero”, no “qué herramienta abro”.", ruled: "tres menús como primera vista. Mantenían la sensación de catálogo y dejaban la respuesta a un clic más." },
      { t: "un puntaje por edificio, un ranking por persona", because: "dos puntajes para el mismo contacto hacían que no confiaran en ninguno." },
      { t: "confianza en cada dato", because: "los brokers repiten esta información en voz alta en las llamadas. Un dato nunca debe parecer más seguro que su evidencia." },
      { t: "un asistente, en todas partes", because: "siete asistentes con nombres distintos se repartían el mismo trabajo.", ruled: "el asistente como un área aparte. Los brokers tendrían que dejar su trabajo para usarlo, y no lo harían." },
      { t: "mantener su vocabulario", because: "cambiamos la estructura, no las palabras. Las etiquetas y el orden siguieron siendo los que ya usaban." },
    ],
    loopCap: "Una mañana, un dueño: Daniel Marchetti desde Today a la base de datos, el panel lateral, su ficha, Brain, el calendario y su email.",
    darkCap: "Claro y oscuro, una sola familia de pantallas.",
    mobileH: "una app como modo de campo",
    mobile: "Los mismos datos, asistente y ciclo de llamada en un teléfono de 390 × 844, limitado a lo que tiene sentido en la calle: Today, dueños cerca, aprobaciones y la ficha.",
    validationH: "validación",
    validation: ["Workshops y design reviews con el cliente. El prototipo pasó por tres versiones, cada una documentada con qué cambió y por qué.", "Design review interno: 69 capturas, 13 pantallas, claro y oscuro, 3 breakpoints. Detectó una tarjeta “Verified” junto a un dato en disputa, corregida antes de que la viera el cliente."],
    resultsH: "resultados",
    results: [["observado", "Tras la Impact Week {{el cliente pidió seguir}}: el proyecto pasó a Traction Lab y el cliente envió los documentos que dieron forma a la versión 3.0."], ["esperado", "Los tests de éxito son los objetivos del primer release."], ["medido", "Nada aún. No llegué a continuar en el Traction Lab, así que no tengo números después del lanzamiento."]],
    learnH: "lo que aprendí",
    learn: ["{{Escribir los tests de éxito el primer día}} acortó cada revisión: discutíamos los tests, no gustos.", "Las grabaciones de los walkthroughs valieron más que cualquier brief. Las mejores ideas salieron de lo que el broker hacía, no de lo que pedía."],
    legal: "Se cambiaron los nombres, la marca, los colores y los datos del cliente. Las pantallas son de un prototipo con datos ficticios. Todos los derechos pertenecen a Designli y su cliente.",
    next: "volver a todo el trabajo",
    nav: { challenge: "problema", role: "mi rol", research: "investigación", decisions: "decisiones", validation: "validación", results: "resultados", learnings: "aprendizajes" },
    work: "trabajo",
    chips: ["caso de estudio", "impact week", "validado con el cliente"],
    mode: { tldr: "tl;dr", full: "caso completo" },
  },
};

// Darina's inline highlight: {{text}} in the copy is marked in the visitor's cursor color
function rich(s: string) {
  return s.split(/\{\{(.+?)\}\}/).map((part, i) => (i % 2 ? <mark key={i} className="hl">{part}</mark> : part));
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function CaseBeacon() {
  const site = useSite();
  const { lang } = site;
  const [mode, setMode] = useState<Mode>("full");
  useEffect(() => {
    const m = localStorage.getItem("caseMode");
    if (m === "tldr" || m === "full") setMode(m);
  }, []);
  const pickMode = (m: Mode) => { setMode(m); localStorage.setItem("caseMode", m); };

  const c = C[lang];
  const t = T[lang];
  const es = lang === "es";
  const full = mode === "full";
  const nav = SECTIONS.filter((id) => full || TLDR_SECTIONS.has(id)).map((id) => ({ id, label: c.nav[id] }));
  const decisions = full ? c.decisions : c.decisions.slice(0, 3);

  // the figure that supports each decision, shown right after it (full case only)
  const after: React.ReactNode[] = [
    <NavSprawl key="nav" lang={lang} />,
    <>
      <CallLoop lang={lang} />
    </>,
    <OneScore key="score" lang={lang} />,
    <Trust key="trust" lang={lang} />,
    <OneBrain key="brain" lang={lang} />,
    null,
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="has-cursor">
        <Cursor color={site.cursor} labels={{ visitor: t.visitor, view: t.view, visit: t.visit }} enabled />
        <Shell site={site} nav={nav} brandHref={`${BASE}/`} back={{ href: `${BASE}/#work`, label: c.work }}>
          <main className="inner case-inner">
            <motion.header className="case-head" initial="hidden" animate="show" transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}>
              <motion.div variants={rise} className="case-bar">
                <div className="chips-row">
                  {c.chips.map((x, i) => <span key={x} className={`tag small${i === 2 ? " ok" : ""}`}>{i === 2 && <i className="dot-ok" aria-hidden="true" />}{x}</span>)}
                </div>
                <RubberTabs items={["tldr", "full"] as Mode[]} value={mode} onChange={pickMode} label="case length" labelsKey={lang} render={(m) => c.mode[m]} />
              </motion.div>
              <motion.h1 variants={rise} className="case-title">{c.title}</motion.h1>
              <motion.p variants={rise} className="lead">{rich(c.tldr)}</motion.p>
              <motion.div variants={rise} className="meta">
                {c.meta.map(([k, v]) => (
                  <div key={k} className="xrow"><span className="label">{k}</span><span>{v}</span></div>
                ))}
              </motion.div>
              <motion.div variants={rise} className="cover hero-cover film-cover">
                <CoverVideo src={`${IMG}/cover`} poster={`${IMG}/cover-poster.webp`} label={es ? "Today se arma al abrir la plataforma" : "Today composing itself as the platform opens"} />
              </motion.div>
            </motion.header>

            <div className="case-body">
              <section id="challenge" className="case-sec">
                <h2 className="h2">{c.challengeH}</h2>
                <p>{c.challenge}</p>
                <ul className="list">{c.challengeList.map((x) => <li key={x}>{x}</li>)}</ul>
                <p>{rich(c.challengeEnd)}</p>
              </section>

              <section id="role" className="case-sec">
                <h2 className="h2">{c.roleH}</h2>
                <p>{rich(c.role)}</p>
              </section>

              <AnimatePresence initial={false}>
                {full && (
                  <motion.section key="research" id="research" className="case-sec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.2 }}>
                    <h2 className="h2">{c.researchH}</h2>
                    <ol className="list num">{c.research.map((x) => <li key={x}>{x}</li>)}</ol>
                    <h3 className="sub">{es ? "el orden del trabajo" : "the order of the work"}</h3>
                    <Timeline lang={lang} />
                  </motion.section>
                )}
              </AnimatePresence>

              <section id="decisions" className="case-sec">
                <h2 className="h2">{c.decisionsH}</h2>
                {full && (
                  <figure className="frame-fig tour-fig">
                    <div className="cover film-cover"><CoverVideo src={`${IMG}/tour`} poster={`${IMG}/tour-poster.webp`} label={c.loopCap} /></div>
                    <figcaption className="small muted">{c.loopCap}</figcaption>
                  </figure>
                )}
                {decisions.map((d, i) => (
                  <div key={d.t} className="decision-group">
                    <div className="decision">
                      <h3>{d.t}</h3>
                      <p>{cap(d.because)}</p>
                      {d.ruled && <p className="muted">{cap(c.ruledL)}: {d.ruled}</p>}
                    </div>
                    {full && after[i]}
                  </div>
                ))}
                {full && (
                  <div className="decision-group">
                    <h3 className="sub">{c.mobileH}</h3>
                    <p>{c.mobile}</p>
                    <Phones lang={lang} />
                  </div>
                )}
              </section>

              <AnimatePresence initial={false}>
                {full && (
                  <motion.section key="validation" id="validation" className="case-sec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.2 }}>
                    <h2 className="h2">{c.validationH}</h2>
                    <ul className="list">{c.validation.map((x) => <li key={x}>{x}</li>)}</ul>
                    <Tests lang={lang} />
                  </motion.section>
                )}
              </AnimatePresence>

              <section id="results" className="case-sec">
                <h2 className="h2">{c.resultsH}</h2>
                {c.results.map(([k, v]) => (
                  <p key={k}><span className="muted">{cap(k)}. </span>{rich(v)}</p>
                ))}
              </section>

              <section id="learnings" className="case-sec">
                <h2 className="h2">{c.learnH}</h2>
                {c.learn.map((x) => <p key={x}>{rich(x)}</p>)}
              </section>

              <p className="small muted legal">{c.legal}</p>
              <a href={`${BASE}/#work`} className="bl">← {c.next}</a>
            </div>
          </main>
        </Shell>
      </div>
    </MotionConfig>
  );
}

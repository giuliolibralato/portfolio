"use client";

import { motion } from "motion/react";
import type { Lang } from "@/lib/data";

// Figures for the Beacon case. One pattern for all of them (DESIGN.md "Imagen con caption"):
// a --card frame, real crops of the prototype inside, a mono label per side and a plain caption.

const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/cases/beacon`;
const rise = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const } },
};
const view = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.3 } } as const;

function Frame({ caption, children, className = "" }: { caption: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className="frame-fig">
      <motion.div className={`frame ${className}`} {...view} transition={{ staggerChildren: 0.08 }}>{children}</motion.div>
      <figcaption className="small muted">{caption}</figcaption>
    </figure>
  );
}

function Pane({ label, children, accent }: { label: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <motion.div variants={rise} className="pane">
      <span className={`mono pane-l${accent ? " on" : ""}`}>{label}</span>
      {children}
    </motion.div>
  );
}

const Crop = ({ src, alt }: { src: string; alt: string }) => <img className="crop" src={`${IMG}/${src}`} alt={alt} loading="lazy" decoding="async" />;

/* 1 · ~60 destinations → one sidebar in five groups */
export function NavSprawl({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <Frame className="cols-nav" caption={es ? "El mismo destino aparecía hasta en tres lugares. Ahora cada uno está una sola vez, en el orden del broker." : "The same destination appeared in up to three places. Now each one appears once, in the broker's order."}>
      <Pane label={es ? "antes · 13 pestañas, 36 enlaces, 22 mosaicos" : "before · 13 tabs, 36 links, 22 tiles"}>
        <Crop src="old-home.webp" alt={es ? "Portal anterior: una grilla de mosaicos" : "Legacy portal: a grid of tiles"} />
      </Pane>
      <Pane accent label={es ? "después · 1 sidebar, 5 grupos" : "after · 1 sidebar, 5 groups"}>
        <Crop src="today-light.webp" alt={es ? "Plataforma nueva: un sidebar agrupado con Today primero" : "New platform: one grouped sidebar with Today first"} />
      </Pane>
    </Frame>
  );
}

/* 2 · the daily loop, with the success tests where they apply */
export function CallLoop({ lang }: { lang: Lang }) {
  const es = lang === "es";
  const steps: [string, string?][] = es
    ? [["Today", "1 clic, menos de 10 s"], ["Por qué ahora"], ["Llamar"], ["Registrar resultado", "2 clics si no contesta"], ["Siguiente dueño"]]
    : [["Today", "1 click, under 10 s"], ["Why now"], ["Call"], ["Log outcome", "2 clicks for no answer"], ["Next owner"]];
  return (
    <Frame className="steps-frame" caption={es ? "El ciclo que se repite todo el día. Los dos tests de éxito miden los pasos marcados." : "The loop brokers repeat all day. The two success tests measure the marked steps."}>
      <ol className="steps">
        {steps.map(([s, test], i) => (
          <motion.li key={s} variants={rise} className={test ? "on" : ""}>
            <span className="mono pane-l">{String(i + 1).padStart(2, "0")}</span>
            <b>{s}</b>
            {test && <span className="small step-t">{test}</span>}
          </motion.li>
        ))}
      </ol>
    </Frame>
  );
}

/* 3 · seven assistants → one */
export function OneBrain({ lang }: { lang: Lang }) {
  const es = lang === "es";
  const roles = ["Assistant", "Data Scientist", "Marketing Coordinator", "Investigative Reporter", "Cartographer", "Contact Intelligence", "AI review"];
  return (
    <Frame className="cols-brain" caption={es ? "Un solo asistente con un historial. Los nombres de rol del cliente quedan como etiqueta de contexto." : "One assistant with one history. The client's role names stay as a context label."}>
      <Pane label={es ? "antes · 7 asistentes" : "before · 7 assistants"}>
        <ul className="roles">{roles.map((r) => <li key={r}>{r}</li>)}</ul>
      </Pane>
      <Pane accent label={es ? "después · uno, con fuentes" : "after · one, with sources"}>
        <Crop src="brain-answer.webp" alt={es ? "Brain responde con 12 dueños, los criterios y sus fuentes" : "Brain answers with 12 owners, the criteria and its sources"} />
      </Pane>
    </Frame>
  );
}

/* 4 · two scores that disagreed → one score per building, one rank per person */
export function OneScore({ lang }: { lang: Lang }) {
  const es = lang === "es";
  return (
    <Frame className="rows" caption={es ? "Antes, dos puntajes para la misma persona; uno ni siquiera cargaba. Ahora, un ranking por persona y un puntaje por edificio." : "Before, two scores for the same person; one didn't even load. Now, one rank per person and one score per building."}>
      <Pane label={es ? "antes · predictive score y signal score" : "before · predictive score and signal score"}>
        <Crop src="score-before.webp" alt="NaN predictive score, 95 signal score" />
      </Pane>
      <Pane accent label={es ? "después · rank 1, 118 Ludlow St · 88" : "after · rank 1, 118 Ludlow St · 88"}>
        <Crop src="score-after.webp" alt={es ? "Rank 1 y puntaje 88 del edificio 118 Ludlow St" : "Rank 1 and building score 88 for 118 Ludlow St"} />
      </Pane>
    </Frame>
  );
}

/* 5 · trust labels in context, plus the four states */
export function Trust({ lang }: { lang: Lang }) {
  const es = lang === "es";
  const items: [string, string, string][] = [
    ["Verified", "ok", es ? "dos fuentes coinciden" : "two sources agree"],
    ["Single source", "warn", es ? "una sola fuente" : "one source only"],
    ["Stale", "mute", es ? "dato antiguo" : "out of date"],
    ["Disputed", "bad", es ? "las fuentes chocan" : "sources conflict"],
  ];
  return (
    <Frame className="cols-trust" caption={es ? "Cada dato dice qué tan seguro es, siempre con color, palabra e ícono." : "Every claim says how sure it is, always with color, word and icon."}>
      <Pane accent label={es ? "en la lista de Today" : "in Today's list"}>
        <Crop src="trust-rows.webp" alt={es ? "Filas de Today con las etiquetas Verified y Single source" : "Today rows with Verified and Single source labels"} />
      </Pane>
      <Pane label={es ? "los cuatro estados" : "the four states"}>
        <ul className="states">
          {items.map(([w, k, d]) => (
            <li key={w}><span className={`state ${k}`}>{w}</span><span className="small muted">{d}</span></li>
          ))}
        </ul>
      </Pane>
    </Frame>
  );
}

/* 6 · the success tests, as metrics (DESIGN.md "Métrica") */
export function Tests({ lang }: { lang: Lang }) {
  const es = lang === "es";
  const t: [string, string][] = es
    ? [["1 clic", "para llegar al primer dueño, en menos de 10 s"], ["2 clics", "para registrar una llamada sin respuesta"], ["1er intento", "para encontrar cualquier área desde el sidebar"]]
    : [["1 click", "to reach the first owner, in under 10 s"], ["2 clicks", "to log an unanswered call"], ["1st try", "to find any area from the sidebar"]];
  return (
    <motion.div className="metrics" {...view} transition={{ staggerChildren: 0.08 }}>
      {t.map(([a, b]) => (
        <motion.div key={a} variants={rise}>
          <span className="metric">{a}</span>
          <span className="small muted">{b}</span>
        </motion.div>
      ))}
      <span className="mono pane-l metrics-note">{es ? "objetivos · pantalla 1440 × 900, sin guía · aún no medidos" : "targets · 1440 × 900 screen, no guidance · not yet measured"}</span>
    </motion.div>
  );
}

/* 7 · the order the work went in */
export function Timeline({ lang }: { lang: Lang }) {
  const es = lang === "es";
  const t: [string, string][] = es
    ? [["Rediseño", "la dirección visual y el shell"], ["Reorden", "60 destinos en un sidebar"], ["Today", "donde empieza el día"], ["Approvals", "nada sale sin su clic"], ["Database", "contactos, propiedades y limpieza"], ["Email y texting", "los canales"]]
    : [["Redesign", "the visual direction and shell"], ["Reorder", "60 destinations into one sidebar"], ["Today", "where the day starts"], ["Approvals", "nothing goes out without a click"], ["Database", "contacts, properties and cleaning"], ["Email and texting", "the channels"]];
  return (
    <motion.ol className="steps tl" {...view} transition={{ staggerChildren: 0.08 }}>
      {t.map(([a, b]) => (
        <motion.li key={a} variants={rise}>
          <b>{a}</b>
          <span className="small muted">{b}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

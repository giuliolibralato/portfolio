"use client";

import { motion } from "motion/react";
import type { Lang } from "@/lib/data";
import { Crop as Img, Frame, Metrics, Pane, Steps, imgBase, rise, view } from "./Figure";

// Figures for the Beacon case. One pattern for all of them (DESIGN.md "Imagen con caption"):
// a --card frame, real crops of the prototype inside, a mono label per side and a plain caption.

const IMG = imgBase("beacon");
const Crop = ({ src, alt }: { src: string; alt: string }) => <Img src={`${IMG}/${src}`} alt={alt} />;

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
    <Frame className="cols-brain" caption={es ? "Un solo asistente con un historial. Los roles del cliente pasan a ser un selector en el chat: en Auto, cada página elige el suyo." : "One assistant with one history. The client's roles become a picker in the chat: on Auto, each page picks its own."}>
      <Pane label={es ? "antes · 7 asistentes" : "before · 7 assistants"}>
        <ul className="roles">{roles.map((r) => <li key={r}>{r}</li>)}</ul>
      </Pane>
      <Pane accent label={es ? "después · uno, con el rol como contexto" : "after · one, with the role as context"}>
        <Crop src="brain-roles.webp" alt={es ? "El selector de rol en el chat de Brain: Auto, Assistant, Data Scientist, Cartographer, Marketing Coordinator e Investigative Reporter" : "The role picker in Brain's chat: Auto, Assistant, Data Scientist, Cartographer, Marketing Coordinator and Investigative Reporter"} />
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
  return lang === "es"
    ? <Metrics label="objetivos · pantalla 1440 × 900, sin guía" items={[["1 clic", "para llegar al primer dueño, en menos de 10\u00a0s"], ["2 clics", "para registrar una llamada sin respuesta"], ["1er intento", "para encontrar cualquier área desde el sidebar"]]} caption="Los tests de éxito que escribí el primer día. Son objetivos: todavía no se midieron con usuarios." />
    : <Metrics label="targets · 1440 × 900 screen, no guidance" items={[["1 click", "to reach the first owner, in under 10\u00a0s"], ["2 clicks", "to log an unanswered call"], ["1st try", "to find any area from the sidebar"]]} caption="The success tests I wrote on day one. They are targets: not yet measured with users." />;
}

/* 7 · the order the work went in */
export function Timeline({ lang }: { lang: Lang }) {
  return <Steps items={lang === "es"
    ? [["Rediseño", "la dirección visual y el shell"], ["Reorden", "60 destinos en un sidebar"], ["Today", "donde empieza el día"], ["Approvals", "nada sale sin su clic"], ["Database", "contactos, propiedades y limpieza"], ["Email y texting", "los canales"]]
    : [["Redesign", "the visual direction and shell"], ["Reorder", "60 destinations into one sidebar"], ["Today", "where the day starts"], ["Approvals", "nothing goes out without a click"], ["Database", "contacts, properties and cleaning"], ["Email and texting", "the channels"]]} />;
}

/* 8 · the phone app as field mode: three screens, label above each */
export function Phones({ lang }: { lang: Lang }) {
  const es = lang === "es";
  const screens: [string, string, string][] = [
    ["app-today.webp", "today", es ? "Today en el teléfono" : "Today on the phone"],
    ["app-near.webp", es ? "cerca de mí" : "near me", es ? "Dueños cerca, el más cercano primero" : "Owners nearby, closest first"],
    ["app-contact.webp", es ? "ficha" : "case file", es ? "Ficha de Daniel Marchetti con su why now" : "Daniel Marchetti's case file with its why now"],
  ];
  return (
    <Frame className="cols-phones" caption={es ? "Lo mismo que en la web, recortado a lo que sirve caminando: a quién llamar, quién está cerca y por qué ahora." : "The same as the web, cut down to what helps on foot: who to call, who is nearby and why now."}>
      {screens.map(([src, label, alt]) => (
        <Pane key={src} label={label}><img className="crop phone" src={`${IMG}/${src}`} alt={alt} loading="lazy" decoding="async" /></Pane>
      ))}
    </Frame>
  );
}

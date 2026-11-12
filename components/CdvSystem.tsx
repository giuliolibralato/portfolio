"use client";

import { motion } from "motion/react";
import { rise, view } from "./Figure";

// Camino de Vida's design style, rebuilt from the token sheet: text colors, grounds and the Inter scale.
// It keeps the site's own warm ground whatever the portfolio theme is.

type Tok = [string, string, string, string]; // name es, name en, value, use es | use en joined by "|"

const TEXT: Tok[] = [
  ["primario", "primary", "#2A2A2A", "headings, cuerpo y botones secundarios|headings, body and secondary buttons"],
  ["primario alt", "primary alt", "#404040", "subtítulos, descripciones e íconos|subtitles, descriptions and icons"],
  ["primario default", "primary default", "#9D9C99", "opciones de menú no seleccionadas|unselected menu options"],
  ["muteado", "muted", "#929292", "leyendas, placeholders, íconos menores|captions, placeholders, minor icons"],
];
const GROUND: Tok[] = [
  ["fondo básico", "base ground", "#F0EEE9", "todas las páginas|every page"],
  ["fondo secundario", "secondary ground", "#FFFFFF", "menús|menus"],
  ["fondo muteado", "muted ground", "#C9C7C0", "estados deshabilitados|disabled states"],
  ["básico invertido", "base inverted", "#2A2A2A", "páginas en oscuro|dark pages"],
  ["secundario invertido", "secondary inverted", "#111111", "footers|footers"],
  ["muteado invertido", "muted inverted", "#6C6C6C", "deshabilitado en oscuro|disabled on dark"],
];

function Sw({ t, es }: { t: Tok; es: boolean }) {
  const [a, b, hex, use] = t;
  const [ue, ui] = use.split("|");
  return (
    <div className="cs-sw"><i style={{ background: hex }} /><b>{es ? a : b}</b><span className="mono">{hex}</span><span className="cs-use">{es ? ue : ui}</span></div>
  );
}

export function CdvSystem({ es }: { es: boolean }) {
  return (
    <figure className="frame-fig">
      <motion.div className="frame cdv-sys" {...view} transition={{ staggerChildren: 0.06 }}>
        <motion.div variants={rise} className="cs-col">
          <span className="mono pane-l">{es ? "texto · sobre fondo claro" : "text · on a light ground"}</span>
          {TEXT.map((t) => <Sw key={t[0]} t={t} es={es} />)}
          <div className="cs-inv">
            <span className="mono">{es ? "invertido · sobre oscuro" : "inverted · on dark"}</span>
            <div>{[1, 0.86, 0.62, 0.45].map((o) => <i key={o} style={{ color: `rgba(255,255,255,${o})` }}>Aa</i>)}</div>
          </div>
        </motion.div>
        <motion.div variants={rise} className="cs-col">
          <span className="mono pane-l">{es ? "fondos · estándar e invertidos" : "grounds · standard and inverted"}</span>
          {GROUND.map((t) => <Sw key={t[0]} t={t} es={es} />)}
        </motion.div>
        <motion.div variants={rise} className="cs-col cs-type">
          <span className="mono pane-l">{es ? "tipografía · solo inter" : "type · inter only"}</span>
          <p className="cs-rule">{es ? "headings en minúscula, cuerpo con mayúscula inicial" : "headings in lowercase, body in sentence case"}</p>
          <div className="cs-d1">display large<span className="mono">96 / 90 · −2</span></div>
          <div className="cs-d2">display small<span className="mono">60 / 54 · −2</span></div>
          <div className="cs-hs">{["h1", "h2", "h3", "h4", "h5", "h6"].map((h, i) => <span key={h} style={{ fontSize: 22 - i * 2.6 }}>{h}</span>)}</div>
          <span className="cs-note">{es ? "6 niveles en desktop y 7 en mobile, con los mismos nombres" : "6 levels on desktop and 7 on mobile, under the same names"}</span>
        </motion.div>
      </motion.div>
      <figcaption className="small muted">{es ? "Todo neutro, a propósito: el color lo pone el arte de cada ministerio. Cada token dice para qué se usa, no solo cuál es su valor." : "All neutral, on purpose: the color comes from each ministry's art. Every token says what it is for, not just its value."}</figcaption>
    </figure>
  );
}

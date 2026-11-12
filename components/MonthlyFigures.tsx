"use client";

import { motion } from "motion/react";
import { Notes, rise, view } from "./Figure";

// Where Monthly Budget's design comes from: the pattern in the app, the kind of tool it resembles, and why it fits.

type Ref = [string, string, string, string, string, string]; // pattern es/en, like, why es/en, where es

const REFS: Ref[] = [
  ["filas agrupadas por categoría, con estado y conteo", "rows grouped by category, with status and counts", "Notion · Linear", "una lista de tareas ordena muchas filas sin perder el total de cada grupo", "an issue list keeps many rows in order without losing each group's total", "Presupuesto"],
  ["franja de cifras arriba: neto, disponible, asignado", "a strip of figures on top: net, available, assigned", "Stripe · Mercury", "los tableros financieros dicen el estado antes del detalle", "finance dashboards give the state before the detail", "Presupuesto"],
  ["“Sin asignar” y “Repartir saldo”", "“Unassigned” and “Split the rest”", "YNAB", "cada sol con un destino: lo que falta asignar siempre se ve", "every sol gets a job: what is left to assign always shows", "Presupuesto"],
  ["una columna por tienda, lado a lado", "one column per store, side by side", "tableros tipo Trello", "comparar es leer en horizontal; cada tienda es una columna", "comparing reads across; each store is a column", "Comparar precios"],
  ["mes en cuadrícula con comidas por día", "a month grid with meals per day", "Google Calendar · Notion Calendar", "un calendario que ya conocemos, no uno nuevo que aprender", "a calendar we already know, not a new one to learn", "Plan de comidas"],
  ["recetas como tarjetas con etiquetas", "recipes as cards with tags", "galería de Notion", "se elige mirando: tiempo, kcal y costo de un vistazo", "you choose by looking: time, kcal and cost at a glance", "Recetas"],
];

export function MonthlyRefs({ es }: { es: boolean }) {
  const items: [string, string, string][] = REFS.map(([pe, pi, like, we, wi, where]) => [where, es ? pe : pi, `${es ? "Como en" : "Like"} ${like}: ${es ? we : wi}.`]);
  return <Notes label={es ? "de dónde sale cada patrón" : "where each pattern comes from"} items={items}
    caption={es ? "Estudié referentes en Mobbin mientras construía. No quedó registro de qué pantallas exactas, así que aquí van los patrones a los que se parece cada parte." : "I studied references on Mobbin while building. There is no record of the exact screens, so these are the patterns each part resembles."} />;
}

const TAGS = ["#8a37c2", "#b85708", "#0c7c90", "#b52a6d", "#1a8a4c", "#2f5fd0", "#9a6a00", "#555a66"];
const TAGB = ["#f3ebfd", "#fdf0e6", "#e4f4f7", "#fdebf3", "#e7f6ed", "#e9f0fe", "#fcf3dc", "#eef0f3"];

export function MonthlySystem({ es }: { es: boolean }) {
  const states: [string, string, string, string][] = es
    ? [["Pagado", "#1a8a4c", "#e7f6ed", "hecho"], ["Pendiente", "#46484f", "#f1f1f3", "por hacer"], ["Sin asignar", "#a86b00", "#fdf4e1", "aviso"], ["Excedido", "#d23f33", "#fdeeed", "error"]]
    : [["Paid", "#1a8a4c", "#e7f6ed", "done"], ["Pending", "#46484f", "#f1f1f3", "to do"], ["Unassigned", "#a86b00", "#fdf4e1", "warning"], ["Over", "#d23f33", "#fdeeed", "error"]];
  return (
    <figure className="frame-fig">
      <motion.div className="frame mb-sys" {...view} transition={{ staggerChildren: 0.06 }}>
        <motion.div variants={rise} className="cs-col">
          <span className="mono pane-l">{es ? "un acento, el resto neutro" : "one accent, the rest neutral"}</span>
          <div className="mb-acc"><i style={{ background: "#2f6bec" }} /><span><b>accent</b> #2F6BEC · {es ? "acciones y foco" : "actions and focus"}</span></div>
          <div className="mb-acc"><i style={{ background: "#1f2024" }} /><span><b>fg</b> #1F2024 · {es ? "texto" : "text"}</span></div>
          <div className="mb-acc"><i style={{ background: "#ececee" }} /><span><b>line</b> #ECECEE · {es ? "divisiones de tabla" : "table rules"}</span></div>
          <span className="mono pane-l" style={{ marginTop: 8 }}>{es ? "estados" : "states"}</span>
          <div className="mb-pills">{states.map(([t, c, b, k]) => <span key={t} style={{ color: c, background: b }} title={k}>● {t}</span>)}</div>
        </motion.div>
        <motion.div variants={rise} className="cs-col">
          <span className="mono pane-l">{es ? "8 colores de categoría, con fondo suave" : "8 category colors, on a soft ground"}</span>
          <div className="mb-tags">{TAGS.map((c, i) => <span key={c} style={{ color: c, background: TAGB[i] }}>● {es ? "categoría" : "category"} {i + 1}</span>)}</div>
        </motion.div>
        <motion.div variants={rise} className="cs-col">
          <span className="mono pane-l">{es ? "densidad de herramienta" : "tool density"}</span>
          <div className="mb-type">
            {[["18", "título"], ["15", "cifras"], ["13.5", "cuerpo"], ["12.5", "secundario"], ["12", "leyendas"]].map(([s, l]) => (
              <div key={s}><span style={{ fontSize: +s }}>Inter {s}</span><span className="mono">{es ? l : ({ "título": "title", cifras: "figures", cuerpo: "body", secundario: "secondary", leyendas: "captions" } as Record<string, string>)[l]}</span></div>
            ))}
          </div>
          <span className="small muted">{es ? "claro y oscuro · barra inferior bajo 760 px" : "light and dark · bottom bar under 760 px"}</span>
        </motion.div>
      </motion.div>
      <figcaption className="small muted">{es ? "Letra chica y filas compactas, porque es una herramienta que se usa a diario, no una página que se lee una vez. El color solo dice estado o categoría." : "Small type and compact rows, because it's a tool used every day, not a page read once. Color only says state or category."}</figcaption>
    </figure>
  );
}

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { rise, view } from "./Figure";

// Budgy's own look, kept dark like the app: a live split and the design system it runs on.

const TOTAL = 11522.4;
const LINES = [
  { id: "hogar", es: "Hogar", en: "Home", c: "#5AC8FA", p: 32 },
  { id: "comida", es: "Comida", en: "Food", c: "#FF9F0A", p: 18 },
  { id: "transporte", es: "Transporte", en: "Transport", c: "#30D158", p: 5 },
  { id: "suscripciones", es: "Suscripciones", en: "Subscriptions", c: "#BF5AF2", p: 3 },
  { id: "ocio", es: "Ocio", en: "Fun", c: "#FF375F", p: 7 },
  { id: "salud", es: "Salud", en: "Health", c: "#FF6961", p: 5 },
  { id: "ahorro", es: "Ahorro", en: "Savings", c: "#64D2FF", p: 30 },
];
const money = (n: number) => "S/." + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pctTxt = (n: number) => `${+n.toFixed(2)}%`;

/* A number that reads as plain text and becomes editable on focus; it commits while you type */
function Num({ shown, raw, onValue, label, className }: { shown: string; raw: string; onValue: (n: number) => void; label: string; className: string }) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      className={`bd-num ${className}`} inputMode="decimal" aria-label={label}
      value={draft ?? shown}
      onFocus={(e) => { setDraft(raw); requestAnimationFrame(() => e.target.select()); }}
      onChange={(e) => { setDraft(e.target.value); const n = parseFloat(e.target.value.replace(/[^0-9.]/g, "")); if (!isNaN(n)) onValue(n); }}
      onBlur={() => setDraft(null)}
      onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
    />
  );
}

export function SplitDemo({ es }: { es: boolean }) {
  const [pct, setPct] = useState<Record<string, number>>(Object.fromEntries(LINES.map((l) => [l.id, l.p])));
  const sum = LINES.reduce((a, l) => a + pct[l.id], 0);
  const state = Math.abs(sum - 100) < 0.005 ? "ok" : sum > 100 ? "over" : "under";
  const left = TOTAL * (1 - sum / 100);
  const set = (id: string, p: number) => setPct({ ...pct, [id]: Math.max(0, Math.min(100, p)) });

  return (
    <figure className="frame-fig">
      <motion.div className="frame budgy-demo" {...view} variants={rise}>
        <span className="mono pane-l">{es ? "pruébalo · toca un porcentaje o un monto y cámbialo" : "try it · tap a percentage or an amount and change it"}</span>
        <div className="bd-stage">
          <div className="bd-total"><span>{es ? "Total distribuible" : "Total to split"}</span><b>{money(TOTAL)}</b></div>
          <div className="bd-card">
            <div className="bd-bar" aria-hidden>
              {LINES.filter((l) => pct[l.id] > 0).map((l) => <i key={l.id} style={{ flexGrow: pct[l.id], background: l.c }} />)}
              {state === "under" && <i className="gap" style={{ flexGrow: 100 - sum }} />}
            </div>
            <div className="bd-rows">
              {LINES.map((l) => {
                const name = es ? l.es : l.en;
                return (
                  <div key={l.id} className="bd-row">
                    <span className="bd-name"><i style={{ background: l.c }} />{name}</span>
                    <Num className="p" label={`${name} %`} shown={pctTxt(pct[l.id])} raw={String(+pct[l.id].toFixed(4))} onValue={(n) => set(l.id, n)} />
                    <Num className="a" label={`${name} ${es ? "monto" : "amount"}`} shown={money((TOTAL * pct[l.id]) / 100)} raw={String(Math.round(TOTAL * pct[l.id]) / 100)} onValue={(n) => set(l.id, (n / TOTAL) * 100)} />
                  </div>
                );
              })}
            </div>
            <div className="bd-foot">
              <span>{es ? "Total asignado" : "Total assigned"}</span>
              <span className={`bd-sum ${state}`}>{state === "ok" ? "100%" : state === "over" ? `${pctTxt(sum)} · ${es ? "excedido" : "over"} ${money(-left)}` : `${pctTxt(sum)} · ${es ? "faltan" : "left"} ${money(left)}`}</span>
            </div>
          </div>
        </div>
      </motion.div>
      <figcaption className="small muted">{es ? "La tarjeta de Distribución de la app, con datos ficticios: cambia un porcentaje y el monto se actualiza, o escribe un monto y se recalcula el porcentaje. El total avisa si te pasas." : "The app's Split card, with fictional data: change a percentage and the amount updates, or type an amount and the percentage is worked out. The total warns you if you go over."}</figcaption>
    </figure>
  );
}

const SW: [string, string, string][] = [
  ["bgBase", "#050B16", "fondo"],
  ["card", "#0D1626", "contenido"],
  ["cyan300", "#88C1ED", "texto 2"],
  ["accentBlue", "#2076F5", "acción"],
  ["success", "#4ADE80", "ok"],
  ["warning", "#FBBF24", "apartado"],
  ["danger", "#F87171", "excedido"],
];
const SW_EN: Record<string, string> = { fondo: "background", contenido: "content", "texto 2": "text 2", "acción": "action", ok: "ok", apartado: "set aside", excedido: "over" };

export function DesignSystem({ es }: { es: boolean }) {
  const comps = es
    ? [["ContentCard", "tarjeta sólida para datos"], ["GlassGroup", "agrupa controles de vidrio"], ["FABButton", "el + circular"], ["IconBadge", "ícono con el color de la entidad"], ["ProgressRing", "gastado contra presupuestado"], ["ConcentricRings", "anillos por categoría en el inicio"], ["BackgroundGlow", "el navy con brillo cyan"]]
    : [["ContentCard", "solid card for data"], ["GlassGroup", "groups glass controls"], ["FABButton", "the round +"], ["IconBadge", "icon in the entity's color"], ["ProgressRing", "spent against budgeted"], ["ConcentricRings", "rings per category on the home"], ["BackgroundGlow", "the navy with a cyan glow"]];
  return (
    <figure className="frame-fig">
      <motion.div className="frame budgy-ds" {...view} transition={{ staggerChildren: 0.06 }}>
        <motion.div variants={rise} className="pane">
          <span className="mono pane-l">{es ? "tokens de color" : "color tokens"}</span>
          <div className="ds-sw">
            {SW.map(([n, h, r]) => (
              <div key={n}><i style={{ background: h }} /><b className="mono">{n}</b><span className="small muted">{es ? r : SW_EN[r]}</span></div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={rise} className="pane">
          <span className="mono pane-l">{es ? "la regla de dos capas" : "the two-layer rule"}</span>
          <div className="ds-layers">
            <div className="glass"><b>{es ? "funcional · vidrio" : "functional · glass"}</b><span>{es ? "tab bar, botones, hojas, el +" : "tab bar, buttons, sheets, the +"}</span></div>
            <div className="solid"><b>{es ? "contenido · sólido" : "content · solid"}</b><span>{es ? "tarjetas, filas, cifras" : "cards, rows, figures"}</span></div>
          </div>
        </motion.div>
        <motion.div variants={rise} className="pane">
          <span className="mono pane-l">{es ? "componentes" : "components"}</span>
          <ul className="ds-comps">{comps.map(([a, b]) => <li key={a}><b className="mono">{a}</b><span className="small muted">{b}</span></li>)}</ul>
        </motion.div>
      </motion.div>
      <figcaption className="small muted">{es ? "Sin tamaños de letra fijos: cada texto usa los estilos nativos de iOS para que Dynamic Type funcione. Los tokens solo definen color, espaciado y radios." : "No fixed font sizes: every text uses iOS's native styles so Dynamic Type works. Tokens only define color, spacing and radii."}</figcaption>
    </figure>
  );
}

/* How the app is put together: five layers, each only talks to the one below */
export function Architecture({ es }: { es: boolean }) {
  const layers: [string, string, string][] = es
    ? [["interfaz", "10 dominios · ~25 pantallas", "Vistas SwiftUI por dominio, NavigationStack con rutas tipadas y hojas nativas"],
       ["design system", "tokens + 7 componentes", "Vidrio para controles, sólido para contenido; estilos de texto nativos"],
       ["estado", "BudgetStore · AuthStore", "@Observable: cachean el mes activo y orquestan las escrituras"],
       ["lógica", "BudgetMath · 12 tests", "Funciones puras: distribuible, disponible, saldos entre meses, tipo de cambio"],
       ["datos", "Supabase · 10 tablas · 12 migraciones", "Postgres con seguridad por fila, login con correo y Google"]]
    : [["interface", "10 domains · ~25 screens", "SwiftUI views per domain, NavigationStack with typed routes and native sheets"],
       ["design system", "tokens + 7 components", "Glass for controls, solid for content; native text styles"],
       ["state", "BudgetStore · AuthStore", "@Observable: cache the active month and run the writes"],
       ["logic", "BudgetMath · 12 tests", "Pure functions: amount to split, left to spend, balances across months, exchange rate"],
       ["data", "Supabase · 10 tables · 12 migrations", "Postgres with row-level security, sign-in with email and Google"]];
  const native = es
    ? ["Face ID al abrir", "notificaciones locales de cobros", "widget del disponible", "lectura de comprobantes en el teléfono (Vision)", "login con Google"]
    : ["Face ID on open", "local alerts before charges", "left-to-spend widget", "on-device receipt reading (Vision)", "Google sign-in"];
  return (
    <figure className="frame-fig">
      <motion.div className="frame budgy-arch" {...view} transition={{ staggerChildren: 0.06 }}>
        <span className="mono pane-l">{es ? "arquitectura · cada capa solo habla con la de abajo" : "architecture · each layer only talks to the one below"}</span>
        <ol className="arch">
          {layers.map(([k, t, d]) => (
            <motion.li key={k} variants={rise}><span className="mono">{k}</span><b>{t}</b><span className="small muted">{d}</span></motion.li>
          ))}
        </ol>
        <motion.div variants={rise} className="arch-native"><span className="mono pane-l">{es ? "nativo de iOS" : "native iOS"}</span><div>{native.map((n) => <span key={n} className="tag small">{n}</span>)}</div></motion.div>
      </motion.div>
      <figcaption className="small muted">{es ? "La matemática no sabe de pantallas. Por eso la reescritura de React Native a SwiftUI cambió las dos capas de arriba y dejó intactas las de abajo." : "The math knows nothing about screens. That is why the rewrite from React Native to SwiftUI changed the top two layers and left the bottom ones untouched."}</figcaption>
    </figure>
  );
}

/* Everything the app does, by domain */
export function Features({ es }: { es: boolean }) {
  const f: [string, string][] = es
    ? [["Inicio", "lo disponible, resumen del mes, anillos por categoría y movimientos"], ["Presupuesto", "sueldo en USD, tipo de cambio, impuesto, extras y distribución en %"], ["Gastos", "registro en tres toques, edición, filtros por cuenta, mes y rango"], ["Cuentas", "saldos en PEN o USD que se arrastran mes a mes"], ["Metas", "objetivo, aportes por mes y proyección de la fecha"], ["Deudas", "total, pagado y fecha límite"], ["Recurrentes", "cobros con día fijo, aviso antes y marcar como pagado"], ["Analíticas", "tendencia de 3, 6 o 12 meses y comparativa por categoría"], ["Nuevo mes", "copia las partidas y el tipo de cambio del mes anterior"]]
    : [["Home", "left to spend, month summary, rings per category and recent moves"], ["Budget", "salary in USD, exchange rate, tax, extras and a split in %"], ["Expenses", "logging in three taps, editing, filters by account, month and range"], ["Accounts", "balances in PEN or USD carried month to month"], ["Goals", "target, contributions per month and a projected date"], ["Debts", "total, paid and due date"], ["Recurring", "charges on a fixed day, a heads-up before and mark as paid"], ["Analytics", "3, 6 or 12-month trend and comparison by category"], ["New month", "copies the lines and exchange rate from the month before"]];
  return (
    <figure className="frame-fig">
      <motion.div className="frame budgy-feat" {...view} transition={{ staggerChildren: 0.04 }}>
        <span className="mono pane-l">{es ? "lo que hace la app" : "what the app does"}</span>
        <ul>{f.map(([a, b]) => <motion.li key={a} variants={rise}><b>{a}</b><span className="small muted">{b}</span></motion.li>)}</ul>
      </motion.div>
      <figcaption className="small muted">{es ? "Todo gira alrededor de una pregunta: cuánto puedo gastar todavía. Cada dominio alimenta ese número o lo explica." : "Everything turns around one question: how much can I still spend. Each domain feeds that number or explains it."}</figcaption>
    </figure>
  );
}

"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { Frame, Metrics, Pane, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("budgy");
const Phone = ({ src, alt }: { src: string; alt: string }) => <img className="crop phone" src={`${IMG}/${src}`} alt={alt} loading="lazy" decoding="async" />;

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <img className="cover-shot" src={`${IMG}/cover.webp`} alt={es ? "Budgy en tres pantallas: la distribución del mes, el inicio con lo disponible y un gasto nuevo" : "Budgy on three screens: the month's split, the home with what's left and a new expense"} />;

  const formula = <Steps items={es
    ? [["Ingreso", "sueldo en dólares + extras"], ["− Impuesto", "solo sobre el sueldo"], ["= Distribuible", "lo que reparto en %"], ["− Reservado", "ahorro y cobros futuros"], ["= Disponible", "lo que aún puedo gastar"]]
    : [["Income", "salary in dollars + extras"], ["− Tax", "on the salary only"], ["= To split", "what I share out in %"], ["− Set aside", "savings and upcoming charges"], ["= Left to spend", "what I can still spend"]]} />;

  const split = (
    <Frame className="cols-phones" caption={es ? "Escribo un porcentaje y la app muestra el monto: se acabó la regla de tres. Cada número sale de una fórmula a la vista." : "I type a percentage and the app shows the amount: no more rule of three. Every number comes from a formula in plain sight."}>
      <Pane label={es ? "ingreso" : "income"}><Phone src="income.webp" alt={es ? "Sueldo en dólares, tipo de cambio e impuesto, con el bruto y el neto calculados" : "Salary in dollars, exchange rate and tax, with gross and net worked out"} /></Pane>
      <Pane accent label={es ? "distribución" : "split"}><Phone src="distribution.webp" alt={es ? "Distribución por categoría en porcentaje y en soles, con el total asignado al 100%" : "Split by category in percent and in soles, with 100% assigned"} /></Pane>
      <Pane label={es ? "partidas" : "lines"}><Phone src="rings.webp" alt={es ? "Anillos por categoría: gastado contra presupuestado" : "A ring per category: spent against budgeted"} /></Pane>
    </Frame>
  );

  const oneNumber = (
    <Frame className="cols-phones two" caption={es ? "El inicio responde una sola pregunta, cuánto puedo gastar todavía. Las analíticas comparan meses para ver la tendencia, no para juzgar un día." : "The home answers one question: how much can I still spend. Analytics compares months to show a trend, not to judge a day."}>
      <Pane accent label={es ? "inicio" : "home"}><Phone src="home.webp" alt={es ? "Inicio: total distribuible, lo disponible y el resumen del mes" : "Home: total to split, what's left and the month summary"} /></Pane>
      <Pane label={es ? "analíticas" : "analytics"}><Phone src="analytics.webp" alt={es ? "Analíticas: tendencia de seis meses y comparativa por categoría" : "Analytics: six-month trend and comparison by category"} /></Pane>
    </Frame>
  );

  const logging = (
    <Frame className="cols-phones one" caption={es ? "Un gasto en tres toques: monto, cuenta y categoría. La foto del comprobante solo llena el monto; siempre lo reviso antes de guardar." : "An expense in three taps: amount, account and category. A photo of the receipt only fills in the amount; I always check it before saving."}>
      <Pane label={es ? "nuevo gasto" : "new expense"}><Phone src="expense.webp" alt={es ? "Hoja de nuevo gasto con escaneo de comprobante, cuenta y categoría" : "New expense sheet with receipt scan, account and category"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["La hoja", "meses de presupuesto en Google Sheets"], ["PRD", "reglas, fórmulas y pantallas por escrito"], ["v1 · 27 jun", "React Native + Supabase"], ["SwiftUI · 2 jul", "reescrita nativa para iOS 26"], ["27 jul", "comprobantes, widget y alertas"]]
    : [["The sheet", "months of budgets in Google Sheets"], ["PRD", "rules, formulas and screens in writing"], ["v1 · 27 Jun", "React Native + Supabase"], ["SwiftUI · 2 Jul", "rebuilt native for iOS 26"], ["27 Jul", "receipts, widget and alerts"]]} />;

  const size = (
    <Metrics
      label={es ? "lo que quedó construido" : "what got built"}
      items={es
        ? [["~25", "pantallas en SwiftUI"], ["12", "tests sobre la lógica del dinero"], ["12", "migraciones de la base de datos"]]
        : [["~25", "screens in SwiftUI"], ["12", "tests on the money logic"], ["12", "database migrations"]]}
      caption={es ? "Toda la matemática vive en un solo archivo sin interfaz, con tests. Las pantallas solo la muestran." : "All the math lives in one file with no UI, under test. The screens only show it."}
    />
  );

  if (!es) return {
    project: "Budgy — case study",
    subtitle: "a monthly budget that answers one question",
    tldr: "I ran my monthly budget in a Google Sheet: a salary in dollars, a tax on it, extras on top, and a rule of three for every line. I designed and built Budgy to replace it, an iOS app where {{every number has a formula you can see}} and the home answers one question: how much can I still spend this month. First built in React Native, then rebuilt in native SwiftUI with Liquid Glass.",
    meta: [
      ["type", "Personal project"],
      ["role", "Designer and builder: product, UX, UI and code"],
      ["team", "Me, with Claude Code"],
      ["timeline", "June–July 2026"],
      ["scope", "iOS app (SwiftUI) with a Supabase backend"],
      ["status", "Running on my iPhone; not on the App Store"],
    ],
    chips: ["passion project", "designed and built", "ios"], okChip: 1,
    cover,
    tools: [["Claude Code", "claude"], ["SwiftUI", "swift"], ["Xcode", "xcode"], ["Supabase", "supabase"]],
    challenge: {
      intro: "The sheet worked, but only on a laptop, and only if I did the math right every month:",
      list: ["a rule of three for every line to turn a percentage into an amount", "the tax applied to the salary but not to freelance extras, easy to get wrong", "no quick answer to how much is left, and no reminder before a subscription charge"],
      end: "The goal wasn't more features than the sheet. It was {{the same logic, always right, in my pocket}}.",
      fig: formula,
    },
    role: "{{I designed and built the whole thing.}} I wrote the PRD with the financial rules and formulas, designed the screens and the design system, and built both versions with Claude Code: the React Native one and the native SwiftUI rebuild, on a Supabase database with row-level security.",
    research: {
      items: ["My own sheet, with months of history: the source of truth for the rules the app had to respect, like which income pays tax and which month's exchange rate applies.", "Apple's Human Interface Guidelines and the iOS 26 Liquid Glass APIs, to know what is native before designing anything custom.", "Patterns from apps people already know: Apple Music's icon-only tab bar, the Reminders creation flow and Activity's rings for progress."],
      extraTitle: "the order of the work",
      extra: order,
    },
    decisions: [
      { t: "a percentage in, an amount out", because: "the sheet's real job was the rule of three. Each line takes a percentage up to four decimals or a fixed amount, and the other is worked out.", ruled: "fixed amounts only. They break every month the exchange rate moves.", fig: split },
      { t: "one number on the home: what's left", because: "every category has a type, free to spend, saved or set aside, and only the first counts. Money kept for a future charge never looks spendable.", ruled: "a plain on/off switch per category. It said what didn't count, not why.", fig: oneNumber },
      { t: "the math in one place, under test", because: "if the home and the budget screen ever disagreed, I'd stop trusting both. Twelve tests cover the split, the left-to-spend and the balances across months." },
      { t: "rebuild it native instead of patching it", because: "in React Native, Liquid Glass came through a bridge and sheets had bugs. The data and the math were already separate from the UI, so the rewrite took two days, not weeks.", ruled: "staying cross-platform. I only need iOS, and native gave me glass, sheets and Dynamic Type for free." },
      { t: "glass for controls, solid for numbers", because: "Liquid Glass makes the tab bar and buttons feel part of iOS, but numbers on glass are hard to read. Cards with data sit on a solid surface." },
      { t: "an expense in three taps", because: "if logging is slow, I stop logging and the numbers lie. A photo of a Yape, Plin or transfer receipt fills in the amount on the device, with no server involved.", fig: logging },
    ],
    validation: {
      items: ["Twelve unit tests on the financial logic, run on every change to it.", "The real thing on my iPhone, checked against the sheet it replaced.", "Every number on screen traced back to a formula in the PRD."],
      extra: size,
    },
    results: [["observed", "{{It replaced the sheet for my own budget.}} The rebuild kept every rule of the first version and added receipts, a widget and alerts when what's left runs low."], ["measured", "Nothing to measure: it has one user, me. It isn't on the App Store, and the free signing expires every seven days."]],
    learn: ["{{Writing the rules before the screens made the AI faster, not slower.}} A PRD with formulas left Claude Code nothing to guess about money.", "Keeping the math out of the UI is what made a full rewrite cheap. The second version cost days because the first one was split right."],
    legal: "A personal project. All data on screen is fictional, made up for these screenshots.",
  };

  return {
    project: "Budgy — caso de estudio",
    subtitle: "un presupuesto mensual que responde una sola pregunta",
    tldr: "Llevaba mi presupuesto mensual en un Google Sheet: un sueldo en dólares, un impuesto, extras encima y una regla de tres por cada partida. Diseñé y construí Budgy para reemplazarlo, una app de iOS donde {{cada número tiene una fórmula a la vista}} y el inicio responde una sola pregunta: cuánto puedo gastar todavía este mes. Primero la hice en React Native y luego la reescribí nativa en SwiftUI con Liquid Glass.",
    meta: [
      ["tipo", "Proyecto personal"],
      ["rol", "Diseño y construcción: producto, UX, UI y código"],
      ["equipo", "Yo, con Claude Code"],
      ["duración", "junio–julio 2026"],
      ["alcance", "App de iOS (SwiftUI) con backend en Supabase"],
      ["estado", "Corriendo en mi iPhone; no está en el App Store"],
    ],
    chips: ["proyecto personal", "diseñada y construida", "ios"], okChip: 1,
    cover,
    tools: [["Claude Code", "claude"], ["SwiftUI", "swift"], ["Xcode", "xcode"], ["Supabase", "supabase"]],
    challenge: {
      intro: "La hoja funcionaba, pero solo en la laptop y solo si hacía bien las cuentas cada mes:",
      list: ["una regla de tres por partida para pasar de porcentaje a monto", "el impuesto va sobre el sueldo pero no sobre los extras del freelo, fácil de equivocar", "ninguna respuesta rápida a cuánto me queda, ni aviso antes de que cobre una suscripción"],
      end: "La meta no era tener más funciones que la hoja. Era {{la misma lógica, siempre bien, en el bolsillo}}.",
      fig: formula,
    },
    role: "{{Diseñé y construí todo.}} Escribí el PRD con las reglas y fórmulas financieras, diseñé las pantallas y el design system, y construí las dos versiones con Claude Code: la de React Native y la reescritura nativa en SwiftUI, sobre una base de datos en Supabase con seguridad por fila.",
    research: {
      items: ["Mi propia hoja, con meses de historia: la fuente de verdad de las reglas que la app debía respetar, como qué ingreso paga impuesto y qué tipo de cambio aplica a cada mes.", "Las Human Interface Guidelines de Apple y las APIs de Liquid Glass de iOS 26, para saber qué es nativo antes de diseñar algo a medida.", "Patrones que la gente ya conoce: la tab bar solo con íconos de Apple Music, el flujo de creación de Recordatorios y los anillos de Actividad para el progreso."],
      extraTitle: "el orden del trabajo",
      extra: order,
    },
    decisions: [
      { t: "entra un porcentaje, sale un monto", because: "el trabajo real de la hoja era la regla de tres. Cada partida acepta un porcentaje de hasta cuatro decimales o un monto fijo, y la app calcula el otro.", ruled: "solo montos fijos. Se rompen cada mes que se mueve el tipo de cambio.", fig: split },
      { t: "un solo número en el inicio: lo disponible", because: "cada categoría tiene un tipo, disponible, ahorrado o apartado, y solo la primera cuenta. La plata guardada para un cobro futuro nunca parece gastable.", ruled: "un interruptor de encendido y apagado por categoría. Decía qué no contaba, pero no por qué.", fig: oneNumber },
      { t: "la matemática en un solo lugar, con tests", because: "si el inicio y el presupuesto alguna vez no coincidieran, dejaría de confiar en los dos. Doce tests cubren la distribución, lo disponible y los saldos entre meses." },
      { t: "reescribirla nativa en vez de parcharla", because: "en React Native, Liquid Glass llegaba por un puente y las hojas tenían bugs. Los datos y la matemática ya estaban separados de la interfaz, así que la reescritura tomó dos días, no semanas.", ruled: "seguir multiplataforma. Solo necesito iOS, y lo nativo me daba vidrio, hojas y Dynamic Type sin esfuerzo." },
      { t: "vidrio para los controles, sólido para los números", because: "Liquid Glass hace que la tab bar y los botones se sientan de iOS, pero los números sobre vidrio se leen mal. Las tarjetas con datos van sobre una superficie sólida." },
      { t: "un gasto en tres toques", because: "si registrar es lento, dejo de registrar y los números mienten. La foto de un Yape, un Plin o una transferencia llena el monto en el mismo teléfono, sin pasar por ningún servidor.", fig: logging },
    ],
    validation: {
      items: ["Doce tests unitarios sobre la lógica financiera, que corren con cada cambio en ella.", "La app real en mi iPhone, contrastada con la hoja que reemplazó.", "Cada número en pantalla rastreado hasta una fórmula del PRD."],
      extra: size,
    },
    results: [["observado", "{{Reemplazó a la hoja para mi propio presupuesto.}} La reescritura conservó todas las reglas de la primera versión y sumó comprobantes, un widget y alertas cuando lo disponible se acaba."], ["medido", "Nada que medir: tiene un solo usuario, yo. No está en el App Store y la firma gratuita vence cada siete días."]],
    learn: ["{{Escribir las reglas antes que las pantallas hizo a la IA más rápida, no más lenta.}} Un PRD con fórmulas no le dejó a Claude Code nada que adivinar sobre el dinero.", "Tener la matemática fuera de la interfaz es lo que abarató la reescritura completa. La segunda versión costó días porque la primera estaba bien separada."],
    legal: "Proyecto personal. Todos los datos en pantalla son ficticios, inventados para estas capturas.",
  };
}

export default function CaseBudgy() {
  return <CaseLayout content={content} />;
}

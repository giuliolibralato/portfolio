"use client";

import { motion } from "motion/react";
import { Frame, Notes, Pane, Tree, rise, view, type TreeNode } from "./Figure";

// Cinépolis: the course slides rebuilt as portfolio figures. Content is the original research, in two languages.

type L = { es: string; en: string };
const t = (x: L, es: boolean) => (es ? x.es : x.en);

/* ---------- audit: UX laws and Nielsen heuristics ---------- */
const LAWS: [L, boolean, L][] = [
  [{ es: "Miller", en: "Miller" }, false, { es: "La fila principal muestra 5 películas por línea.", en: "The main row shows 5 films per line." }],
  [{ es: "Postel", en: "Postel" }, false, { es: "La compra vive en un subdominio sin botón para volver a la cartelera.", en: "The purchase lives on a subdomain with no button back to the listings." }],
  [{ es: "Usabilidad estética", en: "Aesthetic usability" }, false, { es: "Funciona, pero se ve básico y antiguo.", en: "It works, but looks basic and dated." }],
  [{ es: "Jakob", en: "Jakob" }, false, { es: "El filtro no sigue lo que la gente ya conoce de otros cines.", en: "The filter doesn't follow what people know from other cinemas." }],
  [{ es: "Hick", en: "Hick" }, false, { es: "Muchas opciones de filtro y horarios sin orden ni diferencia.", en: "Many filter and showtime options with no order or difference." }],
  [{ es: "Fitts", en: "Fitts" }, false, { es: "Botones pequeños y sin aire, difíciles de tocar.", en: "Small buttons with no padding, hard to tap." }],
  [{ es: "Pico final", en: "Peak-end" }, true, { es: "Abre con lo más nuevo y cierra con el acceso a toda la cartelera.", en: "Opens with what's new and closes with a link to all listings." }],
  [{ es: "Von Restorff", en: "Von Restorff" }, true, { es: "El acceso a la cartelera completa rompe el patrón y se nota.", en: "The full-listings link breaks the pattern and stands out." }],
  [{ es: "Umbral de Doherty", en: "Doherty threshold" }, true, { es: "Avisa cuando está cargando horarios.", en: "It tells you when showtimes are loading." }],
  [{ es: "Tesler", en: "Tesler" }, true, { es: "Los pasos de compra son justos y necesarios.", en: "The purchase steps are just the necessary ones." }],
];
const HEUR: [L, boolean, L][] = [
  [{ es: "1 · Visibilidad del estado", en: "1 · Visibility of status" }, true, { es: "Muestra la carga de la página.", en: "Page loading is shown." }],
  [{ es: "2 · Sistema y mundo real", en: "2 · Match with the real world" }, true, { es: "Indicaciones con palabras simples.", en: "Instructions in plain words." }],
  [{ es: "3 · Control y libertad", en: "3 · User control and freedom" }, false, { es: "Sin botón de volver ni breadcrumb en la compra.", en: "No back button or breadcrumb in the purchase." }],
  [{ es: "4 · Consistencia", en: "4 · Consistency" }, false, { es: "La compra cambia de diseño respecto al resto.", en: "The purchase changes design from the rest of the site." }],
  [{ es: "5 · Prevención de errores", en: "5 · Error prevention" }, true, { es: "Los pasos son fáciles de seguir.", en: "The steps are easy to follow." }],
  [{ es: "6 · Reconocer antes que recordar", en: "6 · Recognition over recall" }, true, { es: "Los filtros ordenan las opciones.", en: "Filters organize the options." }],
  [{ es: "7 · Flexibilidad y eficiencia", en: "7 · Flexibility and efficiency" }, true, { es: "Directo, aunque no muy cómodo.", en: "Direct, if not very comfortable." }],
  [{ es: "8 · Estética minimalista", en: "8 · Minimalist design" }, false, { es: "Mucho diseño y nada minimalista.", en: "A lot of design and nothing minimal." }],
  [{ es: "9 · Recuperarse de errores", en: "9 · Recover from errors" }, true, { es: "Explica el error y qué hacer.", en: "Explains the error and what to do." }],
  [{ es: "10 · Ayuda y documentación", en: "10 · Help and documentation" }, true, { es: "Todo en el footer, salvo un chat de ayuda.", en: "Everything in the footer, except a help chat." }],
];

function Check({ rows, es }: { rows: [L, boolean, L][]; es: boolean }) {
  return (
    <ul className="checks">
      {rows.map(([n, ok, d]) => (
        <li key={n.en}><span className={ok ? "ck ok" : "ck no"} aria-label={ok ? (es ? "cumple" : "met") : (es ? "no cumple" : "not met")}>{ok ? "✓" : "✕"}</span><b>{t(n, es)}</b><span className="small muted">{t(d, es)}</span></li>
      ))}
    </ul>
  );
}

export function Audit({ es }: { es: boolean }) {
  const lawsNo = LAWS.filter((r) => !r[1]).length;
  const heurNo = HEUR.filter((r) => !r[1]).length;
  return (
    <Frame className="cols-2" caption={es ? "Una auditoría de la web en 2023. Lo que fallaba se repetía: demasiadas opciones a la vez, botones difíciles y una compra que se sentía como otro sitio." : "An audit of the site in 2023. The failures repeated: too many choices at once, hard buttons and a purchase that felt like another site."}>
      <Pane label={es ? `leyes de UX · ${lawsNo} de 10 no se cumplen` : `UX laws · ${lawsNo} of 10 not met`}><Check rows={LAWS} es={es} /></Pane>
      <Pane label={es ? `heurísticas de Nielsen · ${heurNo} de 10 no se cumplen` : `Nielsen heuristics · ${heurNo} of 10 not met`}><Check rows={HEUR} es={es} /></Pane>
    </Frame>
  );
}

/* ---------- benchmark ---------- */
export function Benchmark({ es }: { es: boolean }) {
  const cols = ["Cineplanet", "Cinemark", "Movietime"];
  const rows: [L, L[]][] = [
    [{ es: "quién es", en: "who it is" }, [{ es: "Cadena peruana, líder del mercado.", en: "Peruvian chain, market leader." }, { es: "En el país desde 1997, pionera del multicine.", en: "In Peru since 1997, pioneer of the multiplex." }, { es: "La opción económica.", en: "The budget option." }]],
    [{ es: "vocabulario y usabilidad", en: "vocabulary and usability" }, [{ es: "La más eficiente para llegar a la película y comprar.", en: "The most efficient path to a film and a ticket." }, { es: "Información directa que funciona.", en: "Direct information that works." }, { es: "Precisa y eficiente.", en: "Precise and efficient." }]],
    [{ es: "diseño", en: "design" }, [{ es: "Limpio, con aire; no satura.", en: "Clean, with room to breathe; never crowded." }, { es: "Balanceado, aunque poco dinámico.", en: "Balanced, if not very dynamic." }, { es: "Lleno y saturado, sin espacios.", en: "Full and crowded, with no space." }]],
  ];
  return (
    <figure className="frame-fig">
      <motion.div className="frame" {...view} variants={rise}>
        <span className="mono pane-l">{es ? "benchmark · tres cines en Lima" : "benchmark · three cinemas in Lima"}</span>
        <div className="dtable-wrap"><table className="dtable">
          <thead><tr><th />{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>{rows.map(([h, cells]) => <tr key={h.en}><th>{t(h, es)}</th>{cells.map((c, i) => <td key={i}>{t(c, es)}</td>)}</tr>)}</tbody>
        </table></div>
      </motion.div>
      <figcaption className="small muted">{es ? "Cineplanet marcaba la vara: eficiente para comprar y con un diseño que deja respirar." : "Cineplanet set the bar: efficient to buy from, with a design that lets things breathe."}</figcaption>
    </figure>
  );
}

/* ---------- journey ---------- */
type Step = { n: number; t: L; mood: 1 | 0 | -1; q?: L };
const STAGES: { h: L; steps: Step[]; obs: L; ch: L }[] = [
  { h: { es: "informarse sobre la película", en: "learn about the film" }, ch: { es: "web", en: "web" },
    obs: { es: "La estética y el dinamismo no transmiten la innovación que la marca promete.", en: "The look and pace don't convey the innovation the brand promises." },
    steps: [
      { n: 1, t: { es: "Entra a cinepolis.com.pe", en: "Opens cinepolis.com.pe" }, mood: 1 },
      { n: 2, t: { es: "Hace scroll en la home", en: "Scrolls the home" }, mood: 0, q: { es: "“Creo que hay cosas que merecen más lugar en la home.”", en: "“Some things deserve more space on the home.”" } },
      { n: 3, t: { es: "Ve estrenos o cartelera", en: "Looks at new films or listings" }, mood: -1, q: { es: "“Me costó encontrar el botón de la película.”", en: "“It was hard to find the film's button.”" } },
    ] },
  { h: { es: "ver cartelera y película", en: "browse listings and the film" }, ch: { es: "web", en: "web" },
    obs: { es: "Elegir película funciona: menos espera y mejores botones bastarían para sentirse cómodo.", en: "Choosing a film works: less waiting and better buttons would make it comfortable." },
    steps: [
      { n: 4, t: { es: "Entra a la cartelera", en: "Opens the listings" }, mood: -1 },
      { n: 5, t: { es: "Filtra por cine", en: "Filters by cinema" }, mood: 0, q: { es: "“No encuentro cómo filtrar por tipo de película.”", en: "“I can't filter by type of film.”" } },
      { n: 6, t: { es: "Lee la información", en: "Reads the information" }, mood: 0, q: { es: "“Es mínima e insuficiente.”", en: "“It's minimal and not enough.”" } },
      { n: 7, t: { es: "Elige horario", en: "Picks a showtime" }, mood: 0 },
    ] },
  { h: { es: "comprar la entrada", en: "buy the ticket" }, ch: { es: "landing de compra", en: "purchase landing" },
    obs: { es: "Mostrar el paso en el que estás y poder guardar la compra daría confianza.", en: "Showing which step you're on and letting you save the purchase would build trust." },
    steps: [
      { n: 8, t: { es: "Elige 2 entradas", en: "Picks 2 tickets" }, mood: 0 },
      { n: 9, t: { es: "Elige 2 asientos", en: "Picks 2 seats" }, mood: 0, q: { es: "“No decía qué asientos estaban ocupados.”", en: "“It didn't say which seats were taken.”" } },
      { n: 10, t: { es: "Datos personales", en: "Personal details" }, mood: 0 },
      { n: 11, t: { es: "Método de pago", en: "Payment method" }, mood: 0, q: { es: "“Faltan métodos de pago.”", en: "“It needs more payment methods.”" } },
      { n: 12, t: { es: "Datos de pago", en: "Payment details" }, mood: 0 },
      { n: 13, t: { es: "Confirma", en: "Confirms" }, mood: 0, q: { es: "“Fácil, pero poco agradable.”", en: "“Easy, but not very pleasant.”" } },
    ] },
];

export function Journey({ es }: { es: boolean }) {
  return (
    <figure className="frame-fig">
      <motion.div className="frame journey" {...view} transition={{ staggerChildren: 0.06 }}>
        <span className="mono pane-l">{es ? "journey · Miguel, 22, ingeniero industrial, quiere ir al cine esta noche" : "journey · Miguel, 22, an industrial engineer, wants to go to the movies tonight"}</span>
        <div className="jr">
          {STAGES.map((s) => (
            <motion.section key={s.h.en} variants={rise} className="jr-stage">
              <b className="jr-h">{t(s.h, es)}</b>
              <ol className="jr-steps">
                {s.steps.map((p) => (
                  <li key={p.n} className={`m${p.mood}`}>
                    <i aria-hidden />
                    <span className="jr-t"><span className="mono">{p.n}</span> {t(p.t, es)}</span>
                    {p.q && <span className="jr-q small muted">{t(p.q, es)}</span>}
                  </li>
                ))}
              </ol>
              <p className="small">{t(s.obs, es)}</p>
              <span className="mono jr-ch">{t(s.ch, es)}</span>
            </motion.section>
          ))}
        </div>
      </motion.div>
      <figcaption className="small muted">{es ? "El punto más bajo llega pronto: encontrar la película. La compra no frustra, pero tampoco acompaña." : "The lowest point comes early: finding the film. The purchase doesn't frustrate, but it doesn't guide either."}</figcaption>
    </figure>
  );
}

/* ---------- desirability × feasibility ---------- */
export function Priority({ es }: { es: boolean }) {
  const cols: [L, L[]][] = [
    [{ es: "prioridad 1", en: "priority 1" }, [{ es: "Navegabilidad del sitio", en: "Site navigation" }, { es: "Rapidez de carga", en: "Loading speed" }, { es: "Rediseño completo de la estética", en: "A full visual redesign" }]],
    [{ es: "prioridad 2", en: "priority 2" }, [{ es: "Ver el tráiler", en: "Watch the trailer" }, { es: "Ofertas, promociones y eventos a la vista", en: "Offers, promotions and events in view" }, { es: "Precios y categorías claros al comprar", en: "Clear prices and categories when buying" }, { es: "Ajustar el tiempo límite de compra", en: "Adjust the purchase time limit" }]],
    [{ es: "prioridad 3", en: "priority 3" }, [{ es: "Comprar confitería", en: "Buy concessions" }, { es: "Crear un usuario", en: "Create an account" }, { es: "Guardar datos temporalmente", en: "Save details temporarily" }]],
    [{ es: "prioridad 4", en: "priority 4" }, [{ es: "Modo oscuro", en: "Dark mode" }]],
  ];
  return (
    <figure className="frame-fig">
      <motion.div className="frame" {...view} transition={{ staggerChildren: 0.06 }}>
        <span className="mono pane-l">{es ? "deseabilidad × factibilidad" : "desirability × feasibility"}</span>
        <div className="prio">
          {cols.map(([h, items], i) => (
            <motion.div key={h.en} variants={rise} className={`prio-col p${i + 1}`}>
              <b className="mono">{t(h, es)}</b>
              <ul>{items.map((x) => <li key={x.en}>{t(x, es)}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <figcaption className="small muted">{es ? "Lo más deseado y más factible iba primero: moverse por el sitio. El modo oscuro, lo menos pedido, quedó al final." : "Most wanted and most feasible went first: moving around the site. Dark mode, the least requested, came last."}</figcaption>
    </figure>
  );
}

/* ---------- information architecture ---------- */
const IA_BEFORE: TreeNode[] = [
  ["!Cartelera", ["Sala Junior", "4DX", "MacroXE"]],
  ["!Cartelera", [["Películas", [["Ver sinopsis", ["Funciones"]]]]]],
  ["!Próximos estrenos", ["Películas"]],
  "Promociones",
  "Ventas empresariales",
  ["!Cartelera", ["Preventas", "Contenidos alternativos", "Muestras y festivales", "!Próximos estrenos", "Contenido Cinépolis"]],
  ["¿Quiénes somos?", ["Únete al equipo", "Próximas aperturas", "Corporativos"]],
  ["Legales", ["Términos y condiciones", "Política de privacidad"]],
  ["Contacto", ["Chatea con los expertos"]],
];
const IA_AFTER: TreeNode[] = [
  ["Películas", [["En cartelera", ["Películas en cartelera"]], ["Próximos estrenos", ["Películas a estrenarse"]]]],
  ["!Cines", [["!Nuestros cines", ["Larcomar", "Plaza Norte", "Santa Anita", "Arequipa Center", "Pucallpa", "Próximas aperturas"]], ["Nuestras salas", ["Sala Junior", "4DX", "Macro XE"]]]],
  "Promociones",
  ["Club Cinépolis", ["Promociones", "Reglamento"]],
  ["Nosotros", ["Conócenos", "Únete al equipo"]],
  ["Ventas empresariales", ["Cupones empresariales", "Alquiler de salas", "Funciones empresariales", "Pauta publicitaria"]],
  ["!Eventos", ["Contenidos alternativos", "Contenidos Cinépolis", "Muestras y festivales"]],
  ["Legales", ["Términos y condiciones", "Política de privacidad", "Libro de reclamaciones"]],
];

export function IATrees({ es }: { es: boolean }) {
  return (
    <Frame className="cols-2" caption={es ? "Antes, tres secciones distintas se llamaban Cartelera y los estrenos aparecían dos veces. La nueva agrupa por lo que la gente viene a hacer, con cada sede bajo Cines y una sección de Eventos." : "Before, three different sections were called Listings and new releases appeared twice. The new one groups by what people come to do, with each venue under Cinemas and an Events section."}>
      <Pane label={es ? "actual · resaltado, lo repetido" : "current · highlighted, the repeats"}><motion.div variants={rise} className="tree-box"><Tree nodes={IA_BEFORE} /></motion.div></Pane>
      <Pane accent label={es ? "nueva · resaltado, lo nuevo" : "new · highlighted, what's new"}><motion.div variants={rise} className="tree-box"><Tree nodes={IA_AFTER} /></motion.div></Pane>
    </Frame>
  );
}

/* ---------- tree test comparison ---------- */
export function TreeTest({ es }: { es: boolean }) {
  const rows: [L, string, string, string, string, boolean, boolean][] = [
    // metric, t1 before, t1 after, t2 before, t2 after, t1 better, t2 better
    [{ es: "éxito", en: "success" }, "50%", "60%", "80%", "70%", true, false],
    [{ es: "ruta directa", en: "direct path" }, "40%", "70%", "70%", "70%", true, false],
    [{ es: "tiempo", en: "time" }, "28.3 s", "24.5 s", "18.7 s", "20.0 s", true, false],
    [{ es: "puntaje", en: "score" }, "3/10", "4/10", "7/10", "5/10", true, false],
  ];
  return (
    <figure className="frame-fig">
      <motion.div className="frame" {...view} variants={rise}>
        <span className="mono pane-l">{es ? "tree test · 10 personas por ronda · Optimal Workshop" : "tree test · 10 people per round · Optimal Workshop"}</span>
        <div className="dtable-wrap"><table className="dtable cmp">
          <thead>
            <tr><th /><th colSpan={2}>{es ? "tarea 1 · comprar 2 entradas en Larcomar" : "task 1 · buy 2 tickets at Larcomar"}</th><th colSpan={2}>{es ? "tarea 2 · alquilar una sala para una empresa" : "task 2 · rent a theater for a company"}</th></tr>
            <tr><th /><th>{es ? "actual" : "current"}</th><th>{es ? "nueva" : "new"}</th><th>{es ? "actual" : "current"}</th><th>{es ? "nueva" : "new"}</th></tr>
          </thead>
          <tbody>{rows.map(([m, a, b, c, d, g1, g2]) => (
            <tr key={m.en}><th>{t(m, es)}</th><td>{a}</td><td className={g1 ? "up" : "down"}>{b}</td><td>{c}</td><td className={c === d ? "" : g2 ? "up" : "down"}>{d}</td></tr>
          ))}</tbody>
        </table></div>
      </motion.div>
      <figcaption className="small muted">{es ? "Comprar entradas mejoró en todo. Alquilar una sala empeoró: varios entraron a Eventos pensando que ahí estaba." : "Buying tickets improved across the board. Renting a theater got worse: several people went into Events thinking it was there."}</figcaption>
    </figure>
  );
}

/* ---------- user flows ---------- */
type F = [L, "start" | "screen" | "action" | "decision" | "end"];
const FLOW1: F[] = [
  [{ es: "Entra a la web", en: "Opens the site" }, "start"], [{ es: "Home", en: "Home" }, "screen"], [{ es: "Películas", en: "Films" }, "screen"], [{ es: "“En cartelera”", en: "“Now showing”" }, "action"], [{ es: "La película", en: "The film" }, "screen"], [{ es: "“Comprar”", en: "“Buy”" }, "action"], [{ es: "Cantidad de entradas", en: "Number of tickets" }, "screen"], [{ es: "“2 adultos”", en: "“2 adults”" }, "action"], [{ es: "Asientos disponibles", en: "Available seats" }, "screen"], [{ es: "“E11 y E12”", en: "“E11 and E12”" }, "action"], [{ es: "Método de pago", en: "Payment method" }, "screen"], [{ es: "Ingresa el pago", en: "Enters payment" }, "action"], [{ es: "¿Confirmar compra?", en: "Confirm purchase?" }, "decision"], [{ es: "Fin", en: "Done" }, "end"],
];
const FLOW2: F[] = [
  [{ es: "Entra a la web", en: "Opens the site" }, "start"], [{ es: "Home", en: "Home" }, "screen"], [{ es: "Ventas empresariales", en: "Corporate sales" }, "screen"], [{ es: "“Alquilar salas”", en: "“Rent theaters”" }, "action"], [{ es: "Alquiler de salas", en: "Theater rental" }, "screen"], [{ es: "Llena sus datos", en: "Fills in details" }, "action"], [{ es: "¿Enviar formulario?", en: "Send the form?" }, "decision"], [{ es: "Fin", en: "Done" }, "end"],
];

function Flow({ steps, es }: { steps: F[]; es: boolean }) {
  return <ol className="flow">{steps.map(([l, k], i) => <li key={i} className={`fl-${k}`}>{t(l, es)}</li>)}</ol>;
}

export function Flows({ es }: { es: boolean }) {
  return (
    <figure className="frame-fig">
      <motion.div className="frame flows" {...view} transition={{ staggerChildren: 0.08 }}>
        <motion.div variants={rise}><span className="mono pane-l">{es ? "flujo 1 · comprar dos entradas" : "flow 1 · buy two tickets"}</span><Flow steps={FLOW1} es={es} /></motion.div>
        <motion.div variants={rise}><span className="mono pane-l">{es ? "flujo 2 · alquilar una sala" : "flow 2 · rent a theater"}</span><Flow steps={FLOW2} es={es} /></motion.div>
        <div className="fl-key small muted"><span className="fl-screen">{es ? "pantalla" : "screen"}</span><span className="fl-action">{es ? "acción" : "action"}</span><span className="fl-decision">{es ? "decisión" : "decision"}</span></div>
      </motion.div>
      <figcaption className="small muted">{es ? "Las dos tareas del test, como flujos sobre la nueva arquitectura." : "The two test tasks, as flows on the new architecture."}</figcaption>
    </figure>
  );
}

/* ---------- voice and style ---------- */
export function Voice({ es }: { es: boolean }) {
  const cols: L[] = [{ es: "compromiso", en: "commitment" }, { es: "calidad", en: "quality" }, { es: "excelencia", en: "excellence" }, { es: "servicio", en: "service" }];
  const rows: [L, L[] | L][] = [
    [{ es: "concepto", en: "concept" }, [{ es: "Cumplimos lo que prometemos y mejoramos siempre.", en: "We keep our promises and keep improving." }, { es: "Una experiencia única, innovadora y divertida.", en: "A unique, innovative and fun experience." }, { es: "Cada detalle cuidado para una gran experiencia.", en: "Every detail cared for, for a great experience." }, { es: "Pensamos cómo te gustaría resolver cada cosa.", en: "We think about how you'd like each thing solved." }]],
    [{ es: "verbosidad", en: "length" }, [{ es: "Cortas, cercanas y directas.", en: "Short, warm and direct." }, { es: "Cercanas, directas y concisas.", en: "Warm, direct and concise." }, { es: "Cortas y cordiales.", en: "Short and cordial." }, { es: "Cordiales y persuasivas.", en: "Cordial and persuasive." }]],
    [{ es: "vocabulario", en: "vocabulary" }, [{ es: "Cercano, ético, seguro.", en: "Warm, ethical, confident." }, { es: "Simple, técnico, cercano.", en: "Simple, technical, warm." }, { es: "Simple, técnico, positivo.", en: "Simple, technical, positive." }, { es: "Amable, seguro, amigable.", en: "Kind, confident, friendly." }]],
    [{ es: "gramática", en: "grammar" }, { es: "Oraciones simples y frases cortas que invitan a vivir la experiencia.", en: "Simple sentences and short phrases that invite you into the experience." }],
    [{ es: "puntuación", en: "punctuation" }, { es: "Puntos y comas, sin signos de interrogación ni exclamación; bullets para listas.", en: "Periods and commas, no question or exclamation marks; bullets for lists." }],
    [{ es: "mayúsculas", en: "capitals" }, { es: "Solo la primera letra, en títulos y frases de banners.", en: "First letter only, in titles and banner lines." }],
  ];
  return (
    <figure className="frame-fig">
      <motion.div className="frame" {...view} variants={rise}>
        <span className="mono pane-l">{es ? "matriz de voz" : "voice matrix"}</span>
        <div className="dtable-wrap"><table className="dtable">
          <thead><tr><th />{cols.map((c) => <th key={c.en}>{t(c, es)}</th>)}</tr></thead>
          <tbody>{rows.map(([h, v]) => (
            <tr key={h.en}><th>{t(h, es)}</th>{Array.isArray(v) ? v.map((c, i) => <td key={i}>{t(c, es)}</td>) : <td colSpan={4}>{t(v, es)}</td>}</tr>
          ))}</tbody>
        </table></div>
      </motion.div>
      <figcaption className="small muted">{es ? "Cuatro valores de la marca traducidos a cómo escribe la web." : "Four brand values translated into how the site writes."}</figcaption>
    </figure>
  );
}

export function StyleGuide({ es }: { es: boolean }) {
  const rows: [L, L, string, string][] = [
    [{ es: "títulos", en: "titles" }, { es: "De 1 a 3 palabras, siempre invitando.", en: "1 to 3 words, always inviting." }, "Conoce nuestras funciones", "Hey! Mira nuestras funciones en cartelera"],
    [{ es: "secciones", en: "sections" }, { es: "Claro y descriptivo, para ayudar.", en: "Clear and descriptive, to help." }, "Encuentra tu función perfecta", "Aquí verás eventos futuros"],
    [{ es: "descripciones", en: "descriptions" }, { es: "Hasta 6 líneas, o 2 párrafos en sinopsis.", en: "Up to 6 lines, or 2 paragraphs for synopses." }, "Sinopsis breve y precisa", "Un bloque largo con toda la trama"],
    [{ es: "llamados a la acción", en: "calls to action" }, { es: "Cortos, guían a comprar; la única excepción a los signos.", en: "Short, guiding to buy; the only exception for marks." }, "¡Compra aquí!", "Por aquí"],
    [{ es: "errores", en: "errors" }, { es: "Explícitos, cortos y con la solución.", en: "Explicit, short and with the fix." }, "Este campo es obligatorio", "Intenta de nuevo"],
    [{ es: "números", en: "numbers" }, { es: "Precios, fechas y horas con un solo formato.", en: "Prices, dates and times in one format." }, "S/ 25.00 · 9:45 am · 1 h 23 min", "25 nuevos soles · 09:45 · 83 min"],
  ];
  return (
    <figure className="frame-fig">
      <motion.div className="frame" {...view} variants={rise}>
        <span className="mono pane-l">{es ? "guía de estilo de contenido" : "content style guide"}</span>
        <div className="dtable-wrap"><table className="dtable">
          <thead><tr><th>{es ? "tema" : "topic"}</th><th>{es ? "regla" : "rule"}</th><th>{es ? "así sí" : "do"}</th><th>{es ? "así no" : "don't"}</th></tr></thead>
          <tbody>{rows.map(([h, d, ok, no]) => <tr key={h.en}><th>{t(h, es)}</th><td>{t(d, es)}</td><td className="up">{ok}</td><td className="down">{no}</td></tr>)}</tbody>
        </table></div>
      </motion.div>
      <figcaption className="small muted">{es ? "Los ejemplos quedan en español, como se leerían en la web." : "Examples stay in Spanish, as they'd read on the site."}</figcaption>
    </figure>
  );
}

export function Principles({ es }: { es: boolean }) {
  const items: [string, string, string][] = es
    ? [["foco", "Geometría, iconos y foto", "Lo que sostiene la interfaz."], ["color", "A todo color", "Sin paletas recortadas."], ["iconos", "Lineales y con contenedor", "Un solo estilo en todo el sitio."], ["ilustración", "Ninguna", "La fotografía de cada película manda."], ["lenguaje", "Bootstrap", "Una grilla conocida para construir rápido."], ["estructura", "Minimalista, a sangre", "Pocas cosas, a todo el ancho, 1440 × 1024."]]
    : [["focus", "Geometry, icons and photos", "What holds the interface together."], ["color", "Full color", "No trimmed palettes."], ["icons", "Line icons with containers", "One style across the site."], ["illustration", "None", "Each film's photography leads."], ["language", "Bootstrap", "A known grid to build fast."], ["structure", "Minimal, full-bleed", "Few things, full width, 1440 × 1024."]];
  return <Notes cols={3} label={es ? "principios de diseño" : "design principles"} items={items} caption={es ? "Moderno y simple: que la película sea lo que se ve." : "Modern and simple: let the film be what you see."} />;
}

"use client";

import { motion } from "motion/react";
import { rise, view } from "./Figure";

// Cinépolis: the course slides rebuilt as portfolio figures, in the slides' own language:
// navy and bright blue, spaced capitals, cards on light grey. Content is the original research, in two languages.

type L = { es: string; en: string };
const t = (x: L, es: boolean) => (es ? x.es : x.en);

function Fig({ label, caption, children, className = "" }: { label: string; caption: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className="frame-fig">
      <motion.div className={`frame cine ${className}`} {...view} transition={{ staggerChildren: 0.05 }}>
        <span className="cine-k">{label}</span>
        {children}
      </motion.div>
      <figcaption className="small muted">{caption}</figcaption>
    </figure>
  );
}

/* ---------- audit: UX laws and Nielsen heuristics, as the slide's cards ---------- */
const LAWS: [L, boolean, L][] = [
  [{ es: "Ley de Miller", en: "Miller's law" }, false, { es: "En la fila principal de la cartelera se muestran 5 películas por línea.", en: "The main listings row shows 5 films per line." }],
  [{ es: "Usabilidad estética", en: "Aesthetic usability" }, false, { es: "Es funcional, pero la estética no ayuda: se ve básico y antiguo.", en: "It works, but the look doesn't help: it feels basic and dated." }],
  [{ es: "Ley de Postel", en: "Postel's law" }, false, { es: "Si eliges mal, la compra vive en un subdominio sin botón para volver a la cartelera.", en: "If you pick wrong, the purchase lives on a subdomain with no button back to the listings." }],
  [{ es: "Ley de Von Restorff", en: "Von Restorff effect" }, true, { es: "El acceso a la cartelera completa rompe la línea y llama la atención.", en: "The full-listings link breaks the line and draws attention." }],
  [{ es: "Regla de pico final", en: "Peak-end rule" }, true, { es: "Abre con lo nuevo o en preventa y cierra con el acceso a toda la cartelera.", en: "Opens with what's new or on presale and closes with a link to all listings." }],
  [{ es: "Umbral de Doherty", en: "Doherty threshold" }, true, { es: "Avisa que está cargando horarios mientras espera.", en: "It tells you showtimes are loading while you wait." }],
  [{ es: "Ley de Jakob", en: "Jakob's law" }, false, { es: "Los cines suelen filtrar primero; el filtro de Cinépolis no ayuda y te lleva a otra página.", en: "Cinemas usually filter first; Cinépolis's filter doesn't help and sends you elsewhere." }],
  [{ es: "Ley de Hick", en: "Hick's law" }, false, { es: "Muchas opciones de filtro y horarios, sin orden ni diferencia entre salas.", en: "Many filter and showtime options, with no order or difference between theaters." }],
  [{ es: "Ley de Fitts", en: "Fitts's law" }, false, { es: "Los botones son pequeños, sin aire y difíciles de tocar.", en: "Buttons are small, cramped and hard to tap." }],
  [{ es: "Ley de Tesler", en: "Tesler's law" }, true, { es: "Los pasos de compra son justos y necesarios.", en: "The purchase steps are just the necessary ones." }],
];
const HEUR: [L, boolean, L][] = [
  [{ es: "1. Visibilidad del estado del sistema", en: "1. Visibility of system status" }, true, { es: "Informa los tiempos de carga y el estado de la página.", en: "Loading times and page status are shown." }],
  [{ es: "2. Relación entre el sistema y el mundo real", en: "2. Match with the real world" }, true, { es: "Indicaciones con palabras fáciles de entender.", en: "Instructions in plain words." }],
  [{ es: "3. Control y libertad del usuario", en: "3. User control and freedom" }, false, { es: "No hay botón de retroceso ni breadcrumb en la compra.", en: "No back button or breadcrumb in the purchase." }],
  [{ es: "4. Consistencia y estándares", en: "4. Consistency and standards" }, false, { es: "La compra cambia de diseño respecto al resto del sitio.", en: "The purchase changes design from the rest of the site." }],
  [{ es: "5. Prevención de errores", en: "5. Error prevention" }, true, { es: "El diseño es fácil e intuitivo.", en: "The design is easy and intuitive." }],
  [{ es: "6. Reconocer antes que recordar", en: "6. Recognition over recall" }, true, { es: "Los filtros ayudan a distribuir las opciones.", en: "Filters help organize the options." }],
  [{ es: "7. Flexibilidad y eficiencia de uso", en: "7. Flexibility and efficiency" }, true, { es: "Directo e intuitivo, aunque no muy cómodo.", en: "Direct and intuitive, if not very comfortable." }],
  [{ es: "8. Estética y diseño minimalista", en: "8. Aesthetic and minimalist design" }, false, { es: "Mucho diseño, nada minimalista ni estético.", en: "A lot of design, neither minimal nor pleasing." }],
  [{ es: "9. Recuperarse de errores", en: "9. Recover from errors" }, true, { es: "Explica el error y qué hacer.", en: "Explains the error and what to do." }],
  [{ es: "10. Ayuda y documentación", en: "10. Help and documentation" }, true, { es: "Todo está en el footer, salvo un chat de ayuda.", en: "Everything is in the footer, except a help chat." }],
];

function Cards({ rows, es }: { rows: [L, boolean, L][]; es: boolean }) {
  return (
    <div className="cine-cards">
      {rows.map(([n, ok, d]) => (
        <motion.div key={n.en} variants={rise} className="cine-card">
          <b>{t(n, es)}</b>
          <span>{t(d, es)}</span>
          <span className={ok ? "cine-v ok" : "cine-v no"}>{ok ? "✓" : "✕"} {ok ? (es ? "Sí cumple" : "Met") : (es ? "No cumple" : "Not met")}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function Audit({ es }: { es: boolean }) {
  return (
    <>
      <Fig label={es ? "análisis ux · leyes ux" : "ux analysis · ux laws"} caption={es ? "Diez leyes de UX sobre la web de 2023: seis no se cumplían. El patrón: demasiadas opciones a la vez y botones difíciles." : "Ten UX laws on the 2023 site: six weren't met. The pattern: too many choices at once and hard buttons."}><Cards rows={LAWS} es={es} /></Fig>
      <Fig label={es ? "análisis ux · heurísticas" : "ux analysis · heuristics"} caption={es ? "Las 10 heurísticas de Nielsen: tres fallaban, todas en la compra y en la estética." : "Nielsen's 10 heuristics: three failed, all in the purchase and the look."}><Cards rows={HEUR} es={es} /></Fig>
    </>
  );
}

/* ---------- benchmark, as three columns ---------- */
export function Benchmark({ es }: { es: boolean }) {
  const cols: [string, L, L, L][] = [
    ["Cineplanet", { es: "Cadena de cines nacida del mercado peruano. Es líder de la industria en el país.", en: "A cinema chain born in Peru. It leads the industry in the country." }, { es: "Cumple: la mejor eficiencia para llegar a la película o comprar.", en: "Met: the most efficient path to a film or a ticket." }, { es: "Limpio: deja respirar los espacios y no satura.", en: "Clean: lets space breathe and never crowds." }],
    ["Cinemark", { es: "Presente desde 1997, pionera del multicine desde el mercado extranjero.", en: "Present since 1997, the pioneer of the multiplex from abroad." }, { es: "Cumple: información directa que funciona.", en: "Met: direct information that works." }, { es: "Balanceado, aunque poco dinámico; la información atrae.", en: "Balanced, if not very dynamic; the information draws you in." }],
    ["Movietime", { es: "La opción económica para los amantes del cine.", en: "The budget option for film lovers." }, { es: "Cumple: información precisa y eficiente.", en: "Met: precise and efficient information." }, { es: "Lleno: saturado y sin espacios ni aire.", en: "Full: crowded, with no space or air." }],
  ];
  return (
    <Fig label={es ? "investigar · benchmarking" : "research · benchmarking"} caption={es ? "Cineplanet marcaba la vara: eficiente para comprar y con un diseño que deja respirar." : "Cineplanet set the bar: efficient to buy from, with a design that lets things breathe."}>
      <div className="cine-bench">
        {cols.map(([n, who, voc, des]) => (
          <motion.div key={n} variants={rise} className="cine-bcol">
            <b className="cine-caps">{n}</b>
            <p className="cine-navy">{t(who, es)}</p>
            <p className="cine-grey"><b>{es ? "Vocabulario y usabilidad: " : "Vocabulary and usability: "}</b>{t(voc, es)}</p>
            <p className="cine-grey"><b>{es ? "Diseño: " : "Design: "}</b>{t(des, es)}</p>
          </motion.div>
        ))}
      </div>
    </Fig>
  );
}

/* ---------- survey, as the slide's number board ---------- */
export function Survey({ es }: { es: boolean }) {
  const big = (n: string, d: L, blue = false) => (
    <motion.div variants={rise} className={blue ? "cine-num blue" : "cine-num"}><b>{n}</b><span>{t(d, es)}</span></motion.div>
  );
  return (
    <Fig label={es ? "investigar · encuesta · 10 personas" : "research · survey · 10 people"} caption={es ? "Diez personas navegaron la web y simularon una compra. La rapidez convencía; la experiencia, no." : "Ten people browsed the site and simulated a purchase. Speed convinced them; the experience didn't."}>
      <div className="cine-survey">
        <motion.div variants={rise} className="cine-navy cine-info">
          <b className="cine-caps">{es ? "información relevante" : "key facts"}</b>
          <span>{es ? "18 a 39 años, que trabajan o estudian" : "18 to 39, working or studying"}</span>
          <span>{es ? "80% con nivel universitario" : "80% with a university degree"}</span>
          <span>{es ? "7 de 10 son mujeres" : "7 of 10 are women"}</span>
        </motion.div>
        {big("9/10", { es: "consideran la web veloz, sin tiempos de espera", en: "find the site fast, with no waiting" }, true)}
        {big("3/10", { es: "tuvieron inconvenientes al comprar: poca señalización y acompañamiento", en: "had trouble buying: little guidance or signposting" })}
        {big("60%", { es: "la ve buena y rápida; el otro 40%, tediosa y poco atractiva", en: "find it good and fast; the other 40%, tedious and dull" })}
        {big("90%", { es: "la considera efectiva pero poco atractiva, “sin personalidad”", en: "see it as effective but dull, “with no personality”" })}
        {big("80%", { es: "dice que lo más útil es la cartelera", en: "say the listings are the most useful part" })}
        {big("100%", { es: "la encuentra fácil e intuitiva, pero muy básica a nivel visual", en: "find it easy and intuitive, but visually very basic" }, true)}
        {big("10/10", { es: "piden nuevas funciones que otras cadenas ya tienen", en: "ask for features other chains already have" })}
        <motion.blockquote variants={rise} className="cine-navy cine-quote">{es ? "“Cumple su objetivo, pero no me convence comprar ahí. Si la página es tan aburrida, cómo será el cine. No hay tráiler ni imágenes que capten mi atención.”" : "“It does the job, but it doesn't convince me to buy there. If the page is this boring, what will the cinema be like? No trailer, no images that catch my eye.”"}</motion.blockquote>
      </div>
    </Fig>
  );
}

/* ---------- journey map, as the slide's rows ---------- */
type Step = { n: number; mood: 1 | 0 | -1; q?: L };
const ST: { h: L; tasks: L[]; steps: Step[]; obs: L; ch: L }[] = [
  { h: { es: "informarse sobre película", en: "learn about the film" }, ch: { es: "Web", en: "Web" },
    tasks: [{ es: "Ingresar a cinepolis.com.pe", en: "Open cinepolis.com.pe" }, { es: "Scrollear en home", en: "Scroll the home" }, { es: "Ver estrenos o cartelera", en: "See new films or listings" }],
    steps: [{ n: 1, mood: 1 }, { n: 2, mood: 0, q: { es: "“Hay opciones que merecen más lugar en la home.”", en: "“Some options deserve more space on the home.”" } }, { n: 3, mood: -1, q: { es: "“Me costó encontrar el botón de la película.”", en: "“It was hard to find the film's button.”" } }],
    obs: { es: "La estética, la información y el dinamismo no transmiten la innovación y tecnología que la marca busca mostrar.", en: "The look, information and pace don't convey the innovation and technology the brand wants to show." } },
  { h: { es: "ver cartelera e información", en: "browse listings and details" }, ch: { es: "Web", en: "Web" },
    tasks: [{ es: "Entra a cartelera", en: "Open listings" }, { es: "Filtra por cine", en: "Filter by cinema" }, { es: "Ve la información", en: "Read the details" }, { es: "Selecciona horario", en: "Pick a showtime" }],
    steps: [{ n: 4, mood: -1 }, { n: 5, mood: 0, q: { es: "“No encuentro cómo filtrar por tipo.”", en: "“I can't filter by type.”" } }, { n: 6, mood: 0, q: { es: "“Es mínima e insuficiente.”", en: "“It's minimal and not enough.”" } }, { n: 7, mood: 0 }],
    obs: { es: "Elegir la película funciona. Menos espera y botones más claros harían que se sienta cómodo.", en: "Choosing the film works. Less waiting and clearer buttons would make it comfortable." } },
  { h: { es: "comprar boleto", en: "buy the ticket" }, ch: { es: "Landing de compra, web", en: "Purchase landing, web" },
    tasks: [{ es: "2 boletos de adulto", en: "2 adult tickets" }, { es: "2 asientos", en: "2 seats" }, { es: "Información personal", en: "Personal details" }, { es: "Método de pago", en: "Payment method" }, { es: "Datos de pago", en: "Payment details" }, { es: "Confirma compra", en: "Confirms purchase" }],
    steps: [{ n: 8, mood: 0 }, { n: 9, mood: 0, q: { es: "“No decía qué asientos estaban ocupados.”", en: "“It didn't say which seats were taken.”" } }, { n: 10, mood: 0 }, { n: 11, mood: 0, q: { es: "“Faltan métodos de pago.”", en: "“It needs more payment methods.”" } }, { n: 12, mood: 0 }, { n: 13, mood: 0, q: { es: "“Fácil, pero poco agradable.”", en: "“Easy, but not very pleasant.”" } }],
    obs: { es: "Mostrar el paso a paso y poder guardar la compra daría confianza y seguridad con la marca.", en: "Showing the steps and letting people save the purchase would build trust in the brand." } },
];

function Curve({ steps }: { steps: Step[] }) {
  return (
    <div className="cj-curve" aria-hidden>
      {steps.map((p) => <span key={p.n} className={`m${p.mood}`} style={{ ["--y" as string]: p.mood === 1 ? 0 : p.mood === 0 ? 1 : 2 }}><i /><em>{p.n}</em></span>)}
    </div>
  );
}

export function Journey({ es }: { es: boolean }) {
  return (
    <Fig className="cine-journey" label={es ? "investigar · mapa de trayectoria" : "research · journey map"} caption={es ? "El punto más bajo llega pronto: encontrar la película. La compra no frustra, pero tampoco acompaña." : "The lowest point comes early: finding the film. The purchase doesn't frustrate, but it doesn't guide either."}>
      <div className="cj-head">
        <motion.div variants={rise} className="cj-persona"><span className="cj-av">MN</span><div><b>Miguel Narváez</b><span>{es ? "22 años · Ingeniero industrial. Le gusta el deporte y el cine en sus ratos libres." : "22 · Industrial engineer. Likes sport and movies in his free time."}</span></div></motion.div>
        <motion.div variants={rise} className="cine-light"><b className="cine-caps">{es ? "situación hipotética" : "scenario"}</b><span>{es ? "Quiere ir al cine con su enamorada, buscar un estreno y comprar para esa misma noche." : "He wants to go to the movies with his girlfriend, find a new release and buy for that same night."}</span></motion.div>
        <motion.div variants={rise} className="cine-light"><b className="cine-caps">{es ? "objetivo y expectativas" : "goals and expectations"}</b><span>{es ? "Información fácil, funciones sin demora y comprar con éxito." : "Easy information, showtimes without delay and a successful purchase."}</span></motion.div>
      </div>
      <div className="cj-grid">
        {ST.map((s) => (
          <motion.section key={s.h.en} variants={rise} className="cj-col">
            <div className="cine-grey cj-task"><b className="cine-caps">{t(s.h, es)}</b><ol start={s.steps[0].n}>{s.tasks.map((x) => <li key={x.en}>{t(x, es)}</li>)}</ol></div>
            <div className="cj-emo"><Curve steps={s.steps} />
              <ul>{s.steps.filter((p) => p.q).map((p) => <li key={p.n}><span className="cine-n">{p.n}</span>{t(p.q!, es)}</li>)}</ul>
            </div>
            <p className="cine-blue">{t(s.obs, es)}</p>
            <span className="cine-black">{t(s.ch, es)}</span>
          </motion.section>
        ))}
      </div>
      <div className="cj-legend"><span className="m1">+</span><span className="m0">+/−</span><span className="m-1">−</span></div>
    </Fig>
  );
}

/* ---------- desirability × feasibility, on axes ---------- */
export function Priority({ es }: { es: boolean }) {
  // [label, row (1 = most desirable), col (4 = most feasible), priority]
  const items: [L, number, number, 1 | 2 | 3 | 4][] = [
    [{ es: "Sistema de compra de confitería", en: "Concessions purchase" }, 1, 1, 3], [{ es: "Creación de usuario", en: "Account creation" }, 1, 2, 3],
    [{ es: "Rediseño completo de estética", en: "Full visual redesign" }, 1, 3, 1], [{ es: "Rapidez de carga", en: "Loading speed" }, 1, 4, 1],
    [{ es: "Guardado temporal de datos", en: "Save details temporarily" }, 2, 1, 3], [{ es: "Navegabilidad del sitio", en: "Site navigation" }, 2, 4, 1],
    [{ es: "Modo oscuro", en: "Dark mode" }, 3, 1, 4], [{ es: "Precios y categorías en la compra", en: "Prices and categories at checkout" }, 3, 3, 2],
    [{ es: "Límite de tiempo para comprar", en: "Purchase time limit" }, 3, 4, 2], [{ es: "Ver el tráiler", en: "Watch the trailer" }, 4, 3, 2],
    [{ es: "Ofertas, promociones y eventos", en: "Offers, promotions and events" }, 4, 4, 2],
  ];
  return (
    <Fig label={es ? "definir · matriz de deseabilidad y factibilidad" : "define · desirability and feasibility matrix"} caption={es ? "Lo más deseado y más factible iba primero: moverse por el sitio, la velocidad y la estética. El modo oscuro quedó al final." : "Most wanted and most feasible went first: navigation, speed and the look. Dark mode came last."}>
      <div className="cm">
        <span className="cm-y cine-caps">{es ? "deseabilidad" : "desirability"}</span>
        <div className="cm-grid">
          {items.map(([l, r, c, p]) => <motion.div key={l.en} variants={rise} className={`cm-i p${p}`} style={{ gridRow: r, gridColumn: c }}>{t(l, es)}</motion.div>)}
        </div>
        <span className="cm-x cine-caps">{es ? "factibilidad" : "feasibility"}</span>
        <div className="cm-key">{[1, 2, 3, 4].map((p) => <span key={p} className={`p${p}`}>{es ? "prioridad" : "priority"} {p}</span>)}</div>
      </div>
    </Fig>
  );
}

/* ---------- information architecture, as the slide's org chart ---------- */
type N = string | [string, N[]];
const IA_BEFORE: N[] = [
  ["!Cartelera", ["Sala Junior", "4DX", "MacroXE"]],
  ["!Cartelera", [["Películas", [["Ver sinopsis", ["Funciones"]]]]]],
  ["!Próximos estrenos", ["Películas"]],
  "Promociones", "Ventas empresariales",
  ["!Cartelera", ["Preventas", "Contenidos alternativos", "Muestras y festivales", "!Próximos estrenos", "Contenido Cinépolis"]],
  ["¿Quiénes somos?", ["Únete al equipo", "Próximas aperturas", "Corporativos"]],
  ["Legales", ["Términos y condiciones", "Política de privacidad"]],
  ["Contacto", ["Chatea con los expertos"]],
];
const IA_AFTER: N[] = [
  ["Películas", [["En cartelera", ["Películas en cartelera"]], ["Próximos estrenos", ["Películas a estrenarse"]]]],
  ["!Cines", [["Nuestros cines", ["Cinépolis Larcomar", "Cinépolis Plaza Norte", "Cinépolis Santa Anita", "Cinépolis Arequipa Center", "Cinépolis Pucallpa", "Próximas aperturas"]], ["Nuestras salas", ["Sala Junior", "4DX", "Macro XE"]]]],
  "Promociones",
  ["Club Cinépolis", ["Promociones", "Reglamento"]],
  ["Nosotros", ["Conócenos", "Únete al equipo"]],
  ["Ventas empresariales", ["Cupones empresariales", "Alquiler de salas", "Funciones empresariales", "Pauta publicitaria"]],
  ["!Eventos", ["Contenidos alternativos", "Contenidos Cinépolis", "Muestras y festivales"]],
  ["Legales", ["Términos y condiciones", "Política de privacidad", "Libro de reclamaciones"]],
];

function Kids({ nodes }: { nodes: N[] }) {
  return (
    <ul className="oc-kids">
      {nodes.map((n, i) => {
        const [l, k] = typeof n === "string" ? [n, null] : n;
        const hot = l.startsWith("!");
        return <li key={l + i}><span className={hot ? "hot" : undefined}>{hot ? l.slice(1) : l}</span>{k && <Kids nodes={k} />}</li>;
      })}
    </ul>
  );
}

function Org({ nodes }: { nodes: N[] }) {
  return (
    <div className="oc-wrap"><div className="oc">
      <span className="oc-root">HOME</span>
      <div className="oc-row">
        {nodes.map((n, i) => {
          const [l, k] = typeof n === "string" ? [n, null] : n;
          const hot = l.startsWith("!");
          return <div key={l + i} className="oc-col"><span className={hot ? "oc-pill hot" : "oc-pill"}>{hot ? l.slice(1) : l}</span>{k && <Kids nodes={k} />}</div>;
        })}
      </div>
    </div></div>
  );
}

export function IATrees({ es }: { es: boolean }) {
  return (
    <>
      <Fig label={es ? "definir · arquitectura de información · actual" : "define · information architecture · current"} caption={es ? "Tres secciones distintas se llamaban Cartelera y los estrenos aparecían dos veces (marcados en rojo)." : "Three different sections were called Listings and new releases appeared twice (marked in red)."}><Org nodes={IA_BEFORE} /></Fig>
      <Fig label={es ? "idear · arquitectura de información · nueva" : "ideate · information architecture · new"} caption={es ? "La nueva agrupa por lo que la gente viene a hacer, con cada sede bajo Cines y una sección de Eventos (marcadas en rojo, lo nuevo)." : "The new one groups by what people come to do, with each venue under Cinemas and an Events section (marked in red, what's new)."}><Org nodes={IA_AFTER} /></Fig>
    </>
  );
}

/* ---------- tree test, as the slide's result bars ---------- */
type R = { success: number; direct: number; time: number; score: number };
function Bars({ r, label, hl }: { r: R; label: string; hl?: boolean }) {
  const row = (k: string, v: number, txt: string, cls: string, max = 100) => (
    <div className="tb-row"><span>{k}</span><div className="tb-bar"><i className={cls} style={{ width: `${(v / max) * 100}%` }} /></div><b>{txt}</b></div>
  );
  return (
    <div className={hl ? "ttb hl" : "ttb"}>
      <b className="cine-caps">{label}</b>
      {row("Success", r.success, `${r.success}%`, "g")}
      {row("Directness", r.direct, `${r.direct}%`, "b")}
      {row("Time taken", r.time, `${r.time.toFixed(1)} s`, "t", 40)}
      {row("Score", r.score, `${r.score}/10`, "o", 10)}
    </div>
  );
}

export function TreeTest({ es }: { es: boolean }) {
  const tasks: [L, R, R, L][] = [
    [{ es: "tarea 1 · comprar 2 entradas para “Chicas Pesadas” en Larcomar", en: "task 1 · buy 2 tickets for “Mean Girls” at Larcomar" }, { success: 50, direct: 40, time: 28.3, score: 3 }, { success: 60, direct: 70, time: 24.5, score: 4 }, { es: "La efectividad directa subió un 30%, con menos tiempo y más dirección.", en: "Direct effectiveness rose 30%, with less time and more direction." }],
    [{ es: "tarea 2 · alquilar una sala para una exposición de la empresa", en: "task 2 · rent a theater for a company presentation" }, { success: 80, direct: 70, time: 18.7, score: 7 }, { success: 70, direct: 70, time: 20.0, score: 5 }, { es: "Bajaron el éxito y el puntaje: muchos se confundieron con la nueva sección Eventos.", en: "Success and score dropped: many were confused by the new Events section." }],
  ];
  return (
    <Fig label={es ? "idear · treejack testing · comparación" : "ideate · treejack testing · comparison"} caption={es ? "El mismo test en Optimal Workshop, con 10 personas por ronda, en la arquitectura actual y en la nueva." : "The same test in Optimal Workshop, 10 people per round, on the current and the new architecture."}>
      <div className="tt">
        {tasks.map(([h, a, b, note]) => (
          <motion.div key={h.en} variants={rise} className="tt-task">
            <p className="cine-light">{t(h, es)}</p>
            <div className="tt-pair"><Bars r={a} label={es ? "arquitectura actual" : "current architecture"} /><Bars r={b} label={es ? "arquitectura nueva" : "new architecture"} hl /></div>
            <p className="small">{t(note, es)}</p>
          </motion.div>
        ))}
      </div>
    </Fig>
  );
}

/* ---------- user flows, with the slide's shapes ---------- */
type F = [L, "start" | "home" | "screen" | "action" | "decision" | "end"];
const FLOW1: F[] = [
  [{ es: "Ingreso a la web", en: "Opens the site" }, "start"], [{ es: "Home", en: "Home" }, "home"], [{ es: "Películas", en: "Films" }, "screen"], [{ es: "Selecciona “En cartelera”", en: "Selects “Now showing”" }, "action"], [{ es: "“Chicas Pesadas”", en: "“Mean Girls”" }, "screen"], [{ es: "Selecciona “Comprar”", en: "Selects “Buy”" }, "action"], [{ es: "Cantidad de entradas", en: "Number of tickets" }, "screen"], [{ es: "Selecciona “2 adultos”", en: "Selects “2 adults”" }, "action"], [{ es: "Asientos disponibles", en: "Available seats" }, "screen"], [{ es: "Selecciona “E11 y E12”", en: "Selects “E11 and E12”" }, "action"], [{ es: "Método de pago", en: "Payment method" }, "screen"], [{ es: "Ingresa el método de pago", en: "Enters payment" }, "action"], [{ es: "¿Confirmar compra?", en: "Confirm purchase?" }, "decision"], [{ es: "Fin", en: "End" }, "end"],
];
const FLOW2: F[] = [
  [{ es: "Ingreso a la web", en: "Opens the site" }, "start"], [{ es: "Home", en: "Home" }, "home"], [{ es: "Ventas empresariales", en: "Corporate sales" }, "screen"], [{ es: "Selecciona “Alquilar salas”", en: "Selects “Rent theaters”" }, "action"], [{ es: "Alquiler de salas", en: "Theater rental" }, "screen"], [{ es: "Llena tus datos", en: "Fills in details" }, "action"], [{ es: "¿Confirmar envío?", en: "Send the form?" }, "decision"], [{ es: "Fin", en: "End" }, "end"],
];
const Flow = ({ steps, es }: { steps: F[]; es: boolean }) => <ol className="cf">{steps.map(([l, k], i) => <li key={i} className={`cf-${k}`}><span>{t(l, es)}</span></li>)}</ol>;

export function Flows({ es }: { es: boolean }) {
  return (
    <Fig label={es ? "idear · userflows" : "ideate · user flows"} caption={es ? "Las dos tareas del test como flujos sobre la nueva arquitectura: pantallas en marrón, acciones en verde y decisiones en morado." : "The two test tasks as flows on the new architecture: screens in brown, actions in green and decisions in purple."}>
      <motion.p variants={rise} className="cine-light">{es ? "Tarea 1 · Quieres comprar dos entradas para “Chicas Pesadas” en Larcomar." : "Task 1 · You want two tickets for “Mean Girls” at Larcomar."}</motion.p>
      <Flow steps={FLOW1} es={es} />
      <motion.p variants={rise} className="cine-light">{es ? "Tarea 2 · El gerente de marketing necesita alquilar una sala para una exposición." : "Task 2 · The marketing manager needs to rent a theater for a presentation."}</motion.p>
      <Flow steps={FLOW2} es={es} />
    </Fig>
  );
}

/* ---------- voice matrix and style guide, as the slide's tables ---------- */
export function Voice({ es }: { es: boolean }) {
  const cols: L[] = [{ es: "compromiso", en: "commitment" }, { es: "calidad", en: "quality" }, { es: "excelencia", en: "excellence" }, { es: "vocación de servicio", en: "service" }];
  const rows: [L, L[] | L][] = [
    [{ es: "concepto", en: "concept" }, [{ es: "Cumplimos lo que prometemos y mejoramos siempre para darte la mejor experiencia.", en: "We keep our promises and keep improving to give you the best experience." }, { es: "Mostrar la esencia de una experiencia única, innovadora y divertida.", en: "Show the essence of a unique, innovative and fun experience." }, { es: "Todo se hace cuidando el mínimo detalle para una gran experiencia de cine.", en: "Everything is done with care for every detail, for a great cinema experience." }, { es: "Nos ponemos en tus zapatos para resolver cada solicitud de la forma más práctica.", en: "We put ourselves in your shoes to solve each request the most practical way." }]],
    [{ es: "verbosidad", en: "length" }, [{ es: "Palabras cortas, cercanas, con frases directas y concisas.", en: "Short, warm words with direct, concise phrases." }, { es: "Palabras cercanas con frases directas y concisas.", en: "Warm words with direct, concise phrases." }, { es: "Palabras cortas y cercanas. Lenguaje cordial.", en: "Short, warm words. Cordial language." }, { es: "Lenguaje cordial, con confianza y frases persuasivas.", en: "Cordial, confident language with persuasive phrases." }]],
    [{ es: "vocabulario", en: "vocabulary" }, [{ es: "Cercano, ético, seguro, confiado", en: "Warm, ethical, confident, assured" }, { es: "Simple, técnico, seguro y cercano", en: "Simple, technical, confident and warm" }, { es: "Simple, técnico y positivo", en: "Simple, technical and positive" }, { es: "Amable, seguro, cercano y amigable", en: "Kind, confident, warm and friendly" }]],
    [{ es: "gramática", en: "grammar" }, { es: "Oraciones simples y frases cortas, invitando a vivir experiencias únicas.", en: "Simple sentences and short phrases, inviting people into unique experiences." }],
    [{ es: "puntuación", en: "punctuation" }, { es: "Puntos y comas; sin signos de interrogación ni exclamación. Bullets para listados.", en: "Periods and commas; no question or exclamation marks. Bullets for lists." }],
    [{ es: "uso de mayúsculas", en: "capitals" }, { es: "Primera letra de una oración, en títulos o frases de banners.", en: "First letter of a sentence, in titles or banner lines." }],
  ];
  return (
    <Fig label={es ? "superficie · matriz de voz" : "surface · voice matrix"} caption={es ? "Los cuatro valores de la marca, traducidos a cómo escribe la web." : "The brand's four values, translated into how the site writes."}>
      <div className="dtable-wrap"><table className="ct">
        <thead><tr><th />{cols.map((c) => <th key={c.en} className="ct-h">{t(c, es)}</th>)}</tr></thead>
        <tbody>{rows.map(([h, v]) => <tr key={h.en}><th className="ct-r">{t(h, es)}</th>{Array.isArray(v) ? v.map((c, i) => <td key={i}>{t(c, es)}</td>) : <td colSpan={4}>{t(v, es)}</td>}</tr>)}</tbody>
      </table></div>
    </Fig>
  );
}

export function StyleGuide({ es }: { es: boolean }) {
  const rows: [L, L, string[], string[]][] = [
    [{ es: "Títulos", en: "Titles" }, { es: "Palabras cortas y específicas, siempre invitando; de 1 a 3 palabras.", en: "Short, specific words, always inviting; 1 to 3 words." }, ["Conoce nuestras funciones.", "Disfruta de experiencias únicas"], ["Hey! Mira nuestras funciones en cartelera", "Disfruta llevando a los que más quieres!"]],
    [{ es: "Secciones", en: "Sections" }, { es: "Claro y descriptivo; poca información, siempre para ayudar.", en: "Clear and descriptive; little information, always helpful." }, ["Encuentra aquí los eventos próximos a realizarse.", "Encuentra tu función perfecta."], ["Aquí verás eventos futuros", "Busca la función que más te guste"]],
    [{ es: "Descripciones", en: "Descriptions" }, { es: "Oraciones precisas; no más de 6 líneas o 2 párrafos en sinopsis.", en: "Precise sentences; no more than 6 lines or 2 paragraphs for synopses." }, ["Una sinopsis breve que va al punto"], ["Un bloque largo que cuenta toda la trama"]],
    [{ es: "Call to action", en: "Calls to action" }, { es: "Frases cortas que invitan a comprar; aquí sí van exclamaciones.", en: "Short phrases that invite to buy; exclamation marks are fine here." }, ["¡Entradas aquí!", "¡Compra aquí!"], ["Por aquí", "Lo quiero"]],
    [{ es: "Errores", en: "Errors" }, { es: "Mensajes explícitos, cortos y directos a la solución.", en: "Explicit, short messages that point to the fix." }, ["Por favor, ingresa tu número correctamente", "Este campo es obligatorio"], ["Intenta de nuevo", "Mira bien"]],
    [{ es: "Números", en: "Numbers" }, { es: "Fechas, costos y horas con un solo formato.", en: "Dates, prices and times in one format." }, ["S/ 25.00", "Sábado, 17 de febrero de 2024", "9:45 am - 5:30 pm", "1 hr y 23 min"], ["25 nuevos soles", "17-feb-24", "09:45 am - 17:30 pm", "83 min"]],
  ];
  return (
    <Fig label={es ? "superficie · guía de estilo" : "surface · style guide"} caption={es ? "Los ejemplos quedan en español, como se leerían en la web." : "Examples stay in Spanish, as they'd read on the site."}>
      <div className="dtable-wrap"><table className="ct">
        <thead><tr><th className="ct-h">{es ? "temática" : "topic"}</th><th className="ct-h">{es ? "descripción" : "description"}</th><th className="ct-h">✓ {es ? "buenas prácticas" : "good practice"}</th><th className="ct-h">✕ {es ? "malas prácticas" : "bad practice"}</th></tr></thead>
        <tbody>{rows.map(([h, d, ok, no]) => <tr key={h.en}><th className="ct-c">{t(h, es)}</th><td>{t(d, es)}</td><td><ul>{ok.map((x) => <li key={x}>{x}</li>)}</ul></td><td><ul>{no.map((x) => <li key={x}>{x}</li>)}</ul></td></tr>)}</tbody>
      </table></div>
    </Fig>
  );
}

/* ---------- design principles, as the navy slide ---------- */
export function Principles({ es }: { es: boolean }) {
  const items: [L, L][] = [
    [{ es: "Centrado en", en: "Focused on" }, { es: "Geometría, iconografía y fotografía", en: "Geometry, iconography and photography" }],
    [{ es: "Código cromático", en: "Color" }, { es: "Full color", en: "Full color" }],
    [{ es: "Iconografía", en: "Iconography" }, { es: "Lineal e iconografía con contenedor", en: "Line icons and icons with containers" }],
    [{ es: "Ilustraciones", en: "Illustrations" }, { es: "No ilustraciones", en: "No illustrations" }],
    [{ es: "Fotografías", en: "Photography" }, { es: "Full color", en: "Full color" }],
    [{ es: "Lenguaje de diseño", en: "Design language" }, { es: "Bootstrap", en: "Bootstrap" }],
    [{ es: "Estilo", en: "Style" }, { es: "Moderno y simple", en: "Modern and simple" }],
    [{ es: "Medidas", en: "Sizes" }, { es: "1440 × 1024", en: "1440 × 1024" }],
    [{ es: "Estructura", en: "Structure" }, { es: "Minimalista y limpia. Full pleno", en: "Minimal and clean. Full-bleed" }],
  ];
  return (
    <figure className="frame-fig">
      <motion.div className="frame cine cine-pr" {...view} transition={{ staggerChildren: 0.04 }}>
        <span className="cine-k">{es ? "superficie · principios de diseño" : "surface · design principles"}</span>
        <div className="pr-body">
          <dl>{items.map(([k, v]) => <motion.div key={k.en} variants={rise}><dt>{t(k, es)}</dt><dd>{t(v, es)}</dd></motion.div>)}</dl>
          <span className="pr-mark">cinépolis</span>
        </div>
      </motion.div>
      <figcaption className="small muted">{es ? "Moderno y simple: que la película sea lo que se ve." : "Modern and simple: let the film be what you see."}</figcaption>
    </figure>
  );
}

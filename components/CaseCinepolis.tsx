"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { Crop, Frame, Metrics, Pane, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("cinepolis");
const Img = ({ src, alt }: { src: string; alt: string }) => <Crop src={`${IMG}/${src}`} alt={alt} />;

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <img className="cover-shot" src={`${IMG}/cover.webp`} alt={es ? "La nueva arquitectura de información de cinepolis.com.pe" : "The new information architecture for cinepolis.com.pe"} />;

  const before = (
    <Frame className="rows" caption={es ? "La web en 2023, en desktop y mobile: rápida y funcional, pero con una cartelera que lo ocupaba todo y un camino de compra con poca guía." : "The site in 2023, on desktop and mobile: fast and functional, but with listings that took over everything and a purchase path with little guidance."}>
      <Pane label={es ? "antes · cinepolis.com.pe" : "before · cinepolis.com.pe"}><Img src="before.webp" alt={es ? "La web de Cinépolis Perú en desktop y mobile" : "Cinépolis Peru's website on desktop and mobile"} /></Pane>
    </Frame>
  );

  const audit = (
    <Frame className="cols-2" caption={es ? "Primero, una auditoría con leyes de UX y las 10 heurísticas de Nielsen. Miller, Postel y Von Restorff no se cumplían: demasiadas opciones a la vez y nada que guiara la mirada." : "First, an audit against UX laws and Nielsen's 10 heuristics. Miller, Postel and Von Restorff weren't met: too many choices at once and nothing to guide the eye."}>
      <Pane label={es ? "leyes de UX" : "UX laws"}><Img src="laws.webp" alt={es ? "Leyes de Miller, Postel, pico final, usabilidad estética, Von Restorff y Doherty con su resultado" : "Miller, Postel, peak-end, aesthetic usability, Von Restorff and Doherty with their result"} /></Pane>
      <Pane label={es ? "heurísticas" : "heuristics"}><Img src="heuristics.webp" alt={es ? "Heurísticas de Nielsen evaluadas sobre la web" : "Nielsen heuristics evaluated on the site"} /></Pane>
    </Frame>
  );

  const benchmark = (
    <Frame className="rows" caption={es ? "Benchmark con Cineplanet, Cinemark y Movietime: vocabulario, usabilidad y diseño de cada uno." : "Benchmark against Cineplanet, Cinemark and Movietime: vocabulary, usability and design for each."}>
      <Pane label={es ? "benchmark" : "benchmark"}><Img src="benchmark.webp" alt={es ? "Comparación de Cineplanet, Cinemark y Movietime" : "Comparison of Cineplanet, Cinemark and Movietime"} /></Pane>
    </Frame>
  );

  const survey = (
    <Metrics label={es ? "encuesta · 10 personas" : "survey · 10 people"}
      items={es
        ? [["9/10", "sienten la web veloz"], ["90%", "la ven efectiva pero sin personalidad"], ["3/10", "tuvieron problemas al comprar, por falta de guía"]]
        : [["9/10", "find the site fast"], ["90%", "see it as effective but with no personality"], ["3/10", "had trouble buying, for lack of guidance"]]}
      caption={es ? "Diez personas de 18 a 39 años, que navegaron la web y simularon una compra. El 80% dijo que lo más útil era la cartelera, y las 10 pidieron funciones que otras cadenas ya tienen." : "Ten people aged 18 to 39, who browsed the site and simulated a purchase. 80% said the listings were the most useful part, and all 10 asked for features other chains already have."} />
  );

  const journey = (
    <Frame className="cols-2" caption={es ? "El journey de un cinéfilo, de buscar la película a pagar, y la matriz de deseabilidad y factibilidad para ordenar las ideas." : "A moviegoer's journey, from finding the film to paying, and the desirability-feasibility matrix to rank the ideas."}>
      <Pane label={es ? "journey map" : "journey map"}><Img src="journey.webp" alt={es ? "Journey map con tareas, emociones, observaciones y canal" : "Journey map with tasks, emotions, observations and channel"} /></Pane>
      <Pane label={es ? "matriz de priorización" : "priority matrix"}><Img src="matrix.webp" alt={es ? "Matriz de deseabilidad y factibilidad con las ideas priorizadas" : "Desirability and feasibility matrix with the prioritized ideas"} /></Pane>
    </Frame>
  );

  const ia = (
    <Frame className="cols-2" caption={es ? "De una arquitectura sin un orden claro a una que agrupa por lo que la gente viene a hacer: películas, cines con cada sede, promociones, club, ventas empresariales y eventos." : "From an architecture with no clear order to one grouped by what people come to do: films, cinemas with each venue, promotions, club, corporate sales and events."}>
      <Pane label={es ? "arquitectura actual" : "current architecture"}><Img src="ia-before.webp" alt={es ? "Árbol del sitio actual" : "Current site tree"} /></Pane>
      <Pane accent label={es ? "arquitectura nueva" : "new architecture"}><Img src="ia-after.webp" alt={es ? "Árbol del sitio propuesto" : "Proposed site tree"} /></Pane>
    </Frame>
  );

  const test = (
    <Frame className="cols-2" caption={es ? "El mismo tree test, con 10 personas, en las dos arquitecturas. Comprar entradas mejoró; buscar dónde alquilar una sala empeoró, porque la nueva sección Eventos confundió." : "The same tree test, with 10 people, on both architectures. Buying tickets improved; finding where to rent a theater got worse, because the new Events section confused people."}>
      <Pane accent label={es ? "tarea 1 · comprar entradas" : "task 1 · buy tickets"}><Img src="test-t1.webp" alt={es ? "Resultados de la tarea 1 en la arquitectura actual y la nueva" : "Task 1 results on the current and new architecture"} /></Pane>
      <Pane label={es ? "tarea 2 · alquilar una sala" : "task 2 · rent a theater"}><Img src="test-t2.webp" alt={es ? "Resultados de la tarea 2 en la arquitectura actual y la nueva" : "Task 2 results on the current and new architecture"} /></Pane>
    </Frame>
  );

  const flows = (
    <Frame className="cols-2" caption={es ? "El flujo de compra paso a paso y los wireframes de la home y la ficha de la película." : "The purchase flow step by step and wireframes of the home and the film page."}>
      <Pane label={es ? "user flow" : "user flow"}><Img src="userflow.webp" alt={es ? "User flow para comprar entradas" : "User flow to buy tickets"} /></Pane>
      <Pane label={es ? "wireframes" : "wireframes"}><Img src="wireframes.webp" alt={es ? "Wireframes de la home y la ficha de película" : "Wireframes of the home and the film page"} /></Pane>
    </Frame>
  );

  const surface = (
    <Frame className="cols-2" caption={es ? "Para la capa visual: un mapa de voz para sonar cercano e inspirador, y principios de diseño minimalistas sobre Bootstrap, con la fotografía de cada película como protagonista." : "For the visual layer: a voice map to sound close and inspiring, and minimal design principles on Bootstrap, with each film's photography as the star."}>
      <Pane label={es ? "voz" : "voice"}><Img src="voice.webp" alt={es ? "Mapa de voz: concepto, personalidad, vocabulario, gramática y puntuación" : "Voice map: concept, personality, vocabulary, grammar and punctuation"} /></Pane>
      <Pane label={es ? "principios de diseño" : "design principles"}><Img src="principles.webp" alt={es ? "Principios de diseño: geometría, iconografía, fotografía, estilo y estructura" : "Design principles: geometry, iconography, photography, style and structure"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["Analizar", "leyes de UX y heurísticas"], ["Investigar", "benchmark y encuesta a 10"], ["Definir", "journey, Lean UX y tree test"], ["Idear", "nueva arquitectura y su test"], ["Esqueleto y superficie", "flujos, wireframes y estilo"]]
    : [["Analyze", "UX laws and heuristics"], ["Research", "benchmark and a survey of 10"], ["Define", "journey, Lean UX and tree test"], ["Ideate", "new architecture and its test"], ["Skeleton and surface", "flows, wireframes and style"]]} />;

  const legal = es ? "Proyecto de un curso de UX/UI, sin relación con Cinépolis. Las capturas de la web son de 2023." : "A UX/UI course project, not affiliated with Cinépolis. Screenshots of the site are from 2023.";

  if (!es) return {
    project: "Cinépolis — case study",
    subtitle: "fast, but with no personality: research for a cinema website",
    tldr: "Cinépolis arrived in Peru in 2023 with a website that was quick and functional but hard to love: listings everywhere, little guidance when buying and nothing that made it feel like a cinema. Working solo, I {{audited the site, surveyed and tested it with 10 people, and redesigned its information architecture}}, then tested the new tree against the old one. Buying tickets got more direct; one task got worse, and that taught me more than the one that improved.",
    meta: [
      ["type", "Course project · UX/UI"],
      ["role", "UX researcher and designer, solo"],
      ["team", "Me"],
      ["timeline", "2023"],
      ["scope", "Research, information architecture, flows, wireframes and visual direction"],
      ["status", "Concept up to wireframes and style guide"],
    ],
    chips: ["case study", "ux research", "course"], okChip: 1,
    cover,
    tools: [["Figma", "figma"], ["Optimal Workshop"]],
    challenge: {
      intro: "The site did its basic job, but people didn't enjoy using it:",
      list: ["information about films, theaters and formats was mentioned, not explained", "the purchase had little guidance, and some users got lost along the way", "it looked plain, with no personality for a brand selling an experience"],
      end: "Two hypotheses to test: {{the site makes information hard to find, and its structure slows tasks down}}.",
      fig: before,
    },
    role: "{{I did the whole case on my own}}: the audit, benchmark, survey, journey and Lean UX, two rounds of tree testing in Optimal Workshop, the new architecture, flows, wireframes and the visual direction.",
    research: {
      items: ["An audit against UX laws and Nielsen's heuristics, screen by screen.", "A benchmark of Cineplanet, Cinemark and Movietime.", "A survey of 10 people aged 18 to 39, with open questions and a simulated purchase."],
      extraTitle: "the order of the work",
      extra: <>{order}{audit}{benchmark}{survey}</>,
    },
    decisions: [
      { t: "start from the journey, then prioritize", because: "the journey showed where the moviegoer gets lost, and a desirability-feasibility matrix ranked the ideas before designing anything.", fig: journey },
      { t: "group the site by what people come to do", because: "the tree test showed the current site had no clear order. The new architecture puts films, cinemas with each venue, promotions, club, corporate sales and events at the top level.", ruled: "a 180-degree rebuild. Everything in the new tree already existed on the site except a page per cinema, so the change could be gradual.", fig: ia },
      { t: "test the new tree against the old one", because: "the same two tasks, with 10 people, on both versions. A new structure is only better if people find things faster in it.", fig: test },
      { t: "a purchase with steps you can see", because: "the flow and wireframes make the path from film to seat to payment explicit, the moment where 3 of 10 people had trouble.", fig: flows },
      { t: "a voice and a look for an experience brand", because: "90% found the site effective but with no personality. A voice map and minimal principles let the films' own photography carry the emotion.", fig: surface },
    ],
    validation: {
      items: ["Two rounds of tree testing in Optimal Workshop, 10 participants each, with the same two tasks.", "Survey answers used to shape the new architecture before testing it.", "No usability test of the wireframes: the case ended at the structure and style."],
    },
    results: [["task 1", "{{Buying tickets got more direct}}: success 50% → 60%, direct paths 40% → 70%, time 28.3 s → 24.5 s."], ["task 2", "Finding where to rent a theater got worse: success 80% → 70%, time 18.7 s → 20.0 s. The new Events section pulled people the wrong way."], ["measured", "Tree-test results only; the redesign wasn't built."]],
    learn: ["{{A test that gets worse is still a result.}} Task 2 showed that one more section can cost more than it adds, and that names matter as much as structure.", "Users rarely ask for a whole new site. Keeping what already worked made the new architecture easier to adopt."],
    legal,
  };

  return {
    project: "Cinépolis — caso de estudio",
    subtitle: "rápida, pero sin personalidad: investigación para la web de un cine",
    tldr: "Cinépolis llegó al Perú en 2023 con una web rápida y funcional pero difícil de querer: cartelera por todos lados, poca guía al comprar y nada que la hiciera sentir como un cine. Trabajando solo, {{audité la web, la encuesté y la probé con 10 personas, y rediseñé su arquitectura de información}}, y luego probé el árbol nuevo contra el anterior. Comprar entradas se volvió más directo; una tarea empeoró, y eso me enseñó más que la que mejoró.",
    meta: [
      ["tipo", "Proyecto de curso · UX/UI"],
      ["rol", "Investigador y diseñador UX, en solitario"],
      ["equipo", "Yo"],
      ["duración", "2023"],
      ["alcance", "Investigación, arquitectura de información, flujos, wireframes y dirección visual"],
      ["estado", "Concepto hasta wireframes y guía de estilo"],
    ],
    chips: ["caso de estudio", "ux research", "curso"], okChip: 1,
    cover,
    tools: [["Figma", "figma"], ["Optimal Workshop"]],
    challenge: {
      intro: "La web cumplía lo básico, pero la gente no disfrutaba usarla:",
      list: ["la información de películas, salas y formatos se mencionaba, pero no se explicaba", "la compra tenía poca guía, y algunos usuarios se perdían en el camino", "se veía simple, sin personalidad para una marca que vende una experiencia"],
      end: "Dos hipótesis para probar: {{la web dificulta encontrar la información, y su estructura hace lentas las tareas}}.",
      fig: before,
    },
    role: "{{Hice todo el caso por mi cuenta}}: la auditoría, el benchmark, la encuesta, el journey y el Lean UX, dos rondas de tree testing en Optimal Workshop, la nueva arquitectura, los flujos, los wireframes y la dirección visual.",
    research: {
      items: ["Una auditoría con leyes de UX y las heurísticas de Nielsen, pantalla por pantalla.", "Un benchmark de Cineplanet, Cinemark y Movietime.", "Una encuesta a 10 personas de 18 a 39 años, con preguntas abiertas y una compra simulada."],
      extraTitle: "el orden del trabajo",
      extra: <>{order}{audit}{benchmark}{survey}</>,
    },
    decisions: [
      { t: "partir del journey, y luego priorizar", because: "el journey mostró dónde se pierde el cinéfilo, y una matriz de deseabilidad y factibilidad ordenó las ideas antes de diseñar nada.", fig: journey },
      { t: "agrupar la web por lo que la gente viene a hacer", because: "el tree test mostró que el sitio actual no tenía un orden claro. La nueva arquitectura pone en el primer nivel películas, cines con cada sede, promociones, club, ventas empresariales y eventos.", ruled: "rehacerla en 180 grados. Todo lo del árbol nuevo ya existía en la web, salvo una página por cine, así que el cambio podía ser gradual.", fig: ia },
      { t: "probar el árbol nuevo contra el anterior", because: "las mismas dos tareas, con 10 personas, en las dos versiones. Una estructura nueva solo es mejor si la gente encuentra las cosas más rápido.", fig: test },
      { t: "una compra con pasos a la vista", because: "el flujo y los wireframes hacen explícito el camino de la película al asiento y al pago, justo donde 3 de 10 personas tuvieron problemas.", fig: flows },
      { t: "una voz y un look para una marca de experiencias", because: "el 90% veía la web efectiva pero sin personalidad. Un mapa de voz y principios minimalistas dejan que la fotografía de cada película ponga la emoción.", fig: surface },
    ],
    validation: {
      items: ["Dos rondas de tree testing en Optimal Workshop, con 10 participantes cada una y las mismas dos tareas.", "Las respuestas de la encuesta sirvieron para plantear la nueva arquitectura antes de probarla.", "Sin prueba de usabilidad de los wireframes: el caso terminó en la estructura y el estilo."],
    },
    results: [["tarea 1", "{{Comprar entradas se volvió más directo}}: éxito 50% → 60%, rutas directas 40% → 70%, tiempo 28.3 s → 24.5 s."], ["tarea 2", "Buscar dónde alquilar una sala empeoró: éxito 80% → 70%, tiempo 18.7 s → 20.0 s. La nueva sección Eventos llevó a la gente por el camino equivocado."], ["medido", "Solo resultados del tree test; el rediseño no se construyó."]],
    learn: ["{{Un test que empeora también es un resultado.}} La tarea 2 mostró que una sección más puede costar más de lo que suma, y que los nombres importan tanto como la estructura.", "Los usuarios rara vez piden una web completamente nueva. Mantener lo que ya funcionaba hizo más fácil adoptar la nueva arquitectura."],
    legal,
  };
}

export default function CaseCinepolis() {
  return <CaseLayout content={content} />;
}

"use client";

import { motion } from "motion/react";
import { CaseLayout, type CaseContent } from "./CaseLayout";
import { CoverVideo } from "./CoverVideo";
import { Crop, FilmFig, Frame, Pane, Steps, imgBase, rise } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("cdv");
const Img = ({ src, alt, className }: { src: string; alt: string; className?: string }) => <Crop src={`${IMG}/${src}`} alt={alt} className={className} />;

// A sitemap as a nested list. Strings starting with "!" are the problem spots (before) or the new doors (after).
type Node = string | [string, Node[]];
function Tree({ nodes, depth = 0 }: { nodes: Node[]; depth?: number }) {
  return (
    <ul className={depth ? "tree sub" : "tree"}>
      {nodes.map((n) => {
        const [label, kids] = typeof n === "string" ? [n, null] : n;
        const hot = label.startsWith("!");
        const text = hot ? label.slice(1) : label;
        return (
          <li key={text} className={depth === 0 ? "top" : undefined}>
            <span className={hot ? "hot" : undefined}>{text}</span>
            {kids && <Tree nodes={kids} depth={depth + 1} />}
          </li>
        );
      })}
    </ul>
  );
}

const BEFORE: Node[] = [
  ["Acerca de CDV", ["En qué creemos", "Nuestro ADN", ["Liderazgo", [["!Ministerios", ["!Kids cdv", "!GetUp cdv", "!Central cdv", "!Punto cdv", "!Ellas cdv"]], "Pastores fundadores", "Equipo pastoral"]], "Casa Gracia cdv", "Refugio Gracia cdv", "IDL", "Familias", "!2024"]],
  ["Siguiente paso", ["Soy nuevo", "Crecer", "Un nuevo tú", "Bautismo", "Grupos pequeños", "Salvación"]],
  "Oración",
  ["Recursos", ["Finanzas", "Recursos familia", "cdv música", "Prédicas", "Devocionales"]],
  "Dar",
];
const AFTER: Node[] = [
  ["Siguiente paso", ["Un nuevo tú", "Crecer", "Ser voluntario"]],
  ["!Campus y horarios", ["Servicio online", "Campus Surco", "Campus Lince", "Campus Orlando"]],
  ["Conoce CDV", ["En esto creemos", "Nuestros pastores", "!Niños | Kids", "!Adolescentes | GetUp", "!Jóvenes | Central", "!Jóvenes adultos | Punto", "!Mujeres | Ellas", "Habilidades diferentes", ["Programas de apoyo", ["Casa Gracia", "Refugio Gracia"]]]],
  "!Grupos pequeños",
  ["Recursos", ["Prédicas", "Devocionales", "Finanzas", "CDV Música", ["Podcasts", ["Haciendo Iglesia", "La Sal", "Siete Octavos"]]]],
  ["Eventos", ["Conf Ellas", "Conf La Sal", "Conf Comun", "Páginas de eventos"]],
];

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <CoverVideo src={`${IMG}/cover`} poster={`${IMG}/cover-poster.webp`} label={es ? "Una primera visita: bienvenido a casa, los cuatro accesos debajo del banner, y Bautismo se abre en su página" : "A first visit: bienvenido a casa, the four doors under the banner, and Bautismo opens into its page"} />;
  const menuFilm = <FilmFig src={`${IMG}/menu`} caption={es ? "El menú viejo, tres niveles abajo, se reordena: cada etiqueta va a donde la buscaría alguien nuevo y dice primero para quién es." : "The old menu, three levels deep, reorders: each label goes where someone new would look for it, and says first who it is for."} />;

  const sitemap = (
    <Frame className="cols-nav" caption={es ? "Antes, los ministerios estaban tres niveles abajo, dentro de Liderazgo, y con nombres que solo conoce quien ya va. Después, cada uno dice primero para quién es." : "Before, ministries sat three levels down inside Leadership, under names only regulars know. After, each one says first who it is for."}>
      <Pane label={es ? "antes · 5 secciones" : "before · 5 sections"}><motion.div variants={rise} className="tree-box"><Tree nodes={BEFORE} /></motion.div></Pane>
      <Pane accent label={es ? "después · 6 secciones" : "after · 6 sections"}><motion.div variants={rise} className="tree-box"><Tree nodes={AFTER} /></motion.div></Pane>
    </Frame>
  );

  const doors = (
    <Frame className="rows" caption={es ? "Debajo del banner, lo que la gente buscaba: dónde y cuándo, cómo crecer, grupos pequeños y bautismo." : "Under the banner, what people were looking for: where and when, how to grow, small groups and baptism."}>
      <Pane label={es ? "home · en vivo" : "home · live"}><Img src="tiles.webp" alt={es ? "Cuatro accesos: Campus y horarios, Crecer, Grupos pequeños y Bautismo" : "Four doors: Campus y horarios, Crecer, Grupos pequeños and Bautismo"} /></Pane>
    </Frame>
  );

  const type = (
    <Frame className="cols-wide" caption={es ? "El moodboard probó Inter con Lora itálica y colores por ministerio. Se quedó solo Inter, sobre un fondo cálido." : "The moodboard tried Inter with Lora italic and a color per ministry. Only Inter stayed, on a warm ground."}>
      <Pane label={es ? "moodboard · descartado" : "moodboard · ruled out"}><Img src="type.webp" alt={es ? "Moodboard: bienvenido a casa, servolución y un nuevo tú en Inter y Lora itálica, en varios colores" : "Moodboard: bienvenido a casa, servolución and un nuevo tú in Inter and Lora italic, in several colors"} /></Pane>
      <Pane accent label={es ? "final · solo Inter" : "final · Inter only"}><Img src="home-mobile.webp" alt={es ? "La home en un teléfono" : "The home on a phone"} /></Pane>
    </Frame>
  );

  const wires = (
    <Frame className="rows" caption={es ? "Wireframes de las páginas de la estructura nueva: home, siguiente paso, campus y horarios, conoce cdv y bautismo." : "Wireframes of the new structure's pages: home, siguiente paso, campus y horarios, conoce cdv and bautismo."}>
      <Pane label={es ? "wireframes" : "wireframes"}><Img src="wireframes.webp" alt={es ? "Cinco wireframes de página completa" : "Five full-page wireframes"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["Mapa", "el sitio tal como estaba"], ["Analytics", "qué se visita y qué no"], ["Iglesia", "qué es lo más importante"], ["Propuesta", "12 secciones, URLs limpias"], ["Tree test", "el menú, en UXtweak"], ["Final", "6 secciones y la home"]]
    : [["Map", "the site as it was"], ["Analytics", "what gets visited and what doesn't"], ["Church", "what matters most"], ["Proposal", "12 sections, clean URLs"], ["Tree test", "the menu, on UXtweak"], ["Final", "6 sections and the home"]]} />;

  if (!es) return {
    project: "Camino de Vida — case study",
    subtitle: "a website ordered around the first visit",
    tldr: "Camino de Vida is a church in Lima with campuses in Surco, Lince and Orlando. Its website had grown section by section: ministries were three levels deep inside “Leadership”, and where and when to go wasn't in the menu. As a volunteer on the communications team I {{rebuilt the structure around someone's first visit}}, using Google Analytics, the church's own priorities and a tree test, and redesigned the home.",
    meta: [
      ["role", "Volunteer product designer: information architecture, home and new pages"],
      ["team", "The church's communications team and me"],
      ["timeline", "2025–2026"],
      ["scope", "Sitemap, home and five page wireframes"],
      ["status", "The new home is live; the new main menu is designed and on hold"],
    ],
    chips: ["case study", "website", "volunteer", "home live"], okChip: 3,
    site: { href: "https://caminodevida.com/", label: "visit the website" },
    cover, coverFilm: true,
    challenge: {
      intro: "The site answered the church's org chart, not a visitor's questions:",
      list: ["ministries for kids, teens and young adults sat inside About → Leadership → Ministries", "they were listed by internal names (GetUp cdv, Punto cdv) that only regulars know", "an annual report sat in the main menu as “2024”, and campuses and times had no entry at all"],
      end: "Most people arrive with one question: {{where and when can I go, and is there something for me or my kids?}}",
    },
    role: "{{I led the information architecture and designed the home and the new pages}}: the map of the current site, the proposal, the tree test and the wireframes. The communications team decided what mattered most and reviewed every version.",
    research: {
      items: ["A map of the current site, item by item, to see where things really lived.", "Google Analytics, backed by Hotjar heatmaps and recordings: which pages people reached, and what they scrolled to and clicked under the banner.", "Conversations with the communications team and the church about what matters most to someone new.", "A tree test of the new menu on UXtweak."],
      extraTitle: "the order of the work",
      extra: order,
    },
    decisions: [
      { t: "what people look for goes right under the banner", because: "Google Analytics and Hotjar showed people hunting below the banner, and the church named the same things: campuses and times, growing, small groups and baptism. They became four doors.", fig: doors },
      { t: "ministries by who they're for, then by name", because: "“Teens | GetUp” tells a parent what it is; “GetUp cdv” only tells a regular. Ministries moved out of Leadership into Conoce CDV, one level down.", ruled: "keeping the internal names alone. They are the church's identity, so they stayed, after the audience.", fig: <>{menuFilm}{sitemap}</> },
      { t: "from twelve sections to six", because: "my first proposal had twelve top-level sections with clean URLs and redirects. After the tree test and the team's review, six were enough, and a phone menu can show six.", ruled: "the twelve-section proposal. Every section was justified, but together they were too many doors." },
      { t: "one typeface, so the content does the talking", because: "each ministry already brings its own logo and campaign art. A single sans, Inter, keeps the site calm around them and reads well on a phone.", ruled: "pairing Inter with a serif italic and a color per ministry. It looked lively in the moodboard, but it competed with the ministries' own art.", fig: type },
    ],
    decisionsTail: wires,
    validation: {
      items: ["A tree test of the new menu on UXtweak.", "Reviews with the communications team at each step, from the map to the wireframes."],
    },
    results: [["observed", "{{The new home is live}} with the four doors and meetings by age."], ["pending", "The new main menu is designed but on hold, so the live header still shows the old structure."], ["measured", "I didn't keep the tree test numbers, and there is no before/after analytics comparison yet."]],
    learn: ["{{Start with the people who run the channels.}} The communications team handles the church's social media and website, so they already knew what people ask for most; Google Analytics confirmed where people went looking.", "My first proposal was complete and too big. The test made the cut easier to agree on than any argument."],
    legal: "Volunteer work for Camino de Vida, a church in Lima. The site, its content and its brand belong to the church.",
  };

  return {
    project: "Camino de Vida — caso de estudio",
    subtitle: "una web ordenada para quien llega por primera vez",
    tldr: "Camino de Vida es una iglesia en Lima con campus en Surco, Lince y Orlando. Su web había crecido sección por sección: los ministerios estaban tres niveles abajo dentro de “Liderazgo”, y dónde y cuándo ir no estaba en el menú. Como voluntario del equipo de comunicaciones {{reordené la estructura alrededor de la primera visita}}, con Google Analytics, las prioridades de la iglesia y un tree test, y rediseñé la home.",
    meta: [
      ["rol", "Diseñador de producto voluntario: arquitectura de información, home y páginas nuevas"],
      ["equipo", "El equipo de comunicaciones de la iglesia y yo"],
      ["duración", "2025–2026"],
      ["alcance", "Sitemap, home y wireframes de cinco páginas"],
      ["estado", "La home nueva está en vivo; el menú principal nuevo está diseñado y en pausa"],
    ],
    chips: ["caso de estudio", "sitio web", "voluntariado", "home en vivo"], okChip: 3,
    site: { href: "https://caminodevida.com/", label: "ver la web" },
    cover, coverFilm: true,
    challenge: {
      intro: "La web respondía al organigrama de la iglesia, no a las preguntas de quien llega:",
      list: ["los ministerios de niños, adolescentes y jóvenes estaban en Acerca de → Liderazgo → Ministerios", "aparecían con nombres internos (GetUp cdv, Punto cdv) que solo conoce quien ya va", "un informe anual estaba en el menú principal como “2024”, y los campus y horarios no tenían entrada"],
      end: "La mayoría llega con una pregunta: {{¿dónde y cuándo puedo ir, y hay algo para mí o para mis hijos?}}",
    },
    role: "{{Lideré la arquitectura de información y diseñé la home y las páginas nuevas}}: el mapa del sitio actual, la propuesta, el tree test y los wireframes. El equipo de comunicaciones decidió qué era lo más importante y revisó cada versión.",
    research: {
      items: ["Un mapa del sitio actual, ítem por ítem, para ver dónde vivía cada cosa.", "Google Analytics, con mapas de calor y grabaciones de Hotjar como apoyo: a qué páginas llegaba la gente y qué tocaba debajo del banner.", "Conversaciones con el equipo de comunicaciones y la iglesia sobre qué es lo más importante para alguien nuevo.", "Un tree test del menú nuevo en UXtweak."],
      extraTitle: "el orden del trabajo",
      extra: order,
    },
    decisions: [
      { t: "lo que la gente busca va justo debajo del banner", because: "Google Analytics y Hotjar mostraron a la gente buscando debajo del banner, y la iglesia nombró lo mismo: campus y horarios, crecer, grupos pequeños y bautismo. Se volvieron cuatro accesos.", fig: doors },
      { t: "ministerios por para quién son, y luego por nombre", because: "“Adolescentes | GetUp” le dice a un papá qué es; “GetUp cdv” solo se lo dice a quien ya va. Los ministerios salieron de Liderazgo a Conoce CDV, un nivel abajo.", ruled: "dejar solo los nombres internos. Son la identidad de la iglesia, así que se quedaron, después de la audiencia.", fig: <>{menuFilm}{sitemap}</> },
      { t: "de doce secciones a seis", because: "mi primera propuesta tenía doce secciones con URLs limpias y redirecciones. Tras el tree test y la revisión del equipo, seis alcanzaban, y un menú de teléfono puede mostrar seis.", ruled: "la propuesta de doce secciones. Cada una estaba justificada, pero juntas eran demasiadas puertas." },
      { t: "una sola tipografía, para que hable el contenido", because: "cada ministerio ya trae su propio logo y arte de campaña. Una sola sans, Inter, deja la web tranquila alrededor y se lee bien en el teléfono.", ruled: "combinar Inter con una serif itálica y un color por ministerio. Se veía vivo en el moodboard, pero competía con el arte de cada ministerio.", fig: type },
    ],
    decisionsTail: wires,
    validation: {
      items: ["Un tree test del menú nuevo en UXtweak.", "Revisiones con el equipo de comunicaciones en cada paso, del mapa a los wireframes."],
    },
    results: [["observado", "{{La home nueva está en vivo}} con los cuatro accesos y las reuniones por edades."], ["pendiente", "El menú principal nuevo está diseñado, pero en pausa, así que el header en vivo todavía muestra la estructura vieja."], ["medido", "No guardé los números del tree test y aún no hay una comparación de analytics antes y después."]],
    learn: ["{{Empezar por quienes llevan los canales.}} El equipo de comunicaciones ve las redes y la web de la iglesia, así que ya sabía qué es lo que más pide la gente; Google Analytics confirmó dónde lo buscaba.", "Mi primera propuesta estaba completa y era demasiado grande. El test hizo el recorte más fácil de acordar que cualquier argumento."],
    legal: "Trabajo voluntario para Camino de Vida, una iglesia en Lima. El sitio, su contenido y su marca pertenecen a la iglesia.",
  };
}

export default function CaseCdv() {
  return <CaseLayout content={content} />;
}

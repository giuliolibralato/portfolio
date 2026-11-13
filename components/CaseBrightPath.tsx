"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { Crop, Frame, Notes, Pane, Proto, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("brightpath");
const Img = ({ src, alt, className }: { src: string; alt: string; className?: string }) => <Crop src={`${IMG}/${src}`} alt={alt} className={className} />;

const FILE = "hDQVOnULGRqM5pmxR0A6io/Design-Test---Giulio-Libralato";
const proto = (node: string, start: string) => `https://www.figma.com/proto/${FILE}?node-id=${node}&starting-point-node-id=${start}&scaling=min-zoom&content-scaling=fixed&page-id=2946%3A1483`;
const embed = (node: string, start: string) => `https://embed.figma.com/proto/${FILE}?node-id=${node}&starting-point-node-id=${start}&scaling=scale-down&content-scaling=fixed&page-id=2946%3A1483&hide-ui=1&embed-host=giuliolibralato-portfolio`;
const APP = { node: "13118-4758", start: "13118%3A4741" };
const WEB = { node: "13017-86", start: "13017%3A86" };

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <img className="cover-shot" src={`${IMG}/cover.webp`} alt={es ? "Hero de la web de BrightPath: Unlock your potential one skill at a time, con la app en un teléfono" : "BrightPath website hero: Unlock your potential one skill at a time, with the app on a phone"} />;

  const context = (
    <Frame className="rows" caption={es ? "El punto de partida que daba la prueba: una app de cursos para un público amplio, con tres dolores claros." : "The starting point the test gave: a course app for a broad audience, with three clear pains."}>
      <Pane label={es ? "contexto de la prueba" : "test context"}><Img src="context.webp" alt={es ? "BrightPath: audiencia de 18 a 45, perfiles, dolores y competidores Udemy y Coursera" : "BrightPath: audience 18 to 45, profiles, pains and competitors Udemy and Coursera"} /></Pane>
    </Frame>
  );

  const brief = (
    <Notes cols={2} label={es ? "las dos tareas" : "the two tasks"} caption={es ? "Dos briefs en una misma prueba: ampliar la app sin romper su sistema, y explorar una web con otra audiencia sin tocar ese sistema." : "Two briefs in one test: extend the app without breaking its system, and explore a site for another audience without touching that system."}
      items={es
        ? [["app · iOS", "Ampliar el flujo existente", "Dos slides de bienvenida, intereses y notificaciones en el onboarding, búsqueda, instructores, precios y ratings en la home, barra de navegación y una pantalla Explore con filtros y orden."], ["web · landing", "Presentar la app a profesionales", "Una página para mostrar BrightPath a un público que pasó a ser casi todo de IT, con libertad de color y tipografía, en desktop y mobile."]]
        : [["app · iOS", "Extend the existing flow", "Two welcome slides, interests and notifications in onboarding, search, instructors, pricing and ratings on the home, a tab bar and an Explore screen with filters and sorting."], ["web · landing", "Present the app to professionals", "One page to show BrightPath to an audience that became almost entirely IT, with freedom over color and type, on desktop and mobile."]]} />
  );

  const onboarding = (
    <Frame className="cols-phones" caption={es ? "Los intereses piden al menos tres, con el contador a la vista. El permiso de notificaciones va al final, cuando la persona ya eligió qué quiere aprender, y se puede saltar." : "Interests ask for at least three, with the count in view. The notification ask comes last, once the person has chosen what to learn, and it can be skipped."}>
      <Pane label={es ? "intereses" : "interests"}><Img className="phone" src="interests.webp" alt={es ? "Pick your interests: chips con Coding, Business y Photography elegidos" : "Pick your interests: chips with Coding, Business and Photography selected"} /></Pane>
      <Pane accent label={es ? "notificaciones" : "notifications"}><Img className="phone" src="push.webp" alt={es ? "Turn on push notifications, con Enable y Skip for now" : "Turn on push notifications, with Enable and Skip for now"} /></Pane>
      <Pane label={es ? "listo" : "done"}><Img className="phone" src="done.webp" alt={es ? "You are all set!, con Let's go" : "You are all set!, with Let's go"} /></Pane>
    </Frame>
  );

  const welcome = (
    <Frame className="rows" caption={es ? "Las dos slides nuevas siguen el patrón de la primera: foto, titular con una palabra en el acento y una línea." : "The two new slides follow the first one's pattern: photo, a headline with one word in the accent color and one line."}>
      <Pane label={es ? "bienvenida · 1 existente + 2 nuevas" : "welcome · 1 existing + 2 new"}><Img src="welcome.webp" alt={es ? "Tres slides: Find your favourite online classes, Track and enjoy your progress, Get involved with the community" : "Three slides: Find your favourite online classes, Track and enjoy your progress, Get involved with the community"} /></Pane>
    </Frame>
  );

  const explore = (
    <Frame className="cols-phones" caption={es ? "Ordenar y filtrar son dos botones distintos, abajo, al alcance del pulgar: ordenar cambia el orden de la lista; filtrar la recorta." : "Sort and filter are two separate buttons at the bottom, within thumb reach: sorting changes the order of the list; filtering trims it."}>
      <Pane label={es ? "explore" : "explore"}><Img className="phone" src="explore.webp" alt={es ? "Explore: búsqueda, categorías y una tarjeta por fila con rating, reseñas, instructor y descuento" : "Explore: search, categories and one card per row with rating, reviews, instructor and discount"} /></Pane>
      <Pane accent label={es ? "ordenar" : "sort by"}><Img className="phone" src="sort.webp" alt={es ? "Opciones de orden: Best Rated, Most Popular, precio de mayor a menor y de menor a mayor" : "Sort options: Best Rated, Most Popular, price high to low and low to high"} /></Pane>
      <Pane label={es ? "filtrar" : "filters"}><Img className="phone" src="filter.webp" alt={es ? "Filtros: Favorites, Categories, Rating, Level y Reviews" : "Filters: Favorites, Categories, Rating, Level and Reviews"} /></Pane>
    </Frame>
  );

  const appProto = <Proto ratio="4 / 5" src={embed(APP.node, APP.start)} href={proto(APP.node, APP.start)} label={es ? "prototipo de la app · pruébalo" : "app prototype · try it"} open={es ? "abrir en Figma" : "open in Figma"} caption={es ? "El flujo completo, de la bienvenida a Explore, en el prototipo de Figma." : "The full flow, from welcome to Explore, in the Figma prototype."} />;

  const web = (
    <Frame className="cols-2" caption={es ? "Para un público de IT: prueba social con medios y testimonios con cargo, una paleta más sobria en azul y ámbar, y un copy que habla de carrera en vez de pasatiempos." : "For an IT audience: social proof from media and testimonials with job titles, a calmer blue and amber palette, and copy about careers instead of hobbies."}>
      <Pane label={es ? "web · desktop" : "web · desktop"}><Img src="web-desk.webp" alt={es ? "La landing completa en desktop: hero, medios, beneficios, funciones, equipos, testimonios y cierre" : "The full landing on desktop: hero, media, benefits, features, teams, testimonials and closing"} /></Pane>
      <Pane label={es ? "web · mobile" : "web · mobile"}><Img className="narrow" src="web-mob.webp" alt={es ? "La misma landing en mobile, con carruseles en beneficios y funciones" : "The same landing on mobile, with carousels for benefits and features"} /></Pane>
    </Frame>
  );

  const webProto = <Proto src={embed(WEB.node, WEB.start)} href={proto(WEB.node, WEB.start)} label={es ? "prototipo de la web · desktop" : "website prototype · desktop"} open={es ? "abrir en Figma" : "open in Figma"} caption={es ? "La landing en desktop, navegable en Figma." : "The landing on desktop, browsable in Figma."} />;

  const order = <Steps items={es
    ? [["Brief", "app y web, dos tareas"], ["Flujo", "dónde entra cada pantalla nueva"], ["App", "onboarding, home y Explore"], ["Web", "estilo nuevo para IT"], ["Prototipos", "app y web en Figma"]]
    : [["Brief", "app and web, two tasks"], ["Flow", "where each new screen goes"], ["App", "onboarding, home and Explore"], ["Web", "a new style for IT"], ["Prototypes", "app and web in Figma"]]} />;

  const legal = es ? "Prueba técnica para Designli. BrightPath es un producto ficticio del ejercicio; las fotos son de stock." : "A design test for Designli. BrightPath is a fictional product from the exercise; photos are stock.";

  if (!es) return {
    project: "BrightPath — case study",
    subtitle: "a design test: extend an app, then pitch it to a new audience",
    tldr: "Designli's design test had two parts: extend BrightPath, a course app, with new welcome slides, onboarding steps, a richer home, a tab bar and an Explore screen with filters; then design a landing page for an audience that had become almost entirely IT professionals. I {{kept the app inside its existing system and gave the website a new, business-minded style}}, both as Figma prototypes. They didn't hire anyone then; months later, when a new position opened, they hired me.",
    meta: [
      ["type", "Design test · Designli"],
      ["role", "Product designer: the whole test, app and website"],
      ["team", "Me"],
      ["timeline", "2025"],
      ["scope", "iOS app flows and a responsive landing page"],
      ["status", "Prototypes; led to a hire months later"],
    ],
    chips: ["design challenge", "app + web", "led to a hire"], okChip: 2,
    cover,
    site: { href: proto(APP.node, APP.start), label: "see the prototype" },
    tools: [["Figma", "figma"]],
    challenge: {
      intro: "BrightPath offers courses from coding to yoga, and its users named three problems:",
      list: ["interfaces that feel crowded", "a hard time finding good, relevant courses", "trouble staying motivated"],
      end: "The test asked to add features without adding clutter, and then to {{show the same app to a very different audience}}.",
      fig: <>{context}{brief}</>,
    },
    role: "{{I did the whole test}}: the app flows inside BrightPath's design system, and the landing page in a new style, each with its desktop and mobile versions and a clickable prototype.",
    research: {
      items: ["The brief's own context: audience, profiles, pains and the main competitors, Udemy and Coursera.", "Mobile patterns for permission requests, interest pickers and sort-and-filter on long lists.", "Landing pages that sell to professionals: social proof, career language and a calmer palette."],
      extraTitle: "the order of the work",
      extra: order,
    },
    decisions: [
      { t: "new slides that look like the old one", because: "the system had to stay as it was, so the two new welcome slides reuse the first one's structure: a photo, a headline with one accent word and a single line.", fig: welcome },
      { t: "interests with a visible minimum, notifications last and skippable", because: "the brief asked for at least three interests, so the screen says it and the continue button waits. The notification ask comes at the end, once the app means something, and “Skip for now” never blocks anyone.", fig: onboarding },
      { t: "sort and filter, separate and within thumb reach", because: "sorting reorders and filtering removes, so they are two buttons, floating at the bottom where a thumb reaches while scrolling. The filter flow shows one selection end to end, as the brief asked.", fig: <>{explore}{appProto}</> },
      { t: "a business tone for the website", because: "the audience changed to IT professionals: press logos and testimonials with job titles for trust, blue with amber instead of playful colors, and copy about moving a career forward.", ruled: "reusing the app's look. The brief allowed full freedom, and the new audience needed something more sober.", fig: <>{web}{webProto}</> },
    ],
    validation: {
      items: ["Every item in both briefs covered and visible in the prototypes.", "Desktop at 1440 and 1920, tablet at 768 and mobile at 375 for the landing page.", "No usability test: it was a timed design test."],
    },
    results: [["observed", "{{It got me hired.}} There was no feedback at the time and no open role; months later, when a position opened, Designli hired me."], ["measured", "Nothing: it's a design exercise with a fictional product."]],
    learn: ["{{Working inside someone else's system is a skill of its own.}} The new screens had to look like they were always there.", "The same product needs a different voice for a different audience. The website changed tone, not the app."],
    legal,
  };

  return {
    project: "BrightPath — caso de estudio",
    subtitle: "una prueba de diseño: ampliar una app y presentarla a un público nuevo",
    tldr: "La prueba de diseño de Designli tenía dos partes: ampliar BrightPath, una app de cursos, con nuevas slides de bienvenida, pasos de onboarding, una home más completa, barra de navegación y una pantalla Explore con filtros; y diseñar una landing para un público que pasó a ser casi todo profesionales de IT. {{Mantuve la app dentro de su sistema y le di a la web un estilo nuevo, más de negocios}}, ambas como prototipos en Figma. En ese momento no contrataron a nadie; meses después, cuando se abrió una plaza, me contrataron.",
    meta: [
      ["tipo", "Prueba de diseño · Designli"],
      ["rol", "Diseñador de producto: toda la prueba, app y web"],
      ["equipo", "Yo"],
      ["duración", "2025"],
      ["alcance", "Flujos de la app iOS y una landing responsive"],
      ["estado", "Prototipos; llevó a una contratación meses después"],
    ],
    chips: ["reto de diseño", "app + web", "me contrataron"], okChip: 2,
    cover,
    site: { href: proto(APP.node, APP.start), label: "ver el prototipo" },
    tools: [["Figma", "figma"]],
    challenge: {
      intro: "BrightPath ofrece cursos de programación a yoga, y sus usuarios nombraban tres problemas:",
      list: ["interfaces que se sienten recargadas", "cuesta encontrar cursos buenos y relevantes", "es difícil mantenerse motivado"],
      end: "La prueba pedía sumar funciones sin sumar ruido, y luego {{mostrar la misma app a un público muy distinto}}.",
      fig: <>{context}{brief}</>,
    },
    role: "{{Hice toda la prueba}}: los flujos de la app dentro del design system de BrightPath, y la landing con un estilo nuevo, cada una con su versión desktop y mobile y un prototipo clicable.",
    research: {
      items: ["El contexto del propio brief: audiencia, perfiles, dolores y los competidores principales, Udemy y Coursera.", "Patrones mobile para pedir permisos, elegir intereses y ordenar y filtrar listas largas.", "Landings que le venden a profesionales: prueba social, lenguaje de carrera y una paleta más sobria."],
      extraTitle: "el orden del trabajo",
      extra: order,
    },
    decisions: [
      { t: "slides nuevas que se parecen a la existente", because: "el sistema tenía que quedarse como estaba, así que las dos slides nuevas de bienvenida reutilizan la estructura de la primera: una foto, un titular con una palabra en el acento y una sola línea.", fig: welcome },
      { t: "intereses con el mínimo a la vista, notificaciones al final y saltables", because: "el brief pedía al menos tres intereses, así que la pantalla lo dice y el botón de continuar espera. El permiso de notificaciones llega al final, cuando la app ya significa algo, y “Skip for now” nunca bloquea a nadie.", fig: onboarding },
      { t: "ordenar y filtrar, separados y al alcance del pulgar", because: "ordenar reordena y filtrar quita, así que son dos botones, flotando abajo donde llega el pulgar mientras se hace scroll. El flujo de filtros muestra una selección de punta a punta, como pedía el brief.", fig: <>{explore}{appProto}</> },
      { t: "un tono de negocios para la web", because: "el público pasó a ser profesionales de IT: logos de medios y testimonios con cargo para dar confianza, azul con ámbar en vez de colores lúdicos, y un copy que habla de avanzar en la carrera.", ruled: "reutilizar el look de la app. El brief daba libertad total, y el público nuevo pedía algo más sobrio.", fig: <>{web}{webProto}</> },
    ],
    validation: {
      items: ["Cada punto de los dos briefs cubierto y visible en los prototipos.", "La landing en desktop a 1440 y 1920, tablet a 768 y mobile a 375.", "Sin prueba de usabilidad: era una prueba de diseño con tiempo."],
    },
    results: [["observado", "{{Me consiguió el trabajo.}} En ese momento no hubo feedback ni plaza abierta; meses después, cuando se abrió una posición, Designli me contrató."], ["medido", "Nada: es un ejercicio de diseño con un producto ficticio."]],
    learn: ["{{Trabajar dentro del sistema de otro es una habilidad en sí misma.}} Las pantallas nuevas tenían que parecer que siempre estuvieron ahí.", "El mismo producto necesita otra voz para otro público. La web cambió de tono, no la app."],
    legal,
  };
}

export default function CaseBrightPath() {
  return <CaseLayout content={content} />;
}

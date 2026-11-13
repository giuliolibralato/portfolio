"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { Crop, Frame, Metrics, Notes, Pane, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("digito");
const Img = ({ src, alt, className }: { src: string; alt: string; className?: string }) => <Crop src={`${IMG}/${src}`} alt={alt} className={className} />;
const PROTO = "https://www.figma.com/proto/sBBTvq1mUKGzu4n07rMyiH?node-id=72108-612";

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <img className="cover-shot" src={`${IMG}/cover.webp`} alt={es ? "Home de Dígito: tareas, proyectos activos con progreso y el registro rápido de horas con la racha" : "Dígito home: tasks, active projects with progress and the quick hour log with the streak"} />;

  const problem = (
    <Notes cols={3} label={es ? "discovery · definición del problema" : "discovery · problem definition"} caption={es ? "La frase que guió todo salió de las entrevistas: la gente no rechaza la herramienta, rechaza la complejidad." : "The line that guided everything came from the interviews: people don't reject the tool, they reject the complexity."}
      items={es
        ? [["fricciones", "Lo que frenaba el uso", "Interfaz compleja, procesos distintos entre equipos, registro de horas poco práctico, flujos largos con demasiados campos y sin ver avance, riesgos ni carga."], ["insight clave", "“Las personas no rechazan la herramienta, rechazan la complejidad”", "La baja adopción afecta cómo planifican, colaboran y hacen seguimiento."], ["oportunidad", "Valor inmediato", "Redefinir algunos puntos de la experiencia para dar valor desde el primer día, generar adherencia y optimizar el trabajo diario."]]
        : [["frictions", "What held people back", "A complex interface, different processes per team, impractical hour logging, long forms with too many fields, and no view of progress, risks or workload."], ["key insight", "“People don't reject the tool, they reject the complexity”", "Low adoption hurts how they plan, collaborate and follow up."], ["opportunity", "Value from day one", "Rethink a few points of the experience to deliver value right away, build adherence and streamline daily work."]]} />
  );

  const research = (
    <Metrics label={es ? "lo que dijo la investigación" : "what the research said"}
      items={es
        ? [["10", "entrevistas semiestructuradas, con preguntas por perfil"], ["76%", "menos retrasos en hojas de horas con gamificación, en un estudio con Habitica"], ["1", "notificación al día como máximo, según la guía de comunicación interna revisada"]]
        : [["10", "semi-structured interviews, with questions per profile"], ["76%", "fewer timesheet delays with gamification, in a Habitica study"], ["1", "notification a day at most, per the internal-comms guidance reviewed"]]}
      caption={es ? "El 76% es de un estudio publicado, no de este proyecto: sirvió para elegir la racha, no para prometer un resultado." : "The 76% comes from a published study, not this project: it helped choose the streak, not promise a result."} />
  );

  const cut = (
    <Frame className="cols-2" caption={es ? "Primero se recortó: salieron los módulos administrativos y financieros que no ayudaban al trabajo diario. Lo que quedó se diseñó en bocetos y wireframes." : "First we cut: the admin and finance modules that didn't help daily work came out. What stayed was sketched and wireframed."}>
      <Pane label={es ? "bocetos y wireframes" : "sketches and wireframes"}><Img src="wires.webp" alt={es ? "Boceto de la home con el relleno de horas y wireframe del dashboard" : "Sketch of the home with hour logging and a dashboard wireframe"} /></Pane>
      <Pane accent label={es ? "home final" : "final home"}><Img src="cover.webp" alt={es ? "Home final con proyectos y registro rápido" : "Final home with projects and the quick log"} /></Pane>
    </Frame>
  );

  const quick = (
    <Frame className="cols-phones" caption={es ? "Registrar horas sin salir de la home: proyecto, tarea, fecha, horas y una línea. El panel avisa cuántos días faltan y celebra la racha al terminar." : "Log hours without leaving the home: project, task, date, hours and one line. The panel says how many days are pending and celebrates the streak at the end."}>
      <Pane label={es ? "vacío" : "empty"}><Img className="phone" src="modal-1.webp" alt={es ? "Registro rápido vacío con aviso de 8 días pendientes" : "Empty quick log with a notice of 8 pending days"} /></Pane>
      <Pane label={es ? "lleno" : "filled"}><Img className="phone" src="modal-2.webp" alt={es ? "Registro rápido con proyecto, tarea, fecha, 7.4 horas y descripción" : "Quick log with project, task, date, 7.4 hours and a description"} /></Pane>
      <Pane accent label={es ? "listo" : "done"}><Img className="phone" src="modal-3.webp" alt={es ? "Confirmación: ¡Vamos por más! Tu racha sigue subiendo" : "Confirmation: keep going, your streak keeps growing"} /></Pane>
    </Frame>
  );

  const projects = (
    <Frame className="cols-2" caption={es ? "Cada proyecto dice su estado sin abrirlo: progreso, días restantes, prioridad y equipo. Adentro, Kanban y Gantt en el mismo lugar, para no saltar a Trello o Azure DevOps." : "Every project shows its state without opening it: progress, days left, priority and team. Inside, Kanban and Gantt in one place, so nobody jumps to Trello or Azure DevOps."}>
      <Pane label={es ? "proyectos" : "projects"}><Img src="projects.webp" alt={es ? "Grilla de proyectos con filtros por estado, progreso y días restantes" : "Project grid with state filters, progress and days left"} /></Pane>
      <Pane label={es ? "kanban" : "kanban"}><Img src="kanban.webp" alt={es ? "Vista Kanban de un proyecto: to-do, en progreso, en revisión y completado" : "Kanban view of a project: to-do, in progress, in review and done"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["Brief", "el caso de negocio de Dígito"], ["Escritorio", "SaaS, time tracking y gamificación"], ["Entrevistas", "10 usuarios, por perfil"], ["Síntesis", "JTBD, HMW y Crazy 8s"], ["Prototipo", "UI final en Figma"]]
    : [["Brief", "Dígito's business case"], ["Desk research", "SaaS, time tracking and gamification"], ["Interviews", "10 users, by profile"], ["Synthesis", "JTBD, HMW and Crazy 8s"], ["Prototype", "final UI in Figma"]]} />;

  const team = (
    <Notes cols={3} label={es ? "quién hizo qué" : "who did what"} caption={es ? "Grupo 4 del curso Product Design de Repensar, con Dígito como caso de negocio." : "Group 4 of Repensar's Product Design course, with Dígito as the business case."}
      items={es
        ? [["UX/UI", "Giulio Libralato", "Investigación de escritorio, flujos y la interfaz final."], ["product owner", "María José Troncoso", "Entrevistas, insights y la síntesis en JTBD y HMW."], ["diseño gráfico", "Gabriela Velásquez", "Ideas de solución y el concepto de alertas inteligentes."]]
        : [["UX/UI", "Giulio Libralato", "Desk research, flows and the final interface."], ["product owner", "María José Troncoso", "Interviews, insights and the JTBD and HMW synthesis."], ["graphic design", "Gabriela Velásquez", "Solution ideas and the smart-alerts concept."]]} />
  );

  const legal = es ? "Proyecto del curso Product Design Fundamentals de Repensar, sobre el caso de negocio de Dígito. Los clientes y proyectos en pantalla son ilustrativos." : "A project for Repensar's Product Design Fundamentals course, on Dígito's business case. Clients and projects on screen are illustrative.";

  if (!es) return {
    project: "Dígito — case study",
    subtitle: "making the timesheet the easy part",
    tldr: "Dígito, a software company, had an internal project tool its own team avoided: people logged their hours one to three weeks late and ran projects in Trello, Excel or Azure DevOps. In a team of three, I designed the interface that {{put logging hours one click away from the home, with a daily streak}}, and brought Kanban and Gantt into the same place. A course project on a real business case, delivered as a Figma prototype.",
    meta: [
      ["type", "Course project · Repensar"],
      ["role", "UX/UI designer: desk research, flows and final UI"],
      ["team", "A product owner, a graphic designer and me"],
      ["timeline", "August–November 2025"],
      ["scope", "Web app: home, quick hour log, projects, Kanban and Gantt"],
      ["status", "Clickable prototype; not built"],
    ],
    chips: ["case study", "course", "prototype"], okChip: 2,
    cover,
    site: { href: PROTO, label: "see the prototype" },
    tools: [["Figma", "figma"]],
    challenge: {
      intro: "Dígito sells digital transformation, but its own project tool was the thing nobody wanted to open:",
      list: ["hours logged one to three weeks late, so reports and billing ran on guesses", "long forms with too many fields, and nothing in return for filling them", "developers kept their real work in other tools, so the platform only served management"],
      end: "The tool didn't need more modules. It needed to {{make the one daily task, logging hours, feel easy}}.",
      fig: problem,
    },
    role: "{{I owned the interface and the desk research.}} I researched SaaS adoption, time tracking and gamification in internal apps, then designed the flows and the final UI in Figma. María José, the product owner, led the interviews and the synthesis; Gabriela, the graphic designer, explored the solution ideas.",
    research: {
      items: ["Desk research on SaaS adoption, time management and gamification in internal tools, including a Habitica study where timesheet delays fell 76% during use.", "Ten semi-structured interviews with users of the platform, with questions per profile: a developer and an admin client gave the clearest contrast.", "JTBD and How Might We for each insight, then Crazy 8s to turn them into ideas."],
      extraTitle: "the order of the work",
      extra: <>{order}{research}</>,
    },
    decisionsLead: team,
    decisions: [
      { t: "focus on the timesheet, the strongest pain", because: "both profiles pointed at it: the developer forgets to log at the end of the day, and the admin has to chase people every Monday. Everything else was built around making that one task easy.", ruled: "starting with profitability dashboards. The client asked for them, but they depend on hours being logged in the first place, so they moved to the next version." },
      { t: "cut before adding", because: "admin and finance modules that didn't help daily work came out. What stayed got stronger: a useful home, clear clients and projects, and timesheets tied to each project.", fig: cut },
      { t: "log hours from the home, in one panel", because: "project, task, date, hours and one line, without navigating away. The panel says how many days are pending this month, so nobody has to count.", fig: quick },
      { t: "one streak, not a points economy", because: "the research showed gamification can cut delays, and a daily streak rewards the exact behavior we wanted without turning the tool into a game. It sits next to the bell, always visible.", ruled: "points and badges to trade for perks. It needed rules, a catalog and someone to run it." },
      { t: "Kanban and Gantt where the projects are", because: "developers ran their work in Trello, Asana or Azure DevOps because the platform had nothing for them. Each project now has information, Kanban, Gantt, list and team in tabs.", fig: projects },
    ],
    validation: {
      items: ["The flows checked against each JTBD: one insight, one job, one part of the interface.", "A clickable prototype in Figma, presented as the course's final project.", "No usability test results to show: the next step would be timing a full log with a few of the interviewed users."],
    },
    results: [["observed", "{{A prototype that covers the full loop}}: see what's pending, log it in one panel, keep the streak, and follow the project in Kanban or Gantt."], ["measured", "Nothing: it's a course project and it wasn't built, so there is no adoption or delay data."], ["next", "Roles, company branding, a team view, external calendars and Power BI reports."]],
    learn: ["{{One sentence from an interview did more than any feature list}}: people don't reject the tool, they reject the complexity. It decided what to cut.", "Research numbers from published studies are a reason to try something, not a result. I kept them apart from what this project can claim."],
    legal,
  };

  return {
    project: "Dígito — caso de estudio",
    subtitle: "que registrar horas sea lo fácil",
    tldr: "Dígito, una empresa de software, tenía una herramienta interna de proyectos que su propio equipo evitaba: la gente registraba sus horas con una a tres semanas de retraso y llevaba los proyectos en Trello, Excel o Azure DevOps. En un equipo de tres, diseñé la interfaz que {{dejó el registro de horas a un clic desde la home, con una racha diaria}}, y juntó Kanban y Gantt en el mismo lugar. Un proyecto de curso sobre un caso de negocio real, entregado como prototipo en Figma.",
    meta: [
      ["tipo", "Proyecto de curso · Repensar"],
      ["rol", "Diseñador UX/UI: investigación de escritorio, flujos y UI final"],
      ["equipo", "Una product owner, una diseñadora gráfica y yo"],
      ["duración", "agosto–noviembre 2025"],
      ["alcance", "App web: home, registro rápido de horas, proyectos, Kanban y Gantt"],
      ["estado", "Prototipo clicable; no se construyó"],
    ],
    chips: ["caso de estudio", "curso", "prototipo"], okChip: 2,
    cover,
    site: { href: PROTO, label: "ver el prototipo" },
    tools: [["Figma", "figma"]],
    challenge: {
      intro: "Dígito vende transformación digital, pero su propia herramienta de proyectos era la que nadie quería abrir:",
      list: ["horas registradas con una a tres semanas de retraso, así que los reportes y la facturación iban a ciegas", "formularios largos con demasiados campos, y nada a cambio por llenarlos", "los desarrolladores llevaban su trabajo real en otras herramientas, así que la plataforma solo servía a gerencia"],
      end: "No hacían falta más módulos. Hacía falta {{que la única tarea diaria, registrar horas, se sintiera fácil}}.",
      fig: problem,
    },
    role: "{{Estuve a cargo de la interfaz y de la investigación de escritorio.}} Investigué adopción de SaaS, time tracking y gamificación en apps internas, y luego diseñé los flujos y la UI final en Figma. María José, la product owner, lideró las entrevistas y la síntesis; Gabriela, la diseñadora gráfica, exploró las ideas de solución.",
    research: {
      items: ["Investigación de escritorio sobre adopción de SaaS, gestión del tiempo y gamificación en herramientas internas, incluido un estudio con Habitica donde los retrasos en hojas de horas bajaron 76% durante el uso.", "Diez entrevistas semiestructuradas con usuarios de la plataforma, con preguntas por perfil: un desarrollador y una clienta administradora dieron el contraste más claro.", "JTBD y How Might We por cada insight, y luego Crazy 8s para volverlos ideas."],
      extraTitle: "el orden del trabajo",
      extra: <>{order}{research}</>,
    },
    decisionsLead: team,
    decisions: [
      { t: "enfocarse en el registro de horas, el dolor más fuerte", because: "los dos perfiles apuntaban ahí: el desarrollador se olvida de registrar al final del día y la administradora tiene que perseguir a la gente cada lunes. Todo lo demás se construyó para que esa tarea fuera fácil.", ruled: "empezar por dashboards de rentabilidad. La clienta los pedía, pero dependen de que las horas estén registradas, así que pasaron a la siguiente versión." },
      { t: "recortar antes de sumar", because: "salieron los módulos administrativos y financieros que no ayudaban al trabajo diario. Lo que quedó se reforzó: una home útil, clientes y proyectos claros, y hojas de horas atadas a cada proyecto.", fig: cut },
      { t: "registrar horas desde la home, en un solo panel", because: "proyecto, tarea, fecha, horas y una línea, sin salir de la pantalla. El panel dice cuántos días faltan este mes, así nadie tiene que contar.", fig: quick },
      { t: "una racha, no una economía de puntos", because: "la investigación mostró que la gamificación puede reducir retrasos, y una racha diaria premia justo el comportamiento que buscábamos sin volver la herramienta un juego. Vive al lado de la campana, siempre visible.", ruled: "puntos e insignias canjeables por beneficios. Pedía reglas, un catálogo y alguien que lo administrara." },
      { t: "Kanban y Gantt donde están los proyectos", because: "los desarrolladores llevaban su trabajo en Trello, Asana o Azure DevOps porque la plataforma no tenía nada para ellos. Ahora cada proyecto tiene información, Kanban, Gantt, lista y equipo en pestañas.", fig: projects },
    ],
    validation: {
      items: ["Los flujos contrastados con cada JTBD: un insight, un trabajo, una parte de la interfaz.", "Un prototipo clicable en Figma, presentado como proyecto final del curso.", "No tengo resultados de pruebas de usabilidad: el siguiente paso sería medir un registro completo con algunos de los usuarios entrevistados."],
    },
    results: [["observado", "{{Un prototipo que cubre el ciclo completo}}: ver qué falta, registrarlo en un panel, mantener la racha y seguir el proyecto en Kanban o Gantt."], ["medido", "Nada: es un proyecto de curso y no se construyó, así que no hay datos de adopción ni de retrasos."], ["siguiente", "Roles, marca de cada empresa, vista de equipo, calendarios externos y reportes en Power BI."]],
    learn: ["{{Una frase de una entrevista hizo más que cualquier lista de funciones}}: la gente no rechaza la herramienta, rechaza la complejidad. Decidió qué recortar.", "Los números de estudios publicados son una razón para probar algo, no un resultado. Los mantuve separados de lo que este proyecto puede afirmar."],
    legal,
  };
}

export default function CaseDigito() {
  return <CaseLayout content={content} />;
}

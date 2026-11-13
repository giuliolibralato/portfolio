"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { Crop, Frame, Metrics, Notes, Pane, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("wedding");
const Img = ({ src, alt, className }: { src: string; alt: string; className?: string }) => <Crop src={`${IMG}/${src}`} alt={alt} className={className} />;

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <img className="cover-shot" src={`${IMG}/cover.webp`} alt={es ? "Hero de la web: Fernanda & Giulio, 08.10.2026, con botones a regalos y transmisión" : "The site's hero: Fernanda & Giulio, 08.10.2026, with buttons to gifts and the livestream"} />;

  const refs = (
    <Notes cols={3} label={es ? "de dónde sale el diseño" : "where the design comes from"} caption={es ? "Las referencias quedaron escritas en el documento de diseño, cada una con lo que aportaba." : "The references are written in the design document, each with what it brought."}
      items={es
        ? [["marca", "Nuestras invitaciones impresas", "Vino, crema, rojo y grano riso: la web hereda la invitación, no empieza de cero."], ["tipografía", "Katherine Marchand", "Estilo editorial: titulares enormes partidos en líneas y un cuerpo sobrio."], ["secciones", "Wedding Day, Wandr y Fleur", "Plantillas de Framer para el ritmo: carrusel curvo, historia en pestañas y el dress code por filas."]]
        : [["brand", "Our printed invitations", "Wine, cream, red and riso grain: the site inherits the invitation instead of starting over."], ["type", "Katherine Marchand", "An editorial style: huge headlines broken into lines and a sober body."], ["sections", "Wedding Day, Wandr and Fleur", "Framer templates for rhythm: a curved carousel, the story in tabs and the dress code in rows."]]} />
  );

  const look = (
    <Frame className="rows" caption={es ? "La celebración como un tríptico de boleto y la cuenta regresiva con el monograma de marca de agua: la invitación impresa llevada a la pantalla." : "The celebration as a ticket triptych and the countdown with the monogram as a watermark: the printed invitation brought to the screen."}>
      <Pane label={es ? "diseño final · celebración y cuenta regresiva" : "final design · celebration and countdown"}><Img src="ds-celebration.webp" alt={es ? "Sección de celebración con tres tarjetas tipo boleto y la cuenta regresiva" : "Celebration section with three ticket-like cards and the countdown"} /></Pane>
    </Frame>
  );

  const mobile = (
    <Frame className="cols-phones two" caption={es ? "Casi todos abrieron el link desde WhatsApp, así que todo se diseñó y se probó primero a 375 px." : "Almost everyone opened the link from WhatsApp, so everything was designed and tested at 375 px first."}>
      <Pane label={es ? "hero en el celular" : "hero on a phone"}><Img className="phone" src="mobile-1.webp" alt={es ? "Hero en el celular con nombres, fecha y botones" : "Hero on a phone with names, date and buttons"} /></Pane>
      <Pane label={es ? "nuestra historia" : "our story"}><Img className="phone" src="mobile-2.webp" alt={es ? "Carrusel de fotos y la historia en pestañas en el celular" : "Photo carousel and the story in tabs on a phone"} /></Pane>
    </Frame>
  );

  const gate = (
    <Frame className="cols-2" caption={es ? "Una puerta con dos entradas. Los invitados entran con un código que se valida en el servidor y queda recordado; los visitantes ven una versión sin lugar, dress code ni horarios." : "One door, two ways in. Guests enter with a code checked on the server and remembered; visitors see a version without the venue, dress code or schedule."}>
      <Pane label={es ? "la puerta" : "the door"}><Img src="gate.webp" alt={es ? "Pantalla de entrada: soy invitado o soy visitante" : "Entry screen: I'm a guest or I'm a visitor"} /></Pane>
      <Pane label={es ? "versión para visitantes" : "visitor version"}><Img src="story.webp" alt={es ? "Nuestra historia en la versión pública: pestañas, texto y foto" : "Our story in the public version: tabs, text and photo"} /></Pane>
    </Frame>
  );

  const answers = (
    <Frame className="cols-2" caption={es ? "Lo que los invitados preguntan por WhatsApp, respondido antes: el día hora por hora y el dress code con los colores que es mejor evitar." : "What guests ask on WhatsApp, answered first: the day hour by hour and the dress code with the colors to avoid."}>
      <Pane label={es ? "el día" : "the day"}><Img src="ds-day.webp" alt={es ? "Línea de tiempo del día con seis momentos y avisos: solo adultos, sin alcohol, sin estacionamiento" : "Timeline of the day with six moments and notes: adults only, no alcohol, no parking"} /></Pane>
      <Pane label={es ? "dress code" : "dress code"}><Img src="ds-dresscode.webp" alt={es ? "Dress code elegante con paletas para ellas y ellos y colores a evitar" : "Elegant dress code with palettes for her and him and colors to avoid"} /></Pane>
    </Frame>
  );

  const gifts = (
    <Frame className="cols-2" caption={es ? "Una lista con paquetes, montos fijos y aporte libre, sin pasarela de pagos: las cuentas viven en la base de datos, nunca en el código. Después de regalar, un mensaje para los novios." : "A list with packages, fixed amounts and free contributions, with no payment gateway: the accounts live in the database, never in the code. After giving, a message for the couple."}>
      <Pane label={es ? "lista de regalos · en vivo" : "gift list · live"}><Img src="gifts.webp" alt={es ? "Lista de regalos con categorías, filtros y tarjetas con paquetes disponibles" : "Gift list with categories, filters and cards with available packages"} /></Pane>
      <Pane label={es ? "después de regalar · diseño" : "after giving · design"}><Img src="ds-thanks.webp" alt={es ? "Modal de gracias con un campo para dejar un mensaje" : "Thank-you modal with a field to leave a message"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["Invitación", "la marca impresa"], ["Diseño", "16 pantallas y el sistema, cerrado el 25 sep"], ["Construcción", "fases 1 a 4 en dos días"], ["Link", "compartido la semana del 28 sep"], ["Boda", "08.10.2026"]]
    : [["Invitation", "the printed brand"], ["Design", "16 screens and the system, closed on 25 Sep"], ["Build", "phases 1 to 4 in two days"], ["Link", "shared the week of 28 Sep"], ["Wedding", "08.10.2026"]]} />;

  const handoff = (
    <Notes cols={3} label={es ? "del diseño al código, sin rediseñar" : "from design to code, without redesigning"} caption={es ? "Un documento de handoff decidía qué manda cuando algo chocaba: primero el handoff, luego las pantallas, luego el sistema." : "A handoff document decided what wins when things clashed: the handoff first, then the screens, then the system."}
      items={es
        ? [["sistema", "27 componentes fg", "Tokens de color, tipo, espacio y movimiento, con una regla por componente."], ["movimiento", "23 animaciones", "Del monograma que se dibuja al confeti, con su versión para movimiento reducido."], ["construcción", "una traducción 1:1", "Claude Code portó los componentes con las mismas clases, y tests visuales a 1440 y 390."]]
        : [["system", "27 fg components", "Color, type, space and motion tokens, with a rule for each component."], ["motion", "23 animations", "From the monogram that draws itself to the confetti, each with a reduced-motion version."], ["build", "a 1:1 translation", "Claude Code ported the components with the same classes, with visual tests at 1440 and 390."]]} />
  );

  const numbers = (
    <Metrics label={es ? "en Supabase, después de la boda" : "in Supabase, after the wedding"}
      items={es
        ? [["55%", "de los aportes fueron libres, sin elegir un regalo"], ["16", "mensajes, más que aportes (11)"], ["36%", "de los aportes llegaron el mismo día de la boda"]]
        : [["55%", "of contributions were free, with no gift chosen"], ["16", "messages, more than contributions (11)"], ["36%", "of contributions arrived on the wedding day itself"]]}
      caption={es ? "De 54 regalos visibles, solo el 9.3% recibió un aporte. La gente prefirió aportar libre antes que elegir de un catálogo largo." : "Of 54 visible gifts, only 9.3% received a contribution. People preferred to give freely rather than pick from a long catalog."} />
  );

  const legal = es ? "Proyecto personal: nuestra boda. Las cuentas de pago y el código de invitados no aparecen en este caso." : "A personal project: our wedding. Payment accounts and the guest code are not shown in this case.";

  if (!es) return {
    project: "Our wedding — case study",
    subtitle: "an invitation you can open from WhatsApp",
    tldr: "For our wedding on 8 October 2026, I designed and built the site guests would open from WhatsApp: {{the printed invitation turned into a site}}, with the day hour by hour, the dress code, a gift list without a payment gateway, a livestream and a public version for those who weren't invited. I designed the screens and the system first, then built it with Claude Code in Next.js and Supabase.",
    meta: [
      ["type", "Personal project"],
      ["role", "Designer and builder: concept, design system, UI and code"],
      ["team", "Me, with Claude Code; my fiancée deciding with me"],
      ["timeline", "September–October 2026"],
      ["scope", "Bilingual website, gift list and an admin panel for the couple"],
      ["status", "Used before, during and after the wedding; still online as a keepsake"],
    ],
    chips: ["passion project", "website", "used"], okChip: 2,
    cover,
    tools: [["Claude", "claude"], ["Claude Code", "claude"], ["Next.js", "nextdotjs"], ["Supabase", "supabase"], ["Vercel", "vercel"]],
    challenge: {
      intro: "A wedding site has a short life and a lot of questions to answer:",
      list: ["guests ask the same things on WhatsApp: when, where, what to wear, whether there's parking", "a gift list has to show bank details safely and know when a gift is already taken", "the link gets forwarded, so people who aren't invited will open it too"],
      end: "It had to {{feel like our invitation and save us from answering every question twice}}, on a phone, in the week before the wedding.",
      fig: refs,
    },
    role: "{{I designed and built it}}: the concept from our invitations, 16 screens and the design system in a canvas, the handoff document, and the build with Claude Code. I know how to make websites, and a site made it easier to put all the information guests needed in one place. The look started from a site that won us over; I handled the whole visual line and my fiancée corrected the content, and we decided it together.",
    research: {
      items: ["Our printed invitations, as the brand to carry over.", "Katherine Marchand's editorial style for type, and the Framer templates Wedding Day, Wandr and Fleur for section rhythm.", "The questions guests were already asking us, which became the FAQ and the order of the home."],
      extraTitle: "the order of the work",
      extra: order,
    },
    decisions: [
      { t: "the invitation, carried to the screen", because: "wine, cream and red with riso grain, huge editorial headlines and our own illustrations. Guests had the printed invitation in their hands; the site had to feel like the same object.", ruled: "a wedding template. It would have looked like everyone else's and not like our invitation.", fig: look },
      { t: "mobile first, because the link lives in WhatsApp", because: "every section works at 375 px, the link shows its own preview image, and modals become sheets from the bottom on a phone.", fig: mobile },
      { t: "two doors: guests and visitors", because: "the link gets forwarded. Guests enter with a code that is checked on the server; visitors see our story, the livestream and gifts, but not the venue or the schedule. Visitors can still leave a message, give and add the date to their calendar.", fig: gate },
      { t: "answer the questions before they're asked", because: "the day hour by hour, what to wear and what to avoid, adults only, no alcohol, no parking, and an FAQ of eleven questions. Add to calendar, the livestream and photo uploads turn on by Lima time.", fig: answers },
      { t: "gifts without a payment gateway", because: "a list with packages, fixed amounts and a free contribution. Guests copy the account, give, and leave a message; the couple confirms in an admin panel. Bank details live in the database and never in the code. A payment gateway would have meant managing the payments myself; paying straight to our account was simpler.", fig: gifts },
      { t: "design closed before building, then a 1:1 build", because: "16 screens and a 27-component system were finished first, with a handoff that said what wins in a clash. That let the build go from base to admin in two days. The only thing that changed afterwards was the split between guests and visitors; the hard part was the content, and the inspiration and the design mattered a lot.", fig: handoff },
    ],
    validation: {
      items: ["Visual tests with Playwright at 1440 and 390 px, and an end-to-end test of the admin.", "Concurrency handled in the database for gift packages, so two guests can't take the last one.", "Real use: guests and visitors before, during and after the wedding."],
      extra: numbers,
    },
    results: [["observed", "{{Guests used it as the invitation's second half}}: they gave, left 16 messages and recommended songs, and contributions peaked on the wedding day. It went out through a WhatsApp channel made for everyone invited; guests liked it and found everything easily, and people who couldn't come left a message and watched the wedding on YouTube. A few still asked the time and the dress code without opening it. Some people we didn't expect wrote or sent gifts, even some who weren't invited. The schedule worked, and the livestream ran on YouTube."], ["measured", "11 contributions, 8 confirmed (73%), 55% of them free contributions; 16 messages and 3 songs."]],
    learn: ["{{People preferred to give freely over choosing from a catalog.}} Next time the free contribution leads, and the list is shorter.", "Messages beat contributions. A wedding site is also a guest book, and that deserves its own place, not a step after paying.", "{{Start earlier and with more time.}} Closing the design first helped a lot; I would still begin sooner."],
    legal,
  };

  return {
    project: "Nuestra boda — caso de estudio",
    subtitle: "una invitación que se abre desde WhatsApp",
    tldr: "Para nuestra boda, el 8 de octubre de 2026, diseñé y construí la web que los invitados abrirían desde WhatsApp: {{la invitación impresa convertida en un sitio}}, con el día hora por hora, el dress code, una lista de regalos sin pasarela de pagos, la transmisión y una versión pública para quien no estaba invitado. Primero diseñé las pantallas y el sistema, y luego la construí con Claude Code en Next.js y Supabase.",
    meta: [
      ["tipo", "Proyecto personal"],
      ["rol", "Diseño y construcción: concepto, design system, UI y código"],
      ["equipo", "Yo, con Claude Code; mi prometida decidiendo conmigo"],
      ["duración", "septiembre–octubre 2026"],
      ["alcance", "Web bilingüe, lista de regalos y un panel para los novios"],
      ["estado", "Usada antes, durante y después de la boda; sigue en línea como recuerdo"],
    ],
    chips: ["proyecto personal", "sitio web", "usada"], okChip: 2,
    cover,
    tools: [["Claude", "claude"], ["Claude Code", "claude"], ["Next.js", "nextdotjs"], ["Supabase", "supabase"], ["Vercel", "vercel"]],
    challenge: {
      intro: "Una web de boda vive poco y tiene muchas preguntas que responder:",
      list: ["los invitados preguntan lo mismo por WhatsApp: cuándo, dónde, qué ponerse, si hay estacionamiento", "una lista de regalos tiene que mostrar las cuentas con cuidado y saber cuándo un regalo ya se tomó", "el link se reenvía, así que también lo abre gente que no está invitada"],
      end: "Tenía que {{sentirse como nuestra invitación y ahorrarnos responder cada pregunta dos veces}}, en el celular, en la semana antes de la boda.",
      fig: refs,
    },
    role: "{{La diseñé y la construí}}: el concepto desde nuestras invitaciones, 16 pantallas y el design system en un canvas, el documento de handoff y la construcción con Claude Code. Sé hacer webs, y un sitio hacía más fácil poner en un solo lugar toda la información que los invitados necesitaban. El look partió de una web que nos conquistó; yo me encargué de toda la línea visual y mi prometida corrigió el contenido, y lo decidimos juntos.",
    research: {
      items: ["Nuestras invitaciones impresas, como la marca a llevar.", "El estilo editorial de Katherine Marchand para la tipografía, y las plantillas de Framer Wedding Day, Wandr y Fleur para el ritmo de las secciones.", "Las preguntas que los invitados ya nos hacían, que se volvieron el FAQ y el orden de la home."],
      extraTitle: "el orden del trabajo",
      extra: order,
    },
    decisions: [
      { t: "la invitación, llevada a la pantalla", because: "vino, crema y rojo con grano riso, titulares editoriales enormes e ilustraciones propias. Los invitados tenían la invitación impresa en la mano; la web tenía que sentirse como el mismo objeto.", ruled: "una plantilla de bodas. Se habría parecido a todas y no a nuestra invitación.", fig: look },
      { t: "mobile primero, porque el link vive en WhatsApp", because: "cada sección funciona a 375 px, el link muestra su propia imagen de vista previa y los modales pasan a ser hojas desde abajo en el celular.", fig: mobile },
      { t: "dos puertas: invitados y visitantes", because: "el link se reenvía. Los invitados entran con un código que se valida en el servidor; los visitantes ven nuestra historia, la transmisión y los regalos, pero no el lugar ni los horarios. Aun así pueden dejar un mensaje, regalar y agendar la fecha en su calendario.", fig: gate },
      { t: "responder las preguntas antes de que lleguen", because: "el día hora por hora, qué ponerse y qué evitar, solo adultos, sin alcohol, sin estacionamiento, y un FAQ de once preguntas. Añadir al calendario, la transmisión y subir fotos se activan según la hora de Lima.", fig: answers },
      { t: "regalos sin pasarela de pagos", because: "una lista con paquetes, montos fijos y aporte libre. El invitado copia la cuenta, regala y deja un mensaje; los novios confirman en un panel. Las cuentas viven en la base de datos y nunca en el código. Una pasarela de pagos habría significado gestionar yo los pagos; pasar directo a nuestra cuenta era más simple.", fig: gifts },
      { t: "diseño cerrado antes de construir, y luego una construcción 1:1", because: "16 pantallas y un sistema de 27 componentes se terminaron primero, con un handoff que decía qué manda en un choque. Así la construcción fue de la base al panel en dos días. Lo único que cambió después fue la separación entre invitados y visitantes; lo difícil fue el contenido, y la inspiración y el diseño importaron mucho.", fig: handoff },
    ],
    validation: {
      items: ["Tests visuales con Playwright a 1440 y 390 px, y una prueba de punta a punta del panel.", "Concurrencia resuelta en la base de datos para los paquetes de regalo, para que dos invitados no tomen el último.", "Uso real: invitados y visitantes antes, durante y después de la boda."],
      extra: numbers,
    },
    results: [["observado", "{{Los invitados la usaron como la segunda mitad de la invitación}}: regalaron, dejaron 16 mensajes, recomendaron canciones, y los aportes tuvieron su pico el día de la boda. Salió por un canal de WhatsApp creado para todos los invitados; les gustó y encontraron todo con facilidad, y quien no pudo ir dejó un mensaje y vio la boda por YouTube. Algunos igual preguntaron la hora y el dress code sin abrirla. Nos sorprendieron personas que no esperábamos que escribieran o enviaran regalos, hasta algunas que no estaban invitadas. Los horarios sirvieron, y la transmisión fue por YouTube."], ["medido", "11 aportes, 8 confirmados (73%), 55% de ellos libres; 16 mensajes y 3 canciones."]],
    learn: ["{{La gente prefirió aportar libre antes que elegir de un catálogo.}} La próxima vez el aporte libre va primero y la lista es más corta.", "Los mensajes superaron a los aportes. Una web de boda también es un libro de firmas, y eso merece su propio lugar, no un paso después de pagar.", "{{Empezar antes y con más tiempo.}} Cerrar primero el diseño ayudó un montón; igual empezaría antes."],
    legal,
  };
}

export default function CaseWedding() {
  return <CaseLayout content={content} />;
}

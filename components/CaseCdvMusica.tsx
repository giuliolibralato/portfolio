"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { Crop, Frame, Notes, Pane, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("cdvmusica");
const Img = ({ src, alt }: { src: string; alt: string }) => <Crop src={`${IMG}/${src}`} alt={alt} />;

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <img className="cover-shot" src={`${IMG}/cover.webp`} alt={es ? "Home de cdvmusica.com: un video en loop de un piano, caminodevida música y el último lanzamiento" : "cdvmusica.com home: a looping piano video, caminodevida música and the latest release"} />;

  const beforeAfter = (
    <Frame className="cols-2" caption={es ? "Antes, cada sección tenía su propio estilo: un hero amarillo, un collage, una franja azul y bloques negros. Ahora todo vive sobre el mismo fondo cálido y el color lo pone el arte de cada lanzamiento." : "Before, each section had its own style: a yellow hero, a collage, a blue band and black blocks. Now everything sits on the same warm ground and the color comes from each release's art."}>
      <Pane label={es ? "antes · la web anterior" : "before · the previous site"}><Img src="before.webp" alt={es ? "La web anterior completa: hero amarillo, collage del álbum, franja azul, live in, recursos y devocionales en negro" : "The previous site in full: yellow hero, album collage, blue band, live in, resources and devotionals on black"} /></Pane>
      <Pane accent label={es ? "después · cdvmusica.com" : "after · cdvmusica.com"}><Img src="after.webp" alt={es ? "La web nueva completa: video, nuevo lanzamiento, recursos, frase, devocionales y footer" : "The new site in full: video, latest release, resources, a statement, devotionals and footer"} /></Pane>
    </Frame>
  );

  const concept = (
    <Frame className="rows" caption={es ? "El concepto en Figma: home, catálogo de música, panel del álbum, la canción con letra y acordes, sus recursos y devocionales." : "The concept in Figma: home, music catalog, album panel, the song with lyrics and chords, its resources, and devotionals."}>
      <Pane label={es ? "concepto final · 7 pantallas" : "final concept · 7 screens"}><Img src="concept.webp" alt={es ? "Siete pantallas del concepto de cdv música lado a lado" : "Seven screens of the cdv música concept side by side"} /></Pane>
    </Frame>
  );

  const catalog = (
    <Frame className="cols-2" caption={es ? "Un catálogo con buscador y filtros por formato. El álbum se exploró como un panel lateral para no perder el catálogo; en la web quedó como su propia página." : "A catalog with search and filters by format. The album was explored as a side panel so the catalog stays in view; on the live site it became its own page."}>
      <Pane label={es ? "recursos · en vivo" : "resources · live"}><Img src="recursos.webp" alt={es ? "Recursos: buscador, filtros por todos, álbumes, ep, singles y canciones, y portadas" : "Resources: search, filters for all, albums, EP, singles and songs, and covers"} /></Pane>
      <Pane label={es ? "panel del álbum · concepto" : "album panel · concept"}><Img src="panel.webp" alt={es ? "Panel lateral del álbum Alegría de vivir con plataformas y canciones con recursos" : "Side panel for the album Alegría de vivir with platforms and songs with resources"} /></Pane>
    </Frame>
  );

  const song = (
    <Frame className="cols-2" caption={es ? "Una plantilla por canción para los equipos de alabanza: tonalidad, BPM y compás arriba; letra y acordes, instruccionales y recursos en pestañas." : "One template per song for worship teams: key, BPM and time signature on top; lyrics and chords, tutorials and resources in tabs."}>
      <Pane label={es ? "letra y acordes" : "lyrics and chords"}><Img src="song-lyrics.webp" alt={es ? "Canción Alegría de vivir: tonalidad D, 150 BPM, 4/4 y la hoja de letra" : "Song Alegría de vivir: key of D, 150 BPM, 4/4 and the lyric sheet"} /></Pane>
      <Pane accent label={es ? "recursos" : "resources"}><Img src="song-resources.webp" alt={es ? "Recursos de la canción: secuencias, instrumentales y visualizers para descargar" : "Song resources: sequences, instrumentals and visualizers to download"} /></Pane>
    </Frame>
  );

  const live = (
    <Frame className="cols-2" caption={es ? "En vivo: cada álbum enlaza a Spotify, YouTube y Apple Music, y cada devocional acompaña un lanzamiento, día por día." : "Live: every album links to Spotify, YouTube and Apple Music, and every devotional goes with a release, day by day."}>
      <Pane label={es ? "álbum" : "album"}><Img src="album.webp" alt={es ? "Página del álbum Live in Vol. II con plataformas y lista de canciones" : "Album page for Live in Vol. II with platforms and the song list"} /></Pane>
      <Pane label={es ? "devocional" : "devotional"}><Img src="devocional.webp" alt={es ? "Devocional Con nosotros: seis días, enlace a YouVersion y el texto del día 1" : "Devotional Con nosotros: six days, a YouVersion link and day 1's text"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["Antes", "la web anterior, sección por sección"], ["Concepto", "7 pantallas en Figma"], ["Plantillas", "álbum, canción y devocional"], ["Construcción", "WordPress con Elementor"], ["Contenido", "otra persona sube cada lanzamiento"]]
    : [["Before", "the previous site, section by section"], ["Concept", "7 screens in Figma"], ["Templates", "album, song and devotional"], ["Build", "WordPress with Elementor"], ["Content", "someone else uploads each release"]]} />;

  const roles = (
    <Notes cols={3} label={es ? "quién hace qué" : "who does what"} caption={es ? "Las plantillas fijan el diseño; el contenido cambia sin tocarlas." : "The templates hold the design; the content changes without touching them."}
      items={es
        ? [["diseño", "layouts y estilo", "Estructura, pantallas y plantillas: todo lo visual es mío."], ["construcción", "WordPress y Elementor", "La web en vivo, armada sobre las plantillas."], ["contenido", "otra persona lo sube", "Gestioné el plugin con el que el equipo carga y acomoda álbumes, recursos y devocionales."]]
        : [["design", "layouts and style", "Structure, screens and templates: all the visual work is mine."], ["build", "WordPress and Elementor", "The live site, built on the templates."], ["content", "someone else uploads it", "I managed the plugin the team uses to load and arrange albums, resources and devotionals."]]} />
  );

  const legal = es ? "Proyecto para Camino de Vida. La música, portadas, letras y marca pertenecen a Camino de Vida." : "A project for Camino de Vida. The music, covers, lyrics and brand belong to Camino de Vida.";

  if (!es) return {
    project: "CDV Música — case study",
    subtitle: "one home for an album, its songs and the teams who play them",
    tldr: "Camino de Vida's music ministry releases albums, EPs and singles, and worship teams need the chords and tracks behind them. The previous site styled every section differently and kept resources in a few cards. I {{designed the new site around the catalog and one template per song}}: lyrics and chords, tutorials, sequences and instrumentals, on the same quiet system as caminodevida.com. I built it in WordPress and set up a plugin so someone else uploads every release.",
    meta: [
      ["company", "Camino de Vida"],
      ["role", "Designer and builder: layouts, design and the WordPress build"],
      ["team", "The web team within communications: two of us; I led cdvmusica.com"],
      ["timeline", "2025–2026"],
      ["scope", "Website: home, catalog, album, song and devotional templates"],
      ["status", "Live at cdvmusica.com"],
    ],
    chips: ["case study", "website", "live"], okChip: 2,
    cover,
    site: { href: "https://cdvmusica.com", label: "see the site" },
    tools: [["Figma", "figma"], ["WordPress", "wordpress"], ["Elementor", "elementor"]],
    challenge: {
      intro: "The previous site looked like a run of campaigns, not a catalog:",
      list: ["each section had its own colors and type, so every new release meant restyling the page", "resources were four cards with a button, with no way to find a song or its chords", "the site didn't match caminodevida.com, though both belong to the same church"],
      end: "The music needed {{one place where a listener finds the album and a musician finds what to play}}.",
      fig: beforeAfter,
    },
    role: "{{All the layouts and design are mine, and I built the site}} in WordPress with Elementor. We are two on the web team inside communications: my teammate handles other parts of caminodevida.com, and cdvmusica.com was mine. I also managed the plugin that lets another person upload and arrange the content, so releases don't depend on me.",
    research: {
      items: ["The previous site, section by section, to see what changed with each campaign and what stayed.", "caminodevida.com's design system, which I also designed: the base this site had to share.", "What worship teams ask for before a Sunday: key, BPM, chords, sequences and instrumentals for each song."],
      extraTitle: "the order of the work",
      extra: order,
    },
    decisions: [
      { t: "the same quiet system as caminodevida.com", because: "warm ground, Inter and lowercase headings, so the music reads as part of the same church. The album art brings the color, so a new release never means restyling the site.", ruled: "a new look per campaign, as before. It made each release louder and the site harder to keep.", fig: concept },
      { t: "a catalog, not a run of sections", because: "albums, EPs, singles and songs in one grid, with search and filters by format. A listener finds the latest release on the home; a musician finds any song in two steps.", fig: catalog },
      { t: "one template per song, for the people who play it", because: "key, BPM and time signature at a glance, then tabs for lyrics and chords, tutorials and resources: sequences, instrumentals, backing vocals and visualizers to download.", fig: song },
      { t: "devotionals that go with each release", because: "an EP like Con nosotros comes with a six-day devotional and a link to YouVersion, so the songs and the reading travel together.", fig: live },
      { t: "templates fixed, content free", because: "another person uploads every release through a plugin I set up. The layout can't drift, and a new album is content, not a design job.", fig: roles },
    ],
    validation: {
      items: ["A full concept in Figma before building: home, catalog, album, song and devotionals.", "Releases from 2024 to 2026 published on the same templates.", "The live site checked against the concept: the album panel became a page, the rest kept its structure."],
    },
    results: [["observed", "{{The site is live and the team publishes on its own.}} Live in Vol. II went up on 27 March 2026 using the same templates as every release before it."], ["measured", "No traffic or download numbers to share yet."]],
    learn: ["{{A system shared with the main site paid off twice}}: the music looks like the church, and I didn't have to design a second visual language.", "Designing the template for the person who uploads matters as much as for the person who visits. If adding an album needs me, the site will fall behind."],
    legal,
  };

  return {
    project: "CDV Música — caso de estudio",
    subtitle: "un solo lugar para el álbum, sus canciones y los equipos que las tocan",
    tldr: "El ministerio de música de Camino de Vida lanza álbumes, EPs y singles, y los equipos de alabanza necesitan los acordes y las pistas detrás. La web anterior estilizaba cada sección distinto y dejaba los recursos en unas pocas tarjetas. {{Diseñé la web nueva alrededor del catálogo y de una plantilla por canción}}: letra y acordes, instruccionales, secuencias e instrumentales, con el mismo sistema tranquilo de caminodevida.com. La construí en WordPress y dejé un plugin para que otra persona suba cada lanzamiento.",
    meta: [
      ["empresa", "Camino de Vida"],
      ["rol", "Diseño y construcción: layouts, diseño y la web en WordPress"],
      ["equipo", "El equipo web de comunicaciones: somos dos; yo vi cdvmusica.com"],
      ["duración", "2025–2026"],
      ["alcance", "Sitio web: home, catálogo y plantillas de álbum, canción y devocional"],
      ["estado", "En vivo en cdvmusica.com"],
    ],
    chips: ["caso de estudio", "sitio web", "en vivo"], okChip: 2,
    cover,
    site: { href: "https://cdvmusica.com", label: "ver la web" },
    tools: [["Figma", "figma"], ["WordPress", "wordpress"], ["Elementor", "elementor"]],
    challenge: {
      intro: "La web anterior parecía una serie de campañas, no un catálogo:",
      list: ["cada sección tenía sus propios colores y tipografía, así que cada lanzamiento obligaba a reestilizar la página", "los recursos eran cuatro tarjetas con un botón, sin forma de encontrar una canción o sus acordes", "no se parecía a caminodevida.com, aunque las dos son de la misma iglesia"],
      end: "La música necesitaba {{un lugar donde quien escucha encuentra el álbum y quien toca encuentra qué tocar}}.",
      fig: beforeAfter,
    },
    role: "{{Todos los layouts y el diseño son míos, y construí la web}} en WordPress con Elementor. En el equipo web de comunicaciones somos dos: mi compañero ve otros detalles de caminodevida.com, y cdvmusica.com estuvo a mi cargo. También gestioné el plugin con el que otra persona sube y acomoda el contenido, para que los lanzamientos no dependan de mí.",
    research: {
      items: ["La web anterior, sección por sección, para ver qué cambiaba con cada campaña y qué se mantenía.", "El design system de caminodevida.com, que también diseñé: la base que esta web tenía que compartir.", "Lo que piden los equipos de alabanza antes de un domingo: tonalidad, BPM, acordes, secuencias e instrumentales de cada canción."],
      extraTitle: "el orden del trabajo",
      extra: order,
    },
    decisions: [
      { t: "el mismo sistema tranquilo de caminodevida.com", because: "fondo cálido, Inter y headings en minúscula, para que la música se lea como parte de la misma iglesia. El color lo pone el arte de cada álbum, así que un lanzamiento nuevo nunca obliga a reestilizar la web.", ruled: "un look nuevo por campaña, como antes. Hacía más llamativo cada lanzamiento y más difícil de mantener la web.", fig: concept },
      { t: "un catálogo, no una serie de secciones", because: "álbumes, EPs, singles y canciones en una sola grilla, con buscador y filtros por formato. Quien escucha encuentra el último lanzamiento en la home; quien toca encuentra cualquier canción en dos pasos.", fig: catalog },
      { t: "una plantilla por canción, para quien la toca", because: "tonalidad, BPM y compás de un vistazo, y luego pestañas de letra y acordes, instruccionales y recursos: secuencias, instrumentales, backing vocals y visualizers para descargar.", fig: song },
      { t: "devocionales que acompañan cada lanzamiento", because: "un EP como Con nosotros viene con un devocional de seis días y un enlace a YouVersion, así las canciones y la lectura van juntas.", fig: live },
      { t: "plantillas fijas, contenido libre", because: "otra persona sube cada lanzamiento con un plugin que dejé configurado. El layout no se desordena, y un álbum nuevo es contenido, no un trabajo de diseño.", fig: roles },
    ],
    validation: {
      items: ["Un concepto completo en Figma antes de construir: home, catálogo, álbum, canción y devocionales.", "Lanzamientos de 2024 a 2026 publicados sobre las mismas plantillas.", "La web en vivo contrastada con el concepto: el panel del álbum pasó a ser una página; lo demás mantuvo su estructura."],
    },
    results: [["observado", "{{La web está en vivo y el equipo publica por su cuenta.}} Live in Vol. II se subió el 27 de marzo de 2026 con las mismas plantillas que todos los lanzamientos anteriores."], ["medido", "Aún no tengo números de visitas o descargas para compartir."]],
    learn: ["{{Un sistema compartido con la web principal rindió dos veces}}: la música se parece a la iglesia, y no tuve que diseñar un segundo lenguaje visual.", "Diseñar la plantilla para quien sube el contenido importa tanto como para quien visita. Si agregar un álbum me necesita, la web se queda atrás."],
    legal,
  };
}

export default function CaseCdvMusica() {
  return <CaseLayout content={content} />;
}

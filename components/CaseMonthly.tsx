"use client";

import { CaseLayout, type CaseContent } from "./CaseLayout";
import { Crop, Frame, Metrics, Pane, Steps, imgBase } from "./Figure";
import type { Lang } from "@/lib/data";

const IMG = imgBase("monthly");
const Img = ({ src, alt }: { src: string; alt: string }) => <Crop src={`${IMG}/${src}`} alt={alt} />;

function content(lang: Lang): CaseContent {
  const es = lang === "es";
  const cover = <img className="cover-shot" src={`${IMG}/budget.webp`} alt={es ? "El presupuesto del mes: ingreso neto, diezmo, disponible, asignado y la tabla de gastos por categoría" : "The month's budget: net income, tithe, available, assigned and the expense table by category"} />;

  const flow = <Steps items={es
    ? [["Ingresos", "dos sueldos, en dólares y en soles"], ["Descuentos", "impuesto y diezmo, solos"], ["Reparto", "gastos por categoría"], ["Día de pago", "los pasos para mover la plata"], ["Supermercado", "plan, lista y precios"]]
    : [["Income", "two salaries, in dollars and soles"], ["Deductions", "tax and tithe, worked out"], ["Split", "expenses by category"], ["Payday", "the steps to move the money"], ["Groceries", "plan, list and prices"]]} />;

  const budget = (
    <Frame className="rows" caption={es ? "Una tabla, como la hoja que ya conocíamos, pero con lo que una hoja no hace: el impuesto y el diezmo se calculan solos y cada fila sugiere si el monto es sano." : "A table, like the sheet we already knew, but doing what a sheet doesn't: tax and tithe are worked out and each row says whether the amount is healthy."}>
      <Pane label={es ? "presupuesto del mes" : "the month's budget"}><Img src="budget.webp" alt={es ? "Tabla del presupuesto con estado, día, cuenta, monto, monto en soles y una sugerencia por fila" : "Budget table with status, day, account, amount, amount in soles and a suggestion per row"} /></Pane>
    </Frame>
  );

  const payday = (
    <Frame className="rows" caption={es ? "El día de pago era un ritual de memoria. Ahora es una lista: cambiar los dólares, pagar el impuesto, separar el diezmo y transferir lo del hogar, con el monto de cada paso." : "Payday used to be a ritual from memory. Now it's a checklist: change the dollars, pay the tax, set the tithe aside and transfer the household money, with the amount for each step."}>
      <Pane label={es ? "día de pago" : "payday"}><Img src="payday.webp" alt={es ? "Cambio de dólares y cuatro pasos del día de pago con su monto" : "Dollar exchange and four payday steps with their amounts"} /></Pane>
    </Frame>
  );

  const compare = (
    <Frame className="rows" caption={es ? "El mismo producto en cinco tiendas, con precio por kilo, precio regular y el de tienda o web. La más barata se marca en verde. Mass no vende en línea, así que su precio se estima y lo dice." : "The same product in five stores, with price per kilo, regular price and in-store or web price. The cheapest is marked in green. Mass doesn't sell online, so its price is estimated and says so."}>
      <Pane accent label={es ? "comparar precios" : "compare prices"}><Img src="compare.webp" alt={es ? "Comparación de arroz en Plaza Vea, Wong, Tottus, Makro y Mass" : "Rice compared across Plaza Vea, Wong, Tottus, Makro and Mass"} /></Pane>
    </Frame>
  );

  const plan = (
    <Frame className="cols-2" caption={es ? "El plan se autocompleta con recetas que nos gustan a los dos y respeta reglas como un máximo de carne roja por semana. De ahí sale la lista de compras, con cada ingrediente sumado." : "The plan fills itself with recipes we both like and keeps rules such as a cap on red meat per week. The shopping list comes out of it, every ingredient added up."}>
      <Pane label={es ? "plan de comidas" : "meal plan"}><Img src="plan-full.webp" alt={es ? "Calendario del mes con almuerzo y cena, kcal por persona y costo por día" : "Month calendar with lunch and dinner, kcal per person and cost per day"} /></Pane>
      <Pane label={es ? "lista desde el menú" : "list from the menu"}><Img src="list-open.webp" alt={es ? "Lista de compras de la semana: 26 ingredientes con la receta de donde salen y la cantidad" : "The week's shopping list: 26 ingredients with the recipe each comes from and the amount"} /></Pane>
    </Frame>
  );

  const tastes = (
    <Frame className="cols-2" caption={es ? "Cada uno pone su meta y lo que come o no; la app cruza los dos perfiles. La nutrición sale de USDA FoodData Central, por porción." : "Each of us sets a goal and what we do and don't eat; the app crosses both profiles. Nutrition comes from USDA FoodData Central, per portion."}>
      <Pane label={es ? "recetas" : "recipes"}><Img src="recipes.webp" alt={es ? "Recetas peruanas de casa con tiempo, kcal, proteína y costo por porción" : "Peruvian home recipes with time, kcal, protein and cost per portion"} /></Pane>
      <Pane label={es ? "gustos y metas" : "tastes and goals"}><Img src="tastes.webp" alt={es ? "Perfiles de los dos: meta, actividad y preferencias de comida" : "Both profiles: goal, activity and food preferences"} /></Pane>
    </Frame>
  );

  const order = <Steps items={es
    ? [["Budgy", "la app de uno, en iOS"], ["30 sep", "presupuesto del hogar, compartido"], ["4 nov", "supermercado: listas, precios y plan"], ["4 nov", "nutrición, gustos y asistente"], ["5 nov", "dónde comprar cada cosa y tarjetas"]]
    : [["Budgy", "the app for one, on iOS"], ["30 Sep", "household budget, shared"], ["4 Nov", "groceries: lists, prices and plan"], ["4 Nov", "nutrition, tastes and assistant"], ["5 Nov", "where to buy each item, and cards"]]} />;

  const size = (
    <Metrics
      label={es ? "lo que quedó construido" : "what got built"}
      items={es
        ? [["5", "tiendas comparadas, 4 con precios en vivo"], ["34", "recetas de casa con nutrición por porción"], ["2", "personas viendo lo mismo, en tiempo real"]]
        : [["5", "stores compared, 4 with live prices"], ["34", "home recipes with nutrition per portion"], ["2", "people seeing the same thing, in real time"]]}
      caption={es ? "Un sitio estático en Vercel, sin build, con dos funciones: una busca precios y la otra datos de nutrición." : "A static site on Vercel, no build step, with two functions: one fetches prices, the other nutrition data."}
    />
  );

  const legal = es ? "Proyecto personal. Los nombres, montos, cuentas y datos en pantalla son ficticios, inventados para estas capturas. Los precios de tiendas son reales y públicos al momento de la captura." : "A personal project. Names, amounts, accounts and data on screen are fictional, made up for these screenshots. Store prices are real and public at the time of capture.";

  if (!es) return {
    project: "Monthly Budget — case study",
    subtitle: "a household budget for two, groceries included",
    tldr: "Budgy worked, but it was a budget for one, on one iPhone. I was about to get married, and our household needed {{one budget we could both see and edit at the same time}}, from any phone or laptop. I designed and built Monthly Budget: two incomes, tax and tithe worked out, a payday checklist, and a groceries section that plans the month's meals, turns them into a shopping list and compares prices across five stores.",
    meta: [
      ["type", "Personal project"],
      ["role", "Designer and builder: product, UX, UI and code"],
      ["team", "Me, with Claude Code; my partner as the second user"],
      ["timeline", "September–November 2026"],
      ["scope", "Responsive web app with a Supabase backend, on Vercel"],
      ["status", "In use for our household budget"],
    ],
    chips: ["passion project", "in use", "web app"], okChip: 1,
    cover,
    tools: [["Claude Code", "claude"], ["Supabase", "supabase"], ["Claude", "claude"]],
    challenge: {
      intro: "A household budget isn't a personal one with a bigger number:",
      list: ["two incomes, one in dollars before tax and one in soles already net", "two people who need to see the same thing, on different phones, at the same time", "the biggest variable expense, groceries, was planned nowhere: no menu, no list, no idea which store was cheaper"],
      end: "Budgy's logic still held. What had to change was {{who it was for and where it lived}}.",
      fig: flow,
    },
    role: "{{I designed and built it end to end}}, with Claude Code: the data model, the budget and payday screens, the groceries section, the price and nutrition functions, and the sign-in. My partner was the second user and the first reviewer: if a screen needed explaining, it got redone.",
    research: {
      items: ["Budgy's rules and my old sheet: the starting point for income, tax and splitting by category.", "How we actually paid each month: the order of steps on payday, which became the checklist.", "The public online catalogs of Plaza Vea, Wong, Tottus and Makro, to see what price each one publishes: in store, regular, web or with a store card."],
      extraTitle: "the order of the work",
      extra: order,
    },
    decisions: [
      { t: "a shared web app instead of extending Budgy", because: "Budgy was iOS only and for one person. A web app works on both our phones and the laptop, and added to the home screen it opens like an app. The data lives in one shared document per month, in real time.", ruled: "adding a second user to Budgy. It would have meant an Apple developer account, two devices to keep signed and still no laptop." },
      { t: "a table, because we already think in sheets", because: "we came from spreadsheets, so the budget stays a table. What the app adds is what a sheet can't: tax and tithe calculated on their own, and a suggestion per row that says if the amount is healthy for our income.", ruled: "cards and rings like Budgy. They read well on a phone but hide the comparison between rows that a household budget needs.", fig: budget },
      { t: "payday as a checklist", because: "on payday the order matters: change the dollars, pay the tax, set the tithe aside and transfer the household money. Each step shows its amount and gets ticked off, so neither of us has to remember it.", fig: payday },
      { t: "groceries planned, not just paid", because: "the meal plan fills itself with recipes we both like, the shopping list comes out of the plan, and each item is priced across five stores. The list total is checked against the groceries line in the budget.", fig: <>{compare}{plan}</> },
      { t: "never invent a price", because: "some stores don't publish the card price or don't sell online. When that happens the app says so, “see in store” or “estimated”, instead of filling the gap with a guess.", ruled: "showing an average when a price is missing. It would make the total look more certain than it is." },
      { t: "food that fits both of us", because: "each of us sets a goal and what we do and don't eat. The plan uses what we have in common, weekly rules and nutrition from USDA FoodData Central, and suggests a portion for each.", fig: tastes },
      { t: "an assistant that works through copy and paste", because: "a Claude assistant on claude.ai builds lists, plans lunches within the budget and reads receipt photos. Those pages can't reach the internet, so data moves by copy and paste: an honest limit, written in the app instead of hidden." },
    ],
    validation: {
      items: ["Two people using it with real data, on different devices, every month.", "Prices checked against each store's own product page, linked from every result.", "Nutrition per portion traced to USDA values per 100 g."],
      extra: size,
    },
    results: [["observed", "{{It's where our household budget lives now.}} It replaced Budgy and the sheet before it, and added the part neither had: groceries."], ["measured", "No savings numbers to show. It's our private finances, and I haven't tracked a before and after."]],
    learn: ["{{The second user is the best review.}} Anything my partner asked about became a change; anything I had to explain was a design problem.", "Being honest about limits, an estimated price or a copy-and-paste step, earns more trust than hiding them behind a clean screen."],
    legal,
  };

  return {
    project: "Monthly Budget — caso de estudio",
    subtitle: "un presupuesto del hogar para dos, con el supermercado incluido",
    tldr: "Budgy funcionaba, pero era un presupuesto para uno, en un iPhone. Estaba próximo a casarme y el hogar necesitaba {{un solo presupuesto que los dos pudiéramos ver y editar a la vez}}, desde cualquier celular o laptop. Diseñé y construí Monthly Budget: dos ingresos, impuesto y diezmo calculados, una lista para el día de pago y una sección de supermercado que planifica las comidas del mes, las vuelve lista de compras y compara precios en cinco tiendas.",
    meta: [
      ["tipo", "Proyecto personal"],
      ["rol", "Diseño y construcción: producto, UX, UI y código"],
      ["equipo", "Yo, con Claude Code; mi pareja como segunda usuaria"],
      ["duración", "septiembre–noviembre 2026"],
      ["alcance", "App web responsive con backend en Supabase, en Vercel"],
      ["estado", "En uso para el presupuesto de la casa"],
    ],
    chips: ["proyecto personal", "en uso", "app web"], okChip: 1,
    cover,
    tools: [["Claude Code", "claude"], ["Supabase", "supabase"], ["Claude", "claude"]],
    challenge: {
      intro: "Un presupuesto del hogar no es uno personal con un número más grande:",
      list: ["dos ingresos, uno en dólares antes de impuestos y otro en soles ya neto", "dos personas que necesitan ver lo mismo, en celulares distintos, al mismo tiempo", "el gasto variable más grande, el supermercado, no se planificaba en ningún lado: sin menú, sin lista y sin saber qué tienda salía más barata"],
      end: "La lógica de Budgy seguía sirviendo. Lo que tenía que cambiar era {{para quién era y dónde vivía}}.",
      fig: flow,
    },
    role: "{{Lo diseñé y construí de punta a punta}}, con Claude Code: el modelo de datos, las pantallas de presupuesto y día de pago, la sección de supermercado, las funciones de precios y nutrición, y el inicio de sesión. Mi pareja fue la segunda usuaria y la primera en revisar: si una pantalla necesitaba explicación, se rehacía.",
    research: {
      items: ["Las reglas de Budgy y mi hoja de antes: el punto de partida para ingresos, impuesto y reparto por categoría.", "Cómo pagábamos de verdad cada mes: el orden de los pasos del día de pago, que se volvió la lista.", "Los catálogos públicos en línea de Plaza Vea, Wong, Tottus y Makro, para ver qué precio publica cada una: en tienda, regular, web o con tarjeta de la tienda."],
      extraTitle: "el orden del trabajo",
      extra: order,
    },
    decisions: [
      { t: "una app web compartida en vez de ampliar Budgy", because: "Budgy era solo para iOS y para una persona. Una app web funciona en los dos celulares y en la laptop, y agregada a la pantalla de inicio se abre como una app. Los datos viven en un documento compartido por mes, en tiempo real.", ruled: "sumar una segunda persona a Budgy. Habría pedido una cuenta de desarrollador de Apple, dos equipos firmados y aun así nada en la laptop." },
      { t: "una tabla, porque ya pensamos en hojas de cálculo", because: "veníamos de hojas de cálculo, así que el presupuesto sigue siendo una tabla. Lo que suma la app es lo que una hoja no hace: el impuesto y el diezmo se calculan solos, y cada fila sugiere si el monto es sano para el ingreso.", ruled: "tarjetas y anillos como en Budgy. Se leen bien en el celular, pero esconden la comparación entre filas que necesita un presupuesto del hogar.", fig: budget },
      { t: "el día de pago como una lista", because: "el día de pago el orden importa: cambiar los dólares, pagar el impuesto, separar el diezmo y transferir lo del hogar. Cada paso muestra su monto y se marca, así ninguno de los dos tiene que acordarse.", fig: payday },
      { t: "el supermercado se planifica, no solo se paga", because: "el plan de comidas se llena con recetas que nos gustan a los dos, la lista de compras sale del plan y cada producto se compara en cinco tiendas. El total de la lista se contrasta con la partida de supermercado del presupuesto.", fig: <>{compare}{plan}</> },
      { t: "nunca inventar un precio", because: "algunas tiendas no publican el precio con tarjeta o no venden en línea. Cuando pasa, la app lo dice, “ver en tienda” o “estimado”, en vez de llenar el hueco con una suposición.", ruled: "mostrar un promedio cuando falta un precio. Haría que el total pareciera más seguro de lo que es." },
      { t: "comida que nos sirva a los dos", because: "cada uno pone su meta y lo que come o no. El plan usa lo que tenemos en común, reglas por semana y la nutrición de USDA FoodData Central, y sugiere una porción para cada uno.", fig: tastes },
      { t: "un asistente que funciona copiando y pegando", because: "un asistente de Claude en claude.ai arma listas, planifica almuerzos dentro del presupuesto y lee fotos de boletas. Esas páginas no pueden conectarse a internet, así que los datos pasan copiando y pegando: un límite honesto, escrito en la app en vez de escondido." },
    ],
    validation: {
      items: ["Dos personas usándola con datos reales, en equipos distintos, cada mes.", "Precios contrastados con la página de cada producto en su tienda, enlazada desde cada resultado.", "Nutrición por porción rastreada hasta los valores de USDA por 100 g."],
      extra: size,
    },
    results: [["observado", "{{Es donde vive ahora el presupuesto de la casa.}} Reemplazó a Budgy y a la hoja de antes, y sumó lo que ninguna tenía: el supermercado."], ["medido", "No hay números de ahorro que mostrar. Son nuestras finanzas privadas y no medí un antes y un después."]],
    learn: ["{{La segunda usuaria es la mejor revisión.}} Lo que mi pareja preguntaba se volvía un cambio; lo que yo tenía que explicar era un problema de diseño.", "Ser honesto con los límites, un precio estimado o un paso de copiar y pegar, da más confianza que esconderlos detrás de una pantalla limpia."],
    legal,
  };
}

export default function CaseMonthly() {
  return <CaseLayout content={content} />;
}

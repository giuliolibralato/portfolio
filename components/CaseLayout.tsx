"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { RubberTabs } from "./RubberTabs";
import { Shell, useSite } from "./Shell";
import { Cursor } from "./Cursor";
import { rise } from "./Figure";
import { Arrow } from "./Icons";
import { T } from "@/lib/i18n";
import { PROJECTS, type Lang } from "@/lib/data";
import { usePathname } from "next/navigation";

// case pages in the order the data lists them, so every case can point to the next one
const CASES = Object.values(PROJECTS).filter((p) => p.href?.startsWith("/work/"));

// One page for every case: the same sections in the same order (ROADMAP.md, portfolio-checker),
// a tl;dr / full switch, and the figures each case passes in next to the decision they support.

type Mode = "tldr" | "full";
const SECTIONS = ["challenge", "role", "research", "decisions", "validation", "results", "learnings"] as const;
const TLDR_SECTIONS = new Set(["challenge", "role", "decisions", "results", "learnings"]);
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export type Decision = { t: string; because: string; ruled?: string; fig?: React.ReactNode };
export type CaseContent = {
  project: string; subtitle: string; tldr: string;
  /** [label, value, footnote?]: a footnote row gets a ¹ that jumps to the legal note */
  meta: [string, string, boolean?][];
  chips: string[]; okChip?: number;
  cover: React.ReactNode; coverFilm?: boolean;
  /** a live site to visit, shown as a button under the meta */
  site?: { href: string; label: string };
  /** tools used, shown as a meta row; the slug names an svg in /public/tools (omit when there is none) */
  tools?: [string, string?][];
  challenge: { intro: string; list?: string[]; end?: string; fig?: React.ReactNode };
  role: string;
  research: { items: string[]; extraTitle?: string; extra?: React.ReactNode };
  decisionsLead?: React.ReactNode;
  decisions: Decision[];
  decisionsTail?: React.ReactNode;
  validation: { items: string[]; extra?: React.ReactNode };
  results: [string, string][];
  learn: string[];
  legal: string;
};

const L: Record<Lang, { h: Record<(typeof SECTIONS)[number], string>; ruled: string; next: string; nextCase: string; work: string; mode: Record<Mode, string> }> = {
  en: {
    h: { challenge: "the problem", role: "my role", research: "research", decisions: "key decisions", validation: "validation", results: "results", learnings: "what I learned" },
    ruled: "ruled out", next: "back to all work", nextCase: "next case", work: "work", mode: { tldr: "tl;dr", full: "full case" },
  },
  es: {
    h: { challenge: "el problema", role: "mi rol", research: "investigación", decisions: "decisiones clave", validation: "validación", results: "resultados", learnings: "lo que aprendí" },
    ruled: "descartado", next: "volver a todo el trabajo", nextCase: "siguiente caso", work: "trabajo", mode: { tldr: "tl;dr", full: "caso completo" },
  },
};

// Darina's inline highlight: {{text}} in the copy is marked in the visitor's cursor color
export function rich(s: string) {
  return s.split(/\{\{(.+?)\}\}/).map((part, i) => (i % 2 ? <mark key={i} className="hl">{part}</mark> : part));
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Fade = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <motion.section key={id} id={id} className="case-sec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.2 }}>
    {children}
  </motion.section>
);

export function CaseLayout({ content }: { content: (lang: Lang) => CaseContent }) {
  const site = useSite();
  const { lang } = site;
  const [mode, setMode] = useState<Mode>("full");
  useEffect(() => {
    const m = localStorage.getItem("caseMode");
    if (m === "tldr" || m === "full") setMode(m);
  }, []);
  const pickMode = (m: Mode) => { setMode(m); localStorage.setItem("caseMode", m); };

  const c = content(lang);
  const l = L[lang];
  const path = usePathname().replace(BASE, "");
  const i = CASES.findIndex((p) => p.href === path);
  const nxt = CASES[(i + 1) % CASES.length];
  const name = c.project.split(" — ")[0];
  // Next sets the title once from metadata (English); keep it in the reader's language after it loads
  useEffect(() => { const t = `${name}: ${c.subtitle} — Giulio Libralato`; document.title = t; const id = setTimeout(() => { document.title = t; }, 300); return () => clearTimeout(id); }, [name, c.subtitle]);
  const t = T[lang];
  const full = mode === "full";
  const nav = SECTIONS.filter((id) => full || TLDR_SECTIONS.has(id)).map((id) => ({ id, label: l.h[id] }));
  const decisions = full ? c.decisions : c.decisions.slice(0, 3);
  const footnote = c.meta.some((m) => m[2]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="has-cursor">
        <Cursor color={site.cursor} labels={{ visitor: t.visitor, view: t.view, visit: t.visit }} enabled />
        <Shell site={site} nav={nav} brandHref={`${BASE}/`} back={{ href: `${BASE}/#work`, label: l.work }}>
          <main className="inner case-inner">
            <motion.header className="case-head" initial="hidden" animate="show" transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}>
              <motion.div variants={rise} className="case-bar">
                <div className="chips-row">
                  {c.chips.map((x, i) => <span key={x} className={`tag small${i === c.okChip ? " ok" : ""}`}>{i === c.okChip && <i className="dot-ok" aria-hidden="true" />}{x}</span>)}
                </div>
                <RubberTabs items={["tldr", "full"] as Mode[]} value={mode} onChange={pickMode} label="case length" labelsKey={lang} render={(m) => l.mode[m]} />
              </motion.div>
              <motion.h1 variants={rise} className="case-title">{c.project}</motion.h1>
              <motion.p variants={rise} className="case-sub">{c.subtitle}</motion.p>
              <motion.p variants={rise} className="lead">{rich(c.tldr)}</motion.p>
              <motion.div variants={rise} className="meta">
                {c.meta.map(([k, v, note]) => (
                  <div key={k} className="xrow"><span className="label">{k}</span><span>{v}{note && <sup className="fn"><a href="#legal" aria-label={lang === "es" ? "ver nota" : "see note"}>1</a></sup>}</span></div>
                ))}
                {c.tools && (
                  <div className="xrow"><span className="label">{lang === "es" ? "herramientas" : "tools"}</span>
                    <span className="tools">{c.tools.map(([name, slug]) => (
                      <span key={name} className="tool">{slug && <i aria-hidden="true" style={{ ["--ico" as string]: `url(${BASE}/tools/${slug}.svg)` }} />}{name}</span>
                    ))}</span>
                  </div>
                )}
              </motion.div>
              {c.site && (
                <motion.div variants={rise} className="site-row">
                  <a className="site-btn" href={c.site.href} target="_blank" rel="noopener" data-label="visit">{c.site.label}<Arrow size={12} /></a>
                </motion.div>
              )}
              <motion.div variants={rise} className={`cover hero-cover${c.coverFilm ? " film-cover" : ""}`}>{c.cover}</motion.div>
            </motion.header>

            <div className="case-body">
              <section id="challenge" className="case-sec">
                <h2 className="h2">{l.h.challenge}</h2>
                <p>{rich(c.challenge.intro)}</p>
                {c.challenge.list && <ul className="list">{c.challenge.list.map((x) => <li key={x}>{rich(x)}</li>)}</ul>}
                {c.challenge.end && <p>{rich(c.challenge.end)}</p>}
                {full && c.challenge.fig}
              </section>

              <section id="role" className="case-sec">
                <h2 className="h2">{l.h.role}</h2>
                <p>{rich(c.role)}</p>
              </section>

              <AnimatePresence initial={false}>
                {full && (
                  <Fade id="research">
                    <h2 className="h2">{l.h.research}</h2>
                    <ol className="list num">{c.research.items.map((x) => <li key={x}>{rich(x)}</li>)}</ol>
                    {c.research.extraTitle && <h3 className="sub">{c.research.extraTitle}</h3>}
                    {c.research.extra}
                  </Fade>
                )}
              </AnimatePresence>

              <section id="decisions" className="case-sec">
                <h2 className="h2">{l.h.decisions}</h2>
                {full && c.decisionsLead}
                {decisions.map((d) => (
                  <div key={d.t} className="decision-group">
                    <div className="decision">
                      <h3>{d.t}</h3>
                      <p>{rich(cap(d.because))}</p>
                      {d.ruled && <p className="muted">{cap(l.ruled)}: {d.ruled}</p>}
                    </div>
                    {full && d.fig}
                  </div>
                ))}
                {full && c.decisionsTail}
              </section>

              <AnimatePresence initial={false}>
                {full && (
                  <Fade id="validation">
                    <h2 className="h2">{l.h.validation}</h2>
                    <ul className="list">{c.validation.items.map((x) => <li key={x}>{rich(x)}</li>)}</ul>
                    {c.validation.extra}
                  </Fade>
                )}
              </AnimatePresence>

              <section id="results" className="case-sec">
                <h2 className="h2">{l.h.results}</h2>
                {c.results.map(([k, v]) => (
                  <p key={k}><span className="muted">{cap(k)}. </span>{rich(v)}</p>
                ))}
              </section>

              <section id="learnings" className="case-sec">
                <h2 className="h2">{l.h.learnings}</h2>
                {c.learn.map((x) => <p key={x}>{rich(x)}</p>)}
              </section>

              <p id="legal" className="small muted legal">{footnote && <sup className="fn">1</sup>}{c.legal}</p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
                <a href={`${BASE}/#work`} className="bl">← {l.next}</a>
                {i >= 0 && <a href={`${BASE}${nxt.href ?? ""}`} className="bl">{l.nextCase}: {nxt.client ?? nxt.title} →</a>}
              </div>
            </div>
          </main>
        </Shell>
      </div>
    </MotionConfig>
  );
}

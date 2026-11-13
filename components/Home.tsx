"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CardSwap } from "./CardSwap";
import { CoverVideo } from "./CoverVideo";
import { Cursor } from "./Cursor";
import { Arrow, Chevron, Copy, Download, Pin, Sel, Up } from "./Icons";
import { RubberTabs } from "./RubberTabs";
import { Shell, useSite } from "./Shell";
import { T } from "@/lib/i18n";
import {
  AUDIENCES, Audience, BEHANCE, EMAIL, EXPERIENCE, GITHUB, LINKEDIN, NAV,
  PIECES, PROJECTS, REFERENCES, TABS, WHATSAPP,
} from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const DRAWER = [0.32, 0.72, 0, 1] as const; // Darina
const SHEET = [0.33, 0, 0.2, 1] as const; // Billy
const ALL_TABS = [...TABS.map((t) => t[0]), "visual"];

// Darina-style cascade: each block fades in and rises 8px, 90ms apart.
const block = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: DRAWER } },
};

export default function Home() {
  const site = useSite();
  const { lang, cursor, reduce } = site;
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");
  const [aud, setAud] = useState<Audience>("anyone");
  const [tab, setTab] = useState("selected");
  const [front, setFront] = useState(0);
  const [resume, setResume] = useState(false);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  // entrance (Billy): cover holds, then slides up as the content cascades in
  useEffect(() => {
    if (reduce) { setPhase("done"); return; }
    const a = setTimeout(() => setPhase("out"), 900);
    const b = setTimeout(() => setPhase("done"), 2100);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [reduce]);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString("en-US", { timeZone: "America/Lima", hour: "numeric", minute: "2-digit" }).toLowerCase());
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };


  const es = lang === "es";
  const t = T[lang];
  const visitor = t.visitor;
  const show = phase === "in" ? "hidden" : "show";
  const tabs = ALL_TABS.filter((t) => t === "visual" || (TABS.find((x) => x[0] === t)?.[1].length ?? 0) > 0);
  const cards = (TABS.find((x) => x[0] === tab)?.[1] ?? []).map((k) => ({ key: k, ...PROJECTS[k], ...(es ? T.es.projects[k] : {}) }));
  const count = (t: string) => (t === "visual" ? PIECES.length : TABS.find((x) => x[0] === t)?.[1].length ?? 0);

  return (
    <MotionConfig reducedMotion="user">
    <div className="has-cursor">
      <Cursor color={cursor} labels={{ visitor, view: t.view, visit: t.visit }} enabled={phase !== "in"} />

      {/* cover */}
      {phase !== "done" && (
        <motion.div
          className="spl"
          aria-hidden="true"
          initial={false}
          animate={{ y: phase === "out" ? "-100vh" : 0 }}
          transition={{ duration: 1.2, ease: SHEET }}
        >
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: DRAWER }}>
            giulio libralato
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: DRAWER, delay: 0.12 }}>
              —product designer
            </motion.span>
          </motion.h2>
        </motion.div>
      )}

      <Shell site={site} nav={NAV.map((n) => ({ id: n, label: t.nav[n] }))} brandHref="#intro" shown={phase !== "in"}>
          <main className="inner">
            {/* intro */}
            <motion.section id="intro" style={{ maxWidth: 600 }} initial="hidden" animate={show} transition={{ staggerChildren: 0.09, delayChildren: 0.4 }}>
              <motion.div className="avw" style={{ width: 76, height: 76, margin: "28px 0 40px" }}
                variants={{ hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: DRAWER } } }}>
                <img src={`${BASE}/giulio.jpg`} alt="" width={76} height={76} style={{ display: "block", width: 76, height: 76, borderRadius: 12, objectFit: "cover", objectPosition: "50% 20%", background: "var(--muted)" }} />
                <Sel label="img" badge="76 × 76" style={{ inset: -8 }} />
              </motion.div>
              <motion.h1 variants={block} style={{ fontSize: 20, lineHeight: "28px", fontWeight: 500, letterSpacing: "-0.01em" }}>giulio libralato</motion.h1>
              <motion.p variants={block} className="muted" style={{ margin: "2px 0 20px", fontSize: 16, lineHeight: "24px" }}>{t.role}</motion.p>
              <motion.span variants={block} className="small muted" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <i style={{ width: 8, height: 8, borderRadius: 999, background: "var(--status-done)", boxShadow: "0 0 0 3px color-mix(in srgb, var(--status-done) 20%, transparent)" }} />
                {t.status}
              </motion.span>
              <motion.div variants={block} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                <div role="tablist" aria-label="portfolio for" style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                  {AUDIENCES.map(([k]) => (
                    <button key={k} type="button" role="tab" className="at" aria-selected={aud === k} onClick={() => setAud(k)}>{t.audiences[k]}</button>
                  ))}
                </div>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div key={aud} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                    style={{ display: "flex", flexDirection: "column", gap: 8, lineHeight: "24px", minHeight: 80 }}>
                    <p>{t.intro[aud][0]}</p>
                    <p>{t.intro[aud][1]}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div variants={block} className="lrow">
                <LinkItem href={LINKEDIN} label="linkedin" />
                <span className="dot muted" aria-hidden="true">·</span>
                <LinkItem href={GITHUB} label="github" />
                <span className="dot muted" aria-hidden="true">·</span>
                <span style={{ position: "relative", display: "inline-flex" }} onMouseLeave={() => setResume(false)}>
                  <button type="button" className="lk lnk" aria-haspopup="menu" aria-expanded={resume} onClick={() => setResume((r) => !r)} style={{ display: "inline-flex", alignItems: "center", gap: 4, color: resume ? "var(--foreground)" : undefined }}>
                    {t.nav.resume}<Chevron /><Sel label={t.nav.resume} />
                  </button>
                  <AnimatePresence>
                    {resume && (
                      <div style={{ position: "absolute", top: "100%", left: -12, zIndex: 20, paddingTop: 10 }}>
                        <motion.div role="menu" aria-label="download resume"
                          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                          style={{ transformOrigin: "top left", width: 248, padding: 6, display: "flex", flexDirection: "column", gap: 2, border: "1px solid var(--border)", borderRadius: 14, background: "var(--background)", boxShadow: "0 16px 40px -16px var(--shadow), 0 2px 6px -2px var(--shadow)" }}>
                          <span className="muted" style={{ padding: "8px 10px 6px", fontSize: 12, lineHeight: "16px" }}>{t.downloadCv}</span>
                          {t.cvMenu.map(([l, c, f, y]) => (
                            <a key={c} className="cr" href={`${BASE}/giulio-libralato-cv-${f}.pdf`} download role="menuitem" onClick={() => setResume(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, borderRadius: 10 }}>
                              <span className="mono muted" style={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: 8, background: "var(--muted)", fontSize: 11 }}>{c}</span>
                              <span style={{ flex: 1, display: "flex", flexDirection: "column" }}><span style={{ fontWeight: 500 }}>{l}</span><span className="muted" style={{ fontSize: 12, lineHeight: "16px" }}>PDF · {y}</span></span>
                              <span className="muted"><Download /></span>
                            </a>
                          ))}
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </span>
                <span className="dot muted" aria-hidden="true">·</span>
                <LinkItem href={BEHANCE} label="behance" />
                <span className="dot muted" aria-hidden="true">·</span>
                <LinkItem href={WHATSAPP} label="whatsapp" />
                <span className="dot muted" aria-hidden="true">·</span>
                <button type="button" className="lk lnk" onClick={copyEmail} aria-label={`copy email ${EMAIL}`} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {copied ? t.copied : EMAIL}<Copy /><Sel label="email" />
                </button>
              </motion.div>
            </motion.section>

            {/* work */}
            <motion.section id="work" style={{ marginTop: 56 }} initial="hidden" animate={show} transition={{ staggerChildren: 0.09, delayChildren: 0.9 }}>
              <h2 className="sr-only">{t.nav.work}</h2>
              <motion.div variants={block}>
                <RubberTabs labelsKey={lang} items={tabs} value={tab} onChange={(t) => { setTab(t); setFront(0); }} label="work type"
                  render={(x) => <>{t.tabs[x] ?? x}<span className="count mono">{count(x)}</span></>} />
              </motion.div>

              {tab !== "visual" ? (
                <motion.div key={tab} className="grid" initial="hidden" animate={show} transition={{ staggerChildren: 0.09 }}>
                  {cards.map((c) => (
                    <motion.a key={c.key} variants={block} href={c.href?.startsWith("/") ? `${BASE}${c.href}` : c.href || "#work"} target={c.href && !c.href.startsWith("/") ? "_blank" : undefined} rel="noopener" className="cd"
                      data-label={c.href && !c.href.startsWith("/") ? "visit" : "view"}>
                      <div className="cw">
                        <div className={c.cover || c.fill ? "cover film-cover" : "cover"}>
                          {c.cover ? (
                            <CoverVideo src={`${BASE}${c.cover.video}`} poster={`${BASE}${c.cover.poster}`} label={c.title} />
                          ) : c.image ? (
                            <img className={c.fill ? "cover-fill" : "cover-shot"} src={`${BASE}${c.image}`} alt="" loading="lazy" decoding="async" />
                          ) : c.phone ? (
                            <div className="cv phone"><i className="bar" style={{ width: "50%", height: 8 }} /><i className="bar" style={{ height: 44, borderRadius: 8 }} /><i className="bar" /><i className="bar" style={{ width: "70%" }} /><i className="bar" style={{ height: 44, borderRadius: 8 }} /></div>
                          ) : (
                            <div className="cv win">
                              <div className="side"><i className="bar" /><i className="bar" style={{ boxShadow: "0 0 0 1.5px var(--brand)" }} /><i className="bar" /><i className="bar" style={{ width: "70%" }} /></div>
                              <div className="main"><i className="bar" style={{ height: 9, width: "45%" }} /><div style={{ display: "flex", gap: 7 }}><i className="bar" style={{ flex: 1, height: 40 }} /><i className="bar" style={{ flex: 1, height: 40 }} /><i className="bar" style={{ flex: 1, height: 40 }} /></div><i className="bar" /><i className="bar" style={{ width: "80%" }} /></div>
                            </div>
                          )}
                        </div>
                        <Sel quiet />
                      </div>
                      <h3 className="one" style={{ marginTop: 16, fontSize: 15, lineHeight: "22px", fontWeight: 500 }} title={c.client ? `${c.client} — ${c.title}` : c.title}>{c.client ? `${c.client} — ${c.title}` : c.title}</h3>
                      <p className="one muted">{c.desc}</p>
                      <div className="muted" style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 12, lineHeight: "16px" }}>
                        <span className="tag">{t.types[c.type] ?? c.type}</span>
                        {c.tags?.map((g) => <span key={g} className="tag">{t.types[g] ?? g}</span>)}
                        <span className="mono" style={{ marginLeft: "auto" }}>{c.year}</span>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              ) : (
                <motion.div className="grid" style={{ alignItems: "center" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <CardSwap pieces={PIECES} front={front} onFront={setFront} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <p className="muted">{t.visualIntro}</p>
                    <div style={{ display: "grid" }}>
                      {PIECES.map((p, i) => (
                        <a key={p.name} className="cr" href={p.href} target="_blank" rel="noopener"
                          data-label="visit" onMouseEnter={() => setFront(i)} onFocus={() => setFront(i)}
                          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, padding: "14px 0", borderTop: "1px solid var(--border)", color: front === i ? "var(--foreground)" : "var(--muted-foreground)" }}>
                          <span style={{ fontWeight: 500 }}>{p.name}</span>
                          <span className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 12 }}><span className="mono" style={{ fontSize: 12 }}>{p.year}</span><Arrow size={14} /></span>
                        </a>
                      ))}
                    </div>
                    <a className="bl lnk small" href={BEHANCE} target="_blank" rel="noopener" style={{ alignSelf: "flex-end", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      {t.seeBehance}<Arrow size={14} /><Sel label="link" />
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.section>

            {/* experience */}
            <section id="experience" style={{ marginTop: 96 }}>
              <SectionHead title={t.experience} link={t.fullHistory} href={LINKEDIN} />
              {EXPERIENCE.map((e0, i) => ({ ...e0, ...t.exp[i] })).map((e) => (
                <div key={e.co} className="xrow">
                  <span className="label mono" style={{ whiteSpace: "nowrap" }}>{e.y}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 10px" }}><b style={{ fontWeight: 500 }}>{e.co}</b><span className="small muted">{e.role}</span></div>
                    <p className="muted">{e.p}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* resume */}
            <section id="resume" style={{ marginTop: 96 }}>
              <h2 className="h2" style={{ marginBottom: 24 }}>{t.resumeH}</h2>
              <div style={{ borderBottom: "1px solid var(--border)" }}>
                <Row label={t.rows.summary}><p style={{ maxWidth: 600 }}>{t.summary}</p></Row>
                <Row label={t.rows.education}><div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px", alignItems: "baseline" }}><b style={{ fontWeight: 500 }}>UPC</b><span className="muted">{t.degree}</span></div></Row>
                <Row label={t.rows.languages}><p>{t.langs}</p></Row>
                <Row label={t.rows.download}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, maxWidth: 480 }}>
                    {t.cvLangs.map((l, i) => (
                      <a key={l} className="bs" href={`${BASE}/giulio-libralato-cv-${i ? "es" : "en"}.pdf`} download>
                        <span style={{ display: "flex", flexDirection: "column" }}><span style={{ fontWeight: 500 }}>{t.resume} · {l}</span><span className="small muted">PDF</span></span>
                        <span className="muted"><Download size={16} /></span>
                      </a>
                    ))}
                  </div>
                </Row>
              </div>
            </section>

            {/* references */}
            <section id="references" style={{ marginTop: 96 }}>
              <SectionHead title={t.references} link={t.readAll} href={LINKEDIN} />
              <div className="refs" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32 }}>
                {REFERENCES.map((r) => (
                  <figure key={r.name}>
                    <blockquote style={{ marginBottom: 12 }}>“{r.quote}”</blockquote>
                    <figcaption style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <a className="lk lnk" href={r.href} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 500, color: "var(--foreground)", alignSelf: "flex-start" }}>
                        {r.name}<Arrow /><Sel label="linkedin" />
                      </a>
                      <span className="small muted">{r.role}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* contact */}
            <section id="contact" style={{ marginTop: 96 }}>
              <div className="grid" style={{ gap: 32, alignItems: "stretch", marginTop: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span className="small muted" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <i style={{ width: 8, height: 8, borderRadius: 999, background: "var(--status-done)" }} />{t.status}
                    </span>
                    <h2 className="h2" style={{ maxWidth: 360 }}>{t.contactTitle}</h2>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <ContactRow k="whatsapp" v={t.writeMe} href={WHATSAPP} />
                    <button type="button" className="crow" onClick={copyEmail} aria-label={`copy email ${EMAIL}`}>
                      <span style={{ display: "flex", alignItems: "center", gap: 16 }}><span className="label" style={{ width: 90 }}>email</span><span>{copied ? t.copied : EMAIL}</span></span>
                      <span className="muted"><Copy /></span><Sel label="button" />
                    </button>
                    <ContactRow k="linkedin" v="giulio libralato" href={LINKEDIN} />
                  </div>
                </div>
                <div className="avw" style={{ alignSelf: "start" }}>
                  <img src={`${BASE}/giulio.jpg`} alt="Giulio Libralato" style={{ display: "block", width: "100%", aspectRatio: "1 / 1", borderRadius: 12, objectFit: "cover", objectPosition: "50% 0%", background: "var(--muted)" }} />
                  <Sel label="Giulio Libralato" style={{ inset: -8 }} />
                </div>
              </div>
            </section>

            <footer style={{ marginTop: 96, padding: "24px 0 8px", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px 24px" }} className="small muted">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 16px" }}>
                <span style={{ color: "var(--foreground)", fontWeight: 500 }}>giulio libralato</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Pin />{t.city} · <span className="mono" style={{ fontSize: 12 }}>{time}</span></span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 16px" }}>
                <span>{t.updated}</span>
                <a className="lk" href="#intro" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{t.top}<Up /></a>
              </div>
            </footer>
          </main>
      </Shell>
    </div>
    </MotionConfig>
  );
}

function LinkItem({ href, label }: { href: string; label: string }) {
  return (
    <a className="lk lnk" href={href} target="_blank" rel="noopener">
      {label}
      <Sel label={label} />
    </a>
  );
}

function SectionHead({ title, link, href }: { title: string; link: string; href: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
      <h2 className="h2">{title}</h2>
      <a className="bl lnk small" href={href} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {link}<Arrow /><Sel label="link" />
      </a>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="xrow">
      <span className="label">{label}</span>
      {children}
    </div>
  );
}

function ContactRow({ k, v, href }: { k: string; v: string; href: string }) {
  return (
    <a className="crow" href={href} target="_blank" rel="noopener">
      <span style={{ display: "flex", alignItems: "center", gap: 16 }}><span className="label" style={{ width: 90 }}>{k}</span><span>{v}</span></span>
      <span className="muted"><Arrow size={14} /></span>
      <Sel label="link" />
    </a>
  );
}

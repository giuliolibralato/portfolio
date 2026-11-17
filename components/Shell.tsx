"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Close, Globe, Menu, Moon, PointerIcon, Sun } from "./Icons";
import { T } from "@/lib/i18n";
import { CURSOR_COLORS, Lang } from "@/lib/data";

const SHEET = [0.33, 0, 0.2, 1] as const; // Billy
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const } },
};

// Site-wide preferences shared by every page: language, theme and cursor color.
export function useSite() {
  const reduce = useReducedMotion();
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [cursor, setCursor] = useState("#007AFF");

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const l = localStorage.getItem("lang");
    if (l === "es" || l === "en") setLang(l);
    else if (navigator.language?.toLowerCase().startsWith("es")) setLang("es");
    const c = localStorage.getItem("cursor");
    if (c) setCursor(c);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { document.documentElement.style.setProperty("--cursor", cursor); }, [cursor]);

  const toggleLang = () => setLang((l) => { const n = l === "es" ? "en" : "es"; localStorage.setItem("lang", n); return n; });
  // Magic UI "Animated Theme Toggler": the new theme grows as a circle from the button (View Transitions)
  const toggleDark = (e: React.MouseEvent<HTMLElement>) => {
    const next = !dark;
    const apply = () => {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      localStorage.setItem("theme", next ? "dark" : "light");
      flushSync(() => setDark(next));
    };
    if (!document.startViewTransition || reduce || document.hidden) { apply(); return; }
    const b = e.currentTarget.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(0.45, 0, 0.25, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };
  const pickCursor = (c: string) => { setCursor(c); localStorage.setItem("cursor", c); };

  return { lang, dark, cursor, reduce, toggleLang, toggleDark, pickCursor };
}
export type Site = ReturnType<typeof useSite>;

export type NavItem = { id: string; label: string };

// Billy's side rail + mobile top bar. The home lists its sections; a case lists its own index.
export function Shell({ site, nav, brandHref, back, shown = true, children }: {
  site: Site;
  nav: NavItem[];
  brandHref: string;
  back?: { href: string; label: string };
  shown?: boolean;
  children: React.ReactNode;
}) {
  const t = T[site.lang];
  const [active, setActive] = useState(nav[0]?.id);
  const [menu, setMenu] = useState(false);
  const [picker, setPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const ids = nav.map((n) => n.id).join(",");

  // scroll spy: the rail marks the section in view
  useEffect(() => {
    const els = ids.split(",").map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, shown]);

  // cursor picker closes on Escape or a click outside it
  useEffect(() => {
    if (!picker) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setPicker(false); };
    const down = (e: PointerEvent) => { if (!pickerRef.current?.contains(e.target as Node)) setPicker(false); };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", down);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("pointerdown", down); };
  }, [picker]);

  const fade = { initial: { opacity: 0 }, animate: { opacity: shown ? 1 : 0 }, transition: { duration: 1, ease: SHEET, delay: back ? 0 : 0.75 } };
  const themeIcon = site.dark ? <Moon key="m" /> : <Sun key="s" />;

  return (
    <div className="app">
      <motion.aside className="rail" {...fade}>
        <a href={brandHref} style={{ fontWeight: 500 }}>giulio libralato</a>
        <nav aria-label="sections">
          {back && <a href={back.href} className="nl back">← {back.label}</a>}
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="nl" aria-current={active === n.id ? "true" : undefined} style={{ position: "relative", paddingLeft: 14 }}>
              {active === n.id && (
                <motion.i layoutId="nav-dot" aria-hidden="true" transition={{ type: "spring", stiffness: 520, damping: 38 }}
                  style={{ position: "absolute", left: 0, top: "50%", width: 6, height: 6, marginTop: -3, borderRadius: 999, background: "var(--brand)" }} />
              )}
              <motion.span animate={{ x: active === n.id ? 2 : 0 }} transition={{ type: "spring", stiffness: 520, damping: 38 }} style={{ display: "inline-block" }}>{n.label}</motion.span>
            </a>
          ))}
        </nav>
        <div ref={pickerRef} style={{ marginTop: "auto", position: "relative", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
          <AnimatePresence>
            {picker && (
              <motion.div
                role="dialog"
                aria-label={t.cursorTitle}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformOrigin: "bottom left", position: "absolute", left: 56, bottom: 0, zIndex: 30, width: 304, padding: 16, display: "flex", flexDirection: "column", gap: 16, border: "1px solid var(--border)", borderRadius: 16, background: "var(--background)", boxShadow: "0 16px 40px -16px var(--shadow), 0 2px 6px -2px var(--shadow)" }}
              >
                <div style={{ position: "relative", paddingRight: 32 }}>
                  <div style={{ fontWeight: 500 }}>{t.cursorTitle}</div>
                  <div className="small muted" style={{ whiteSpace: "nowrap" }}>{t.cursorHint}</div>
                  <button type="button" aria-label="close" onClick={() => setPicker(false)} className="lk" style={{ position: "absolute", top: -6, right: -6, width: 28, height: 28, display: "grid", placeItems: "center" }}>
                    <Close size={14} />
                  </button>
                </div>
                <div style={{ position: "relative", height: 72, borderRadius: 12, background: "var(--muted)" }}>
                  <span style={{ position: "absolute", left: 28, top: 14 }}><PointerIcon color={site.cursor} size={20} /></span>
                  <span className="tag-cur" style={{ position: "absolute", left: 48, top: 38, padding: "2px 7px", borderRadius: 4, background: site.cursor, color: "#fff", fontSize: 12, lineHeight: "16px", fontWeight: 500 }}>{t.visitor}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {CURSOR_COLORS.map(([name, hex]) => (
                    <button key={name} type="button" className="sw" aria-label={name} title={name} aria-pressed={site.cursor === hex} onClick={() => { site.pickCursor(hex); setPicker(false); }}
                      style={{ background: hex, boxShadow: site.cursor === hex ? `0 0 0 2px var(--background), 0 0 0 4px ${hex}` : "none" }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <IconButton label={t.cursorTitle} onClick={() => setPicker((p) => !p)}><PointerIcon color={site.cursor} /></IconButton>
          <IconButton label={site.dark ? t.themeToLight : t.themeToDark} onClick={site.toggleDark}>{themeIcon}</IconButton>
          <IconButton label={t.langLabel} onClick={site.toggleLang}><Globe /></IconButton>
        </div>
      </motion.aside>

      <div className="content">
        <motion.header className="mtop" {...fade}>
          {back ? <a href={back.href}>← {back.label}</a> : <a href={brandHref} style={{ fontWeight: 500 }}>giulio libralato</a>}
          <button type="button" aria-label={t.menu} aria-expanded={menu} onClick={() => setMenu(true)} className="lk" style={{ width: 44, height: 44, display: "grid", placeItems: "center", color: "var(--foreground)" }}>
            <Menu />
          </button>
        </motion.header>

        <AnimatePresence>
          {menu && (
            <motion.div role="dialog" aria-modal="true" aria-label="menu"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", padding: "0 16px 32px", background: "var(--background)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
                <a href={brandHref} onClick={() => setMenu(false)} style={{ fontWeight: 500 }}>giulio libralato</a>
                <button type="button" aria-label="close menu" onClick={() => setMenu(false)} className="lk" style={{ width: 44, height: 44, display: "grid", placeItems: "center", color: "var(--foreground)" }}><Close /></button>
              </div>
              <motion.nav aria-label="sections" style={{ display: "flex", flexDirection: "column", marginTop: 32 }} initial="hidden" animate="show" transition={{ staggerChildren: 0.05 }}>
                {back && <motion.a href={back.href} variants={item} className="nl" style={{ padding: "10px 0", fontSize: 17 }}>← {back.label}</motion.a>}
                {nav.map((n) => (
                  <motion.a key={n.id} href={`#${n.id}`} onClick={() => setMenu(false)} variants={item} className="nl" style={{ padding: "10px 0", fontSize: 28, lineHeight: "36px", fontWeight: 500 }}>{n.label}</motion.a>
                ))}
              </motion.nav>
              <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
                <IconButton label="theme" onClick={site.toggleDark} size={44}>{themeIcon}</IconButton>
                <IconButton label={t.langLabel} onClick={site.toggleLang} size={44}><Globe /></IconButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {children}
      </div>
    </div>
  );
}

// React Bits "Warm Tooltip": a small label springs out next to the icon button.
// once one tooltip has shown, moving to the next button shows it without animating
let lastTip = 0;

export function IconButton({ label, onClick, children, size = 40 }: { label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; children: React.ReactNode; size?: number }) {
  const [hover, setHover] = useState(false);
  const warm = useRef(false);
  return (
    <span style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => { warm.current = Date.now() - lastTip < 400; setHover(true); }}
      onMouseLeave={() => { lastTip = Date.now(); setHover(false); }}>
      <button type="button" className="sb" aria-label={label} onClick={onClick} style={{ width: size, height: size }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={String((children as React.ReactElement)?.key ?? "i")} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }} style={{ display: "grid" }}>
            {children}
          </motion.span>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {hover && (
          <motion.span role="tooltip" initial={warm.current ? false : { opacity: 0, x: -4, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ type: "spring", stiffness: 520, damping: 32 }}
            style={{ position: "absolute", left: size + 8, top: "50%", marginTop: -13, height: 26, display: "flex", alignItems: "center", padding: "0 10px", borderRadius: 8, background: "var(--primary)", color: "var(--primary-foreground)", fontSize: 12, whiteSpace: "nowrap", pointerEvents: "none", transformOrigin: "left center", zIndex: 40 }}>
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

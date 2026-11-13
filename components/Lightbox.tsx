"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Click (or Enter on) any figure image or film inside the case to see it large; outside click, Esc or the X closes it.
const SEL = "img.crop, img.cover-shot, video";
type Item = { video: boolean; src: string; alt: string; poster?: string; from: { cx: number; cy: number; w: number }; ratio: number };
const ease = [0.23, 1, 0.32, 1] as const;

// where the picture starts: over the thing that was clicked, so the eye follows it to the center
function start(i: Item) {
  const vw = window.innerWidth, vh = window.innerHeight;
  const finalW = Math.min(i.ratio * (vh - 80), 0.96 * vw, 1800);
  const c = (n: number, m: number) => Math.max(-m, Math.min(m, n)); // a trigger scrolled out of view still starts on screen
  return { x: c(i.from.cx - vw / 2, vw / 2), y: c(i.from.cy - (56 + (vh - 72) / 2), vh / 2), scale: Math.min(1, Math.max(0.2, i.from.w / finalW)) };
}

export function useLightbox(label: string, close: string) {
  const root = useRef<HTMLElement>(null);
  const back = useRef<Element | null>(null);
  const x = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [item, setItem] = useState<Item | null>(null);

  const open = (el: Element) => {
    const v = el as HTMLVideoElement, im = el as HTMLImageElement;
    const b = el.getBoundingClientRect();
    const isVideo = el.tagName === "VIDEO";
    const nw = (isVideo ? v.videoWidth : im.naturalWidth) || b.width, nh = (isVideo ? v.videoHeight : im.naturalHeight) || b.height;
    const from = { cx: b.left + b.width / 2, cy: b.top + b.height / 2, w: b.width };
    back.current = el;
    setItem(isVideo
      ? { video: true, src: v.currentSrc || v.querySelector("source")?.src || "", alt: v.getAttribute("aria-label") || "", poster: v.poster, from, ratio: nw / nh }
      : { video: false, src: im.currentSrc || im.src, alt: im.alt, from, ratio: nw / nh });
  };
  const shut = () => { setItem(null); (back.current as HTMLElement | null)?.focus?.(); };

  // figures mount lazily and per section, so make every match focusable as it appears
  useEffect(() => {
    const m = root.current;
    if (!m) return;
    const tag = () => m.querySelectorAll(SEL).forEach((e) => {
      if (e.closest("a,button") || e.hasAttribute("tabindex")) return;
      e.setAttribute("tabindex", "0"); e.setAttribute("role", "button"); e.setAttribute("aria-haspopup", "dialog");
    });
    tag();
    const o = new MutationObserver(tag);
    o.observe(m, { childList: true, subtree: true });
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!item) return;
    const off = (e: KeyboardEvent) => { if (e.key === "Escape") shut(); };
    document.addEventListener("keydown", off);
    document.body.style.overflow = "hidden";
    x.current?.focus();
    return () => { document.removeEventListener("keydown", off); document.body.style.overflow = ""; };
  }, [item]);

  const props = {
    ref: root,
    onClick: (e: React.MouseEvent) => { const t = (e.target as Element).closest(SEL); if (t && root.current?.contains(t) && !t.closest("a,button")) open(t); },
    onKeyDown: (e: React.KeyboardEvent) => { const t = e.target as Element; if ((e.key === "Enter" || e.key === " ") && t.matches?.(SEL)) { e.preventDefault(); open(t); } },
  };

  const grow = (i: Item) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, ...start(i) },
    animate: { opacity: 1, x: 0, y: 0, scale: 1, transition: reduce ? { duration: 0.12 } : { duration: 0.28, ease } },
    exit: { opacity: 0, scale: reduce ? 1 : 0.97, transition: { duration: 0.12, ease } },
  });
  const modal = (
    <AnimatePresence>
      {item && (
        <motion.div role="dialog" aria-modal="true" aria-label={label} className="lb"
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.18, ease } }} exit={{ opacity: 0, transition: { duration: 0.12, ease } }}
          onClick={(e) => { if (e.target === e.currentTarget) shut(); }}>
          <motion.button ref={x} type="button" className="lb-x" aria-label={close} onClick={shut}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.16, ease, delay: 0.08 } }} whileTap={{ scale: 0.94, transition: { duration: 0.12, ease } }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </motion.button>
          {item.video
            ? <motion.video src={item.src} poster={item.poster} aria-label={item.alt} autoPlay={!reduce} muted loop playsInline controls {...grow(item)} />
            : <motion.img src={item.src} alt={item.alt} {...grow(item)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
  return { props, modal };
}

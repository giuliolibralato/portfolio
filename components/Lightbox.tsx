"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Close } from "./Icons";

// Click (or Enter on) any figure image or film inside the case to see it large; outside click, Esc or the X closes it.
const SEL = "img.crop, img.cover-shot, video";
type Item = { video: boolean; src: string; alt: string; poster?: string };

export function useLightbox(label: string, close: string) {
  const root = useRef<HTMLElement>(null);
  const back = useRef<Element | null>(null);
  const x = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [item, setItem] = useState<Item | null>(null);

  const open = (el: Element) => {
    const v = el as HTMLVideoElement;
    back.current = el;
    setItem(el.tagName === "VIDEO"
      ? { video: true, src: v.currentSrc || v.querySelector("source")?.src || "", alt: v.getAttribute("aria-label") || "", poster: v.poster }
      : { video: false, src: (el as HTMLImageElement).currentSrc || (el as HTMLImageElement).src, alt: (el as HTMLImageElement).alt });
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

  const modal = (
    <AnimatePresence>
      {item && (
        <motion.div role="dialog" aria-modal="true" aria-label={label} className="lb"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => { if (e.target === e.currentTarget) shut(); }}>
          <button ref={x} type="button" className="lb-x" aria-label={close} onClick={shut}><Close /></button>
          {item.video
            ? <video src={item.src} poster={item.poster} aria-label={item.alt} autoPlay={!reduce} muted loop playsInline controls />
            : <img src={item.src} alt={item.alt} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
  return { props, modal };
}

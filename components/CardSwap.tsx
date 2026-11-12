"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

// React Bits "Card Swap" (GSAP): the front card drops away and returns to the back of the stack
// while the others move forward. Autoplays, pauses on hover, advances on click.
type Piece = { name: string; year: string; art: string };

const slot = (i: number) => ({ y: -i * 14, scale: 1 - i * 0.06, zIndex: 10 - i });

export function CardSwap({ pieces, front, onFront }: { pieces: Piece[]; front: number; onFront: (i: number) => void }) {
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const dims = useRef<(HTMLSpanElement | null)[]>([]);
  const order = useRef<number[]>(pieces.map((_, i) => i));
  const busy = useRef(false);
  const hover = useRef(false);
  const reduce = useRef(false);

  const place = (animate: boolean) => {
    order.current.forEach((idx, pos) => {
      const el = cards.current[idx];
      if (!el) return;
      const s = slot(pos);
      gsap.to(el, { ...s, duration: animate && !reduce.current ? 0.5 : 0, ease: "power3.out" });
      const d = dims.current[idx];
      if (d) gsap.to(d, { opacity: pos * 0.04, duration: animate ? 0.3 : 0 });
    });
  };

  const swap = () => {
    if (busy.current) return;
    const [first, ...rest] = order.current;
    const el = cards.current[first];
    if (!el || reduce.current) {
      order.current = [...rest, first];
      place(false);
      onFront(order.current[0]);
      return;
    }
    busy.current = true;
    const tl = gsap.timeline({ onComplete: () => { busy.current = false; } });
    tl.to(el, { y: "+=420", duration: 0.4, ease: "power3.inOut" });
    tl.add(() => {
      order.current = [...rest, first];
      onFront(order.current[0]);
      rest.forEach((idx, pos) => {
        const c = cards.current[idx];
        if (c) gsap.to(c, { ...slot(pos), duration: 0.45, ease: "power3.out", delay: pos * 0.05 });
        const d = dims.current[idx];
        if (d) gsap.to(d, { opacity: pos * 0.04, duration: 0.3 });
      });
      gsap.set(el, { zIndex: 0 });
    }, "-=0.15");
    tl.to(el, { ...slot(rest.length), duration: 0.5, ease: "power3.out" });
    if (dims.current[first]) tl.to(dims.current[first], { opacity: rest.length * 0.04, duration: 0.3 }, "<");
  };

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    place(false);
    const id = window.setInterval(() => { if (!hover.current) swap(); }, 4000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // bring a piece to the front when it's hovered in the list
  useEffect(() => {
    if (order.current[0] === front) return;
    order.current = [front, ...order.current.filter((i) => i !== front)];
    place(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [front]);

  return (
    <div className="stack" onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}>
      {pieces.map((p, i) => (
        <button
          key={p.name}
          ref={(el) => { cards.current[i] = el; }}
          type="button"
          className="stk"
          data-cursor="grab"
          aria-label={`next piece, now showing ${p.name}`}
          onClick={swap}
        >
          <span className="muted small" style={{ display: "grid", placeItems: "center" }}>{p.art}</span>
          <span style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "var(--background)" }}>
            <span style={{ fontWeight: 500 }}>{p.name}</span>
            <span className="small muted">{p.year}</span>
          </span>
          <span ref={(el) => { dims.current[i] = el; }} className="dim" style={{ opacity: 0 }} />
        </button>
      ))}
    </div>
  );
}

"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useLayoutEffect, useRef } from "react";

// React Bits "Rubber Segment": the thumb's leading edge moves fast and the trailing edge
// catches up, so it stretches toward the target and settles. Each edge is a clip-path inset,
// so the thumb never triggers layout while it moves.
export function RubberTabs<T extends string>({
  items,
  value,
  onChange,
  label,
  render,
  labelsKey,
}: {
  items: T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  render?: (v: T) => React.ReactNode;
  labelsKey?: string; // changes when the labels change (language), so the thumb re-measures
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lv = useMotionValue(3);
  const rv = useMotionValue(3);
  const clip = useMotionTemplate`inset(3px ${rv}px 3px ${lv}px round 999px)`;
  const prev = useRef<T | null>(null);

  const edges = () => {
    const el = refs.current[value];
    const w = wrap.current;
    if (!el || !w) return null;
    return { el, l: el.offsetLeft, r: w.clientWidth - el.offsetLeft - el.offsetWidth };
  };

  // labels change width (language switch, web font load): snap the thumb to the new size
  useLayoutEffect(() => {
    const w = wrap.current;
    if (!w) return;
    const ro = new ResizeObserver(() => {
      if (lv.isAnimating() || rv.isAnimating()) return; // a tab change is already moving it
      const e = edges();
      if (e) { lv.set(e.l); rv.set(e.r); }
    });
    ro.observe(w);
    w.querySelectorAll("button").forEach((b) => ro.observe(b));
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, items.join(",")]);

  useLayoutEffect(() => {
    const e = edges();
    if (!e) return;
    const { el, l, r } = e;
    if (prev.current === null || prev.current === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lv.set(l); rv.set(r);
    } else {
      const forward = items.indexOf(value) > items.indexOf(prev.current);
      const fast = { type: "spring" as const, stiffness: 700, damping: 45 };
      const slow = { type: "spring" as const, stiffness: 320, damping: 32 };
      animate(lv, l, forward ? slow : fast);
      animate(rv, r, forward ? fast : slow);
    }
    prev.current = value;
    el.scrollIntoView?.({ inline: "nearest", block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, items.join(","), labelsKey]);

  return (
    <div className="tabs">
      <div ref={wrap} role="tablist" aria-label={label} className="tablist" style={{ position: "relative" }}>
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 1px 1px var(--shadow))", pointerEvents: "none" }}>
          <motion.i style={{ position: "absolute", inset: 0, background: "var(--thumb)", clipPath: clip }} />
        </span>
        {items.map((it) => (
          <button
            key={it}
            ref={(el) => {
              refs.current[it] = el;
            }}
            type="button"
            role="tab"
            className="tb"
            aria-selected={it === value}
            onClick={() => onChange(it)}
            style={{ position: "relative", background: "transparent", boxShadow: "none" }}
          >
            {render ? render(it) : it}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

// React Bits "Rubber Segment": the thumb's leading edge moves fast and the trailing edge
// catches up, so it stretches toward the target and settles.
export function RubberTabs<T extends string>({
  items,
  value,
  onChange,
  label,
  render,
}: {
  items: T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  render?: (v: T) => React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [box, setBox] = useState({ left: 3, right: 3 });
  const prev = useRef(value);

  useLayoutEffect(() => {
    const el = refs.current[value];
    const w = wrap.current;
    if (!el || !w) return;
    setBox({ left: el.offsetLeft, right: w.clientWidth - el.offsetLeft - el.offsetWidth });
    el.scrollIntoView?.({ inline: "nearest", block: "nearest" });
  }, [value, items.length]);

  const forward = items.indexOf(value) > items.indexOf(prev.current);
  prev.current = value;
  const fast = { type: "spring" as const, stiffness: 700, damping: 45 };
  const slow = { type: "spring" as const, stiffness: 320, damping: 32 };

  return (
    <div className="tabs">
      <div ref={wrap} role="tablist" aria-label={label} className="tablist" style={{ position: "relative" }}>
        <motion.i
          aria-hidden="true"
          initial={false}
          animate={box}
          transition={{ left: forward ? slow : fast, right: forward ? fast : slow }}
          style={{ position: "absolute", top: 3, bottom: 3, borderRadius: 999, background: "var(--background)", boxShadow: "0 1px 2px var(--shadow)" }}
        />
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

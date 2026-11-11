"use client";

import { forwardRef } from "react";
import { POINTER_PATH } from "./Icons";

export type CursorMode = "arrow" | "point" | "text" | "grab";

const shadow = { filter: "drop-shadow(0 1.5px 2px rgba(15,23,42,.35))" };

export const Cursor = forwardRef<HTMLDivElement, { color: string; label: string; mode: CursorMode; visible: boolean }>(
  function Cursor({ color, label, mode, visible }, ref) {
    return (
      <div ref={ref} className="vc" aria-hidden="true" style={{ opacity: visible ? 1 : 0 }}>
        {mode === "arrow" && (
          <svg width="16" height="18" viewBox="0 0 20 22" style={shadow}>
            <path d={POINTER_PATH} fill={color} stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
          </svg>
        )}
        {mode === "point" && (
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ ...shadow, transform: "translate(-6px,-1.5px)" }}>
            <path d="M6 14V4a2 2 0 0 1 4 0v5a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L6 14z" fill={color} stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
            <path d="M10 9.5v3M14 10.5v2M18 11.5v1" fill="none" stroke="#fff" strokeWidth={1.3} strokeLinecap="round" />
          </svg>
        )}
        {mode === "text" && (
          <svg width="15" height="17" viewBox="0 0 20 22" style={{ ...shadow, transform: "translate(-7.5px,-8.5px)" }}>
            <path d="M6 3h2.5a2 2 0 0 1 1.5.7A2 2 0 0 1 11.5 3H14M10 3.8v14.4M6 19h2.5a2 2 0 0 0 1.5-.7 2 2 0 0 0 1.5.7H14" fill="none" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" />
            <path d="M6 3h2.5a2 2 0 0 1 1.5.7A2 2 0 0 1 11.5 3H14M10 3.8v14.4M6 19h2.5a2 2 0 0 0 1.5-.7 2 2 0 0 0 1.5.7H14" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
          </svg>
        )}
        {mode === "grab" && (
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ ...shadow, transform: "translate(-9px,-4.5px)" }}>
            <path d="M6 14V6a2 2 0 0 1 4 0V4a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L6 14z" fill={color} stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
            <path d="M10 6v5M14 6v5M18 8v3" fill="none" stroke="#fff" strokeWidth={1.3} strokeLinecap="round" />
          </svg>
        )}
        <span className="tag-cur" style={{ background: color }}>{label}</span>
      </div>
    );
  },
);

export function modeFor(target: EventTarget | null): CursorMode {
  const t = target as HTMLElement | null;
  if (!t || !t.closest) return "arrow";
  const d = t.closest("[data-cursor]");
  if (d) return d.getAttribute("data-cursor") as CursorMode;
  if (t.closest("a,button,select,label")) return "point";
  if (t.closest("p,h1,h2,h3,blockquote,figcaption,li")) return "text";
  const hasText = Array.from(t.childNodes || []).some((n) => n.nodeType === 3 && (n.textContent || "").trim());
  return hasText ? "text" : "arrow";
}

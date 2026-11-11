type P = { size?: number };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const POINTER_PATH =
  "M3.4 2.4 Q2.2 1.9 2.5 3.2 L7.3 18.6 Q7.7 19.8 8.4 18.7 L11.1 13.2 Q11.4 12.6 12 12.4 L18.4 10.5 Q19.6 10.1 18.5 9.4 Z";

export const Sun = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} className="ti">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const Moon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} className="ti">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);
export const Globe = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </svg>
);
export const Copy = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);
export const Arrow = ({ size = 12 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.6}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
export const Download = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.6}>
    <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
  </svg>
);
export const Chevron = ({ size = 12 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const Menu = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const Close = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Pin = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const Up = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 19V5m0 0-6 6m6-6 6 6" />
  </svg>
);

export function PointerIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 20 22" aria-hidden="true" style={{ filter: "drop-shadow(0 1.5px 2px rgba(15,23,42,.35))" }}>
      <path d={POINTER_PATH} fill={color} stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  );
}

export function Sel({ label, badge, quiet, style }: { label?: string; badge?: string; quiet?: boolean; style?: React.CSSProperties }) {
  return (
    <span className={quiet ? "sel quiet" : "sel"} aria-hidden="true" style={style}>
      <i /><i /><i /><i />
      {label && <b>{label}</b>}
      {badge && <u>{badge}</u>}
    </span>
  );
}

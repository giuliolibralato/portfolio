"use client";

import { motion } from "motion/react";
import { CoverVideo } from "./CoverVideo";

// The figure pattern every case uses (DESIGN.md "Imagen con caption"):
// a --card frame, real crops inside, a mono label above each pane and a plain caption below.

export const rise = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const } },
};
export const view = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.3 } } as const;

export function Frame({ caption, children, className = "" }: { caption: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className="frame-fig">
      <motion.div className={`frame ${className}`} {...view} transition={{ staggerChildren: 0.08 }}>{children}</motion.div>
      <figcaption className="small muted">{caption}</figcaption>
    </figure>
  );
}

export function Pane({ label, children, accent }: { label: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <motion.div variants={rise} className="pane">
      <span className={`mono pane-l${accent ? " on" : ""}`}>{label}</span>
      {children}
    </motion.div>
  );
}

export const imgBase = (slug: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/cases/${slug}`;

export function Crop({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img className={`crop ${className}`} src={src} alt={alt} loading="lazy" decoding="async" />;
}

/* A short ordered sequence: columns on desktop, a rail with one dot per step on a phone */
export function Steps({ items }: { items: [string, string][] }) {
  return (
    <motion.ol className="steps tl" style={{ ["--n" as string]: items.length }} {...view} transition={{ staggerChildren: 0.08 }}>
      {items.map(([a, b]) => (
        <motion.li key={a} variants={rise}>
          <b>{a}</b>
          <span className="small muted">{b}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

/* Big numbers in a frame; the label above says what kind of number they are */
export function Metrics({ label, items, caption }: { label: string; items: [string, string][]; caption: string }) {
  return (
    <figure className="frame-fig">
      <motion.div className="frame metrics-frame" {...view} transition={{ staggerChildren: 0.08 }}>
        <span className="mono pane-l">{label}</span>
        <div className="metrics" style={{ ["--n" as string]: items.length }}>
          {items.map(([a, b]) => (
            <motion.div key={a} variants={rise}>
              <span className="metric">{a}</span>
              <span className="small muted">{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <figcaption className="small muted">{caption}</figcaption>
    </figure>
  );
}

/* A looping film inside the case, same frame as the cover */
export function FilmFig({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="frame-fig tour-fig">
      <div className="cover film-cover"><CoverVideo src={src} poster={`${src}-poster.webp`} label={caption} /></div>
      <figcaption className="small muted">{caption}</figcaption>
    </figure>
  );
}

/* Short explanations in a grid: a small kicker, a bold line and one plain line. No boxes, no table. */
export function Notes({ label, items, caption, cols = 3 }: { label: string; items: [string, string, string][]; caption: string; cols?: number }) {
  return (
    <figure className="frame-fig">
      <motion.div className="frame notes-frame" {...view} transition={{ staggerChildren: 0.05 }}>
        <span className="mono pane-l">{label}</span>
        <ul className="notes" style={{ ["--n" as string]: cols }}>
          {items.map(([k, t, d]) => (
            <motion.li key={k + t} variants={rise}>
              {k && <span className="mono note-k">{k}</span>}
              <b>{t}</b>
              <span className="small muted">{d}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <figcaption className="small muted">{caption}</figcaption>
    </figure>
  );
}

/* A live Figma prototype, loaded only when it scrolls near; a link stays below for when embeds are blocked */
export function Proto({ src, href, label, caption, ratio = "16 / 10", open }: { src: string; href: string; label: string; caption: string; ratio?: string; open: string }) {
  return (
    <figure className="frame-fig">
      <div className="frame proto-frame">
        <span className="mono pane-l">{label}</span>
        <div className="proto" style={{ aspectRatio: ratio }}>
          <iframe src={src} title={label} loading="lazy" allowFullScreen />
        </div>
        <a className="proto-link small" href={href} target="_blank" rel="noopener noreferrer">{open} ↗</a>
      </div>
      <figcaption className="small muted">{caption}</figcaption>
    </figure>
  );
}

// A sitemap as a nested list. Strings starting with "!" are the problem spots (before) or the new doors (after).
export type TreeNode = string | [string, TreeNode[]];
export function Tree({ nodes, depth = 0 }: { nodes: TreeNode[]; depth?: number }) {
  return (
    <ul className={depth ? "tree sub" : "tree"}>
      {nodes.map((n, i) => {
        const [label, kids] = typeof n === "string" ? [n, null] : n;
        const hot = label.startsWith("!");
        const text = hot ? label.slice(1) : label;
        return (
          <li key={text + i} className={depth === 0 ? "top" : undefined}>
            <span className={hot ? "hot" : undefined}>{text}</span>
            {kids && <Tree nodes={kids} depth={depth + 1} />}
          </li>
        );
      })}
    </ul>
  );
}


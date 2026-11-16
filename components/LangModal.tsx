"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/data";

const EASE = [0.23, 1, 0.32, 1] as const;

// First visit only: asks which language to read the site in. Esc / outside click keeps the detected one.
export function LangModal({ open, lang, onChoose }: { open: boolean; lang: Lang; onChoose: (l: Lang) => void }) {
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    first.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onChoose(lang); };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open, lang, onChoose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="lm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.18 }} onClick={() => onChoose(lang)}>
          <motion.div
            className="lm-card" role="dialog" aria-modal="true" aria-label="Language / Idioma"
            initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }} transition={{ duration: 0.28, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="lm-t">Choose your language<span>Elige tu idioma</span></p>
            <div className="lm-b">
              {([["en", "English"], ["es", "Español"]] as const).map(([l, label], i) => (
                <motion.button key={l} ref={i === 0 ? first : undefined} type="button" className="lm-btn" data-on={l === lang} whileTap={{ scale: 0.97 }} onClick={() => onChoose(l)}>{label}</motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

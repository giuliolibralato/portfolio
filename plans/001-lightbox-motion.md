# 001 — Lightbox: zoom from the source, calmer exit, better close button

- **Status**: DONE
- **Commit**: b3b163f
- **Severity**: MEDIUM
- **Category**: Physicality & origin (+ easing, accessibility)
- **Estimated scope**: 2 files (`components/Lightbox.tsx`, `app/globals.css`), about 45 lines

## Problem

The viewer that opens when you click a figure image or film in a case page (`components/Lightbox.tsx`) fades the whole overlay in, and the picture just appears: it does not come from the thing you clicked, so the eye loses where it was. The exit is as slow as the entrance, and the close button has no motion of its own, is a pale 12% square with a thin 20 px X and no press state.

```tsx
// components/Lightbox.tsx:68-79 — current
<motion.div role="dialog" aria-modal="true" aria-label={label} className="lb"
  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
  onClick={(e) => { if (e.target === e.currentTarget) shut(); }}>
  <button ref={x} type="button" className="lb-x" aria-label={close} onClick={shut}><Close /></button>
  {item.video
    ? <video src={item.src} poster={item.poster} aria-label={item.alt} autoPlay={!reduce} muted loop playsInline controls />
    : <img src={item.src} alt={item.alt} />}
</motion.div>
```

```css
/* app/globals.css:482-485 — current */
.lb { position: fixed; inset: 0; z-index: 60; display: grid; place-items: center; padding: 56px 16px 16px; background: rgb(2 6 23 / 0.84); cursor: zoom-out; }
.lb img, .lb video { max-width: min(96vw, 1800px); max-height: calc(100vh - 80px); width: auto; height: auto; border-radius: 10px; background: var(--background); cursor: default; box-shadow: 0 24px 64px -16px rgb(0 0 0 / 0.6); }
.lb-x { position: absolute; top: 8px; right: 8px; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 12px; color: #fff; background: rgb(255 255 255 / 0.12); transition: background 150ms; }
@media (hover: hover) and (pointer: fine) { .lb-x:hover { background: rgb(255 255 255 / 0.22); } }
```

## Target

1. **Overlay:** opacity only. Enter 180 ms, exit 120 ms (the response snaps, the deliberate open takes longer). Curve `cubic-bezier(0.23, 1, 0.32, 1)`.
2. **Picture:** it grows from the rectangle of the element that was clicked to its final size, using `transform` and `opacity` only. Enter 280 ms with the same curve. Exit: opacity 0 and scale 0.97 in 120 ms (do not fly back, the source may have scrolled).
3. **Close button:** 44 px circle, 18 px X with a 2 px round stroke, a frosted chip (`rgb(255 255 255 / 0.14)` plus `backdrop-filter: blur(8px)`), fades and scales 0.9 → 1 in 160 ms after an 80 ms delay (so the picture arrives first), a pressed state `scale(0.94)` in 120 ms, a visible focus ring, and it respects the notch (`env(safe-area-inset-top)`).
4. **Reduced motion:** opacity only, no translate or scale, on every part.
5. **Scroll chaining:** `overscroll-behavior: contain` on the overlay.

## Repo conventions to follow

- Easing tokens: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` at `app/globals.css:7`. In JS the same curve is written inline as `[0.23, 1, 0.32, 1]` (see `components/Lightbox.tsx:70`, `components/CaseLayout.tsx` fades).
- Motion library is `motion/react` (`AnimatePresence`, `motion.*`, `useReducedMotion`). Hover motion is gated with `@media (hover: hover) and (pointer: fine)` (see `app/globals.css:485`).

## Steps

1. `components/Lightbox.tsx`: extend `Item` with the trigger rectangle and the media's natural size.
   ```tsx
   type Item = { video: boolean; src: string; alt: string; poster?: string; from: { cx: number; cy: number; w: number }; ratio: number };
   ```
   In `open(el)`, read `const b = el.getBoundingClientRect();` and the natural size (`videoWidth`/`videoHeight` for a video, `naturalWidth`/`naturalHeight` for an image; fall back to `b.width`/`b.height` when 0). Store `from: { cx: b.left + b.width / 2, cy: b.top + b.height / 2, w: b.width }` and `ratio: natW / natH`.
2. Add a helper above the hook that returns the start transform for the picture:
   ```tsx
   const ease = [0.23, 1, 0.32, 1] as const;
   function start(i: Item) {
     const vw = window.innerWidth, vh = window.innerHeight;
     const finalW = Math.min(i.ratio * (vh - 80), 0.96 * vw, 1800);
     return { x: i.from.cx - vw / 2, y: i.from.cy - (56 + (vh - 72) / 2), scale: Math.min(1, Math.max(0.2, i.from.w / finalW)) };
   }
   ```
3. Replace the overlay and media markup with motion elements (keep `role`, `aria-*`, the Esc and outside-click logic as is):
   ```tsx
   const t = reduce ? { duration: 0.12 } : { duration: 0.28, ease };
   <motion.div ... initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.18, ease } }} exit={{ opacity: 0, transition: { duration: 0.12, ease } }} ...>
     <motion.button ref={x} className="lb-x" ... initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.16, ease, delay: 0.08 } }}>
       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
     </motion.button>
     {item.video
       ? <motion.video ... initial={reduce ? { opacity: 0 } : { opacity: 0, ...start(item) }} animate={{ opacity: 1, x: 0, y: 0, scale: 1, transition: t }} exit={{ opacity: 0, scale: reduce ? 1 : 0.97, transition: { duration: 0.12, ease } }} />
       : <motion.img ... same three props />}
   </motion.div>
   ```
   Remove the now unused `Close` import if nothing else in the file uses it.
4. `app/globals.css`: replace the `.lb`, `.lb-x` rules (lines 482-485) with:
   ```css
   .lb { position: fixed; inset: 0; z-index: 60; display: grid; place-items: center; padding: 56px 16px 16px; background: rgb(2 6 23 / 0.84); cursor: zoom-out; overscroll-behavior: contain; }
   .lb-x { position: absolute; top: calc(8px + env(safe-area-inset-top)); right: 8px; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 999px; color: #fff; background: rgb(255 255 255 / 0.14); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); transition: background 150ms, transform 120ms var(--ease-out); }
   .lb-x:active { transform: scale(0.94); }
   .lb-x:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
   @media (hover: hover) and (pointer: fine) { .lb-x:hover { background: rgb(255 255 255 / 0.26); } }
   ```
   Keep the existing `.lb img, .lb video` rule exactly as it is.

## Boundaries

- Do NOT touch `useLightbox`'s click, keyboard, focus-return, scroll-lock or Esc logic.
- Do NOT animate width, height, top or left; only `transform` and `opacity` (plus the existing `background`/`transform` transitions on the button).
- Do NOT add dependencies or a shared-layout (`layoutId`) setup.
- Do NOT change which elements open the viewer (`SEL` in `components/Lightbox.tsx`).
- If the lines above no longer match, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` finishes with no type error and prerenders 16 pages.
- **Feel check**: open a case (`/work/beacon/`), click a figure image, a phone image and a film, and confirm:
  - the picture grows out of the thing you clicked, with no jump at the end, and the X arrives a beat later;
  - closing (X, outside click, Esc) is faster than opening, with no fly-back;
  - clicking another image right after closing never leaves a stuck overlay;
  - with "Reduce motion" on in the system settings, there is only a fade;
  - Tab reaches the X first, the white focus ring is visible, and pressing it shows the 0.94 squash;
  - on a phone width (375 px) the X sits below the notch and the picture is never cut off.
  - Record the screen and step through the first 300 ms frame by frame once.

# 002 — Demo film: smoother camera and pointer, 16:10, site splash intro, white-fade loop

- **Status**: DONE
- **Commit**: ac0a274
- **Severity**: HIGH (feel) · MEDIUM (pacing, loop)
- **Category**: Easing & duration, Physicality, Cohesion, Missed opportunities
- **Estimated scope**: `anon/film-site/record.py` and `anon/film-site/comp.html` rewritten (local only, gitignored)

## Problem

The first draft (4:5) was built on three things that read as slightly mechanical:

1. **Camera legs use `OM.ease.cubicInOut` over 1.4–1.8 s** (`comp.html` KEYS): in-out starts slow, so the move lags the pointer by about half a second, which reads as sluggish, not smooth.
   ```js
   {t:2.05, x:540,y:470,zoom:1.5, curve:ease.cubicInOut}, {t:14.4, x:560,y:830,zoom:1.3, curve:ease.cubicInOut}, {t:19.55,x:344,y:945,zoom:1.6, curve:ease.cubicInOut}
   ```
2. **The pointer is drawn by linearly interpolating mouse samples recorded in real time** (`handAt`): Playwright's round trips make the sample spacing uneven, so the pointer shows micro-jitter.
3. **Pacing**: every click is followed by 0.75–1.6 s of nothing, which makes the film 25 s for six interactions.
4. The film starts on a loaded page, has no intro and just stops at the end.

## Target

- **Camera:** each leg 0.9–1.1 s on `cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out, token `--ease-out` of the site), keyed 0.3 s before the pointer arrives. Zoom between 1.0 and 1.6 only.
- **Pointer:** rebuilt from the recorded waypoints with the same smootherstep + arc formula the recorder used to drive the mouse, so it is perfectly smooth and deterministic.
- **Pacing:** moves 0.5–0.9 s, waits 0.5–0.9 s after a click; about 18 s of interaction.
- **Format:** 16:10, 1920 × 1200, 30 fps, no sound.
- **Intro:** the site's own splash, recorded from page load: "giulio libralato — product designer" rises (0.7 s, `cubic-bezier(0.32, 0.72, 0, 1)`), holds 0.9 s and slides up while the page cascades in.
- **Loop:** the last 0.8 s fade the frame to white (`sstep`), and frame 0 is white too, so the splash starts again with no seam.
- Reduced motion does not apply (it is a video).

## Steps

1. `record.py`: viewport 2560 × 3200 with `html{zoom:2}` and `.app{min-height:1600px}.rail{height:1600px}` injected at document start; start the screencast before `goto`; log element rects and every move's waypoints.
2. `comp.html`: world 1280 × 1600, frame 1920 × 1200 (scale 1.5 at zoom 1); camera keys computed from the logged rects; pointer from waypoints; white fade over the last 0.8 s.
3. Render with `render.py --width 1920 --height 1200 --fps 30`.

## Boundaries

- Do NOT touch the site's code or its copy.
- Do NOT add sound or text overlays.
- Keep the film local (`anon/` is gitignored).

## Verification

- Contact sheet of 12 stills: splash legible, every zoom keeps its subject whole, the last frame is white.
- Frame-step the first and last 12 frames: they must match (white).
- Feel check: play at 100% and at 0.5×; the camera should arrive just before the pointer, never after.

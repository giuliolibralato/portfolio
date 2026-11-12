"use client";

import { useReducedMotion } from "motion/react";

// The case cover: a muted loop of the platform tour. The film carries its own ground, light and shadow,
// so it fills the cover edge to edge. With reduced motion it stays on the poster.
// `src` has no extension: a 60 fps AV1 .webm (the codecs string lets a browser without AV1 skip it)
// and an H.264 .mp4 fallback sit next to each other.
export function CoverVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="cover-film">
      <video poster={poster} autoPlay={!reduce} muted loop playsInline preload="metadata" aria-label={label}>
        <source src={`${src}.webm`} type='video/webm; codecs="av01.0.09M.10"' />
        <source src={`${src}.mp4`} type='video/mp4; codecs="avc1.64002A"' />
      </video>
    </div>
  );
}

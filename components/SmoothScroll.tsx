"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { getGsap } from "@/lib/gsap";

function LenisScrollTrigger() {
  const lenis = useLenis();

  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    if (!lenis) return;
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.15 }}>
      <LenisScrollTrigger />
      {children}
    </ReactLenis>
  );
}

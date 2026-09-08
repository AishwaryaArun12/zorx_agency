"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
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
  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.15 }}>
      <LenisScrollTrigger />
      {children}
    </ReactLenis>
  );
}

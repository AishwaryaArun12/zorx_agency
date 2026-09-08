"use client";

import { useEffect, useRef } from "react";
import { Wordmark } from "@/components/Wordmark";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Loader.module.css";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    const mark = markRef.current;
    const percent = percentRef.current;
    if (!root || !bar || !mark || !percent) return;

    const finish = () => {
      root.setAttribute("aria-hidden", "true");
      onComplete();
    };

    if (prefersReducedMotion()) {
      root.style.display = "none";
      finish();
      return;
    }

    const { gsap } = getGsap();
    const counter = { value: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: finish,
    });

    tl.fromTo(
      mark,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      0,
    )
      .to(
        bar,
        { scaleX: 1, duration: 1.35, ease: "power2.inOut" },
        0.15,
      )
      .to(
        counter,
        {
          value: 100,
          duration: 1.35,
          ease: "power2.inOut",
          onUpdate: () => {
            percent.textContent = `${Math.round(counter.value)}`;
          },
        },
        0.15,
      )
      .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.15");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className={styles.root} role="status" aria-label="Loading">
      <div className={styles.wipe} />
      <div ref={markRef} className={styles.brand}>
        <Wordmark color="green" size="lg" />
      </div>
      <div className={styles.meta}>
        <span>Dubai</span>
        <div className={styles.track}>
          <div ref={barRef} className={styles.bar} />
        </div>
        <span className={styles.percent}>
          <span ref={percentRef}>0</span>%
        </span>
      </div>
    </div>
  );
}

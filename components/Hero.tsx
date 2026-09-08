"use client";

import { useEffect, useRef } from "react";
import { usePageReady } from "@/components/AppShell";
import { getGsap, prefersReducedMotion, wrapChars, wrapWords } from "@/lib/gsap";
import styles from "./Hero.module.css";
import ModelScene from "./ModelScene";

export function Hero() {
  const ready = usePageReady();
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    const title = titleRef.current;
    const line = lineRef.current;
    const copy = copyRef.current;
    const cta = ctaRef.current;
    const visual = visualRef.current;
    if (!root || !title || !line || !copy || !cta || !visual) return;

    const { gsap } = getGsap();

    if (prefersReducedMotion()) {
      gsap.set([title, line, copy, cta, visual], { opacity: 1, y: 0 });
      return;
    }

    const chars = wrapChars(title);
    const words = wrapWords(line);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(chars, {
      yPercent: 110,
      opacity: 0,
      stagger: 0.045,
      duration: 0.9,
    })
      .from(words, { yPercent: 100, stagger: 0.05, duration: 0.7 }, "-=0.45")
      .from(copy, { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
      .from(cta, { y: 16, opacity: 0, duration: 0.6 }, "-=0.45")
      .from(visual, { scale: 1.12, opacity: 0, duration: 1.2 }, 0.15);

    gsap.to(visual, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, [ready]);

  return (
    <section id="top" ref={rootRef} className={styles.hero}>
      <div className={styles.grid} />
      <div ref={visualRef} className={styles.orb} aria-hidden="true">
        <div style={{ width: "100%", height: "100%" }}>
          <ModelScene />
        </div>
      </div>
      <div className={styles.inner}>
        <p className={styles.kicker}>Digital Marketing Agency · Dubai</p>
        <h1 ref={titleRef} className={styles.title}>
          ZORX
        </h1>
        <p ref={lineRef} className={styles.tagline}>
          Fueling Brands Growth
        </p>
        <p ref={copyRef} className={styles.copy}>
          A performance-minded creative studio building brands that move with
          intent — across media, product, and culture in the Gulf.
        </p>
        <a ref={ctaRef} className={styles.cta} href="#contact">
          Let&apos;s Work Together
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}

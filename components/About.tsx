"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion, fadeUpIn, slideWordsIn } from "@/lib/gsap";
import styles from "./About.module.css";

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const heading = headingRef.current;
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!root || !heading || !frame || !image) return;

    const { gsap } = getGsap();
    slideWordsIn(heading);
    fadeUpIn(root, root.querySelectorAll("[data-reveal]"), { stagger: 0.12 });

    if (prefersReducedMotion()) return;

    gsap.fromTo(
      frame,
      { clipPath: "inset(12% 12% 12% 12%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: frame, start: "top 78%", once: true },
      },
    );

    gsap.fromTo(
      image,
      { scale: 1.18 },
      {
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: frame, start: "top 78%", once: true },
      },
    );

    gsap.to(image, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="about" ref={rootRef} className={styles.section}>
      <div className={styles.copy}>
        <p className={styles.index} data-reveal>
          01 — About
        </p>
        <h2 ref={headingRef} className={styles.heading}>
          Dubai-based. Built for brands that want more than noise.
        </h2>
        <p className={styles.body} data-reveal>
          ZORX is a digital marketing agency in Dubai working at the
          intersection of creativity, analytics, and technology. We help
          ambitious companies look inevitable — then prove it in the numbers.
        </p>
        <p className={styles.body} data-reveal>
          From first impression to always-on performance, we design systems
          that compound: sharper brand, cleaner digital product, and media that
          actually earns its spend.
        </p>
      </div>
      <div ref={frameRef} className={styles.frame}>
        <div ref={imageRef} className={styles.visual} aria-hidden="true">
          <span>DXB</span>
        </div>
        <p className={styles.caption}>Gulf time. Global craft.</p>
      </div>
    </section>
  );
}

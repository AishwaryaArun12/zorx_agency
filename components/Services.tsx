"use client";

import { useEffect, useRef } from "react";
import { usePageReady } from "@/components/AppShell";
import { services } from "@/lib/content";
import { serviceCardScroll } from "@/animations/services";
import { fadeUpIn, getGsap, prefersReducedMotion, slideWordsIn } from "@/lib/gsap";
import styles from "./Services.module.css";
import { Service3D } from "./Service3D";

export function Services() {
  const ready = usePageReady();
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    const heading = headingRef.current;
    if (!root || !heading) return;
    slideWordsIn(heading);
    fadeUpIn(root, root.querySelectorAll("[data-card]"));

    if (prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    const tweens = cards.map((card, index) =>
      gsap.fromTo(
        card,
        { y: 90 + index * 18, z: -220 - index * 35, rotateX: 9, opacity: 0.45 },
        {
          y: 0,
          z: 0,
          rotateX: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: serviceCardScroll.start,
            end: serviceCardScroll.end,
            scrub: true,
          },
        },
      ),
    );

    return () => tweens.forEach((tween) => tween.scrollTrigger?.kill());
  }, [ready]);

  return (
    <section id="services" ref={rootRef} className={styles.section}>
      <div className={styles.head}>
        <p className={styles.index}>02 — Services</p>
        <h2 ref={headingRef} className={styles.heading}>
          Everything a growing brand needs to compete in Dubai.
        </h2>
      </div>
      <ul className={styles.grid}>
        {services.map((service) => (
            <Service3D
              key={service.index}
              index={service.index}
              title={service.title}
              copy={service.copy}
              className={styles.card}
              numClassName={styles.num}
            />
        ))}
      </ul>
    </section>
  );
}

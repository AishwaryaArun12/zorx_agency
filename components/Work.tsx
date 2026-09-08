"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/content";
import { getGsap, prefersReducedMotion, fadeUpIn, slideWordsIn } from "@/lib/gsap";
import styles from "./Work.module.css";

export function Work() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const heading = headingRef.current;
    if (!root || !heading) return;
    const { gsap } = getGsap();
    slideWordsIn(heading);
    const cards = root.querySelectorAll("[data-card]");
    fadeUpIn(root, cards, { stagger: 0.1 });
    if (prefersReducedMotion()) return;
    cards.forEach((card) => {
      const media = card.querySelector("[data-media]");
      if (media) {
        gsap.fromTo(
          media,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    });
  }, []);

  return (
    <section id="work" ref={rootRef} className={styles.section}>
      <div className={styles.head}>
        <p className={styles.index}>04 — Selected work</p>
        <h2 ref={headingRef} className={styles.heading}>
          Campaigns, products, and identities with a pulse.
        </h2>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.title} data-card className={styles.card}>
            <div className={`${styles.media} ${styles[project.tone]}`}>
              <div data-media className={styles.art} />
              <div className={styles.hover}>
                <p>{project.metric}</p>
                <span>View case</span>
              </div>
            </div>
            <div className={styles.meta}>
              <h3>{project.title}</h3>
              <p>
                {project.category}
                <span> · {project.year}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

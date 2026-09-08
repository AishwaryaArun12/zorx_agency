"use client";

import { useEffect, useRef } from "react";
import { services } from "@/lib/content";
import { fadeUpIn, slideWordsIn } from "@/lib/gsap";
import styles from "./Services.module.css";

export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const heading = headingRef.current;
    if (!root || !heading) return;
    slideWordsIn(heading);
    fadeUpIn(root, root.querySelectorAll("[data-card]"));
  }, []);

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
          <li key={service.index} data-card className={styles.card}>
            <span className={styles.num}>{service.index}</span>
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

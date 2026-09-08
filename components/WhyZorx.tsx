"use client";

import { useEffect, useRef } from "react";
import { usePageReady } from "@/components/AppShell";
import { reasons } from "@/lib/content";
import { fadeUpIn, slideWordsIn } from "@/lib/gsap";
import styles from "./WhyZorx.module.css";

export function WhyZorx() {
  const ready = usePageReady();
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    const heading = headingRef.current;
    if (!root || !heading) return;
    slideWordsIn(heading);
    fadeUpIn(root, root.querySelectorAll("[data-item]"), { x: 0 });
  }, [ready]);

  return (
    <section id="why" ref={rootRef} className={styles.section}>
      <div className={styles.head}>
        <p className={styles.index}>03 — Why ZORX</p>
        <h2 ref={headingRef} className={styles.heading}>
          Creative firepower with a commercial backbone.
        </h2>
      </div>
      <ol className={styles.list}>
        {reasons.map((reason, i) => (
          <li key={reason.title} data-item className={styles.item}>
            <span>0{i + 1}</span>
            <div>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

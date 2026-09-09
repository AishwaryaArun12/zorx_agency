"use client";

import { useEffect, useRef } from "react";
import { usePageReady } from "@/components/AppShell";
import { projects } from "@/lib/content";
import { portfolioMediaScroll } from "@/animations/portfolio";
import { getGsap, prefersReducedMotion, fadeUpIn, slideWordsIn } from "@/lib/gsap";
import styles from "./Work.module.css";

export function Work() {
  const ready = usePageReady();
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    const heading = headingRef.current;
    if (!root || !heading) return;
    const { gsap } = getGsap();
    slideWordsIn(heading);
    const cards = root.querySelectorAll("[data-card]");
    fadeUpIn(root, cards, { stagger: 0.1 });
    if (prefersReducedMotion()) return;
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      const cardIndex = Array.from(cards).indexOf(card);
      const media = card.querySelector("[data-media]");
      gsap.fromTo(
        cardElement,
        { y: 80 + (cardIndex % 2) * 28, rotateX: 8, scale: 0.94 },
        {
          y: 0,
          rotateX: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardElement,
            start: "top 94%",
            end: "top 48%",
            scrub: 0.6,
          },
        },
      );
      if (media) {
        gsap.fromTo(
          media,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: portfolioMediaScroll.start,
              end: portfolioMediaScroll.end,
              scrub: true,
            },
          },
        );
      }

      const mediaElement = media as HTMLElement | null;
      const artElement = card.querySelector("[data-media]") as HTMLElement | null;
      const moveCardX = gsap.quickTo(cardElement, "rotateY", { duration: 0.55, ease: "power3.out" });
      const moveCardY = gsap.quickTo(cardElement, "rotateX", { duration: 0.55, ease: "power3.out" });
      const moveArtX = artElement ? gsap.quickTo(artElement, "x", { duration: 0.8, ease: "power3.out" }) : null;
      const moveArtY = artElement ? gsap.quickTo(artElement, "y", { duration: 0.8, ease: "power3.out" }) : null;
      const onMove = (event: Event) => {
        const pointer = event as PointerEvent;
        const bounds = cardElement.getBoundingClientRect();
        const x = (pointer.clientX - bounds.left) / bounds.width - 0.5;
        const y = (pointer.clientY - bounds.top) / bounds.height - 0.5;
        moveCardX(x * 7);
        moveCardY(y * -7);
        moveArtX?.(x * -18);
        moveArtY?.(y * -18);
        mediaElement?.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
        mediaElement?.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
      };
      const onLeave = () => {
        moveCardX(0);
        moveCardY(0);
        moveArtX?.(0);
        moveArtY?.(0);
      };
      cardElement.addEventListener("pointermove", onMove);
      cardElement.addEventListener("pointerleave", onLeave);
      cardElement.addEventListener("pointercancel", onLeave);
      cleanups.push(() => {
        cardElement.removeEventListener("pointermove", onMove);
        cardElement.removeEventListener("pointerleave", onLeave);
        cardElement.removeEventListener("pointercancel", onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [ready]);

  return (
    <section id="work" ref={rootRef} className={styles.section}>
      <div className={styles.head}>
        <p className={styles.index}>04 — Selected work</p>
        <h2 ref={headingRef} className={styles.heading}>
          Campaigns, products, and identities with a pulse.
        </h2>
      </div>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <article key={project.title} data-card className={styles.card}>
            <div className={`${styles.media} ${styles[project.tone]}`}>
              <span className={styles.cardIndex}>0{index + 1}</span>
              <div data-media className={styles.art} />
              <div className={styles.scanline} />
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

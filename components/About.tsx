"use client";

import { useEffect, useRef } from "react";
import { usePageReady } from "@/components/AppShell";
import { getGsap, prefersReducedMotion, fadeUpIn, slideWordsIn } from "@/lib/gsap";
import styles from "./About.module.css";

export function About() {
  const ready = usePageReady();
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    const heading = headingRef.current;
    const frame = frameRef.current;
    const image = imageRef.current;
    const copyColumn = copyRef.current;
    if (!root || !heading || !frame || !image || !copyColumn) return;

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
      rotateZ: 3,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    const moveFrameX = gsap.quickTo(frame, "rotateY", { duration: 0.8, ease: "power3.out" });
    const moveFrameY = gsap.quickTo(frame, "rotateX", { duration: 0.8, ease: "power3.out" });
    const moveImageX = gsap.quickTo(image, "x", { duration: 1, ease: "power3.out" });
    const moveImageY = gsap.quickTo(image, "y", { duration: 1, ease: "power3.out" });
    const onPointerMove = (event: PointerEvent) => {
      const bounds = frame.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      moveFrameX(x * 4.5);
      moveFrameY(y * -4.5);
      moveImageX(x * -7);
      moveImageY(y * -7);
    };
    const onPointerLeave = () => {
      moveFrameX(0);
      moveFrameY(0);
      moveImageX(0);
      moveImageY(0);
    };

    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);

    gsap.fromTo(
      copyColumn,
      { y: 28, rotateX: 3, opacity: 0.55 },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          end: "top 42%",
          scrub: 0.7,
        },
      },
    );

    return () => {
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [ready]);

  return (
    <section id="about" ref={rootRef} className={styles.section}>
      <div ref={copyRef} className={styles.copy}>
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
          <div className={styles.prismPlane} />
          <div className={styles.prismPlaneBack} />
          <div className={styles.prismOrbit} />
          <div className={styles.prismCore}>
            <span className={styles.visualWord}>DXB</span>
            <span className={styles.coreLine}>CREATIVE / PERFORMANCE</span>
          </div>
          <span className={styles.visualCoordinates}>25°N / 55°E</span>
          <span className={styles.visualSignal}>ZORX / 01</span>
        </div>
      </div>
    </section>
  );
}

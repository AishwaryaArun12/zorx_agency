"use client";

import { useEffect, useRef } from "react";
import { usePageReady } from "@/components/AppShell";
import { getGsap, prefersReducedMotion, wrapChars, wrapWords } from "@/lib/gsap";
import { heroScroll } from "@/animations/hero";
import styles from "./Hero.module.css";
import { Hero3D } from "./Hero3D";

export function Hero() {
  const ready = usePageReady();
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualMotionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbitOneRef = useRef<HTMLDivElement>(null);
  const orbitTwoRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    const title = titleRef.current;
    const line = lineRef.current;
    const copy = copyRef.current;
    const cta = ctaRef.current;
    const visual = visualRef.current;
    const visualMotion = visualMotionRef.current;
    const grid = gridRef.current;
    const orbitOne = orbitOneRef.current;
    const orbitTwo = orbitTwoRef.current;
    const inner = innerRef.current;
    if (!root || !title || !line || !copy || !cta || !visual || !visualMotion || !grid || !orbitOne || !orbitTwo || !inner) return;

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
      .from(visual, { scale: 0.62, rotate: -18, opacity: 0, duration: 1.35 }, 0.15);

    const scrollTweens = [
      gsap.to(visual, {
        yPercent: 42,
        rotate: 24,
        scale: 1.28,
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: heroScroll.start,
          end: heroScroll.end,
          scrub: 0.35,
        },
      }),
      gsap.to(inner, {
        yPercent: -34,
        rotateX: -14,
        rotateY: 5,
        opacity: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: heroScroll.start,
          end: heroScroll.end,
          scrub: 0.35,
        },
      }),
      gsap.to(grid, {
        yPercent: 42,
        scale: 1.42,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: heroScroll.start,
          end: heroScroll.end,
          scrub: 0.35,
        },
      }),
      gsap.to(orbitOne, {
        yPercent: 34,
        rotate: 28,
        scale: 1.22,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: heroScroll.start,
          end: heroScroll.end,
          scrub: 0.35,
        },
      }),
      gsap.to(orbitTwo, {
        yPercent: -28,
        rotate: -34,
        scale: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: heroScroll.start,
          end: heroScroll.end,
          scrub: 0.35,
        },
      }),
    ];

    const moveVisualX = gsap.quickTo(visualMotion, "x", { duration: 1.1, ease: "power3.out" });
    const moveVisualY = gsap.quickTo(visualMotion, "y", { duration: 1.1, ease: "power3.out" });
    const moveGridX = gsap.quickTo(grid, "x", { duration: 1.6, ease: "power3.out" });
    const moveGridY = gsap.quickTo(grid, "y", { duration: 1.6, ease: "power3.out" });
    const moveInnerX = gsap.quickTo(inner, "x", { duration: 1.25, ease: "power3.out" });
    const moveInnerY = gsap.quickTo(inner, "y", { duration: 1.25, ease: "power3.out" });
    const moveOrbitOneX = gsap.quickTo(orbitOne, "x", { duration: 1.25, ease: "power3.out" });
    const moveOrbitOneY = gsap.quickTo(orbitOne, "y", { duration: 1.25, ease: "power3.out" });
    const moveOrbitOneRotation = gsap.quickTo(orbitOne, "rotation", { duration: 1.25, ease: "power3.out" });
    const moveOrbitTwoX = gsap.quickTo(orbitTwo, "x", { duration: 1.45, ease: "power3.out" });
    const moveOrbitTwoY = gsap.quickTo(orbitTwo, "y", { duration: 1.45, ease: "power3.out" });
    const moveOrbitTwoRotation = gsap.quickTo(orbitTwo, "rotation", { duration: 1.45, ease: "power3.out" });
    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      moveVisualX(x * 34);
      moveVisualY(y * 28);
      moveGridX(x * -22);
      moveGridY(y * -16);
      moveInnerX(x * -14);
      moveInnerY(y * -9);
      root.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      root.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);

      moveOrbitOneX(x * 48);
      moveOrbitOneY(y * 32);
      moveOrbitOneRotation(x * 18 - 25);
      moveOrbitTwoX(x * -34);
      moveOrbitTwoY(y * -24);
      moveOrbitTwoRotation(x * -24 + 62);
    };
    const onPointerLeave = () => {
      moveVisualX(0);
      moveVisualY(0);
      moveGridX(0);
      moveGridY(0);
      moveInnerX(0);
      moveInnerY(0);
      moveOrbitOneX(0);
      moveOrbitOneY(0);
      moveOrbitOneRotation(-25);
      moveOrbitTwoX(0);
      moveOrbitTwoY(0);
      moveOrbitTwoRotation(62);
    };

    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);

    return () => {
      tl.kill();
      scrollTweens.forEach((tween) => tween.scrollTrigger?.kill());
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [ready]);

  return (
    <section id="top" ref={rootRef} className={styles.hero}>
      <div ref={gridRef} className={styles.grid} />
      <div className={styles.spotlight} aria-hidden="true" />
      <div ref={orbitOneRef} className={`${styles.orbit} ${styles.orbitOne}`} aria-hidden="true" />
      <div ref={orbitTwoRef} className={`${styles.orbit} ${styles.orbitTwo}`} aria-hidden="true" />
      <div className={styles.heroTopline}>
        <span>01 / 05</span>
        <span>Independent creative studio</span>
      </div>
      <div ref={visualRef} className={styles.orb} aria-hidden="true">
        <div ref={visualMotionRef} className={styles.orbCore}>
          <div style={{ width: "100%", height: "100%" }}>
            <Hero3D />
          </div>
        </div>
      </div>
      <div className={styles.signal} aria-hidden="true">
        <span>LIVE / 01</span>
        <i />
        <span>DXB 25°N</span>
      </div>
      <div className={styles.dataPanel} aria-hidden="true">
        <span className={styles.dataLabel}>Brand velocity</span>
        <strong>+240%</strong>
        <span className={styles.dataNote}>attention / culture / growth</span>
        <i />
      </div>
      <div ref={innerRef} className={styles.inner}>
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

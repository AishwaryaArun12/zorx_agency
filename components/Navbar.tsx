"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { navLinks } from "@/lib/content";
import { getGsap } from "@/lib/gsap";
import styles from "./Navbar.module.css";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const { gsap } = getGsap();

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current && y > 80;
      gsap.to(nav, {
        y: goingDown ? -120 : 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
      nav.classList.toggle(styles.scrolled, y > 24);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header ref={navRef} className={styles.header}>
      <a href="#top" className={styles.logo} onClick={() => setOpen(false)}>
        <Wordmark showTagline={false} />
      </a>
      <nav className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Primary">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.link}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className={styles.cta}
          onClick={() => setOpen(false)}
        >
          Let&apos;s Work Together
        </a>
      </nav>
      <button
        type="button"
        className={styles.menu}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

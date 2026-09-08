"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { contact } from "@/lib/content";
import { slideWordsIn } from "@/lib/gsap";
import styles from "./Cta.module.css";

export function Cta() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    slideWordsIn(heading);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const message = String(data.get("message") ?? "");
    const text = encodeURIComponent(
      `Hello ZORX, I'm ${name}. ${message}`.trim(),
    );
    window.open(`${contact.whatsapp}?text=${text}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <section id="contact" ref={rootRef} className={styles.section}>
      <p className={styles.index}>05 — Start a project</p>
      <h2 ref={headingRef} className={styles.heading}>
        Let&apos;s grow your brand
      </h2>
      <p className={styles.lead}>
        Tell us where the brand is today. We&apos;ll come back with a clear next
        move — usually within one business day.
      </p>
      <form className={styles.form} onSubmit={onSubmit}>
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required placeholder="you@brand.com" />
        </label>
        <label className={styles.full}>
          What are we building?
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Brand, website, performance, or all of it."
          />
        </label>
        <button type="submit">
          {sent ? "Opening WhatsApp" : "Let's Work Together"}
        </button>
      </form>
      <a className={styles.alt} href={contact.whatsapp} target="_blank" rel="noreferrer">
        Or message us on WhatsApp
      </a>
    </section>
  );
}

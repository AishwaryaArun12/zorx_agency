"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function wrapChars(el: HTMLElement) {
  if (el.dataset.split === "chars") {
    return Array.from(el.querySelectorAll<HTMLSpanElement>(".anim-char"));
  }
  el.dataset.split = "chars";
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);

  const chars: HTMLSpanElement[] = [];
  for (const character of text) {
    const span = document.createElement("span");
    span.className = "anim-char";
    span.setAttribute("aria-hidden", "true");
    span.textContent = character === " " ? "\u00A0" : character;
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

export function wrapWords(el: HTMLElement) {
  if (el.dataset.split === "words") {
    return Array.from(el.querySelectorAll<HTMLSpanElement>(".anim-word"));
  }
  el.dataset.split = "words";
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);

  const words: HTMLSpanElement[] = [];
  for (const word of text.split(" ")) {
    const outer = document.createElement("span");
    outer.className = "anim-word-wrap";
    const inner = document.createElement("span");
    inner.className = "anim-word";
    inner.setAttribute("aria-hidden", "true");
    inner.textContent = word;
    outer.appendChild(inner);
    el.appendChild(outer);
    el.appendChild(document.createTextNode(" "));
    words.push(inner);
  }
  return words;
}

export function slideWordsIn(heading: HTMLElement) {
  const words = wrapWords(heading);
  const { gsap, ScrollTrigger } = getGsap();
  if (prefersReducedMotion() || !words.length) return;

  const tween = gsap.fromTo(
    words,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 0.9,
      stagger: 0.04,
      ease: "power3.out",
      paused: true,
      immediateRender: false,
    },
  );

  const play = () => {
    if (tween.progress() < 1) tween.play();
  };

  ScrollTrigger.create({
    trigger: heading,
    start: "top 90%",
    once: true,
    onEnter: play,
    onRefresh: (self) => {
      if (self.start !== undefined && window.innerHeight + window.scrollY >= self.start) {
        play();
      }
    },
  });
}

export function fadeUpIn(trigger: Element, targets: gsap.TweenTarget, vars?: gsap.TweenVars) {
  const { gsap, ScrollTrigger } = getGsap();
  if (prefersReducedMotion()) return;

  const tween = gsap.fromTo(
    targets,
    { y: 40 },
    {
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
      paused: true,
      immediateRender: false,
      ...vars,
    },
  );

  const play = () => {
    if (tween.progress() === 0 && tween.paused()) tween.play();
  };
  ScrollTrigger.create({
    trigger,
    start: "top 86%",
    once: true,
    onEnter: play,
    onRefresh: (self) => {
      if (self.start !== undefined && window.innerHeight + window.scrollY >= self.start) {
        play();
      }
    },
  });
}

export function revealFromBelow(
  trigger: Element,
  targets: gsap.TweenTarget,
  options?: { delay?: number; stagger?: number; start?: string },
) {
  const { gsap } = getGsap();
  if (prefersReducedMotion()) {
    gsap.set(targets, { y: 0, opacity: 1, clearProps: "transform" });
    return;
  }

  gsap.fromTo(
    targets,
    { y: 48, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.08,
      immediateRender: false,
      scrollTrigger: {
        trigger,
        start: options?.start ?? "top 82%",
        once: true,
      },
    },
  );
}

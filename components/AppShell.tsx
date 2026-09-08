"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Loader } from "@/components/Loader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getGsap } from "@/lib/gsap";

const ReadyContext = createContext(false);

export function usePageReady() {
  return useContext(ReadyContext);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);
  const value = useMemo(() => ready, [ready]);

  useEffect(() => {
    if (!ready) return;
    const { ScrollTrigger } = getGsap();
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(timer);
  }, [ready]);

  return (
    <ReadyContext.Provider value={value}>
      <Loader onComplete={onComplete} />
      <SmoothScroll>{children}</SmoothScroll>
    </ReadyContext.Provider>
  );
}

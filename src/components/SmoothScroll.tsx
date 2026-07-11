"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Sync Lenis with GSAP ScrollTrigger
    const update = (time: number) => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(update);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    // Refresh ScrollTrigger at key points to catch any layout shifts
    const timers = [
      setTimeout(() => ScrollTrigger.refresh(), 500),
      setTimeout(() => ScrollTrigger.refresh(), 1000),
      setTimeout(() => ScrollTrigger.refresh(), 2000),
      setTimeout(() => ScrollTrigger.refresh(), 4000),
    ];

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("load", handleLoad);
      timers.forEach(clearTimeout);
    };
  }, []);

 return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

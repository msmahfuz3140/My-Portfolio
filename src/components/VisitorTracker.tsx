"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Silently tracks page visits — no UI, just fires POST /api/analytics on mount.
 * Placed in layout.tsx so it runs on every page load.
 */
export default function VisitorTracker() {
  const pathname = usePathname();
  const hasFired = useRef(false);

  useEffect(() => {
    // Only fire once per page load (React StrictMode double-invoke guard)
    if (hasFired.current) return;
    hasFired.current = true;

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
    }).catch(() => {
      // Silently ignore — analytics failure should never break the site
    });
  }, [pathname]);

  return null;
}

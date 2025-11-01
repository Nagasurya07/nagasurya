"use client";
import { useEffect } from "react";

// Small client-only fix to remove known extension-injected classes from <html>
// and keep the DOM consistent after hydration. This is deliberately minimal
// and only touches classes if present.
export default function ClientHydrationFix() {
  useEffect(() => {
    try {
      const html = document.documentElement;
      // common extension added class seen in some dev setups
      const suspect = "fusion-extension-loaded";
      if (html.classList.contains(suspect)) {
        html.classList.remove(suspect);
      }
    } catch (e) {
      // ignore in environments without document
    }
  }, []);

  return null;
}

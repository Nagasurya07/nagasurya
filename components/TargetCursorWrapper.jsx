"use client";

import dynamic from "next/dynamic";

// Import TargetCursor with SSR disabled to prevent hydration errors
const TargetCursor = dynamic(() => import("./TargetCursor"), {
  ssr: false,
});

export default function TargetCursorWrapper({ targetSelector, spinDuration, hideDefaultCursor }) {
  return (
    <TargetCursor 
      targetSelector={targetSelector} 
      spinDuration={spinDuration} 
      hideDefaultCursor={hideDefaultCursor} 
    />
  );
}

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function EdgeGlow() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch — render nothing until mounted
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[50]"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  // Orange colors — swap these for your exact brand orange
  // Default: Tailwind orange-500 (#f97316) light / orange-600 (#ea580c) dark
  const glowColor = isDark ? "234, 88, 12" : "249, 115, 22";
  const opacity = isDark ? 0.2 : 0.14;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[50]"
      style={{
        // Top glow
        background: `
          radial-gradient(ellipse 100% 60% at 50% 0%, rgba(${glowColor}, ${opacity}) 0%, transparent 60%),
          radial-gradient(ellipse 100% 60% at 50% 100%, rgba(${glowColor}, ${opacity}) 0%, transparent 60%),
          radial-gradient(ellipse 60% 100% at 0% 50%, rgba(${glowColor}, ${opacity * 0.5}) 0%, transparent 60%),
          radial-gradient(ellipse 60% 100% at 100% 50%, rgba(${glowColor}, ${opacity * 0.5}) 0%, transparent 60%)
        `,
      }}
    />
  );
}
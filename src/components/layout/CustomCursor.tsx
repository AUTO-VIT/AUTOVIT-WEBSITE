"use client";

import { useEffect, useState } from "react";

import {
  motion,
  useSpring,
} from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);

  const cursorX = useSpring(0, {
    damping: 20,
    stiffness: 250,
  });

  const cursorY = useSpring(0, {
    damping: 20,
    stiffness: 250,
  });

  const dotX = useSpring(0, {
    damping: 25,
    stiffness: 350,
  });

  const dotY = useSpring(0, {
    damping: 25,
    stiffness: 350,
  });

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);

      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    window.addEventListener("mousemove", moveCursor);

    return () =>
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
  }, [cursorX, cursorY, dotX, dotY]);

  if (!mounted) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="
        fixed top-0 left-0
        w-10 h-10
        rounded-full
        pointer-events-none
        z-[9999]
        hidden md:block

        border border-red-600/40
        dark:border-red-500/60

        bg-red-600/5
        dark:bg-red-500/10

        backdrop-blur-sm

        shadow-[0_0_18px_rgba(220,38,38,0.25)]
        dark:shadow-[0_0_24px_rgba(220,38,38,0.45)]
        "
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="
        fixed top-0 left-0
        w-2 h-2
        bg-red-600
        rounded-full
        pointer-events-none
        z-[9999]
        hidden md:block

        shadow-[0_0_12px_rgba(220,38,38,0.8)]
        dark:shadow-[0_0_16px_rgba(220,38,38,1)]
        "
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}

"use client";

import { useEffect } from "react";

export default function ChunkErrorListener() {
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      const message = e.message || "";
      if (
        message.indexOf("ChunkLoadError") !== -1 ||
        message.indexOf("Loading chunk") !== -1
      ) {
        console.warn("ChunkLoadError detected, reloading page...", e);
        window.location.reload();
      }
    };

    window.addEventListener("error", handleError, true);
    return () => window.removeEventListener("error", handleError, true);
  }, []);

  return null;
}

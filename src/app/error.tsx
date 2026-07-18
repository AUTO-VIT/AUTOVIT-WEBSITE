"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center px-6 text-center relative overflow-hidden font-rajdhani">
      {/* Ambient glow */}
      <div className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <h1 className="font-orbitron text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
          Oops
        </h1>
        <p className="text-red-600 font-bold uppercase tracking-widest text-sm">
          Something went wrong
        </p>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-base">
          An unexpected error occurred. Please try again or refresh the page.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <button
            onClick={reset}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest rounded-sm transition-all"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 py-3 border border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white font-bold uppercase tracking-widest rounded-sm transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

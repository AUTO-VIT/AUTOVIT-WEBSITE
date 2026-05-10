"use client";

import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";

import {
  AlertCircle,
  Lock,
} from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // Admin Email Guard
    if (
      email !== "it.autovit22@gmail.com"
    ) {
      setError(
        "Unauthorized access attempt. This portal is restricted."
      );

      return;
    }

    setLoading(true);

    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (err: any) {
      setError(
        "Invalid credentials. Please try again."
      );

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
      relative
      min-h-screen

      bg-white dark:bg-black

      font-rajdhani

      transition-colors duration-500

      overflow-hidden
      "
    >
      {/* Ambient Glow */}
      <div
        className="
        absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2

        w-[700px] h-[700px]

        bg-red-600/10

        rounded-full

        blur-3xl

        pointer-events-none
        "
      ></div>

      <div
        className="
        min-h-screen

        flex items-center justify-center

        px-6
        pt-20

        relative z-10
        "
      >
        {/* Card */}
        <div
          className="
          max-w-md
          w-full

          bg-white/80 dark:bg-zinc-900/80

          backdrop-blur-md

          p-12

          rounded-3xl

          shadow-2xl

          border border-gray-200 dark:border-zinc-700

          relative overflow-hidden

          group

          transition-colors duration-500
          "
        >
          {/* Left Accent */}
          <div
            className="
            absolute top-0 left-0

            w-1.5 h-full

            bg-red-600
            "
          ></div>

          {/* Header */}
          <div
            className="
            flex flex-col
            items-center

            gap-6

            mb-12
            "
          >
            {/* Icon */}
            <div
              className="
              w-20 h-20

              bg-zinc-900 dark:bg-black

              flex items-center justify-center

              rounded-2xl

              border border-zinc-800

              shadow-[0_0_25px_rgba(90,18,18,0.15)]

              group-hover:bg-red-600

              transition-all duration-500
              "
            >
              <Lock
                className="
                text-white

                w-10 h-10
                "
              />
            </div>

            {/* Title */}
            <div
              className="
              text-center

              space-y-2
              "
            >
              <h1
                className="
                font-orbitron

                text-4xl

                font-black

                uppercase
                tracking-tighter

                text-gray-900 dark:text-white
                "
              >
                ADMIN LOGIN
              </h1>

              <p
                className="
                text-red-600

                text-[10px]

                font-black

                uppercase

                tracking-[0.4em]

                drop-shadow-[0_0_10px_rgba(90,18,18,0.5)]
                "
              >
                AUTOVIT CONTROL PORTAL
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="space-y-8"
          >
            {/* Email */}
            <div className="space-y-2">
              
              <label
                className="
                text-[10px]

                font-black

                uppercase
                tracking-widest

                text-gray-400 dark:text-gray-500
                "
              >
                EMAIL ADDRESS
              </label>

              <input
                required
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                w-full

                bg-gray-50 dark:bg-zinc-800

                border border-gray-200 dark:border-zinc-700

                px-8 py-5

                rounded-xl

                focus:outline-none
                focus:border-red-600
                focus:ring-2 focus:ring-red-600/20

                transition-all

                font-bold

                text-gray-900 dark:text-white
                "
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              
              <label
                className="
                text-[10px]

                font-black

                uppercase
                tracking-widest

                text-gray-400 dark:text-gray-500
                "
              >
                PASSWORD
              </label>

              <input
                required
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                w-full

                bg-gray-50 dark:bg-zinc-800

                border border-gray-200 dark:border-zinc-700

                px-8 py-5

                rounded-xl

                focus:outline-none
                focus:border-red-600
                focus:ring-2 focus:ring-red-600/20

                transition-all

                font-bold

                text-gray-900 dark:text-white
                "
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="
                bg-red-50 dark:bg-red-600/10

                text-red-600

                p-5

                rounded-xl

                border border-red-600/20

                flex items-center gap-4

                animate-fade-in
                "
              >
                <AlertCircle size={20} />

                <span
                  className="
                  text-[10px]

                  font-black

                  uppercase

                  tracking-widest
                  "
                >
                  {error}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              disabled={loading}
              type="submit"
              className="
              w-full

              bg-red-600
              hover:bg-red-700

              py-6

              text-white

              uppercase

              font-black

              tracking-[0.3em]

              text-xs

              rounded-xl

              shadow-[0_0_25px_rgba(90,18,18,0.3)]
              hover:shadow-[0_0_35px_rgba(90,18,18,0.6)]

              transition-all

              disabled:opacity-50

              flex items-center justify-center gap-3
              "
            >
              {loading
                ? "AUTHENTICATING..."
                : "ACCESS PORTAL"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}


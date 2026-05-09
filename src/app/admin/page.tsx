"use client";

import { useAuth } from "@/hooks/useAuth";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";

import AdminLogin from "@/components/admin/Login";

import AdminDashboard from "@/components/admin/Dashboard";

export default function AdminPage() {
  const { user, loading } = useAuth();

  /* Loading Screen */
  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex items-center justify-center

        bg-white dark:bg-black

        transition-colors duration-500
        "
      >
        {/* Ambient Glow */}
        <div
          className="
          absolute
          w-[400px] h-[400px]
          bg-red-600/10
          rounded-full
          blur-3xl
          "
        ></div>

        <div
          className="
          relative
          animate-spin
          rounded-full
          h-14 w-14

          border-[3px]
          border-red-600/20
          border-t-red-600

          shadow-[0_0_20px_rgba(220,38,38,0.3)]
          "
        ></div>
      </div>
    );
  }

  /* Unauthorized */
  if (
    user &&
    user.email !== "it.autovit22@gmail.com"
  ) {
    return (
      <div
        className="
        min-h-screen

        flex flex-col
        items-center justify-center

        bg-white dark:bg-black

        font-rajdhani

        p-6
        text-center

        transition-colors duration-500

        relative overflow-hidden
        "
      >
        {/* Glow */}
        <div
          className="
          absolute
          w-[600px] h-[600px]
          bg-red-600/10
          rounded-full
          blur-3xl
          pointer-events-none
          "
        ></div>

        <div className="relative z-10">
          
          <h1
            className="
            font-orbitron
            text-4xl md:text-5xl
            font-black

            text-gray-900 dark:text-white

            mb-4

            tracking-tight
            "
          >
            ACCESS DENIED
          </h1>

          <p
            className="
            text-red-600

            font-bold
            uppercase
            tracking-widest

            mb-8

            break-all
            "
          >
            Unauthorized Account:
            <br />
            {user.email}
          </p>

          <button
            onClick={() =>
              signOut(auth)
            }
            className="
            btn-primary

            shadow-[0_0_20px_rgba(220,38,38,0.3)]
            hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]
            "
          >
            Logout & Try Again
          </button>
        </div>
      </div>
    );
  }

  /* Authorized */
  return user ? (
    <AdminDashboard />
  ) : (
    <AdminLogin />
  );
}
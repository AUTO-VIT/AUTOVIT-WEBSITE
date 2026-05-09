"use client";

import { useState } from "react";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";

import RecruitmentDashboard from "./RecruitmentDashboard";

import EventsManagement from "./EventsManagement";

import TeamManagement from "./TeamManagement";

import { cn } from "@/lib/utils";

import {
  Users,
  Calendar,
  LayoutDashboard,
} from "lucide-react";

const tabs = [
  {
    id: "recruit",
    label: "Recruitment",
    icon: LayoutDashboard,
  },

  {
    id: "events",
    label: "Events",
    icon: Calendar,
  },

  {
    id: "team",
    label: "Leadership Team",
    icon: Users,
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] =
    useState("recruit");

  return (
    <div
      className="
      min-h-screen

      bg-white dark:bg-black

      flex flex-col

      font-rajdhani

      transition-colors duration-500

      relative overflow-hidden
      "
    >
      {/* Ambient Glow */}
      <div
        className="
        absolute top-0 left-1/2
        -translate-x-1/2

        w-[900px] h-[900px]

        bg-red-600/5 dark:bg-red-600/10

        rounded-full
        blur-3xl

        pointer-events-none
        "
      ></div>

      <div
        className="
        flex-1
        w-full

        pt-32
        px-6 md:px-12
        pb-20

        relative z-10
        "
      >
        {/* Header */}
        <div
          className="
          flex flex-col md:flex-row
          justify-between
          md:items-end

          gap-6

          mb-12

          border-b
          border-gray-200 dark:border-zinc-800

          pb-8
          "
        >
          <div className="space-y-3">
            
            <h1
              className="
              font-orbitron

              text-4xl md:text-5xl
              font-black

              uppercase
              tracking-tighter

              text-gray-900 dark:text-white
              "
            >
              ADMIN PANEL{" "}

              <span
                className="
                text-red-600

                drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]
                "
              >
                V2.0
              </span>
            </h1>

            <p
              className="
              text-xs

              font-bold
              uppercase
              tracking-[0.3em]

              text-gray-400 dark:text-gray-500
              "
            >
              Manage AutoVIT content and club
              activities
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={() =>
              signOut(auth)
            }
            className="
            text-[10px]

            font-black
            uppercase
            tracking-widest

            text-gray-400 dark:text-gray-500

            hover:text-red-600

            transition-colors
            "
          >
            LOGOUT
          </button>
        </div>

        {/* Tabs */}
        <div
          className="
          flex flex-wrap
          gap-3

          mb-12
          "
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={cn(
                `
                flex items-center gap-3

                px-8 py-4

                rounded-xl

                transition-all duration-300

                font-orbitron
                text-[10px]
                font-black

                uppercase
                tracking-widest

                border

                backdrop-blur-sm
                `,

                activeTab === tab.id
                  ? `
                    bg-red-600
                    text-white

                    border-red-600

                    shadow-[0_0_25px_rgba(220,38,38,0.35)]
                  `
                  : `
                    bg-white/60 dark:bg-zinc-900/70

                    text-gray-500 dark:text-gray-400

                    border-gray-200 dark:border-zinc-700

                    hover:border-red-500/40
                    hover:text-red-600

                    hover:shadow-[0_0_18px_rgba(220,38,38,0.12)]
                  `
              )}
            >
              <tab.icon size={14} />

              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className="
          animate-fade-in

          bg-white/50 dark:bg-zinc-900/40

          backdrop-blur-md

          border border-gray-200 dark:border-zinc-800

          rounded-3xl

          p-6 md:p-8

          shadow-xl
          "
        >
          {activeTab === "recruit" && (
            <RecruitmentDashboard />
          )}

          {activeTab === "events" && (
            <EventsManagement />
          )}

          {activeTab === "team" && (
            <TeamManagement />
          )}
        </div>
      </div>
    </div>
  );
}
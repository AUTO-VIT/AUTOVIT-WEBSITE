"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Settings } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden
      bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 dark:bg-red-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10 py-12">
        
        {/* LEFT CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Main Title */}
          <motion.div
            variants={itemVariants}
            className="glitch-wrapper"
          >
            <h1
              className="
              font-orbitron
              text-5xl sm:text-6xl md:text-7xl xl:text-8xl
              font-black
              text-red-600
              mb-4
              tracking-tighter
              uppercase
              relative
              inline-block
              lg:block
              glitch
              drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]
              dark:drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]
              "
              data-text="AutoVIT"
            >
              <span className="relative z-10">
                AutoVIT
              </span>

              {/* Glow Shadow */}
              <span
                className="
                absolute top-0 left-0
                -z-10
                text-red-600/20
                blur-sm
                translate-x-1
                translate-y-1
                w-full
                select-none
                pointer-events-none
                "
              >
                AutoVIT
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="
            text-red-600
            font-orbitron
            font-bold
            text-lg sm:text-xl xl:text-2xl
            mb-6
            tracking-widest
            uppercase
            "
          >
            Robotics | Automation | Innovation
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="
            text-gray-700 dark:text-gray-300
            text-base sm:text-lg xl:text-xl
            max-w-lg
            mb-10
            font-rajdhani
            leading-relaxed
            mx-auto lg:mx-0
            transition-colors duration-300
            "
          >
            Where Technology Meets Innovation.
            Join us in shaping the future of robotics,
            automation, and mechanical engineering.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/recruit"
              className="
              btn-primary
              shadow-[0_0_25px_rgba(220,38,38,0.35)]
              hover:shadow-[0_0_35px_rgba(220,38,38,0.7)]
              "
            >
              Join the Club
            </Link>

            <Link
              href="/#events"
              className="
              btn-secondary
              dark:bg-zinc-900/40
              dark:hover:bg-zinc-800
              "
            >
              View Events
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE ROBOTIC VISUAL */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: -10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="relative flex justify-center items-center"
        >
          <div
            className="
            relative
            w-64 h-64 md:w-96 md:h-96
            rounded-full
            border border-red-600/20
            dark:border-red-500/30
            flex justify-center items-center
            overflow-hidden
            animate-spin-slow
            "
          >
            {/* Outer Rings */}
            <div
              className="
              absolute inset-0
              border-t-2 border-red-600
              rounded-full
              "
              style={{
                transform: "rotate(45deg)",
              }}
            ></div>

            <div
              className="
              absolute inset-2
              border-r-2
              border-gray-300 dark:border-zinc-700
              rounded-full
              "
            ></div>

            <div
              className="
              absolute inset-4
              border-b-2 border-red-600/50
              rounded-full
              "
            ></div>

            {/* Center Core */}
            <div
              className="
              absolute inset-8
              rounded-full
              border border-gray-300/40 dark:border-zinc-700
              flex justify-center items-center
              animate-spin-reverse
              bg-white/10 dark:bg-white/5
              backdrop-blur-sm
              "
            >
              <Settings
                className="
                w-32 h-32
                text-red-600
                opacity-90
                animate-pulse
                drop-shadow-[0_0_18px_rgba(220,38,38,0.7)]
                "
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Ambient Glow */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
            absolute
            -z-10
            w-[120%]
            h-[120%]
            bg-red-600/10 dark:bg-red-600/20
            rounded-full
            blur-3xl
            "
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
}
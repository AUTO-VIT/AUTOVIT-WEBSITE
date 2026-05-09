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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative z-10 min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden bg-transparent transition-colors duration-500">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10 py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="glitch-wrapper">
            <h1 
              className="font-orbitron text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-gray-900 dark:text-red-600 mb-3 tracking-[-0.06em] uppercase relative inline-block lg:block glitch leading-none"
              data-text="AutoVIT"
            >
              <span className="relative z-10">
                <span>AutoVIT</span>
              </span>
              <span className="absolute top-0 left-0 -z-10 text-red-600/20 dark:text-red-600/30 blur-sm translate-x-1 translate-y-1 w-full select-none pointer-events-none">
                AutoVIT
              </span>
            </h1>
          </motion.div>
          <motion.p
  variants={itemVariants}
  className="
  text-red-600
  font-orbitron
  font-bold

  text-sm sm:text-base xl:text-lg

  mb-5

  tracking-[0.22em]

  uppercase

  leading-none
  "
>
  Robotics | Automation | Innovation
</motion.p>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 text-base sm:text-lg xl:text-xl max-w-lg mb-10 font-rajdhani leading-relaxed mx-auto lg:mx-0">
            Where Technology Meets Innovation. Join us in shaping the future of robotics, automation, and mechanical engineering.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link href="/recruit" className="btn-primary">
              Join the Club
            </Link>
            <Link href="/#events" className="btn-secondary">
              View Events
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border border-red-600/20 dark:border-red-500/30 flex justify-center items-center overflow-hidden animate-spin-slow">
            <div className="absolute inset-0 border-t-2 border-red-600 rounded-full" style={{ transform: "rotate(45deg)" }}></div>
            <div className="absolute inset-2 border-r-2 border-gray-300 dark:border-zinc-700 rounded-full" style={{ animationDirection: "reverse" }}></div>
            <div className="absolute inset-4 border-b-2 border-red-600/50 rounded-full"></div>
            
            {/* Inner static container */}
            <div className="absolute inset-8 rounded-full border border-gray-200/50 dark:border-zinc-700 flex justify-center items-center animate-spin-reverse">
               <Settings className="w-32 h-32 text-red-600 opacity-80 dark:opacity-90" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -z-10 w-[120%] h-[120%] bg-red-600/5 dark:bg-red-600/10 rounded-full blur-3xl"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
}

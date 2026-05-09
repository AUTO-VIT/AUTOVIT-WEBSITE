"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50/50 dark:bg-zinc-950 border-y border-gray-100 dark:border-zinc-800 overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-red-600"></div>
              <span className="font-orbitron text-red-600 font-bold tracking-widest uppercase">About Us</span>
            </div>
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter leading-tight transition-colors duration-300">
              Pioneering the Future of Technology
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 font-rajdhani transition-colors duration-300">
              AutoVIT is a cutting-edge technical club at VIT that brings together passionate minds in robotics, 
              automation, automobile engineering, and electronics. We are a community of innovators, creators, 
              and problem-solvers dedicated to pushing the boundaries of technology.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-rajdhani transition-colors duration-300">
              Through hands-on projects, workshops, and participation in national-level competitions, 
              we provide our members with the practical experience and knowledge needed to excel in the 
              rapidly evolving world of technology.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Visual element placeholder matching target style */}
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-red-600/5 dark:bg-red-600/20 rotate-3 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gray-900/5 dark:bg-white/5 -rotate-3 rounded-3xl"></div>
              <div className="absolute inset-0 bg-white dark:bg-zinc-900/70 border border-gray-100 dark:border-zinc-700 rounded-3xl shadow-xl dark:shadow-lg overflow-hidden flex items-center justify-center p-8 transition-colors duration-500">
                 <div className="grid grid-cols-2 gap-4 w-full h-full">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-100 dark:bg-zinc-800 rounded-2xl relative overflow-hidden group border border-gray-200 dark:border-zinc-700 transition-colors duration-300"
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                          IMAGE {i}
                        </div>
                        {/* 
                          Uncomment and add real paths later:
                          <Image 
                            src={`/images/about-${i}.jpg`} 
                            alt={`AutoVIT Activity ${i}`}
                            fill
                            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity"
                          /> 
                        */}
                      </motion.div>
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

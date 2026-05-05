"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50/50 border-y border-gray-100 overflow-hidden">
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
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-gray-900 mb-8 uppercase tracking-tighter leading-tight">
              Pioneering the Future of Technology
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-rajdhani">
              AutoVIT is a cutting-edge technical club at VIT that brings together passionate minds in robotics, 
              automation, automobile engineering, and electronics. We are a community of innovators, creators, 
              and problem-solvers dedicated to pushing the boundaries of technology.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed font-rajdhani">
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
              <div className="absolute inset-0 bg-red-600/5 rotate-3 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gray-900/5 -rotate-3 rounded-3xl"></div>
              <div className="absolute inset-0 bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden flex items-center justify-center p-8">
                 <div className="grid grid-cols-2 gap-4 w-full h-full">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-100 rounded-2xl relative overflow-hidden group border border-gray-200"
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-600 transition-colors z-10">
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

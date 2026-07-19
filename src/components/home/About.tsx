"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { convertDriveUrl } from "@/lib/driveUrl";
import { motion } from "framer-motion";

interface AboutImage {
  url: string;
  alt: string;
}

export default function About() {
  const [images, setImages] = useState<AboutImage[]>([
    { url: "", alt: "AutoVIT Activity 1" },
    { url: "", alt: "AutoVIT Activity 2" },
    { url: "", alt: "AutoVIT Activity 3" },
    { url: "", alt: "AutoVIT Activity 4" },
  ]);

  useEffect(() => {
    const aboutRef = ref(rtdb, "about/images");
    const unsubscribe = onValue(aboutRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Firebase stores arrays as objects with numeric keys — handle both
        const imgArray: AboutImage[] = Array.isArray(data)
          ? data
          : Object.values(data);
        setImages(imgArray);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="about" className="relative z-10 py-24 bg-black/5 dark:bg-black/20 border-y border-gray-100/20 dark:border-zinc-800/30 overflow-hidden transition-colors duration-500">
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
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-red-600/5 dark:bg-red-600/20 rotate-3 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gray-900/5 dark:bg-white/5 -rotate-3 rounded-3xl"></div>
              <div className="absolute inset-0 bg-white dark:bg-zinc-900/70 border border-gray-100 dark:border-zinc-700 rounded-3xl shadow-xl dark:shadow-lg overflow-hidden flex items-center justify-center p-8 transition-colors duration-500">
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                  {images.map((img, i) => {
                    const directUrl = img.url ? convertDriveUrl(img.url) : "";
                    return (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-100 dark:bg-zinc-800 rounded-2xl relative overflow-hidden group border border-gray-200 dark:border-zinc-700 transition-colors duration-300"
                      >
                      {directUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={directUrl}
                            alt={img.alt || `AutoVIT Activity ${i + 1}`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                            IMAGE {i + 1}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

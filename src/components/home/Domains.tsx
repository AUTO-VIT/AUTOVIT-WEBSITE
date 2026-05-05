"use client";

import { Bot, Cpu, Car, CircuitBoard } from "lucide-react";
import { motion } from "framer-motion";

const domains = [
  {
    title: "Robotics",
    desc: "Design and build autonomous robots, participate in competitions, and explore AI-driven robotics solutions.",
    icon: Bot,
    points: ["Autonomous Navigation", "Robot Operating System (ROS)", "Computer Vision", "Machine Learning Integration"],
  },
  {
    title: "Automation",
    desc: "Develop industrial automation solutions, IoT systems, and smart manufacturing processes.",
    icon: Cpu,
    points: ["PLC Programming", "Industrial IoT", "Process Control", "Smart Manufacturing"],
  },
  {
    title: "Automobile",
    desc: "Work on electric vehicles, autonomous driving systems, and automotive electronics.",
    icon: Car,
    points: ["Electric Vehicle Design", "Autonomous Systems", "Engine Management", "Vehicle Dynamics"],
  },
  {
    title: "Electronics",
    desc: "Create embedded systems, develop PCBs, and work with cutting-edge electronic components.",
    icon: CircuitBoard,
    points: ["Embedded Systems", "PCB Design", "Microcontrollers", "Signal Processing"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

export default function Domains() {
  return (
    <section id="domains" className="py-24 bg-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 20 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute right-0 top-0 w-1/3 h-full bg-red-50/30 skew-x-12 translate-x-20 -z-10"
      ></motion.div>
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="section-title">Our Domains</h2>
          <div className="title-underline"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {domains.map((domain, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white/40 backdrop-blur-md border border-red-600/10 p-8 rounded-sm group hover:border-red-600/50 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-red-600 group-hover:h-full transition-all duration-500"></div>
              <div className="text-red-600 text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                <domain.icon className="w-10 h-10" />
              </div>
              <h3 className="font-orbitron text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                {domain.title}
              </h3>
              <p className="text-gray-600 font-rajdhani text-lg mb-6 leading-relaxed">
                {domain.desc}
              </p>
              <ul className="space-y-2">
                {domain.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-500 font-rajdhani text-sm group-hover:text-gray-900 transition-colors">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="absolute -bottom-10 -right-10 text-9xl text-red-600/5 group-hover:text-red-600/10 transition-colors pointer-events-none">
                <domain.icon className="w-48 h-48" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { Mail, MapPin, Instagram, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-orbitron text-2xl font-bold mb-6 text-gray-900 uppercase tracking-tight">
              Join Our Community
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-rajdhani">
              Ready to be part of the future? Connect with us and start your journey in robotics and automation.
            </p>

            <div className="space-y-2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4 mb-6 group"
              >
                <div className="w-12 h-12 bg-red-50 border border-red-600/10 flex justify-center items-center text-red-600 text-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <a href="mailto:it.autovit22@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 font-rajdhani text-lg group-hover:text-gray-900 transition-colors">
                  it.autovit22@gmail.com
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4 mb-6 group"
              >
                <div className="w-12 h-12 bg-red-50 border border-red-600/10 flex justify-center items-center text-red-600 text-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <span className="text-gray-600 font-rajdhani text-lg group-hover:text-gray-900 transition-colors">
                  VIT Chennai
                </span>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-4 mt-10"
            >
              <a href="https://www.instagram.com/autovit.vitc/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-red-600/20 flex justify-center items-center text-gray-600 text-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/autovit-vit-chennai/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-red-600/20 flex justify-center items-center text-gray-600 text-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/AUTO-VIT" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-red-600/20 flex justify-center items-center text-gray-600 text-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                <Github size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="bg-gray-50 border border-red-600/10 p-4 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-rajdhani text-gray-900"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-gray-50 border border-red-600/10 p-4 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-rajdhani text-gray-900"
                  required
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full bg-gray-50 border border-red-600/10 p-4 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-rajdhani text-gray-900"
                required
              />
              <textarea 
                placeholder="Your Message" 
                rows={5}
                className="w-full bg-gray-50 border border-red-600/10 p-4 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-rajdhani text-gray-900 resize-none"
                required
              ></textarea>
              <button type="submit" className="btn-primary w-full md:w-auto">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
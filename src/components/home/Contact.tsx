"use client";

import {
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate email sending (e.g. EmailJS or an API route)
    setFormState("success");
    setTimeout(() => setFormState("idle"), 4000);
  };
  return (
    <section
      id="contact"
      className="
      py-24
      bg-transparent
      overflow-hidden
      relative
      z-10
      transition-colors duration-500"
    >
      {/* Ambient Glow */}
      <div
        className="
        absolute bottom-0 right-0
        w-[600px] h-[600px]
        bg-red-600/5 dark:bg-red-600/10
        rounded-full blur-3xl
        pointer-events-none
        "
      ></div>

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-16"
        >
          <h2 className="section-title">
            Get In Touch
          </h2>

          <div className="title-underline"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <h3
              className="
              font-orbitron
              text-2xl
              font-bold
              mb-6
              text-gray-900 dark:text-white
              uppercase
              tracking-tight
              "
            >
              Join Our Community
            </h3>

            <p
              className="
              text-gray-700 dark:text-gray-300
              text-lg
              leading-relaxed
              mb-10
              font-rajdhani
              "
            >
              Ready to be part of the future?

              Connect with us and start your journey
              in robotics and automation.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              
              {/* Email */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="
                flex items-center gap-4
                mb-6
                group
                "
              >
                <div
                  className="
                  w-12 h-12
                  bg-red-50 dark:bg-zinc-900
                  border border-red-600/20
                  flex justify-center items-center
                  text-red-600
                  text-xl
                  rounded-xl
                  group-hover:bg-red-600
                  group-hover:text-white
                  transition-all
                  "
                >
                  <Mail size={24} />
                </div>

                <a
                  href="mailto:it.autovit22@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                  text-gray-700 dark:text-gray-300
                  font-rajdhani
                  text-lg
                  group-hover:text-red-600
                  transition-colors
                  "
                >
                  it.autovit22@gmail.com
                </a>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
                className="
                flex items-center gap-4
                mb-6
                group
                "
              >
                <div
                  className="
                  w-12 h-12
                  bg-red-50 dark:bg-zinc-900
                  border border-red-600/20
                  flex justify-center items-center
                  text-red-600
                  text-xl
                  rounded-xl
                  group-hover:bg-red-600
                  group-hover:text-white
                  transition-all
                  "
                >
                  <MapPin size={24} />
                </div>

                <span
                  className="
                  text-gray-700 dark:text-gray-300
                  font-rajdhani
                  text-lg
                  group-hover:text-red-600
                  transition-colors
                  "
                >
                  VIT Chennai
                </span>
              </motion.div>
            </div>

            {/* Socials */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
              className="flex gap-4 mt-10"
            >
              {[
                {
                  icon: Instagram,
                  link: "https://www.instagram.com/autovit.vitc/",
                },

                {
                  icon: Linkedin,
                  link: "https://www.linkedin.com/company/autovit-vit-chennai/",
                },

                {
                  icon: Github,
                  link: "https://github.com/AUTO-VIT",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                  w-12 h-12
                  rounded-xl
                  border border-red-600/20
                  bg-white/60 dark:bg-zinc-900/70
                  backdrop-blur-sm
                  flex justify-center items-center
                  text-gray-700 dark:text-gray-300
                  hover:bg-red-600
                  hover:text-white
                  hover:border-red-600
                  hover:shadow-[0_0_20px_rgba(90,18,18,0.4)]
                  transition-all duration-300
                  "
                >
                  <social.icon size={20} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="
              space-y-6
              bg-white/60 dark:bg-zinc-900/70
              backdrop-blur-md
              border border-red-600/10 dark:border-[#991b1b]/20
              p-8
              rounded-3xl
              shadow-xl
              "
            >
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                
                <input
                  type="text"
                  placeholder="Your Name"
                  className="
                  bg-gray-50 dark:bg-zinc-800
                  border border-red-600/10 dark:border-[#991b1b]/10
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:border-red-600
                  focus:ring-2 focus:ring-red-600/20
                  transition-all
                  font-rajdhani
                  text-gray-900 dark:text-white
                  placeholder:text-gray-400
                  "
                  required
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="
                  bg-gray-50 dark:bg-zinc-800
                  border border-red-600/10 dark:border-[#991b1b]/10
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:border-red-600
                  focus:ring-2 focus:ring-red-600/20
                  transition-all
                  font-rajdhani
                  text-gray-900 dark:text-white
                  placeholder:text-gray-400
                  "
                  required
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject"
                className="
                w-full
                bg-gray-50 dark:bg-zinc-800
                border border-red-600/10 dark:border-[#991b1b]/10
                p-4
                rounded-xl
                focus:outline-none
                focus:border-red-600
                focus:ring-2 focus:ring-red-600/20
                transition-all
                font-rajdhani
                text-gray-900 dark:text-white
                placeholder:text-gray-400
                "
                required
              />

              {/* Message */}
              <textarea
                placeholder="Your Message"
                rows={5}
                className="
                w-full
                bg-gray-50 dark:bg-zinc-800
                border border-red-600/10 dark:border-[#991b1b]/10
                p-4
                rounded-xl
                focus:outline-none
                focus:border-red-600
                focus:ring-2 focus:ring-red-600/20
                transition-all
                font-rajdhani
                text-gray-900 dark:text-white
                placeholder:text-gray-400
                resize-none
                "
                required
              ></textarea>

              {/* Button */}
              <button
                type="submit"
                className="
                btn-primary
                w-full md:w-auto
                shadow-[0_0_20px_rgba(90,18,18,0.3)]
                hover:shadow-[0_0_30px_rgba(90,18,18,0.6)]
                "
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



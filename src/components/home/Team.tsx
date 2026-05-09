"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";

import {
  Github,
  Linkedin,
  UserCircle,
} from "lucide-react";

import Image from "next/image";

import { motion } from "framer-motion";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  github: string;
  linkedin: string;
  order: number;
}

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamRef = ref(rtdb, "team");

    const unsubscribe = onValue(teamRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const teamData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })) as TeamMember[];

        setTeam(
          teamData.sort((a, b) => a.order - b.order)
        );
      } else {
        setTeam([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="team"
      className="
      py-24
      bg-transparent
      relative overflow-hidden
      "
    >
      {/* Ambient Glow */}
      <div
        className="
        absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[700px] h-[700px]
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
            x: 50,
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
          className="
          mb-16
          flex flex-col items-end text-right
          "
        >
          <h2 className="section-title">
            Leadership Team
          </h2>

          <div className="title-underline origin-right"></div>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            
            <div
              className="
              animate-spin
              w-12 h-12
              border-4
              border-red-600/20
              border-t-red-600
              rounded-full
              "
            ></div>

            <p
              className="
              text-gray-600 dark:text-gray-400
              font-rajdhani
              uppercase
              tracking-widest
              "
            >
              Loading Team...
            </p>
          </div>
        ) : (

          /* Swiper */
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
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
            className="
            team-swiper-container
            relative
            px-4
            "
          >
            <Swiper
              modules={[
                Autoplay,
                Pagination,
                Navigation,
              ]}
              spaceBetween={30}
              slidesPerView={1}
              loop={team.length > 4}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },

                1024: {
                  slidesPerView: 3,
                },

                1280: {
                  slidesPerView: 4,
                },
              }}
              className="pb-16"
            >
              {team.map((member) => (
                <SwiperSlide key={member.id}>
                  
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.01,
                    }}
                    className="
                    bg-white/70 dark:bg-zinc-900/80
                    backdrop-blur-md
                    p-8
                    rounded-2xl
                    shadow-sm
                    border border-red-600/10 dark:border-red-500/20
                    flex flex-col
                    items-center
                    text-center
                    group
                    transition-all duration-500
                    hover:shadow-[0_0_30px_rgba(220,38,38,0.18)]
                    hover:border-red-600/40
                    h-full
                    relative overflow-hidden
                    "
                  >
                    {/* Glow Overlay */}
                    <div
                      className="
                      absolute inset-0
                      opacity-0 group-hover:opacity-100
                      bg-gradient-to-br
                      from-red-600/5
                      to-transparent
                      transition-opacity duration-500
                      pointer-events-none
                      "
                    ></div>

                    {/* Avatar */}
                    <div
                      className="
                      relative
                      w-32 h-32
                      mb-6
                      rounded-full
                      overflow-hidden
                      border-2
                      border-red-600/20
                      group-hover:border-red-600
                      transition-all duration-500
                      shadow-[0_0_20px_rgba(220,38,38,0.15)]
                      "
                    >
                      {member.photoUrl ? (
                        <Image
                          src={member.photoUrl}
                          alt={member.name}
                          fill
                          className="
                          object-cover
                          grayscale
                          group-hover:grayscale-0
                          group-hover:scale-105
                          transition-all duration-500
                          "
                        />
                      ) : (
                        <UserCircle
                          className="
                          w-full h-full
                          text-gray-300 dark:text-gray-600
                          "
                        />
                      )}
                    </div>

                    {/* Role */}
                    <h3
                      className="
                      font-orbitron
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-red-600
                      mb-1
                      "
                    >
                      {member.role}
                    </h3>

                    {/* Name */}
                    <h4
                      className="
                      font-orbitron
                      text-xl
                      font-bold
                      uppercase
                      tracking-tighter
                      text-gray-900 dark:text-white
                      mb-6
                      transition-colors
                      "
                    >
                      {member.name}
                    </h4>

                    {/* Socials */}
                    <div className="flex items-center gap-4 mt-auto">
                      
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                          text-gray-400 dark:text-gray-500
                          hover:text-red-600
                          transition-colors
                          "
                        >
                          <Github size={20} />
                        </a>
                      )}

                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                          text-gray-400 dark:text-gray-500
                          hover:text-red-600
                          transition-colors
                          "
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>

      {/* Swiper Styling */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #dc2626 !important;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #dc2626 !important;
        }
      `}</style>
    </section>
  );
}
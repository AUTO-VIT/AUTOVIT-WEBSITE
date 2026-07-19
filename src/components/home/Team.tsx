"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { convertDriveUrl } from "@/lib/driveUrl";
import { Github, Linkedin, UserCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
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

        setTeam(teamData.sort((a, b) => a.order - b.order));
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
      className="relative z-10 py-24 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-end text-right"
        >
          <h2 className="section-title">Leadership Team</h2>
          <div className="title-underline origin-right"></div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <div className="animate-spin text-red-600 w-10 h-10 border-4 border-red-600/20 border-t-red-600 rounded-full"></div>

            <p className="text-gray-600 dark:text-gray-400 font-rajdhani uppercase tracking-widest">
              Loading Team...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="team-swiper-container relative px-4"
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
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
              className="pb-20"
            >
              {team.map((member) => (
                <SwiperSlide
                  key={member.id}
                  className="h-auto flex"
                >
                  <div className="bg-white/40 dark:bg-zinc-900/60 backdrop-blur-md p-8 rounded-sm shadow-sm dark:shadow-md border border-red-600/10 dark:border-[#991b1b]/20 flex flex-col items-center text-center group transition-all hover:shadow-xl dark:hover:shadow-red-500/20 hover:border-red-600/50 dark:hover:border-[#991b1b]/40 w-full min-h-[420px]">

                    <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-red-600/10 group-hover:border-red-600 dark:group-hover:border-red-500 transition-colors flex-shrink-0">
                      {member.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={convertDriveUrl(member.photoUrl)}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                        />
                      ) : (
                        <UserCircle className="w-full h-full text-gray-300 dark:text-gray-600" />
                      )}
                    </div>

                    <h3 className="font-orbitron text-xs font-bold uppercase tracking-[0.2em] text-red-600 mb-2 min-h-[32px] flex items-center justify-center">
                      {member.role}
                    </h3>

                    <h4 className="font-orbitron text-xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white mb-6 min-h-[64px] flex items-center justify-center">
                      {member.name}
                    </h4>

                    <div className="flex items-center gap-4 mt-auto">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-[#7f1d1d] transition-colors"
                        >
                          <Github size={20} />
                        </a>
                      )}

                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-[#7f1d1d] transition-colors"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
}


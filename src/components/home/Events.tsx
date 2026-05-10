"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";

import {
  Calendar,
  Clock,
  MapPin,
  Inbox,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  location: string;
  link?: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventsRef = ref(rtdb, "events");

    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const eventsData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })) as Event[];

        setEvents(eventsData.reverse());
      } else {
        setEvents([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="events"
      className="
      py-24
      relative
      z-10
      bg-black/5 dark:bg-black/20
      border-y border-gray-200/20 dark:border-zinc-800/30
      overflow-hidden
      transition-colors duration-500"
    >
      {/* Ambient Glow */}
      <div
        className="
        absolute top-0 left-1/2
        -translate-x-1/2
        w-[700px] h-[700px]
        bg-red-600/5 dark:bg-red-600/10
        rounded-full
        blur-3xl
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
            Upcoming Events
          </h2>

          <div className="title-underline"></div>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            
            <div
              className="
              animate-spin
              w-14 h-14
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
              Loading Events...
            </p>
          </div>
        ) : events.length > 0 ? (

          /* Events Grid */
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {events.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.01,
                  }}
                  className="
                  bg-white/80 dark:bg-zinc-900/80
                  backdrop-blur-md
                  rounded-2xl
                  border border-red-600/10 dark:border-[#991b1b]/20
                  overflow-hidden
                  group
                  transition-all duration-500
                  hover:border-red-600/50
                  hover:shadow-[0_0_30px_rgba(90,18,18,0.18)]
                  relative
                  flex flex-col
                  "
                >
                  {/* Top Accent */}
                  <div
                    className="
                    absolute top-0 left-0
                    w-full h-1
                    bg-red-600/20
                    group-hover:bg-red-600
                    transition-colors
                    "
                  ></div>

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

                  {/* Content */}
                  <div className="p-8 flex-grow">
                    
                    <h3
                      className="
                      font-orbitron
                      text-2xl
                      font-bold
                      uppercase
                      mb-4
                      tracking-tighter
                      text-gray-900 dark:text-white
                      group-hover:text-red-600
                      transition-colors
                      "
                    >
                      {event.title}
                    </h3>

                    <p
                      className="
                      text-gray-700 dark:text-gray-300
                      font-rajdhani
                      text-lg
                      mb-8
                      line-clamp-3
                      "
                    >
                      {event.description}
                    </p>

                    {/* Meta */}
                    <div className="space-y-4">
                      
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <Calendar
                          size={18}
                          className="text-red-600"
                        />

                        <span
                          className="
                          font-rajdhani
                          text-sm
                          font-semibold
                          uppercase
                          tracking-widest
                          "
                        >
                          {event.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <Clock
                          size={18}
                          className="text-red-600"
                        />

                        <span
                          className="
                          font-rajdhani
                          text-sm
                          font-semibold
                          uppercase
                          tracking-widest
                          "
                        >
                          {event.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <MapPin
                          size={18}
                          className="text-red-600"
                        />

                        <span
                          className="
                          font-rajdhani
                          text-sm
                          font-semibold
                          uppercase
                          tracking-widest
                          "
                        >
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="
                    bg-gray-50/60 dark:bg-zinc-900/60
                    px-8 py-4
                    border-t border-red-600/10 dark:border-[#991b1b]/10
                    flex justify-end
                    mt-auto
                    "
                  >
                    {event.link ? (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                        font-rajdhani
                        text-sm
                        font-bold
                        uppercase
                        tracking-widest
                        text-red-600
                        hover:text-gray-900
                        dark:hover:text-white
                        transition-colors
                        flex items-center gap-1
                        "
                      >
                        Details →
                      </a>
                    ) : (
                      <button
                        className="
                        font-rajdhani
                        text-sm
                        font-bold
                        uppercase
                        tracking-widest
                        text-gray-300 dark:text-gray-600
                        cursor-not-allowed
                        "
                      >
                        Details →
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (

          /* Empty State */
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            className="
            flex flex-col
            items-center justify-center
            py-20
            text-gray-400 dark:text-gray-500
            gap-4
            "
          >
            <Inbox
              size={64}
              strokeWidth={1}
            />

            <p
              className="
              font-orbitron
              text-xl
              font-bold
              uppercase
              tracking-widest
              "
            >
              Stay tuned for exciting updates!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}



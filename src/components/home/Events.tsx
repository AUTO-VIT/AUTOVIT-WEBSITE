"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Calendar, Clock, MapPin, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        const eventsData = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
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
    <section id="events" className="py-24 relative bg-gray-50/30 border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="section-title">Upcoming Events</h2>
          <div className="title-underline"></div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <div className="animate-spin text-red-600 w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full"></div>
            <p className="text-gray-600 font-rajdhani uppercase tracking-widest">Loading Events...</p>
          </div>
        ) : events.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {events.map((event, idx) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-sm border border-red-600/10 overflow-hidden group transition-all hover:border-red-600/50 hover:shadow-xl relative flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20 group-hover:bg-red-600 transition-colors"></div>
                  <div className="p-8 flex-grow">
                    <h3 className="font-orbitron text-2xl font-bold uppercase mb-4 tracking-tighter text-gray-900 group-hover:text-red-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 font-rajdhani text-lg mb-8 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-500">
                        <Calendar size={18} className="text-red-600" />
                        <span className="font-rajdhani text-sm font-semibold uppercase tracking-widest">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <Clock size={18} className="text-red-600" />
                        <span className="font-rajdhani text-sm font-semibold uppercase tracking-widest">{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <MapPin size={18} className="text-red-600" />
                        <span className="font-rajdhani text-sm font-semibold uppercase tracking-widest">{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50/50 px-8 py-4 border-t border-red-600/10 flex justify-end mt-auto">
                    {event.link ? (
                      <a 
                        href={event.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-rajdhani text-sm font-bold uppercase tracking-widest text-red-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                      >
                        Details →
                      </a>
                    ) : (
                      <button className="font-rajdhani text-sm font-bold uppercase tracking-widest text-gray-300 cursor-not-allowed">
                        Details →
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4"
          >
            <Inbox size={64} strokeWidth={1} />
            <p className="font-orbitron text-xl font-bold uppercase tracking-widest">Stay tuned for exciting updates!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

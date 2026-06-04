"use client";

import {
  useState,
  useEffect,
} from "react";

import {
  ref,
  push,
  update,
  remove,
  onValue,
  serverTimestamp,
} from "firebase/database";

import { rtdb } from "@/lib/firebase";

import {
  Trash2,
  Edit2,
  X,
  Check,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  location: string;
  link?: string;
}

export default function EventsManagement() {
  const [events, setEvents] =
    useState<Event[]>([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      date: "",
      duration: "",
      location: "",
      link: "",
    });

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const eventsRef = ref(rtdb, "events");

    const unsubscribe = onValue(
      eventsRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const list = Object.keys(data).map(
            (key) => ({
              id: key,
              ...data[key],
            })
          ) as Event[];

          setEvents(list.reverse());
        } else {
          setEvents([]);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (editingId) {
        await update(
          ref(rtdb, `events/${editingId}`),
          formData
        );

        setEditingId(null);
      } else {
        const eventsRef = ref(
          rtdb,
          "events"
        );

        await push(eventsRef, {
          ...formData,
          timestamp: serverTimestamp(),
        });
      }

      setFormData({
        title: "",
        description: "",
        date: "",
        duration: "",
        location: "",
        link: "",
      });
    } catch (err) {
      console.error(err);

      alert("Error saving event.");
    }
  };

  const startEdit = (event: Event) => {
    setEditingId(event.id);

    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      duration: event.duration,
      location: event.location,
      link: event.link || "",
    });
  };

  const inputClass = `
    w-full

    bg-white dark:bg-zinc-800

    border border-gray-200 dark:border-zinc-700

    px-6 py-5

    rounded-xl

    focus:outline-none
    focus:border-red-600
    focus:ring-2 focus:ring-red-600/20

    transition-all

    text-gray-900 dark:text-white

    placeholder:text-gray-400
  `;

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <h2
        className="
        font-orbitron
        text-3xl
        font-black
        uppercase
        tracking-tighter

        text-gray-900 dark:text-white
        "
      >
        MANAGE EVENTS
      </h2>

      <div className="grid lg:grid-cols-2 gap-16">
        
        {/* LEFT SIDE FORM */}
        <div className="space-y-8">
          
          <div
            className="
            flex items-center gap-3

            border-l-4 border-red-600

            pl-4
            "
          >
            <h3
              className="
              font-orbitron
              text-xl
              font-black
              uppercase
              tracking-tight

              text-gray-900 dark:text-white
              "
            >
              {editingId
                ? "EDIT EVENT"
                : "ADD NEW EVENT"}
            </h3>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="
            space-y-8

            bg-white/60 dark:bg-zinc-900/60

            backdrop-blur-md

            border border-gray-200 dark:border-zinc-800

            p-8

            rounded-3xl

            shadow-xl
            "
          >
            {/* Title */}
            <div className="space-y-2">
              
              <label
                className="
                text-[10px]
                font-black
                uppercase
                tracking-widest
                text-red-600
                "
              >
                EVENT TITLE
              </label>

              <input
                required
                type="text"
                placeholder="e.g. AutoGenix Ideathon"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              
              <label
                className="
                text-[10px]
                font-black
                uppercase
                tracking-widest
                text-red-600
                "
              >
                DESCRIPTION
              </label>

              <textarea
                required
                rows={4}
                placeholder="Detailed event information..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
                className={inputClass}
              ></textarea>
            </div>

            {/* Date + Duration */}
            <div className="grid grid-cols-2 gap-8">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-600">
                  DATE
                </label>

                <input
                  required
                  type="text"
                  placeholder="Sept 3-4, 2025"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-600">
                  DURATION
                </label>

                <input
                  required
                  type="text"
                  placeholder="36 Hours"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration:
                        e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              
              <label className="text-[10px] font-black uppercase tracking-widest text-red-600">
                LOCATION
              </label>

              <input
                required
                type="text"
                placeholder="MG Auditorium, VIT Chennai"
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location:
                      e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Link */}
            <div className="space-y-2">
              
              <label className="text-[10px] font-black uppercase tracking-widest text-red-600">
                DETAILS LINK (URL)
              </label>

              <input
                type="url"
                placeholder="https://example.com/event-details"
                value={formData.link}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    link: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              
              <button
                type="submit"
                className="
                bg-red-600
                hover:bg-red-700

                text-white

                flex-1

                py-5

                uppercase
                font-black
                tracking-widest

                flex items-center justify-center gap-3

                rounded-xl

                shadow-[0_0_20px_rgba(90,18,18,0.3)]
                hover:shadow-[0_0_30px_rgba(90,18,18,0.6)]

                transition-all
                "
              >
                <Check size={18} />

                {editingId
                  ? "UPDATE EVENT"
                  : "CREATE EVENT"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);

                    setFormData({
                      title: "",
                      description: "",
                      date: "",
                      duration: "",
                      location: "",
                      link: "",
                    });
                  }}
                  className="
                  border
                  border-gray-200 dark:border-zinc-700

                  px-8

                  rounded-xl

                  flex items-center justify-center

                  text-gray-400
                  hover:text-red-600

                  transition-colors
                  "
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">
          
          <h3
            className="
            font-orbitron
            text-xl
            font-black
            uppercase
            tracking-tight

            text-gray-900 dark:text-white
            "
          >
            CURRENT EVENTS
          </h3>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-20">
              
              <div
                className="
                animate-spin

                rounded-full

                h-10 w-10

                border-2
                border-red-600/20
                border-t-red-600
                "
              ></div>
            </div>
          ) : events.length > 0 ? (

            /* Event List */
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="
                  bg-white/60 dark:bg-zinc-900/60

                  backdrop-blur-md

                  p-8

                  border border-gray-200 dark:border-zinc-800

                  rounded-3xl

                  group

                  relative

                  hover:border-red-500/30

                  hover:shadow-[0_0_25px_rgba(90,18,18,0.15)]

                  transition-all duration-300
                  "
                >
                  {/* Top */}
                  <div className="flex justify-between items-start mb-6">
                    
                    <h4
                      className="
                      font-orbitron
                      font-black
                      uppercase
                      tracking-tight
                      text-lg

                      text-gray-900 dark:text-white
                      "
                    >
                      {event.title}
                    </h4>

                    {/* Actions */}
                    <div className="flex gap-2">
                      
                      <button
                        onClick={() =>
                          startEdit(event)
                        }
                        className="
                        p-2

                        text-gray-400

                        hover:text-red-600

                        transition-colors
                        "
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() =>
                          remove(
                            ref(
                              rtdb,
                              `events/${event.id}`
                            )
                          )
                        }
                        className="
                        p-2

                        text-gray-400

                        hover:text-red-600

                        transition-colors
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Meta */}
                  <div
                    className="
                    flex flex-wrap
                    gap-8

                    text-[10px]

                    font-black
                    uppercase
                    tracking-widest

                    text-gray-400 dark:text-gray-500
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Calendar
                        size={14}
                        className="text-red-600"
                      />

                      {event.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock
                        size={14}
                        className="text-red-600"
                      />

                      {event.duration}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin
                        size={14}
                        className="text-red-600"
                      />

                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (

            /* Empty */
            <div
              className="
              text-center

              py-32

              bg-white/40 dark:bg-zinc-900/40

              border border-dashed
              border-gray-200 dark:border-zinc-700

              rounded-3xl

              text-gray-400 dark:text-gray-500
              "
            >
              <p
                className="
                font-orbitron
                text-sm
                font-black
                uppercase
                tracking-widest
                "
              >
                No events listed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


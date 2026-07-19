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
  UserCircle,
} from "lucide-react";

import Image from "next/image";

import { convertDriveUrl } from "@/lib/driveUrl";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  github: string;
  linkedin: string;
  order: number;
}

export default function TeamManagement() {
  const [team, setTeam] =
    useState<TeamMember[]>([]);

  const [formData, setFormData] =
    useState({
      name: "",
      role: "",
      photoUrl: "",
      github: "",
      linkedin: "",
      order: 0,
    });

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const teamRef = ref(rtdb, "team");

    const unsubscribe = onValue(
      teamRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const list = Object.keys(data).map(
            (key) => ({
              id: key,
              ...data[key],
            })
          ) as TeamMember[];

          setTeam(
            list.sort(
              (a, b) =>
                a.order - b.order
            )
          );
        } else {
          setTeam([]);
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
          ref(rtdb, `team/${editingId}`),
          formData
        );

        setEditingId(null);
      } else {
        const teamRef = ref(
          rtdb,
          "team"
        );

        await push(teamRef, {
          ...formData,
          order: team.length + 1,
          timestamp: serverTimestamp(),
        });
      }

      setFormData({
        name: "",
        role: "",
        photoUrl: "",
        github: "",
        linkedin: "",
        order: 0,
      });
    } catch (err) {
      console.error(err);

      alert(
        "Error saving team member."
      );
    }
  };

  const startEdit = (
    member: TeamMember
  ) => {
    setEditingId(member.id);

    setFormData({
      name: member.name,
      role: member.role,
      photoUrl: member.photoUrl,
      github: member.github,
      linkedin: member.linkedin,
      order: member.order,
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

    font-bold

    text-gray-900 dark:text-white

    placeholder:text-gray-400
  `;

  return (
    <div className="space-y-12">
      
      {/* Title */}
      <h2
        className="
        font-orbitron

        text-3xl

        font-black

        uppercase
        tracking-tighter

        flex items-center gap-4

        text-gray-900 dark:text-white
        "
      >
        <span
          className="
          w-1 h-8

          bg-red-600
          "
        ></span>

        MANAGE LEADERSHIP TEAM
      </h2>

      <div className="grid lg:grid-cols-2 gap-16">
        
        {/* LEFT FORM */}
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            
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
                ? "EDIT MEMBER"
                : "ADD NEW MEMBER"}
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
            {/* Name */}
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
                FULL NAME
              </label>

              <input
                required
                type="text"
                placeholder="e.g. KIRAN S"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Role */}
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
                ROLE / POST
              </label>

              <input
                required
                type="text"
                placeholder="e.g. President"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role:
                      e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Photo */}
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
                PHOTO URL
              </label>

              <input
                type="url"
                placeholder="https://..."
                value={formData.photoUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    photoUrl:
                      e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8">
              
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
                  GITHUB URL
                </label>

                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      github:
                        e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

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
                  LINKEDIN URL
                </label>

                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      linkedin:
                        e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>
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

                py-6

                uppercase

                font-black

                tracking-[0.2em]

                flex items-center justify-center gap-3

                rounded-xl

                shadow-[0_0_25px_rgba(90,18,18,0.3)]
                hover:shadow-[0_0_35px_rgba(90,18,18,0.6)]

                transition-all
                "
              >
                <Check size={18} />

                {editingId
                  ? "UPDATE MEMBER"
                  : "ADD TO TEAM"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(
                      null
                    );

                    setFormData({
                      name: "",
                      role: "",
                      photoUrl: "",
                      github: "",
                      linkedin: "",
                      order: 0,
                    });
                  }}
                  className="
                  border border-gray-200 dark:border-zinc-700

                  px-8

                  flex items-center justify-center

                  rounded-xl

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
            CURRENT LEADERSHIP
          </h3>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-20">
              
              <div
                className="
                animate-spin

                rounded-full

                h-8 w-8

                border-2
                border-red-600/20
                border-t-red-600
                "
              ></div>
            </div>
          ) : team.length > 0 ? (

            /* Members */
            <div className="space-y-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="
                  bg-white/60 dark:bg-zinc-900/60

                  backdrop-blur-md

                  p-6

                  border border-gray-200 dark:border-zinc-800

                  rounded-3xl

                  shadow-sm

                  flex items-center justify-between

                  group

                  hover:border-red-500/30

                  hover:shadow-[0_0_25px_rgba(90,18,18,0.12)]

                  transition-all duration-300
                  "
                >
                  {/* Left */}
                  <div className="flex items-center gap-6">
                    
                    {/* Avatar */}
                    <div
                      className="
                      relative

                      w-16 h-16

                      rounded-2xl

                      overflow-hidden

                      bg-gray-100 dark:bg-zinc-800

                      border border-gray-200 dark:border-zinc-700
                      "
                    >
                      {member.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={convertDriveUrl(member.photoUrl)}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover"
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

                    {/* Text */}
                    <div>
                      
                      <p
                        className="
                        text-[10px]

                        font-black

                        uppercase
                        tracking-widest

                        text-red-600

                        mb-1
                        "
                      >
                        {member.role}
                      </p>

                      <h4
                        className="
                        font-orbitron

                        font-black

                        uppercase
                        tracking-tight

                        text-lg

                        text-gray-900 dark:text-white

                        leading-none
                        "
                      >
                        {member.name}
                      </h4>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    
                    <button
                      onClick={() =>
                        startEdit(
                          member
                        )
                      }
                      className="
                      p-3

                      rounded-xl

                      text-gray-400

                      hover:text-red-600
                      hover:bg-red-600/10

                      transition-all
                      "
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() =>
                        remove(
                          ref(
                            rtdb,
                            `team/${member.id}`
                          )
                        )
                      }
                      className="
                      p-3

                      rounded-xl

                      text-gray-400

                      hover:text-red-600
                      hover:bg-red-600/10

                      transition-all
                      "
                    >
                      <Trash2 size={18} />
                    </button>
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

              text-gray-400 dark:text-gray-500

              rounded-3xl
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
                No members added.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


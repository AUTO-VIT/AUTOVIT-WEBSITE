"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ref,
  push,
  serverTimestamp,
  get,
  set,
  onValue,
} from "firebase/database";

import { rtdb } from "@/lib/firebase";

import Footer from "@/components/layout/Footer";

import ParticlesBackground from "@/components/ParticlesBackground";

import { cn } from "@/lib/utils";

import {
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const domains = [
  "Technical",
  "Management",
  "Social Media",
];

const years = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];

export default function RecruitPage() {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    department: "",
    year: "1st Year",
    domains: [] as string[],
    experience: "",
    portfolio: "",
    reason: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [credentials, setCredentials] = useState<{
    code: string;
    password: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [recruitOpen, setRecruitOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const statusRef = ref(rtdb, "settings/recruitOpen");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const value = snapshot.val();
      setRecruitOpen(value !== false);
    });
    return () => unsubscribe();
  }, []);

  const generateUniqueCode = async (): Promise<string> => {
    let attempts = 0;
    while (attempts < 50) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const code = `AUTO${randomNum}`;
      const credRef = ref(rtdb, `quiz_credentials/${code}`);
      const snapshot = await get(credRef);
      if (!snapshot.exists()) {
        return code;
      }
      attempts++;
    }
    throw new Error("Failed to generate unique candidate code");
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!recruitOpen) {
      alert("Recruitments are currently closed.");
      return;
    }

    if (formData.domains.length === 0) {
      alert("Please select at least one domain.");
      return;
    }

    setStatus("loading");

    try {
      const uniqueCode = await generateUniqueCode();
      const password = formData.regNo.trim().toLowerCase();

      // Save credentials first to reserve/claim the uniqueCode
      const credentialsRef = ref(rtdb, `quiz_credentials/${uniqueCode}`);
      await set(credentialsRef, {
        name: formData.name,
        regNo: formData.regNo,
        password,
        firstPref: formData.domains[0] || "",
        secondPref: formData.domains[1] || "",
        timestamp: serverTimestamp(),
      });

      const recruitRef = ref(
        rtdb,
        "recruitments"
      );

      await push(recruitRef, {
        ...formData,
        firstPref: formData.domains[0] || "",
        secondPref: formData.domains[1] || "",
        uniqueCode,
        password,
        timestamp: serverTimestamp(),
      });

      setCredentials({ code: uniqueCode, password });
      setStatus("success");

      setFormData({
        name: "",
        regNo: "",
        department: "",
        year: "1st Year",
        domains: [],
        experience: "",
        portfolio: "",
        reason: "",
      });
    } catch (error) {
      console.error(
        "Error submitting form: ",
        error
      );

      setStatus("error");
    }
  };

  const toggleDomain = (domain: string) => {
    setFormData((prev) => {
      const isSelected =
        prev.domains.includes(domain);

      if (isSelected) {
        return {
          ...prev,
          domains: prev.domains.filter(
            (d) => d !== domain
          ),
        };
      }

      if (prev.domains.length >= 2) {
        alert(
          "You can only select up to 2 domains."
        );

        return prev;
      }

      return {
        ...prev,
        domains: [...prev.domains, domain],
      };
    });
  };

  if (recruitOpen === null) {
    return (
      <main className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex items-center justify-center">
        <ParticlesBackground />
        <div className="text-gray-900 dark:text-white font-orbitron font-bold text-lg animate-pulse">
          LOADING...
        </div>
      </main>
    );
  }

  return (
    <main
      className="
      relative
      min-h-screen
      bg-white dark:bg-black
      transition-colors duration-500
      overflow-hidden
      "
    >
      <ParticlesBackground />

      {/* Ambient Glow */}
      <div
        className="
        absolute top-1/3 left-1/2
        -translate-x-1/2
        w-[700px] h-[700px]
        bg-red-600/5 dark:bg-red-600/10
        rounded-full
        blur-3xl
        pointer-events-none
        "
      ></div>

      <div
        className="
        pt-32 pb-24 px-6
        relative z-10
        "
      >
        <div
          className="
          max-w-3xl mx-auto

          bg-white/80 dark:bg-zinc-900/80
          backdrop-blur-md

          p-8 md:p-12

          rounded-3xl

          shadow-2xl

          border border-gray-200 dark:border-zinc-700

          transition-colors duration-500
          "
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div
              className="
              w-14 h-14
              bg-white dark:bg-zinc-900
              flex items-center justify-center
              rounded-xl
              border border-gray-200 dark:border-zinc-700
              shadow-sm
              overflow-hidden
              p-1
              "
            >
              <Image
                src="/WhatsApp Image 2026-05-04 at 16.38.06.jpeg"
                alt="AutoVIT Logo"
                width={42}
                height={42}
                className="
                object-contain
                dark:hidden
                "
              />
              <Image
                src="/autovit-logo-dark.jpeg"
                alt="AutoVIT Logo"
                width={42}
                height={42}
                className="
                object-contain
                hidden dark:block
                "
              />
            </div>

            <h1
              className="
              font-orbitron
              text-3xl md:text-4xl
              font-black
              uppercase
              tracking-tighter
              text-gray-900 dark:text-white
              "
            >
              Recruitment Form
            </h1>
          </div>

          {/* SUCCESS or CLOSED */}
          {!recruitOpen ? (
            <div
              className="
              flex flex-col
              items-center justify-center
              py-12
              text-center
              animate-fade-in
              "
            >
              <div
                className="
                w-20 h-20
                bg-red-100 dark:bg-red-500/10
                text-red-600 dark:text-red-500
                rounded-full
                flex items-center justify-center
                mb-6
                border border-red-500/20
                shadow-[0_0_20px_rgba(220,38,38,0.15)]
                "
              >
                <AlertCircle size={40} className="animate-pulse" />
              </div>

              <h2
                className="
                font-orbitron
                text-2xl md:text-3xl
                font-black
                uppercase
                tracking-tighter
                text-gray-900 dark:text-white
                mb-4
                "
              >
                Recruitments Closed
              </h2>

              <p
                className="
                font-rajdhani
                font-semibold
                text-gray-600 dark:text-gray-400
                max-w-md
                text-lg
                leading-relaxed
                mb-8
                "
              >
                Thank you for your interest! The recruitment form is currently closed. Keep an eye on our social media for future updates.
              </p>

              <Link
                href="/"
                className="
                btn-primary
                shadow-[0_0_20px_rgba(90,18,18,0.3)]
                hover:shadow-[0_0_30px_rgba(90,18,18,0.6)]
                "
              >
                GO BACK HOME
              </Link>
            </div>
          ) : status === "success" ? (
            <div
              className="
              flex flex-col
              items-center justify-center
              py-12
              text-center
              animate-fade-in
              "
            >
              <div
                className="
                w-20 h-20
                bg-green-100 dark:bg-green-500/10
                text-green-600
                rounded-full
                flex items-center justify-center
                mb-6
                "
              >
                <CheckCircle2 size={48} />
              </div>

              <h2
                className="
                text-3xl
                font-orbitron
                font-bold
                uppercase
                mb-4
                text-gray-900 dark:text-white
                "
              >
                Application Submitted!
              </h2>

              <p
                className="
                text-gray-600 dark:text-gray-400
                mb-6
                max-w-md
                "
              >
                Thank you for your interest in AutoVIT.
                Your application has been received successfully.
              </p>

              {/* Credentials Display */}
              <div
                className="
                w-full max-w-md
                bg-gray-50 dark:bg-zinc-800/80
                border border-gray-200 dark:border-zinc-700
                rounded-2xl
                p-6
                mb-8
                text-left
                space-y-4
                "
              >
                <h3 className="text-xs font-black uppercase tracking-wider text-red-600 border-b border-gray-200 dark:border-zinc-700 pb-2">
                  Your Quiz Login Credentials
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Please save these credentials. You will need them to take the recruitment quiz.
                </p>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between items-center bg-white dark:bg-zinc-900 px-4 py-3 rounded-lg border border-gray-100 dark:border-zinc-800">
                    <span className="text-gray-400 text-[10px] font-bold">UNIQUE CODE:</span>
                    <span className="font-bold text-gray-900 dark:text-white select-all">{credentials?.code}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white dark:bg-zinc-900 px-4 py-3 rounded-lg border border-gray-100 dark:border-zinc-800">
                    <span className="text-gray-400 text-[10px] font-bold">PASSWORD:</span>
                    <span className="font-bold text-gray-900 dark:text-white select-all">{credentials?.password}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (credentials) {
                        navigator.clipboard.writeText(`Code: ${credentials.code}\nPassword: ${credentials.password}`);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }
                    }}
                    className="
                    flex-1
                    bg-gray-100 dark:bg-zinc-700
                    hover:bg-gray-200 dark:hover:bg-zinc-600
                    text-gray-800 dark:text-white
                    font-black uppercase tracking-wider text-[10px]
                    py-3 px-4
                    rounded-lg
                    transition-all
                    "
                  >
                    {copied ? "Copied!" : "Copy Info"}
                  </button>
                  <a
                    href="/quiz"
                    className="
                    flex-1
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    font-black uppercase tracking-wider text-[10px]
                    py-3 px-4
                    rounded-lg
                    text-center
                    transition-all
                    "
                  >
                    Go To Quiz
                  </a>
                </div>
              </div>

              <button
                onClick={() =>
                  setStatus("idle")
                }
                className="
                btn-primary
                shadow-[0_0_20px_rgba(90,18,18,0.3)]
                hover:shadow-[0_0_30px_rgba(90,18,18,0.6)]
                "
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {(() => {
                const inputClass = `
                  w-full

                  bg-gray-50 dark:bg-zinc-800

                  border border-gray-200 dark:border-zinc-700

                  px-6 py-4

                  rounded-xl

                  focus:outline-none
                  focus:border-red-600
                  focus:ring-2 focus:ring-red-600/20

                  transition-all

                  text-gray-900 dark:text-white

                  placeholder:text-gray-400
                `;

                return (
                  <>
                    {/* Name + Reg */}
                    <div className="grid md:grid-cols-2 gap-6">

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          Full Name
                        </label>

                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          Registration Number
                        </label>

                        <input
                          required
                          type="text"
                          value={formData.regNo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              regNo: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Department + Year */}
                    <div className="grid md:grid-cols-2 gap-6">

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          Department / Branch
                        </label>

                        <input
                          required
                          type="text"
                          value={formData.department}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              department:
                                e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          Year of Study
                        </label>

                        <div className="relative">
                          <select
                            required
                            value={formData.year}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                year: e.target.value,
                              })
                            }
                            className={`
                              ${inputClass}

                              appearance-none

                              pr-14
                            `}
                          >
                            {years.map((year) => (
                              <option
                                key={year}
                                value={year}
                                className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                              >
                                {year}
                              </option>
                            ))}
                          </select>

                          <div
                            className="
                            pointer-events-none

                            absolute
                            right-5
                            top-1/2
                            -translate-y-1/2

                            text-gray-500 dark:text-gray-400

                            text-xs
                            "
                          >
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Domains */}
                    <div className="space-y-4">

                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          Interested Domains
                        </label>

                        <span
                          className="
                          text-[10px]
                          text-gray-400
                          uppercase
                          font-bold
                          tracking-widest
                          "
                        >
                          {formData.domains.length} / 2
                          Selected
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {domains.map((domain) => (
                          <button
                            key={domain}
                            type="button"
                            onClick={() =>
                              toggleDomain(domain)
                            }
                            className={cn(
                              `
                              flex items-center gap-3
                              px-6 py-4
                              border
                              rounded-xl
                              transition-all duration-300
                              `,
                              formData.domains.includes(
                                domain
                              )
                                ? `
                                  bg-red-600/10
                                  border-red-600
                                  text-red-600
                                  shadow-[0_0_18px_rgba(90,18,18,0.2)]
                                `
                                : `
                                  bg-gray-50 dark:bg-zinc-800
                                  border-gray-200 dark:border-zinc-700
                                  text-gray-500 dark:text-gray-400
                                  hover:border-red-500/40
                                `
                            )}
                          >
                            <div
                              className={cn(
                                `
                                w-4 h-4
                                rounded-full
                                border-2
                                flex items-center justify-center
                                `,
                                formData.domains.includes(
                                  domain
                                )
                                  ? "border-primary"
                                  : "border-gray-400"
                              )}
                            >
                              {formData.domains.includes(
                                domain
                              ) && (
                                <div
                                  className="
                                  w-2 h-2
                                  bg-primary
                                  rounded-full
                                  "
                                ></div>
                              )}
                            </div>

                             <div className="flex flex-col items-start text-left">
                              <span
                                className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-widest
                                "
                              >
                                {domain}
                              </span>
                              {formData.domains.includes(domain) && (
                                <span className="text-[9px] font-black uppercase text-red-600 dark:text-red-500 tracking-wider mt-1">
                                  {formData.domains.indexOf(domain) === 0 ? "1st Preference" : "2nd Preference"}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-primary">
                        Previous Projects / Experience
                      </label>

                      <textarea
                        required
                        value={formData.experience}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            experience:
                              e.target.value,
                          })
                        }
                        rows={4}
                        className={inputClass}
                      ></textarea>
                    </div>

                    {/* Portfolio */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-primary">
                        Portfolio / Projects Link
                      </label>

                      <input
                        required
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            portfolio:
                              e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-primary">
                        Why do you want to join
                        AutoVIT?
                      </label>

                      <textarea
                        required
                        value={formData.reason}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reason: e.target.value,
                          })
                        }
                        rows={4}
                        className={inputClass}
                      ></textarea>
                    </div>
                  </>
                );
              })()}

              {/* Error */}
              {status === "error" && (
                <div
                  className="
                  bg-red-50 dark:bg-[#991b1b]/10
                  text-red-600
                  p-4
                  rounded-xl
                  flex items-center gap-3
                  "
                >
                  <AlertCircle size={20} />

                  <span className="text-sm font-medium">
                    Something went wrong.
                    Please try again.
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                disabled={status === "loading"}
                type="submit"
                className="
                btn-primary
                w-full
                py-5
                uppercase
                font-black
                tracking-[0.2em]
                disabled:opacity-50

                shadow-[0_0_20px_rgba(90,18,18,0.3)]
                hover:shadow-[0_0_30px_rgba(90,18,18,0.6)]
                "
              >
                {status === "loading"
                  ? "Submitting..."
                  : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}



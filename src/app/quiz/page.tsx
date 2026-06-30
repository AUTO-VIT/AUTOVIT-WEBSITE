"use client";

import { useState, useEffect, useRef } from "react";
import { ref, get, set, serverTimestamp } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Clock, Lock, ArrowRight, User } from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: "mcq" | "brief";
  options?: string[];
  autoGrade?: boolean;
  correctAnswer?: number;
}

interface Credentials {
  name: string;
  regNo: string;
  firstPref: string;
  secondPref: string;
}

export default function QuizPage() {
  // Authentication & Flow State
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [session, setSession] = useState<{
    code: string;
    creds: Credentials;
  } | null>(null);

  const [view, setView] = useState<"login" | "select" | "quiz" | "success">("login");
  const [selectedDept, setSelectedDept] = useState<"Technical" | "Management" | "Social Media">("Technical");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizLoading, setQuizLoading] = useState(false);

  // Quiz running state
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start checking elapsed time once quiz starts
  useEffect(() => {
    if (view === "quiz" && startTime > 0) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view, startTime]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const formattedCode = code.trim().toUpperCase();
    const formattedPassword = password.trim().toLowerCase();

    if (!formattedCode || !formattedPassword) {
      setAuthError("Please fill in both fields.");
      setAuthLoading(false);
      return;
    }

    try {
      // 1. Verify credentials
      const credRef = ref(rtdb, `quiz_credentials/${formattedCode}`);
      const credSnap = await get(credRef);

      if (!credSnap.exists()) {
        setAuthError("Invalid Code or Password.");
        setAuthLoading(false);
        return;
      }

      const credData = credSnap.val();
      if (credData.password !== formattedPassword) {
        setAuthError("Invalid Code or Password.");
        setAuthLoading(false);
        return;
      }

      // 2. Check quiz attempt status
      const statusRef = ref(rtdb, `quiz_status/${formattedCode}`);
      const statusSnap = await get(statusRef);

      if (statusSnap.exists()) {
        const statusData = statusSnap.val();
        if (statusData.completed) {
          setAuthError("You have already completed the recruitment quiz. You cannot retake it.");
          setAuthLoading(false);
          return;
        } else if (statusData.started) {
          setAuthError("Quiz session expired. You already started this quiz or exited. No second chances are allowed.");
          setAuthLoading(false);
          return;
        }
      }

      // 3. Login successful
      setSession({
        code: formattedCode,
        creds: {
          name: credData.name,
          regNo: credData.regNo,
          firstPref: credData.firstPref,
          secondPref: credData.secondPref,
        },
      });

      // Default selected quiz to their first preference if valid
      if (
        credData.firstPref === "Technical" ||
        credData.firstPref === "Management" ||
        credData.firstPref === "Social Media"
      ) {
        setSelectedDept(credData.firstPref);
      }

      setView("select");
    } catch (error) {
      console.error("Login Error:", error);
      setAuthError("An error occurred during login. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    if (!session) return;
    setQuizLoading(true);

    try {
      // 1. Fetch questions first to make sure they exist
      const questionsRef = ref(rtdb, `quizzes/${selectedDept}`);
      const questionsSnap = await get(questionsRef);

      if (!questionsSnap.exists()) {
        alert(`No questions configured for ${selectedDept} quiz yet. Please try another department or contact admin.`);
        setQuizLoading(false);
        return;
      }

      const qData = questionsSnap.val();
      const list = Object.keys(qData).map((key) => ({
        id: key,
        ...qData[key],
      })) as Question[];

      if (list.length === 0) {
        alert(`No questions configured for ${selectedDept} quiz yet.`);
        setQuizLoading(false);
        return;
      }

      setQuestions(list);

      // 2. Mark session as started in DB
      const statusRef = ref(rtdb, `quiz_status/${session.code}`);
      const now = Date.now();
      await set(statusRef, {
        started: true,
        completed: false,
        department: selectedDept,
        startTime: now,
      });

      // 3. Set local quiz state
      setStartTime(now);
      setElapsedTime(0);
      setAnswers({});
      setView("quiz");
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Failed to start quiz. Please try again.");
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerChange = (qId: string, val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: val,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!session || !startTime) return;
    if (!confirm("Are you sure you want to submit the quiz? This action is final.")) return;

    setQuizLoading(true);

    try {
      const now = Date.now();
      const timeTakenSec = Math.floor((now - startTime) / 1000);

      // Calculate score if autoGrade is enabled
      let score = 0;
      let gradableQuestionsCount = 0;

      questions.forEach((q) => {
        if (q.type === "mcq" && q.autoGrade && q.options && typeof q.correctAnswer === "number") {
          gradableQuestionsCount++;
          const selectedAnsIndexStr = answers[q.id]; // We will store index as string in UI
          if (selectedAnsIndexStr === String(q.correctAnswer)) {
            score++;
          }
        }
      });

      // Save responses
      const responseRef = ref(rtdb, `quiz_responses/${session.code}`);
      await set(responseRef, {
        name: session.creds.name,
        regNo: session.creds.regNo,
        department: selectedDept,
        answers,
        score: gradableQuestionsCount > 0 ? score : "N/A",
        timeTaken: timeTakenSec,
        timestamp: serverTimestamp(),
      });

      // Update quiz status to completed
      const statusRef = ref(rtdb, `quiz_status/${session.code}`);
      await set(statusRef, {
        started: true,
        completed: true,
        department: selectedDept,
        startTime,
        endTime: now,
        timeTaken: timeTakenSec,
      });

      setView("success");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred while submitting your quiz. Please try again.");
    } finally {
      setQuizLoading(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleLogout = () => {
    setSession(null);
    setView("login");
    setCode("");
    setPassword("");
    setAnswers({});
    setQuestions([]);
  };

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
    <main className="relative min-h-screen bg-white dark:bg-black transition-colors duration-500 overflow-hidden flex flex-col justify-between">
      <ParticlesBackground />

      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/5 dark:bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="pt-32 pb-24 px-6 relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 transition-all duration-500">
          
          {/* Logo / Header */}
          {view !== "quiz" && (
            <div className="flex items-center gap-4 mb-10 justify-center">
              <div className="w-14 h-14 bg-white dark:bg-zinc-900 flex items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden p-1">
                <Image
                  src="/WhatsApp Image 2026-05-04 at 16.38.06.jpeg"
                  alt="AutoVIT Logo"
                  width={42}
                  height={42}
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/autovit-logo-dark.jpeg"
                  alt="AutoVIT Logo"
                  width={42}
                  height={42}
                  className="object-contain hidden dark:block"
                />
              </div>
              <h1 className="font-orbitron text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
                AutoVIT Recruitment Quiz
              </h1>
            </div>
          )}

          {/* VIEW: LOGIN */}
          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="text-center space-y-2 mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-black">
                  Enter your recruitment credentials below to begin.
                </p>
              </div>

              {authError && (
                <div className="bg-red-50 dark:bg-[#991b1b]/10 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-900/30">
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="text-xs font-semibold">{authError}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-500">
                  Unique Code
                </label>
                <input
                  required
                  type="text"
                  placeholder="AUTOXXXX"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-500">
                  Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>

              <button
                disabled={authLoading}
                type="submit"
                className="btn-primary w-full py-5 uppercase font-black tracking-[0.2em] disabled:opacity-50 shadow-[0_0_20px_rgba(90,18,18,0.3)] hover:shadow-[0_0_30px_rgba(90,18,18,0.6)]"
              >
                {authLoading ? "Authenticating..." : "Login to Quiz"}
              </button>
            </form>
          )}

          {/* VIEW: SELECT QUIZ */}
          {view === "select" && session && (
            <div className="space-y-8">
              {/* Candidate Bio */}
              <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-4">
                <div className="flex items-center gap-3 text-red-600 dark:text-red-500">
                  <User size={20} />
                  <h3 className="font-orbitron font-bold text-sm uppercase tracking-wide">Candidate Profile</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-xs font-medium">
                  <div>
                    <span className="text-gray-400 block mb-0.5">NAME</span>
                    <span className="text-gray-900 dark:text-white uppercase font-bold">{session.creds.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">REGISTRATION NUMBER</span>
                    <span className="text-gray-900 dark:text-white font-mono uppercase font-bold">{session.creds.regNo}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">1ST PREFERENCE</span>
                    <span className="text-gray-900 dark:text-white uppercase font-bold">{session.creds.firstPref || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">2ND PREFERENCE</span>
                    <span className="text-gray-900 dark:text-white uppercase font-bold">{session.creds.secondPref || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-red-600/5 border border-red-600/20 rounded-2xl p-6 space-y-3">
                <h4 className="font-orbitron text-xs font-black uppercase text-red-600 dark:text-red-500 flex items-center gap-2">
                  <Lock size={14} /> Critical Test Rules
                </h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                  <li>You can only attempt <span className="font-bold text-red-600">one quiz</span> once.</li>
                  <li>Once you click <strong>Start Quiz</strong>, you cannot go back, reload, or close the page.</li>
                  <li>If you reload, log out, or close the browser, you will be locked out and lose your chance.</li>
                </ul>
              </div>

              {/* Select Department Quiz */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-500">
                  Select Department Quiz
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {(["Technical", "Management", "Social Media"] as const).map((dept) => (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setSelectedDept(dept)}
                      className={cn(
                        "py-5 px-4 rounded-xl border font-orbitron text-xs font-black uppercase tracking-widest transition-all text-center flex flex-col items-center justify-center gap-1",
                        selectedDept === dept
                          ? "bg-red-600/10 border-red-600 text-red-600 shadow-[0_0_15px_rgba(90,18,18,0.2)]"
                          : "bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-red-500/40"
                      )}
                    >
                      <span>{dept}</span>
                      {(session.creds.firstPref === dept || session.creds.secondPref === dept) && (
                        <span className="text-[8px] font-sans font-bold bg-red-600 text-white px-2 py-0.5 rounded-full mt-1">
                          {session.creds.firstPref === dept ? "Pref 1" : "Pref 2"}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-1/3 py-5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-750 text-gray-700 dark:text-white rounded-xl uppercase font-black tracking-widest text-xs transition-colors"
                >
                  Log Out
                </button>
                <button
                  disabled={quizLoading}
                  onClick={handleStartQuiz}
                  type="button"
                  className="flex-1 py-5 btn-primary uppercase font-black tracking-widest text-xs shadow-[0_0_20px_rgba(90,18,18,0.3)] flex items-center justify-center gap-2"
                >
                  {quizLoading ? "Loading..." : "Start Quiz"} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* VIEW: QUIZ ACTIVE */}
          {view === "quiz" && session && (
            <div className="space-y-8">
              {/* Header Details */}
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 pb-4">
                <div>
                  <h3 className="font-orbitron font-black text-sm uppercase text-gray-900 dark:text-white">
                    {selectedDept} Quiz
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                    Candidate: {session.creds.name} ({session.creds.regNo})
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-red-600/10 border border-red-650/20 text-red-600 px-4 py-2 rounded-xl">
                  <Clock size={16} />
                  <span className="font-mono text-sm font-black">{formatTime(elapsedTime)}</span>
                </div>
              </div>

              {/* Questions list */}
              <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="space-y-4 p-5 rounded-2xl bg-gray-50/50 dark:bg-zinc-850/30 border border-gray-150 dark:border-zinc-800/80"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs font-bold font-mono text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-500/10 px-2 py-0.5 rounded">
                        Q{idx + 1}
                      </span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                        {q.text}
                      </p>
                    </div>

                    {/* MCQ Options */}
                    {q.type === "mcq" && q.options && (
                      <div className="grid gap-3 pt-2 pl-7">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = answers[q.id] === String(oIdx);
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleAnswerChange(q.id, String(oIdx))}
                              className={cn(
                                "text-left text-xs font-semibold px-4 py-3 rounded-xl border transition-all flex items-center gap-3",
                                isSelected
                                  ? "bg-red-600/10 border-red-600 text-red-600 font-black shadow-sm"
                                  : "bg-white dark:bg-zinc-800/40 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 hover:border-red-500/35"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0",
                                  isSelected ? "border-red-600" : "border-gray-400"
                                )}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>}
                              </div>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Brief Text Area */}
                    {q.type === "brief" && (
                      <div className="pl-7">
                        <textarea
                          rows={4}
                          placeholder="Type your answer here..."
                          value={answers[q.id] || ""}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit button */}
              <div className="border-t border-gray-200 dark:border-zinc-800 pt-6">
                <button
                  disabled={quizLoading}
                  onClick={handleSubmitQuiz}
                  className="btn-primary w-full py-5 uppercase font-black tracking-widest text-xs shadow-[0_0_20px_rgba(90,18,18,0.3)]"
                >
                  {quizLoading ? "Submitting..." : "Submit Recruitment Quiz"}
                </button>
              </div>
            </div>
          )}

          {/* VIEW: SUCCESS */}
          {view === "success" && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} />
              </div>

              <h2 className="text-3xl font-orbitron font-bold uppercase mb-4 text-gray-900 dark:text-white">
                Quiz Submitted!
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-sm font-medium">
                Thank you for completing the AutoVIT recruitment quiz. Your answers have been registered securely. Our team will review your application soon.
              </p>

              <button
                onClick={handleLogout}
                className="btn-primary shadow-[0_0_20px_rgba(90,18,18,0.3)] hover:shadow-[0_0_30px_rgba(90,18,18,0.6)]"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

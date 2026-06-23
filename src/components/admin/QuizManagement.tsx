"use client";

import { useState, useEffect } from "react";
import { ref, push, remove, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Trash2, Plus, HelpCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  type: "mcq" | "brief";
  options?: string[];
  autoGrade?: boolean;
  correctAnswer?: number;
}

export default function QuizManagement() {
  const [selectedDept, setSelectedDept] = useState<"Technical" | "Management" | "Social Media">("Technical");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [text, setText] = useState("");
  const [type, setType] = useState<"mcq" | "brief">("mcq");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [autoGrade, setAutoGrade] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const quizRef = ref(rtdb, `quizzes/${selectedDept}`);
    const unsubscribe = onValue(
      quizRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          })) as Question[];
          setQuestions(list);
        } else {
          setQuestions([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firebase RTDB Error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [selectedDept]);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter question text.");
      return;
    }

    const questionData: Partial<Question> = {
      text: text.trim(),
      type,
    };

    if (type === "mcq") {
      // Validate options
      if (options.some((opt) => !opt.trim())) {
        alert("Please fill all 4 options.");
        return;
      }
      questionData.options = options.map((opt) => opt.trim());
      questionData.autoGrade = autoGrade;
      if (autoGrade) {
        questionData.correctAnswer = correctAnswer;
      }
    }

    try {
      const quizRef = ref(rtdb, `quizzes/${selectedDept}`);
      await push(quizRef, questionData);
      
      // Reset Form
      setText("");
      setType("mcq");
      setOptions(["", "", "", ""]);
      setAutoGrade(false);
      setCorrectAnswer(0);
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question.");
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    try {
      await remove(ref(rtdb, `quizzes/${selectedDept}/${id}`));
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question.");
    }
  };

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...options];
    updated[index] = val;
    setOptions(updated);
  };

  const depts: ("Technical" | "Management" | "Social Media")[] = [
    "Technical",
    "Management",
    "Social Media",
  ];

  const inputClass = `
    w-full
    bg-gray-50 dark:bg-zinc-800
    border border-gray-200 dark:border-zinc-700
    px-4 py-3
    rounded-xl
    focus:outline-none
    focus:border-red-650
    focus:ring-2 focus:ring-red-600/20
    transition-all
    text-gray-900 dark:text-white
    placeholder:text-gray-400
    text-sm
  `;

  return (
    <div className="space-y-10">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 border-b border-gray-200 dark:border-zinc-850 pb-6">
        <div>
          <h2 className="font-orbitron text-2xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
            Quiz Question Bank
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1">
            Configure questions for recruitment candidate tests
          </p>
        </div>

        {/* Dept Selector Tabs */}
        <div className="flex bg-gray-100 dark:bg-zinc-800/50 p-1 rounded-xl border border-gray-200 dark:border-zinc-850">
          {depts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={cn(
                "px-5 py-2 rounded-lg text-xs font-orbitron font-bold uppercase tracking-wider transition-all",
                selectedDept === d
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:text-red-600"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form to Add Question */}
        <div className="lg:col-span-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-6 border border-gray-200 dark:border-zinc-800 rounded-3xl space-y-6 self-start">
          <h3 className="font-orbitron text-sm font-black uppercase tracking-wider text-red-600 dark:text-red-500 flex items-center gap-2">
            <Plus size={16} /> Add New Question
          </h3>

          <form onSubmit={handleAddQuestion} className="space-y-4">
            {/* Question Text */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Question Text
              </label>
              <textarea
                required
                rows={3}
                placeholder="Type question here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Question Type */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Question Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "mcq" | "brief")}
                className={inputClass}
              >
                <option value="mcq">Multiple Choice Question (MCQ)</option>
                <option value="brief">Brief Answer (Text Response)</option>
              </select>
            </div>

            {/* Options for MCQ */}
            {type === "mcq" && (
              <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  MCQ Options
                </label>
                {options.map((opt, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <span className="text-xs font-mono text-gray-400">{idx + 1}.</span>
                    <input
                      required={type === "mcq"}
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      className={inputClass}
                    />
                  </div>
                ))}

                {/* Auto-Grade Option */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Enable Auto-grading
                  </span>
                  <button
                    type="button"
                    onClick={() => setAutoGrade(!autoGrade)}
                    className="text-red-650 dark:text-red-500 hover:opacity-80 transition-opacity"
                  >
                    {autoGrade ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>

                {autoGrade && (
                  <div className="space-y-1 pt-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      Correct Answer
                    </label>
                    <select
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(Number(e.target.value))}
                      className={inputClass}
                    >
                      {options.map((opt, idx) => (
                        <option key={idx} value={idx}>
                          Option {idx + 1}: {opt.substring(0, 30) || `Option ${idx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="
              btn-primary
              w-full
              py-3
              text-[10px]
              font-black
              uppercase
              tracking-widest
              shadow-[0_0_15px_rgba(90,18,18,0.2)]
              hover:shadow-[0_0_20px_rgba(90,18,18,0.4)]
              "
            >
              Add to Question Bank
            </button>
          </form>
        </div>

        {/* Existing Questions List */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-orbitron text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">
            Current Questions ({questions.length})
          </h3>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-600/20 border-t-red-600"></div>
            </div>
          ) : questions.length > 0 ? (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {questions.map((q, qidx) => (
                <div
                  key={q.id}
                  className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-red-500/20 transition-all flex justify-between items-start gap-4"
                >
                  <div className="space-y-3 flex-1">
                    {/* Badge / Type */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold font-mono text-gray-400">
                        Q{qidx + 1}
                      </span>
                      <span
                        className={cn(
                          "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                          q.type === "mcq"
                            ? "bg-red-600/10 text-red-600 dark:text-red-500"
                            : "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                        )}
                      >
                        {q.type}
                      </span>
                      {q.type === "mcq" && (
                        <span
                          className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                            q.autoGrade
                              ? "bg-green-600/10 text-green-600"
                              : "bg-yellow-600/10 text-yellow-600"
                          )}
                        >
                          {q.autoGrade ? "Auto-Graded" : "Manual Grading"}
                        </span>
                      )}
                    </div>

                    {/* Question text */}
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {q.text}
                    </p>

                    {/* Options list */}
                    {q.type === "mcq" && q.options && (
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={cn(
                              "px-3 py-1.5 rounded-lg border flex items-center gap-2",
                              q.autoGrade && q.correctAnswer === oIdx
                                ? "bg-green-600/5 border-green-500/20 text-green-600"
                                : "bg-gray-50 dark:bg-zinc-800/40 border-gray-100 dark:border-zinc-800"
                            )}
                          >
                            <span className="font-mono text-[9px] font-bold text-gray-400">{oIdx + 1}.</span>
                            <span>{opt}</span>
                            {q.autoGrade && q.correctAnswer === oIdx && (
                              <span className="text-[8px] font-black uppercase bg-green-600 text-white px-1.5 py-0.5 rounded ml-auto">Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1.5 bg-gray-50 dark:bg-zinc-800/60 rounded-lg hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-zinc-700"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-3xl p-16 text-center text-gray-400 dark:text-gray-500 flex flex-col items-center gap-4">
              <HelpCircle size={48} strokeWidth={1} />
              <p className="font-orbitron text-xs font-black uppercase tracking-widest">
                No questions added to this department yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

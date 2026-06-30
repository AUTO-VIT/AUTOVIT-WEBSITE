"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ref,
  onValue,
  remove,
  set,
} from "firebase/database";

import { rtdb } from "@/lib/firebase";

import {
  Download,
  Trash2,
  Filter,
  Inbox,
  Power,
} from "lucide-react";

import { formatDate, cn } from "@/lib/utils";

import Papa from "papaparse";

interface Application {
  id: string;
  name: string;
  regNo: string;
  department: string;
  year: string;
  domains: string[];
  experience: string;
  portfolio: string;
  reason: string;
  timestamp: any;
  firstPref?: string;
  secondPref?: string;
  uniqueCode?: string;
  password?: string;
}

export default function RecruitmentDashboard() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("All");

  const [recruitOpen, setRecruitOpen] =
    useState(true);

  const [quizResponses, setQuizResponses] = useState<Record<string, any>>({});
  const [quizzesData, setQuizzesData] = useState<Record<string, any>>({});

  useEffect(() => {
    const recruitRef = ref(
      rtdb,
      "recruitments"
    );

    const unsubscribeRecruit = onValue(
      recruitRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const list = Object.keys(data).map(
            (key) => ({
              id: key,
              ...data[key],
            })
          ) as Application[];

          setApplications(list.reverse());
        } else {
          setApplications([]);
        }

        setLoading(false);
      },
      (error) => {
        console.error("Firebase RTDB Error:", error);
        setLoading(false);
      }
    );

    const responsesRef = ref(rtdb, "quiz_responses");
    const unsubscribeResponses = onValue(responsesRef, (snapshot) => {
      setQuizResponses(snapshot.val() || {});
    });

    const quizzesRef = ref(rtdb, "quizzes");
    const unsubscribeQuizzes = onValue(quizzesRef, (snapshot) => {
      setQuizzesData(snapshot.val() || {});
    });

    const statusRef = ref(rtdb, "settings/recruitOpen");
    const unsubscribeStatus = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      setRecruitOpen(data !== false);
    });

    return () => {
      unsubscribeRecruit();
      unsubscribeResponses();
      unsubscribeQuizzes();
      unsubscribeStatus();
    };
  }, []);

  const filteredApps =
    filter === "All"
      ? applications
      : applications.filter((app) =>
          app.domains.includes(filter)
        );

  const stats = [
    {
      label: "TOTAL APPS",
      value: applications.length,
    },

    {
      label: "TECHNICAL",
      value: applications.filter((a) =>
        a.domains.includes("Technical")
      ).length,
    },

    {
      label: "MANAGEMENT",
      value: applications.filter((a) =>
        a.domains.includes("Management")
      ).length,
    },

    {
      label: "SOCIAL MEDIA",
      value: applications.filter((a) =>
        a.domains.includes("Social Media")
      ).length,
    },
  ];

  const exportCSV = () => {
    // 1. Collect all questions across all departments to serve as standard column headers
    const allQuestions: Record<string, string> = {};
    Object.keys(quizzesData).forEach((dept) => {
      const deptQuestions = quizzesData[dept] || {};
      Object.keys(deptQuestions).forEach((qId) => {
        allQuestions[qId] = deptQuestions[qId].text;
      });
    });

    const csvData = filteredApps.map((app) => {
      const candidateCode = app.uniqueCode;
      let response = candidateCode ? quizResponses[candidateCode] : null;
      if (!response) {
        const codeKey = Object.keys(quizResponses).find(
          (key) => quizResponses[key].regNo === app.regNo
        );
        if (codeKey) {
          response = quizResponses[codeKey];
        }
      }

      const row: Record<string, any> = {
        "Name": app.name,
        "Registration Number": app.regNo,
        "Department/Branch": app.department,
        "Year": app.year,
        "First Preference": app.firstPref || app.domains?.[0] || "",
        "Second Preference": app.secondPref || app.domains?.[1] || "",
        "Unique Code": app.uniqueCode || "N/A",
        "Password": app.password || "N/A",
        "Previous Projects/Experience": app.experience,
        "Portfolio Link": app.portfolio,
        "Why Join": app.reason,
        "Date Registered": formatDate(app.timestamp),
        "Quiz Attempted": response ? response.department : "No",
        "Quiz Score": response ? (response.score !== undefined ? response.score : "N/A") : "N/A",
      };

      // Map answers dynamically for all questions
      Object.keys(allQuestions).forEach((qId) => {
        const questionText = allQuestions[qId];
        let candidateAnswer = "";
        if (response && response.answers && response.answers[qId] !== undefined) {
          const answerVal = response.answers[qId];
          const questionObj = quizzesData[response.department]?.[qId];
          if (questionObj && questionObj.type === "mcq" && questionObj.options) {
            const optIdx = Number(answerVal);
            if (!isNaN(optIdx) && questionObj.options[optIdx]) {
              candidateAnswer = `${optIdx + 1}. ${questionObj.options[optIdx]}`;
            } else {
              candidateAnswer = answerVal;
            }
          } else {
            candidateAnswer = answerVal;
          }
        }
        row[`Q: ${questionText}`] = candidateAnswer || "N/A";
      });

      // Time taken goes to the very last column
      row["Time Taken (sec)"] = response ? (response.timeTaken !== undefined ? response.timeTaken : "N/A") : "N/A";

      return row;
    });

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link =
      document.createElement("a");

    const url =
      URL.createObjectURL(blob);

    link.setAttribute("href", url);

    link.setAttribute(
      "download",
      `recruitments_${new Date().toISOString()}.csv`
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const deleteApp = async (
    id: string
  ) => {
    if (
      !confirm(
        "Are you sure you want to delete this application?"
      )
    )
      return;

    try {
      await remove(
        ref(rtdb, `recruitments/${id}`)
      );

      alert(
        "Application deleted successfully."
      );
    } catch (error: any) {
      console.error(error);

      alert(
        `Failed to delete application`
      );
    }
  };

  const clearAll = async () => {
    if (
      !confirm(
        "Are you sure you want to clear ALL applications?"
      )
    )
      return;

    await remove(
      ref(rtdb, "recruitments")
    );
  };

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div
        className="
        flex flex-col lg:flex-row
        justify-between
        items-start

        gap-8
        "
      >
        <div className="space-y-4">
          
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
            RECRUITMENT DASHBOARD
          </h2>

          {/* Actions */}
          <div
            className="
            flex flex-wrap
            items-center
            gap-6

            text-[10px]

            font-black

            uppercase

            tracking-widest

            text-gray-400 dark:text-gray-500
            "
          >
            <button
              onClick={exportCSV}
              className="
              flex items-center gap-2

              hover:text-red-600

              transition-colors
              "
            >
              <Download size={14} />

              DOWNLOAD CSV
            </button>

            <button
              onClick={clearAll}
              className="
              flex items-center gap-2

              hover:text-red-600

              transition-colors
              "
            >
              <Trash2 size={14} />

              CLEAR ALL
            </button>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() =>
            set(ref(rtdb, "settings/recruitOpen"), !recruitOpen)
          }
          className={`
            flex items-center gap-3

            px-8 py-5

            rounded-xl

            font-orbitron
            text-xs
            font-black

            uppercase
            tracking-widest

            transition-all duration-300

            ${
              recruitOpen
                ? `
                  bg-red-600
                  text-white

                  shadow-[0_0_25px_rgba(90,18,18,0.35)]
                `
                : `
                  bg-white/60 dark:bg-zinc-900/60

                  border border-gray-200 dark:border-zinc-700

                  text-gray-500 dark:text-gray-400
                `
            }
          `}
        >
          <Power size={16} />

          RECRUITMENT:{" "}

          {recruitOpen
            ? "OPEN"
            : "CLOSED"}
        </button>
      </div>

      {/* Stats */}
      <div
        className="
        grid
        grid-cols-2 lg:grid-cols-4
        gap-6
        "
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="
            bg-white/60 dark:bg-zinc-900/60

            backdrop-blur-md

            p-8

            border border-gray-200 dark:border-zinc-800

            rounded-3xl

            text-center

            space-y-4

            hover:border-red-500/30

            hover:shadow-[0_0_25px_rgba(90,18,18,0.12)]

            transition-all duration-300
            "
          >
            <div className="flex justify-center">
              
              <div
                className="
                w-8 h-8

                border-2 border-red-600

                flex items-center justify-center

                relative
                "
              >
                <div
                  className="
                  absolute inset-1

                  bg-red-600

                  opacity-20
                  "
                ></div>

                <div
                  className="
                  w-1 h-1

                  bg-red-600
                  "
                ></div>
              </div>
            </div>

            <p
              className="
              text-3xl

              font-orbitron

              font-black

              text-gray-900 dark:text-white
              "
            >
              {stat.value}
            </p>

            <p
              className="
              text-[10px]

              font-black

              uppercase
              tracking-widest

              text-gray-400 dark:text-gray-500
              "
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className="
        bg-white/60 dark:bg-zinc-900/60

        backdrop-blur-md

        border border-gray-200 dark:border-zinc-800

        rounded-3xl

        overflow-hidden
        "
      >
        {/* Top */}
        <div
          className="
          p-8

          border-b border-gray-200 dark:border-zinc-800

          flex flex-col md:flex-row
          justify-between items-start md:items-center

          gap-4

          bg-red-50/30 dark:bg-red-600/5
          "
        >
          <h3
            className="
            font-orbitron

            text-lg

            font-black

            uppercase
            tracking-tighter

            text-gray-900 dark:text-white
            "
          >
            APPLICATIONS
          </h3>

          {/* Filter Tabs */}
          <div className="flex bg-gray-100 dark:bg-zinc-800/40 p-1 rounded-xl border border-gray-200/50 dark:border-zinc-800 shrink-0">
            {[
              { id: "All", label: "Overall" },
              { id: "Technical", label: "Technical" },
              { id: "Management", label: "Management" },
              { id: "Social Media", label: "Social Media" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-orbitron font-black uppercase tracking-wider transition-all",
                  filter === t.id
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-red-600"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="p-20 flex justify-center">
            
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
        ) : filteredApps.length > 0 ? (

          /* Table Content */
          <div className="overflow-x-auto">
            
            <table className="w-full text-left">
              
              <thead>
                <tr
                  className="
                  border-b
                  border-gray-200 dark:border-zinc-800
                  "
                >
                  {[
                    "NAME",
                    "REG NO",
                    "YEAR",
                    "DOMAINS",
                    "DATE",
                    "ACTION",
                  ].map((h) => (
                    <th
                      key={h}
                      className="
                      px-8 py-6

                      text-[10px]

                      font-black

                      uppercase
                      tracking-widest

                      text-gray-400 dark:text-gray-500
                      "
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody
                className="
                divide-y
                divide-gray-100 dark:divide-zinc-800
                "
              >
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="
                    hover:bg-red-50/30
                    dark:hover:bg-red-600/5

                    transition-colors

                    group
                    "
                  >
                    <td
                      className="
                      px-8 py-6

                      font-black

                      text-sm

                      uppercase

                      text-gray-900 dark:text-white
                      "
                    >
                      {app.name}
                    </td>

                    <td
                      className="
                      px-8 py-6

                      text-xs

                      font-mono

                      text-gray-500 dark:text-gray-400
                      "
                    >
                      {app.regNo}
                    </td>

                    <td
                      className="
                      px-8 py-6

                      text-xs

                      font-bold

                      text-gray-400 dark:text-gray-500

                      uppercase
                      "
                    >
                      {app.year}
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        {app.domains.map((d, index) => (
                          <span
                            key={d}
                            className="
                            text-[8px]
                            font-black
                            uppercase
                            tracking-widest
                            bg-red-650 dark:bg-red-600
                            text-white
                            px-3 py-1
                            rounded-full
                            w-fit
                            "
                          >
                            {d} {index === 0 ? "(1st)" : "(2nd)"}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td
                      className="
                      px-8 py-6

                      text-[10px]

                      font-bold

                      text-gray-400 dark:text-gray-500
                      "
                    >
                      {formatDate(
                        app.timestamp
                      )}
                    </td>

                    <td className="px-8 py-6">
                      
                      <button
                        onClick={() =>
                          deleteApp(app.id)
                        }
                        className="
                        text-gray-400

                        hover:text-red-600

                        transition-colors
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (

          /* Empty */
          <div
            className="
            p-32

            flex flex-col
            items-center justify-center

            text-gray-400 dark:text-gray-500

            gap-6
            "
          >
            <Inbox
              size={64}
              strokeWidth={1}
            />

            <p
              className="
              font-orbitron

              text-sm

              font-black

              uppercase

              tracking-widest
              "
            >
              No applications found yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


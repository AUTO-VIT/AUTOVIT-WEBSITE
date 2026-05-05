"use client";

import { useEffect, useState } from "react";
import { ref, onValue, remove, query, orderByChild } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Download, Trash2, Filter, Inbox, Power } from "lucide-react";
import { formatDate } from "@/lib/utils";
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
}

export default function RecruitmentDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [recruitOpen, setRecruitOpen] = useState(true);

  useEffect(() => {
    const recruitRef = ref(rtdb, "recruitments");
    const unsubscribe = onValue(recruitRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })) as Application[];
        // Sort by timestamp desc manually if needed, or use query
        setApplications(list.reverse());
      } else {
        setApplications([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredApps = filter === "All" 
    ? applications 
    : applications.filter(app => app.domains.includes(filter));

  const stats = [
    { label: "TOTAL APPS", value: applications.length },
    { label: "TECHNICAL", value: applications.filter(a => a.domains.includes("Technical")).length },
    { label: "MANAGEMENT", value: applications.filter(a => a.domains.includes("Management")).length },
    { label: "SOCIAL MEDIA", value: applications.filter(a => a.domains.includes("Social Media")).length },
  ];

  const exportCSV = () => {
    const csv = Papa.unparse(filteredApps.map(({ id, timestamp, domains, ...rest }) => {
      const domainData: Record<string, string> = {};
      (domains || []).forEach((domain, idx) => {
        domainData[`Department_${idx + 1}`] = domain;
      });

      return {
        ...rest,
        ...domainData,
        date: formatDate(timestamp)
      };
    }));

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `recruitments_${new Date().toISOString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      console.log("Attempting to delete application with ID:", id);
      await remove(ref(rtdb, `recruitments/${id}`));
      alert("Application deleted successfully.");
    } catch (error: any) {
      console.error("Error deleting application:", error);
      alert(`Failed to delete application: ${error.message || "Unknown error"}`);
    }
  };

  const clearAll = async () => {
    if (!confirm("Are you sure you want to clear ALL applications? This cannot be undone.")) return;
    await remove(ref(rtdb, "recruitments"));
  };


  return (
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <h2 className="font-orbitron text-3xl font-black uppercase tracking-tighter">RECRUITMENT DASHBOARD</h2>
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <button onClick={exportCSV} className="flex items-center gap-2 hover:text-red-600 transition-colors">
              <Download size={14} /> DOWNLOAD CSV
            </button>
            <button onClick={clearAll} className="flex items-center gap-2 hover:text-red-600 transition-colors">
              <Trash2 size={14} /> CLEAR ALL
            </button>
          </div>
        </div>

        <button 
          onClick={() => setRecruitOpen(!recruitOpen)}
          className={`flex items-center gap-3 px-8 py-5 rounded-sm font-orbitron text-xs font-black uppercase tracking-widest shadow-xl transition-all ${
            recruitOpen ? "bg-red-600 text-white shadow-red-600/20" : "bg-gray-100 text-gray-400"
          }`}
        >
          <Power size={16} />
          RECRUITMENT: {recruitOpen ? "OPEN" : "CLOSED"}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-50/50 p-8 border border-gray-100 rounded-sm text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-red-600 flex items-center justify-center relative">
                <div className="absolute inset-1 bg-red-600 opacity-20"></div>
                <div className="w-1 h-1 bg-red-600"></div>
              </div>
            </div>
            <p className="text-3xl font-orbitron font-black">{stat.value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-red-50/30">
          <h3 className="font-orbitron text-lg font-black uppercase tracking-tighter">APPLICATIONS</h3>
          <div className="flex items-center gap-3">
            <Filter size={16} className="text-gray-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-[10px] font-black uppercase tracking-widest text-gray-500 focus:outline-none cursor-pointer"
            >
              <option value="All">ALL DOMAINS</option>
              <option value="Technical">TECHNICAL</option>
              <option value="Management">MANAGEMENT</option>
              <option value="Social Media">SOCIAL MEDIA</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600"></div></div>
        ) : filteredApps.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {["NAME", "REG NO", "YEAR", "DOMAINS", "DATE", "ACTION"].map(h => (
                    <th key={h} className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6 font-black text-sm uppercase">{app.name}</td>
                    <td className="px-8 py-6 text-xs font-mono text-gray-500">{app.regNo}</td>
                    <td className="px-8 py-6 text-xs font-bold text-gray-400 uppercase">{app.year}</td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        {app.domains.map(d => (
                          <span key={d} className="text-[8px] font-black uppercase tracking-widest bg-red-600 text-white px-3 py-1 rounded-sm">{d}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-bold text-gray-400">{formatDate(app.timestamp)}</td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => deleteApp(app.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
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
          <div className="p-32 flex flex-col items-center justify-center text-gray-300 gap-6">
            <Inbox size={64} strokeWidth={1} />
            <p className="font-orbitron text-sm font-black uppercase tracking-widest">No applications found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

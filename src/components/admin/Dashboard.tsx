"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import RecruitmentDashboard from "./RecruitmentDashboard";
import EventsManagement from "./EventsManagement";
import TeamManagement from "./TeamManagement";
import { cn } from "@/lib/utils";
import { Users, Calendar, LayoutDashboard } from "lucide-react";

const tabs = [
  { id: "recruit", label: "Recruitment", icon: LayoutDashboard },
  { id: "events", label: "Events", icon: Calendar },
  { id: "team", label: "Leadership Team", icon: Users },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("recruit");

  return (
    <div className="min-h-screen bg-white flex flex-col font-rajdhani">
      <div className="flex-1 w-full pt-32 px-6 md:px-12 pb-20">
        {/* Admin Header Section */}
        <div className="flex justify-between items-baseline mb-12 border-b border-gray-100 pb-8">
          <div className="space-y-2">
            <h1 className="font-orbitron text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
              ADMIN PANEL <span className="text-red-600">V2.0</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Manage AutoVIT content and club activities</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
          >
            LOGOUT
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-8 py-4 transition-all font-orbitron text-[10px] font-black uppercase tracking-widest border border-gray-100",
                activeTab === tab.id 
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20 border-red-600" 
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === "recruit" && <RecruitmentDashboard />}
          {activeTab === "events" && <EventsManagement />}
          {activeTab === "team" && <TeamManagement />}
        </div>
      </div>
    </div>
  );
}

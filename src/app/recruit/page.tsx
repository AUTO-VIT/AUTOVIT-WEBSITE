"use client";

import { useState } from "react";
import Image from "next/image";
import { ref, push, serverTimestamp } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import Footer from "@/components/layout/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

const domains = ["Technical", "Management", "Social Media"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

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

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.domains.length === 0) {
      alert("Please select at least one domain.");
      return;
    }

    setStatus("loading");
    try {
      const recruitRef = ref(rtdb, "recruitments");
      await push(recruitRef, {
        ...formData,
        timestamp: serverTimestamp(),
      });
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
      console.error("Error submitting form: ", error);
      setStatus("error");
    }
  };

  const toggleDomain = (domain: string) => {
    setFormData((prev) => {
      const isSelected = prev.domains.includes(domain);
      if (isSelected) {
        return {
          ...prev,
          domains: prev.domains.filter((d) => d !== domain),
        };
      }
      if (prev.domains.length >= 2) {
        alert("You can only select up to 2 domains.");
        return prev;
      }
      return {
        ...prev,
        domains: [...prev.domains, domain],
      };
    });
  };

  return (
    <main className="relative min-h-screen">
      <ParticlesBackground />
      
      <div className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-sm shadow-xl border border-gray-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm border border-gray-100 shadow-sm overflow-hidden p-1">
              <Image 
                src="/WhatsApp Image 2026-05-04 at 16.38.06.jpeg" 
                alt="AutoVIT Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <h1 className="font-orbitron text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Recruitment Form
            </h1>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-orbitron font-bold uppercase mb-4">Application Submitted!</h2>
              <p className="text-gray-500 mb-8 max-w-md">
                Thank you for your interest in AutoVIT. Our team will review your application and get back to you soon.
              </p>
              <button 
                onClick={() => setStatus("idle")}
                className="btn-primary"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-primary">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-primary">Registration Number</label>
                  <input 
                    required
                    type="text" 
                    value={formData.regNo}
                    onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-primary">Department / Branch</label>
                  <input 
                    required
                    type="text" 
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-primary">Year of Study</label>
                  <select 
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="" disabled>Select Year</option>
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-primary">Interested Domains</label>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{formData.domains.length} / 2 Selected</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {domains.map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => toggleDomain(domain)}
                      className={cn(
                        "flex items-center gap-3 px-6 py-4 border rounded-sm transition-all",
                        formData.domains.includes(domain) 
                          ? "bg-primary/5 border-primary text-primary" 
                          : "bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        formData.domains.includes(domain) ? "border-primary" : "border-gray-300"
                      )}>
                        {formData.domains.includes(domain) && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{domain}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-primary">Previous Projects / Experience</label>
                <textarea 
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-primary">Portfolio / Projects Link</label>
                <input 
                  required
                  type="url" 
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-primary">Why do you want to join AutoVIT?</label>
                <textarea 
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
                ></textarea>
              </div>

              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-4 rounded-sm flex items-center gap-3">
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">Something went wrong. Please try again.</span>
                </div>
              )}

              <button 
                disabled={status === "loading"}
                type="submit" 
                className="btn-primary w-full py-5 uppercase font-black tracking-[0.2em] disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

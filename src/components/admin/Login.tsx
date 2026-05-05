"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AlertCircle, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side guard for admin email
    if (email !== "it.autovit22@gmail.com") {
      setError("Unauthorized access attempt. This portal is restricted.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-white font-rajdhani">
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full bg-white p-12 rounded-sm shadow-2xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
          
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-gray-900 flex items-center justify-center rounded-sm shadow-xl shadow-gray-900/10 group-hover:bg-red-600 transition-colors duration-500">
              <Lock className="text-white w-10 h-10" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="font-orbitron text-4xl font-black uppercase tracking-tighter text-gray-900">ADMIN LOGIN</h1>
              <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em]">AUTOVIT CONTROL PORTAL</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">EMAIL ADDRESS</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-8 py-5 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">PASSWORD</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-8 py-5 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-bold text-gray-900"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-5 border-l-4 border-red-600 flex items-center gap-4 animate-fade-in">
                <AlertCircle size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
              </div>
            )}

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-red-600 py-6 text-white uppercase font-black tracking-[0.3em] text-xs shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? "AUTHENTICATING..." : "ACCESS PORTAL"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

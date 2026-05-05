"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminLogin from "@/components/admin/Login";
import AdminDashboard from "@/components/admin/Dashboard";

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (user && user.email !== "it.autovit22@gmail.com") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-rajdhani p-6 text-center">
        <h1 className="font-orbitron text-4xl font-black text-gray-900 mb-4">ACCESS DENIED</h1>
        <p className="text-red-600 font-bold uppercase tracking-widest mb-8">Unauthorized Account: {user.email}</p>
        <button 
          onClick={() => signOut(auth)}
          className="btn-primary"
        >
          Logout & Try Again
        </button>
      </div>
    );
  }

  return user ? <AdminDashboard /> : <AdminLogin />;
}

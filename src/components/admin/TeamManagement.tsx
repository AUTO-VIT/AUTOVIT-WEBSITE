"use client";

import { useState, useEffect } from "react";
import { ref, push, update, remove, onValue, serverTimestamp } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Trash2, Edit2, X, Check, UserCircle } from "lucide-react";
import Image from "next/image";

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
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    photoUrl: "",
    github: "",
    linkedin: "",
    order: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamRef = ref(rtdb, "team");
    const unsubscribe = onValue(teamRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })) as TeamMember[];
        setTeam(list.sort((a, b) => a.order - b.order));
      } else {
        setTeam([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await update(ref(rtdb, `team/${editingId}`), formData);
        setEditingId(null);
      } else {
        const teamRef = ref(rtdb, "team");
        await push(teamRef, {
          ...formData,
          order: team.length + 1,
          timestamp: serverTimestamp(),
        });
      }
      setFormData({ name: "", role: "", photoUrl: "", github: "", linkedin: "", order: 0 });
    } catch (err) {
      console.error(err);
      alert("Error saving team member.");
    }
  };

  const startEdit = (member: TeamMember) => {
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

  return (
    <div className="space-y-12">
      <h2 className="font-orbitron text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
        <span className="w-1 h-8 bg-red-600"></span>
        MANAGE LEADERSHIP TEAM
      </h2>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <h3 className="font-orbitron text-xl font-black uppercase tracking-tight text-gray-900">
              {editingId ? "EDIT MEMBER" : "ADD NEW MEMBER"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-red-600">FULL NAME</label>
              <input 
                required
                type="text" 
                placeholder="e.g. KIRAN S"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-gray-200 px-6 py-5 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-bold text-gray-900 placeholder:text-gray-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-red-600">ROLE / POST</label>
              <input 
                required
                type="text" 
                placeholder="e.g. President"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-white border border-gray-200 px-6 py-5 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-bold text-gray-900 placeholder:text-gray-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-red-600">PHOTO URL (DIRECT IMAGE LINK)</label>
              <input 
                type="url" 
                placeholder="https://images.unsplash.com/..."
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                className="w-full bg-white border border-gray-200 px-6 py-5 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-bold text-gray-900 placeholder:text-gray-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-600">GITHUB URL</label>
                <input 
                  type="url" 
                  placeholder="https://github.com/..."
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full bg-white border border-gray-200 px-6 py-5 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-bold text-gray-900 placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-600">LINKEDIN URL</label>
                <input 
                  type="url" 
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full bg-white border border-gray-200 px-6 py-5 rounded-sm focus:outline-none focus:border-red-600 transition-colors font-bold text-gray-900 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="bg-red-600 text-white flex-1 py-6 uppercase font-black tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all">
                <Check size={18} /> {editingId ? "UPDATE MEMBER" : "ADD TO TEAM"}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ name: "", role: "", photoUrl: "", github: "", linkedin: "", order: 0 });
                  }}
                  className="border border-gray-200 px-8 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-8">
          <h3 className="font-orbitron text-xl font-black uppercase tracking-tight text-gray-900">CURRENT LEADERSHIP</h3>
          
          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600"></div></div>
          ) : team.length > 0 ? (
            <div className="space-y-4">
              {team.map((member) => (
                <div key={member.id} className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm flex items-center justify-between group hover:border-red-600 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="relative w-16 h-16 rounded-sm overflow-hidden bg-gray-50 border border-gray-100">
                      {member.photoUrl ? (
                        <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
                      ) : (
                        <UserCircle className="w-full h-full text-gray-200" />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">{member.role}</p>
                      <h4 className="font-orbitron font-black uppercase tracking-tight text-lg text-gray-900 leading-none">{member.name}</h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(member)} className="p-3 text-gray-200 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => remove(ref(rtdb, `team/${member.id}`))} className="p-3 text-gray-200 hover:text-red-600 hover:bg-red-50 transition-all rounded-sm">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-gray-50/30 border border-dashed border-gray-200 text-gray-300 rounded-sm">
              <p className="font-orbitron text-sm font-black uppercase tracking-widest">No members added.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Check, Image as ImageIcon } from "lucide-react";
import { convertDriveUrl } from "@/lib/driveUrl";

interface AboutImage {
  url: string;
  alt: string;
}

const defaultImages: AboutImage[] = [
  { url: "", alt: "AutoVIT Activity 1" },
  { url: "", alt: "AutoVIT Activity 2" },
  { url: "", alt: "AutoVIT Activity 3" },
  { url: "", alt: "AutoVIT Activity 4" },
];

export default function AboutManagement() {
  const [images, setImages] = useState<AboutImage[]>(defaultImages);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const aboutRef = ref(rtdb, "about/images");

    const unsubscribe = onValue(aboutRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Firebase stores arrays as objects with numeric keys — handle both
        const imgArray: AboutImage[] = Array.isArray(data)
          ? data
          : Object.values(data);
        setImages(imgArray);
      } else {
        setImages(defaultImages);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUrlChange = (index: number, url: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], url };
    setImages(updated);
  };

  const handleAltChange = (index: number, alt: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt };
    setImages(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await set(ref(rtdb, "about/images"), images);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
      alert("Error saving about images.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = `
    w-full
    bg-white dark:bg-zinc-800
    border border-gray-200 dark:border-zinc-700
    px-6 py-4
    rounded-xl
    focus:outline-none
    focus:border-red-600
    focus:ring-2 focus:ring-red-600/20
    transition-all
    font-bold
    text-gray-900 dark:text-white
    placeholder:text-gray-400
    text-sm
  `;

  return (
    <div className="space-y-12">

      {/* Title */}
      <h2
        className="
        font-orbitron
        text-3xl
        font-black
        uppercase
        tracking-tighter
        flex items-center gap-4
        text-gray-900 dark:text-white
        "
      >
        <span className="w-1 h-8 bg-red-600"></span>
        MANAGE ABOUT IMAGES
      </h2>

      <div className="grid lg:grid-cols-2 gap-16">

        {/* LEFT — Form */}
        <div className="space-y-8">

          <div className="border-l-4 border-red-600 pl-4">
            <h3
              className="
              font-orbitron
              text-xl
              font-black
              uppercase
              tracking-tight
              text-gray-900 dark:text-white
              "
            >
              EDIT IMAGES
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-widest font-bold">
              Paste a Google Drive share link or any direct image URL
            </p>
          </div>

          <div
            className="
            space-y-8
            bg-white/60 dark:bg-zinc-900/60
            backdrop-blur-md
            border border-gray-200 dark:border-zinc-800
            p-8
            rounded-3xl
            shadow-xl
            "
          >
            {images.map((img, i) => (
              <div key={i} className="space-y-3">
                <p
                  className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-red-600
                  "
                >
                  IMAGE {i + 1}
                </p>

                <input
                  type="text"
                  placeholder="https://drive.google.com/file/d/... or https://..."
                  value={img.url}
                  onChange={(e) => handleUrlChange(i, e.target.value)}
                  className={inputClass}
                />

                <input
                  type="text"
                  placeholder={`Alt text (e.g. AutoVIT Workshop ${i + 1})`}
                  value={img.alt}
                  onChange={(e) => handleAltChange(i, e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="
              w-full
              bg-red-600
              hover:bg-red-700
              disabled:opacity-60
              text-white
              py-5
              uppercase
              font-black
              tracking-[0.2em]
              flex items-center justify-center gap-3
              rounded-xl
              shadow-[0_0_25px_rgba(90,18,18,0.3)]
              hover:shadow-[0_0_35px_rgba(90,18,18,0.6)]
              transition-all
              "
            >
              <Check size={18} />
              {saving ? "SAVING..." : saved ? "SAVED ✓" : "SAVE ALL IMAGES"}
            </button>
          </div>
        </div>

        {/* RIGHT — Live Preview */}
        <div className="space-y-8">

          <h3
            className="
            font-orbitron
            text-xl
            font-black
            uppercase
            tracking-tight
            text-gray-900 dark:text-white
            "
          >
            LIVE PREVIEW
          </h3>

          <div
            className="
            bg-white/60 dark:bg-zinc-900/60
            backdrop-blur-md
            border border-gray-200 dark:border-zinc-800
            p-8
            rounded-3xl
            shadow-xl
            "
          >
            <div className="grid grid-cols-2 gap-4 aspect-square">
              {images.map((img, i) => {
                const directUrl = img.url ? convertDriveUrl(img.url) : "";
                return (
                  <div
                    key={i}
                    className="
                    relative
                    rounded-2xl
                    overflow-hidden
                    bg-gray-100 dark:bg-zinc-800
                    border border-gray-200 dark:border-zinc-700
                    flex items-center justify-center
                    "
                  >
                    {directUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={directUrl}
                        alt={img.alt || `About Image ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-300 dark:text-gray-600">
                        <ImageIcon size={28} />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                          IMAGE {i + 1}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 text-center mt-4">
              Preview updates as you type · Changes only apply after saving
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

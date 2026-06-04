"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";


const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Domains", href: "/#domains" },
  { name: "Events", href: "/#events" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
  { name: "Recruit", href: "/recruit" },
  { name: "Admin", href: "/admin" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5",
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-zinc-800"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-all duration-300 group-hover:scale-110">
              <Image
                src="/WhatsApp Image 2026-05-04 at 16.38.06.jpeg"
                alt="AutoVIT Logo"
                fill
                className="object-contain rounded-md shadow-[0_0_12px_rgba(255,255,255,0.8)] dark:shadow-[0_0_18px_rgba(255,255,255,1)]"
              />
            </div>

            <span className="font-orbitron font-bold text-xl tracking-tighter text-gray-900 dark:text-white transition-colors">
              AutoVIT
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-rajdhani font-semibold text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-[#7f1d1d] transition-colors relative group"
                  >
                    {link.name}

                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white hover:scale-110 transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-4 md:hidden">
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white transition-all"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* Hamburger */}
            <button
              className="text-gray-900 dark:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-all",
                    isOpen && "rotate-45 translate-y-2.5"
                  )}
                ></span>

                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-all",
                    isOpen && "opacity-0"
                  )}
                ></span>

                <span
                  className={cn(
                    "w-full h-0.5 bg-current transition-all",
                    isOpen && "-rotate-45 -translate-y-2"
                  )}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-500",
          "bg-white dark:bg-black",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="font-orbitron text-2xl font-bold text-gray-900 dark:text-white hover:text-red-600 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}


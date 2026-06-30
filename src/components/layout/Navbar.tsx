"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";


const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Domains", href: "/#domains" },
  { name: "Events", href: "/#events" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
  {
    name: "Recruitment",
    dropdown: [
      { name: "Recruitment Form", href: "/recruit" },
      { name: "Recruitment Quiz", href: "/quiz" },
    ],
  },
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
                className="object-contain rounded-md dark:hidden"
              />
              <Image
                src="/autovit-logo-dark.jpeg"
                alt="AutoVIT Logo"
                fill
                className="object-contain rounded-md hidden dark:block"
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
                  {link.dropdown ? (
                    <div className="relative group py-2">
                      <button
                        className="flex items-center gap-1 font-rajdhani font-semibold text-gray-700 dark:text-gray-300 hover:text-red-650 dark:hover:text-[#7f1d1d] transition-colors"
                      >
                        {link.name}
                        <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                      </button>

                      {/* Dropdown panel */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 z-50">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className="block px-4 py-2 text-sm font-rajdhani font-semibold text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-white transition-colors"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href!}
                      className="font-rajdhani font-semibold text-gray-700 dark:text-gray-300 hover:text-red-650 dark:hover:text-[#7f1d1d] transition-colors relative group"
                    >
                      {link.name}

                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
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
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden transition-all duration-500 overflow-y-auto pt-20",
          "bg-white dark:bg-black",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {navLinks.map((link) => {
          if (link.dropdown) {
            return (
              <div key={link.name} className="flex flex-col items-center gap-3">
                <span className="font-orbitron text-xs uppercase tracking-widest font-black text-gray-400 dark:text-gray-500">
                  {link.name}
                </span>
                {link.dropdown.map((subLink) => (
                  <Link
                    key={subLink.name}
                    href={subLink.href}
                    onClick={() => setIsOpen(false)}
                    className="font-orbitron text-xl font-bold text-gray-900 dark:text-white hover:text-red-600 transition-colors"
                  >
                    {subLink.name}
                  </Link>
                ))}
              </div>
            );
          }
          return (
            <Link
              key={link.name}
              href={link.href!}
              onClick={() => setIsOpen(false)}
              className="font-orbitron text-2xl font-bold text-gray-900 dark:text-white hover:text-red-600 transition-colors"
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
              <Image 
                src="/WhatsApp Image 2026-05-04 at 16.38.06.jpeg" 
                alt="AutoVIT Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="font-orbitron font-bold text-xl tracking-tighter text-gray-900">AutoVIT</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="font-rajdhani font-semibold text-gray-600 hover:text-red-600 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-900 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={cn("w-full h-0.5 bg-gray-900 transition-all", isOpen && "rotate-45 translate-y-2.5")}></span>
              <span className={cn("w-full h-0.5 bg-gray-900 transition-all", isOpen && "opacity-0")}></span>
              <span className={cn("w-full h-0.5 bg-gray-900 transition-all", isOpen && "-rotate-45 -translate-y-2")}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-500",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="font-orbitron text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}

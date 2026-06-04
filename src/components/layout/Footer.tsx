import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
      py-12
      bg-gray-50 dark:bg-zinc-950
      border-t border-gray-200 dark:border-zinc-800
      relative overflow-hidden
      transition-colors duration-500
      "
    >
      {/* Ambient Glow */}
      <div
        className="
        absolute top-0 left-1/2
        -translate-x-1/2
        w-[500px] h-[300px]
        bg-red-600/5 dark:bg-red-600/10
        blur-3xl
        pointer-events-none
        "
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div
          className="
          flex flex-col md:flex-row
          justify-between items-center
          gap-8
          "
        >
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            
            <div
              className="
              relative
              transition-transform duration-300
              group-hover:scale-110
              "
            >
              <Image
                src="/WhatsApp Image 2026-05-04 at 16.38.06.jpeg"
                alt="AutoVIT Logo"
                width={36}
                height={36}
                className="
                object-contain
                rounded-md
                shadow-[0_0_12px_rgba(255,255,255,0.8)]
                dark:shadow-[0_0_18px_rgba(255,255,255,1)]
                "
              />
            </div>

            <span
              className="
              font-orbitron
              font-bold
              text-xl
              tracking-tighter
              uppercase
              text-gray-900 dark:text-white
              transition-colors
              "
            >
              AutoVIT
            </span>
          </div>

          {/* Copyright */}
          <p
            className="
            text-gray-600 dark:text-gray-400
            font-rajdhani
            text-center md:text-left
            transition-colors
            "
          >
            © {currentYear} AutoVIT - VIT University.
            All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6">
            
            {[
              {
                name: "Home",
                href: "/#home",
              },

              {
                name: "About",
                href: "/#about",
              },

              {
                name: "Join",
                href: "/recruit",
              },
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="
                text-gray-600 dark:text-gray-400
                hover:text-red-600
                dark:hover:text-[#7f1d1d]
                font-rajdhani
                uppercase
                text-sm
                font-semibold
                tracking-widest
                transition-all duration-300
                hover:drop-shadow-[0_0_8px_rgba(90,18,18,0.6)]
                "
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}



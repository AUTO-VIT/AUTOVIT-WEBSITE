import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Image 
              src="/autovit-logo.jpeg" 
              alt="AutoVIT Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
            <span className="font-orbitron font-bold text-xl tracking-tighter uppercase text-gray-900">AutoVIT</span>
          </div>

          <p className="text-gray-600 font-rajdhani text-center md:text-left">
            © {currentYear} AutoVIT - VIT University. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/#home" className="text-gray-600 hover:text-red-600 font-rajdhani uppercase text-sm font-semibold tracking-widest transition-colors">Home</Link>
            <Link href="/#about" className="text-gray-600 hover:text-red-600 font-rajdhani uppercase text-sm font-semibold tracking-widest transition-colors">About</Link>
            <Link href="/recruit" className="text-gray-600 hover:text-red-600 font-rajdhani uppercase text-sm font-semibold tracking-widest transition-colors">Join</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

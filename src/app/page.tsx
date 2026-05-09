import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Domains from "@/components/home/Domains";
import Events from "@/components/home/Events";
import Team from "@/components/home/Team";
import Contact from "@/components/home/Contact";

import Footer from "@/components/layout/Footer";

import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <main
      className="
      relative
      min-h-screen
      bg-white dark:bg-black
      transition-colors duration-500
      overflow-hidden
      "
    >
      {/* Global Background */}
      <ParticlesBackground />

      {/* Page Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Domains />
        <Events />
        <Team />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
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
    <main className="relative min-h-screen">
      <ParticlesBackground />
      <Hero />
      <About />
      <Domains />
      <Events />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}

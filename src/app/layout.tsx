import type { Metadata } from "next";
import { Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import ThemeProvider from "@/components/providers/ThemeProvider";



const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AutoVIT - Robotics & Automation Club",
  description:
    "Where Technology Meets Innovation. Join us in shaping the future of robotics and automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(rajdhani.variable, orbitron.variable, "font-rajdhani text-gray-900 dark:text-white bg-white dark:bg-black min-h-screen antialiased transition-colors duration-500")}>
  <ThemeProvider>
    <CustomCursor />
    <Navbar />
    {children}
  </ThemeProvider>
</body>
    </html>
  );
}
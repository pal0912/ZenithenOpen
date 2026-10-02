import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZenithenOpen — Open-Source Community Platform | S-VYASA Bengaluru",
  description:
    "Data-driven open-source development community at S-VYASA Deemed to be University, Bengaluru. Showcasing member achievements, GitHub contributions, live projects, learning paths, mentorship, and GSoC preparation.",
  keywords: [
    "ZenithenOpen",
    "S-VYASA University",
    "Open Source Community",
    "Bengaluru Tech",
    "GitHub Contributions",
    "GSoC Preparation",
    "Student Developers",
    "Computer Science",
  ],
  authors: [{ name: "ZenithenOpen Community" }],
  openGraph: {
    title: "ZenithenOpen — We don't just learn to code. We ship.",
    description:
      "Join 2,000+ student developers contributing to open source, landing GSoC, and building production software.",
    type: "website",
    siteName: "ZenithenOpen",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

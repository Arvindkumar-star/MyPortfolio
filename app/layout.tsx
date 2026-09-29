import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ChatDrawer } from "@/components/chat/ChatDrawer";
import { TerminalView } from "@/components/chat/TerminalView";
import profile from "@/content/profile.json";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.headline}`,
  description: profile.summary,
  keywords: [
    "Arvind Kumar",
    "Full-Stack Developer",
    "AI Engineer",
    "RAG Systems",
    "Autonomous Agents",
    "Next.js",
    "TypeScript",
    "MongoDB",
    "Tailwind CSS",
  ],
  authors: [{ name: profile.name, url: profile.contact.github }],
  openGraph: {
    title: `${profile.name} — AI-Native Developer Portfolio`,
    description: profile.summary,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Full-Stack & AI Engineer`,
    description: profile.summary,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${fontSans.variable} ${fontMono.variable}`}>
      <body className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex flex-col antialiased selection:bg-indigo-600 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />

          {/* AI Drawer & CLI Terminal overlays */}
          <ChatDrawer />
          <TerminalView />
        </ThemeProvider>
      </body>
    </html>
  );
}

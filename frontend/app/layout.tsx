import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Toaster from "@/components/Toaster";
import ChatDrawer from "@/components/Chat/ChatDrawer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskMaster AI - Intelligent Task Management",
  description: "Organize, prioritize, and accomplish more with AI-powered task management. Built by Ali Shahid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} antialiased font-sans`}>
        <ThemeProvider>
          {children}
          <ChatDrawer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

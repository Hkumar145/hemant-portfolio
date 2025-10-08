import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./ThemeProvider";
import InitialSplash from "@/components/InitialSplash";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hemant Kumar",
  description: "Portfolio website of Hemant Kumar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          {/* Splash on first visit */}
          <InitialSplash minDuration={1100} oncePerSession message="Launching portfolio…" />

          {/* Your site */}
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthWrapper from "@/context/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Tracker",
  description: "Personalised money tracker suited for my own needs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-neutral-950 text-white">
      <AuthWrapper>
      <body className={inter.className}>{children}</body>
      </AuthWrapper>
    </html>
  );
}

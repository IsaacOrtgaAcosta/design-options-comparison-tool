import type { Metadata } from "next";
import {Inter} from 'next/font/google';
import "./globals.css";

const inter = Inter ({
  variable: "--font-sans",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Design options reviewer",
  description: "Review and compare different design options before deciding what to explore further",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

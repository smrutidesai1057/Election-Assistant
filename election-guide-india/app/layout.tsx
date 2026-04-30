import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Election Guide India — Your Civic Education Platform",
  description: "Learn about Indian elections, voter registration, EVMs, timelines, and your democratic rights. Powered by ElectBot AI.",
  keywords: "India election, voter registration, ECI, Lok Sabha, EVMs, voter ID, EPIC, election guide",
  openGraph: {
    title: "Election Guide India",
    description: "Your complete guide to Indian democracy and elections",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="page-wrapper">
          {children}
        </main>
        <ChatWidget />
      </body>
    </html>
  );
}

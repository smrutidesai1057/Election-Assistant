import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ElectBot AI Chat | Election Guide India",
  description: "Chat with ElectBot — your AI guide to Indian elections, voter registration, EVMs, and more.",
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}

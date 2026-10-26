import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Social recovery & key backup · Pixel Journey",
  description:
    "Educational backup posture and on-chain social recovery design for WAX",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}

import { Cases } from "../src/Cases";
import type { ReactNode } from "react";

export const metadata = {
  title: "Social Recovery & Key Backup · Pixel Journey",
  description:
    "Educational backup posture and social recovery risk tools for WAX/Antelope",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}
        <Cases /></body>
    </html>
  );
}

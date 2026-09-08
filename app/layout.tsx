import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZORX — Digital Marketing Agency, Dubai",
  description:
    "ZORX is a Dubai-based digital marketing agency fueling brand growth through creative, performance marketing, and modern technology.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/context/theme-context";
import { SessionProvider } from "@/components/providers/session-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PipeBloom — Handmade Pipe Cleaner Gifts",
    template: "%s | PipeBloom",
  },
  description:
    "Discover beautifully handcrafted pipe cleaner gifts — flower bouquets, flower pots, teddy bears, mini plants, keychains, and customized gifts. Each piece is made with love and creativity.",
  keywords: [
    "handmade gifts",
    "pipe cleaner",
    "flower bouquets",
    "teddy bears",
    "eco-friendly gifts",
    "handcrafted",
    "PipeBloom",
  ],
  openGraph: {
    title: "PipeBloom — Handmade Pipe Cleaner Gifts",
    description:
      "Discover beautifully handcrafted pipe cleaner gifts. Each piece is made with love.",
    type: "website",
    locale: "en_IN",
    siteName: "PipeBloom",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body antialiased">
        <SessionProvider>
          <ThemeProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

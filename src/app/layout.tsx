import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteShell } from "@/components/SiteShell";
import { LocalBusinessStructuredData } from "@/components/StructuredData";
import { buildPageMetadata } from "@/lib/metadata";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0C0E" },
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  applicationName: siteConfig.company.name,
  authors: [
    {
      name: siteConfig.company.ownerName,
      url: siteConfig.seo.siteUrl,
    },
  ],
  creator: siteConfig.company.name,
  publisher: siteConfig.company.name,
  category: "Home Improvement & Structural Engineering",
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  ...buildPageMetadata({ path: "/" }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#FAF9F6] text-[#18181B] antialiased selection:bg-[#C85A32]/15 selection:text-[#18181B]">
        <LocalBusinessStructuredData />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

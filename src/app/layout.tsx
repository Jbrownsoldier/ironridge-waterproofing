import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteShell } from "@/components/SiteShell";
import { LocalBusinessStructuredData } from "@/components/StructuredData";
import { buildPageMetadata } from "@/lib/metadata";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF9F6] text-[#18181B] antialiased selection:bg-[#C85A32]/15 selection:text-[#18181B]">
        <LocalBusinessStructuredData />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

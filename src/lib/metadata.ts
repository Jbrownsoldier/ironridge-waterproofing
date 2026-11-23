import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path: string;
  keywords?: string[];
}

export function buildPageMetadata({
  title,
  description = siteConfig.seo.defaultDescription,
  path,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const resolvedTitle = title || siteConfig.seo.defaultTitle;
  const fullKeywords = Array.from(
    new Set([...siteConfig.seo.keywords, ...keywords])
  );

  return {
    ...(title ? { title } : {}),
    description,
    keywords: fullKeywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.seo.locale,
      url: path,
      siteName: siteConfig.seo.siteName,
      title: resolvedTitle,
      description,
      images: [
        {
          url: siteConfig.seo.ogImage,
          width: 1200,
          height: 630,
          alt: "Ironridge Foundation & Waterproofing: Central Ohio Structural & Waterproofing Engineers",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.seo.twitterHandle,
      creator: siteConfig.seo.twitterHandle,
      title: resolvedTitle,
      description,
      images: [
        {
          url: siteConfig.seo.twitterImage,
          alt: "Ironridge Foundation & Waterproofing website preview",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": siteConfig.seo.geo.region,
      "geo.placename": siteConfig.seo.geo.placename,
      "geo.position": `${siteConfig.seo.geo.latitude};${siteConfig.seo.geo.longitude}`,
      ICBM: `${siteConfig.seo.geo.latitude}, ${siteConfig.seo.geo.longitude}`,
    },
  };
}

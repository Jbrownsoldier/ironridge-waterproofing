import React from "react";
import { siteConfig } from "@/config/site";

export function LocalBusinessStructuredData() {
  const baseUrl = siteConfig.seo.siteUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${baseUrl}/#organization`,
        name: siteConfig.company.name,
        url: baseUrl,
        image: `${baseUrl}${siteConfig.seo.ogImage}`,
        logo: `${baseUrl}/icon.svg`,
        description: siteConfig.seo.defaultDescription,
        telephone: "+1-614-555-0194",
        priceRange: "$$",
        foundingDate: String(siteConfig.company.established),
        founder: {
          "@type": "Person",
          name: siteConfig.company.ownerName,
          jobTitle: siteConfig.company.ownerTitle,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "4180 Industrial Pkwy, Suite B",
          addressLocality: "Columbus",
          addressRegion: "OH",
          postalCode: "43228",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: Number(siteConfig.seo.geo.latitude),
          longitude: Number(siteConfig.seo.geo.longitude),
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "07:00",
            closes: "19:00",
          },
        ],
        areaServed: siteConfig.serviceAreas.map((city) => ({
          "@type": "City",
          name: `${city}, OH`,
        })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: siteConfig.company.rating,
          reviewCount: String(siteConfig.company.reviewCount),
          bestRating: "5",
          worstRating: "1",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Waterproofing & Structural Foundation Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Interior Sub-Floor French Drain Waterproofing",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full-Depth Foundation Crack Injection",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Carbon Fiber Wall Stabilization & Anchors",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "20-Mil Crawl Space Encapsulation & Battery Sump",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: siteConfig.company.name,
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FaqStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

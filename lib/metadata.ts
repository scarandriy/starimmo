import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.defaultOgImage,
}: MetadataInput): Metadata {
  const canonicalUrl = new URL(path, siteConfig.siteUrl).toString();

  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.title,
    description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: image,
          alt: title ? `${title} cover image` : siteConfig.name,
        },
      ],
    },
  };
}

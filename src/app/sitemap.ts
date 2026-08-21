import type { MetadataRoute } from "next";
import { works } from "@/data/works";
import { interviews } from "@/data/interviews";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/works`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/interview`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteConfig.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const interviewRoutes: MetadataRoute.Sitemap = interviews.map((item) => ({
    url: `${siteConfig.url}/interview/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const workRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${siteConfig.url}/works/${work.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...interviewRoutes, ...workRoutes];
}

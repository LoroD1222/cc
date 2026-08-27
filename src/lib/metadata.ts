import type { Metadata } from "next";

export function createPageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Central Corridor`,
      description,
      url: path,
      type: "website",
      images: [{ url: image }],
    },
  };
}

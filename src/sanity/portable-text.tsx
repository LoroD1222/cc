import Image from "next/image";
import {PortableText, type PortableTextComponents} from "@portabletext/react";

type ImageBlock = {
  alt?: string;
  asset?: {
    metadata?: {dimensions?: {height?: number; width?: number}};
    url?: string;
  };
  caption?: string;
};

const components: PortableTextComponents = {
  marks: {
    link: ({children, value}) => {
      const href = typeof value?.href === "string" ? value.href : "";
      if (!href) return <>{children}</>;
      const external = href.startsWith("http");
      return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}</a>;
    },
  },
  types: {
    image: ({value}) => {
      const image = value as ImageBlock;
      const url = image.asset?.url;
      if (!url) return null;
      const width = image.asset?.metadata?.dimensions?.width || 1200;
      const height = image.asset?.metadata?.dimensions?.height || 800;
      return <figure className="news-post-inline-image"><Image src={url} alt={image.alt || ""} width={width} height={height} sizes="(max-width: 768px) 100vw, 48rem" />{image.caption ? <figcaption>{image.caption}</figcaption> : null}</figure>;
    },
  },
};

export function NewsArticleBody({value}: {value: unknown[]}) {
  if (!value.length) return null;
  return <PortableText value={value as never} components={components} />;
}

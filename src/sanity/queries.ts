import {defineQuery} from "next-sanity";

const articleCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  topic,
  publishedAt,
  excerpt,
  "image": heroImage.asset->url,
  "imageAlt": coalesce(heroImage.alt, title)
`;

export const latestNewsArticlesQuery = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]
  | order(publishedAt desc)[0...4] {
    ${articleCardFields}
  }
`);

export const allNewsArticlesQuery = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]
  | order(publishedAt desc) {
    ${articleCardFields}
  }
`);

export const newsArticleBySlugQuery = defineQuery(/* groq */ `
  *[_type == "article" && slug.current == $slug][0] {
    ${articleCardFields},
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->{
          url,
          metadata { dimensions { width, height } }
        }
      }
    }
  }
`);

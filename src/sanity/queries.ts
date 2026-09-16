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

const projectCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  countries,
  transportModes,
  status,
  summary,
  estimatedCost,
  "image": photos[0].asset->url,
  "imageAlt": coalesce(photos[0].alt, title)
`;

export const latestNewsArticlesQuery = defineQuery(/* groq */ `
  *[_type == "article" && defined(slug.current)]
  | order(publishedAt desc)[0...4] {
    ${articleCardFields}
  }
`);

export const newsArticlesCountQuery = defineQuery(/* groq */ `
  count(*[_type == "article" && defined(slug.current)])
`);

export function newsArticlesPageQuery(start: number, end: number) {
  return defineQuery(/* groq */ `
    *[_type == "article" && defined(slug.current)]
    | order(publishedAt desc)[${start}...${end}] {
      ${articleCardFields}
    }
  `);
}

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

export const projectDirectoryQuery = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current) && !defined(featuredPriority)]
  | order(coalesce(lastUpdated, _createdAt) desc) {
    ${projectCardFields}
  }
`);

export const featuredProjectQuery = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current) && defined(featuredPriority)]
  | order(featuredPriority asc)[0] {
    ${projectCardFields}
  }
`);

export const projectBySlugQuery = defineQuery(/* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    ${projectCardFields},
    locationLabel,
    expectedCompletion,
    lastUpdated,
    fundingSecured,
    financingGap,
    "implementingAgencies": implementingAgencies[]->name,
    "developmentPartners": developmentPartners[]->name,
    "documents": documents[]->{
      _id,
      title,
      "url": coalesce(file.asset->url, externalUrl)
    },
    description[] {
      ...,
      _type == "image" => {
        ...,
        asset->{url, metadata { dimensions { width, height } }}
      }
    },
    strategicImportance[] {
      ...,
      _type == "image" => {
        ...,
        asset->{url, metadata { dimensions { width, height } }}
      }
    },
    currentProgress[] {
      ...,
      _type == "image" => {
        ...,
        asset->{url, metadata { dimensions { width, height } }}
      }
    }
  }
`);

export const resourceDocumentsQuery = defineQuery(/* groq */ `
  *[_type == "resourceDocument"]
  | order(coalesce(publishedAt, _createdAt) desc, title asc) {
    _id,
    title,
    documentType,
    publishedAt,
    summary,
    sourceType,
    "url": coalesce(file.asset->url, externalUrl),
    "fileSize": file.asset->size
  }
`);

export const siteSettingsQuery = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    organisationName,
    shortName,
    tagline,
    "logo": logo.asset->url,
    email,
    phone,
    address,
    footerNote,
    socialLinks[]{platform, url}
  }
`);

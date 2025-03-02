import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Muslim Fasting",
  description:
    "Comprehensive Guide to Islamic Fasting Practices and Traditions",
  url: "https://ramadan.findmalek.com",
  images: {
    default: "https://ramadan.findmalek.com/og.png",
    notFound: "https://ramadan.findmalek.com/not-found.png",
    logo: "https://emojicdn.elk.sh/🌙?style=twitter",
  },
  links: {
    twitter: "https://twitter.com/findmalek",
    github: "https://github.com/findmalek/muslim-fasting",
  },
  author: {
    name: "findmalek",
    url: "https://www.findmalek.com",
    email: "hi@findmalek.com",
    github: "https://github.com/findmalek",
  },
  keywords: [
    "Islamic Fasting",
    "Ramadan",
    "Muslim Practices",
    "Sawm",
    "Iftar",
    "Suhoor",
    "Prayer Times",
    "Halal Diet",
    "Islamic Calendar",
    "Eid al-Fitr",
    "Spiritual Growth",
    "Quran Study",
    "Fasting Benefits",
    "Islamic Traditions",
    "Dhikr",
    "Next.js",
    "React",
    "TypeScript",
  ],
}

export const notFoundMetadata = () => {
  return {
    title: "Page not found",
    description: "Page not found",
    openGraph: {
      title: `${siteConfig.name} | Page not found`,
      description: "Page not found",
      images: [
        {
          url: siteConfig.images.notFound,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | Page not found`,
      description: "Page not found",
      images: [siteConfig.images.notFound],
      creator: "@findmalek",
    },
  }
}

import type { Icon } from "lucide-react"

import { Icons } from "@/components/shared/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    twitter?: string
    github: string
    discord?: string
  }
  images: {
    default: string
    notFound: string
    logo: string
  }
  author: {
    name: string
    url: string
    email: string
    github?: string
  }
  keywords: string[]
}

export interface PrayerTimesDto {
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  midnight: string
}

export interface PrayerTimes {
  fajr: Date | null
  sunrise: Date | null
  dhuhr: Date | null
  asr: Date | null
  maghrib: Date | null
  isha: Date | null
  midnight: Date | null
  imsak: Date | null
}

export interface HijriDate {
  date: string
  day: string
  month: {
    number: number
    en: string
    ar: string
  }
  year: string
  holidays: string[]
}

export interface GregorianDate {
  date: string
  day: string
  month: {
    number: number
    en: string
  }
  year: string
}

export interface PrayerTimesMeta {
  latitude: number
  longitude: number
  timezone: string
}

export type PrayerTimingsData = {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Sunset: string
  Maghrib: string
  Isha: string
  Imsak: string
  Midnight: string
  Firstthird: string
  Lastthird: string
}

export type PrayerTimesResponse = {
  code: number
  status: string
  prayerTimes: {
    timings: PrayerTimingsData
    date: {
      readable: string
      timestamp: string
      gregorian: {
        date: string
        format: string
        day: string
        month: {
          number: number
          en: string
        }
        year: string
      }
      hijri: {
        date: string
        day: string
        month: {
          number: number
          en: string
          ar: string
        }
        year: string
        holidays: string[]
      }
    }
    meta: {
      latitude: number
      longitude: number
      timezone: string
    }
  }
}

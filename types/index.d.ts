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

export type AladhanApiV1TimingsEndpointResponse = {
  code: number
  status: string
  data: {
    timings: {
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
    date: {
      readable: string
      timestamp: string
      hijri: {
        date: string
        format: string
        day: string
        month: {
          number: number
          en: string
          ar: string
        }
        year: string
        holidays: string[]
        adjustedHolidays: string[]
        method: string
      }
      gregorian: {
        date: string
        format: string
        day: string
        weekday: {
          en: string
          ar: string
        }
        month: {
          number: number
          en: string
          ar: string
          days: number
        }
        year: string
        designation: {
          abbreviated: string
          expanded: string
        }
        lunarSighting: boolean
      }
    }
    meta: {
      latitude: number
      longitude: number
      timezone: string
      method: {
        id: number
        name: string
        params: {
          Fajr: number
          Isha: number
        }
        location: {
          latitude: number
          longitude: number
        }
      }
      latitudeAdjustmentMethod: string
      midnightMode: string
      school: string
      offset: {
        Imsak: number
        Fajr: number
        Sunrise: number
        Dhuhr: number
        Asr: number
        Maghrib: number
        Sunset: number
        Isha: number
        Midnight: number
      }
    }
  }
}

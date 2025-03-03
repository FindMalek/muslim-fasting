import { useState } from "react"
import { fetchPrayerTimes } from "@/app/actions/prayerTimes"
import { useQuery } from "@tanstack/react-query"
import { formatISO } from "date-fns"

import type { PrayerTimes, PrayerTimesResponse } from "@/types"

import { useGeolocation } from "./use-geolocation"

type UsePrayerTimesParams = {
  latitude: number
  longitude: number
  date?: Date
  enabled?: boolean
}

export function usePrayerTimes(timezone: string) {
  const [date, setDate] = useState(new Date())
  const { latitude, longitude, loading } = useGeolocation()

  const dateString = formatISO(date, { representation: "date" })

  const query = useQuery<PrayerTimesResponse>({
    queryKey: ["prayerTimes", latitude, longitude, dateString, timezone],
    queryFn: async () => {
      if (!latitude || !longitude) throw new Error("Location not available")
      const result = await fetchPrayerTimes(latitude, longitude, dateString)
      if ("message" in result && !("prayerTimes" in result)) {
        throw result
      }
      return result as PrayerTimesResponse
    },
    enabled: Boolean(latitude && longitude && !loading),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })

  // Transform API response to the PrayerTimes format used in our components
  const transformedPrayerTimes: PrayerTimes | null = query.data
    ? {
        fajr: parseTimeString(query.data.prayerTimes.timings.Fajr, date),
        sunrise: parseTimeString(query.data.prayerTimes.timings.Sunrise, date),
        dhuhr: parseTimeString(query.data.prayerTimes.timings.Dhuhr, date),
        asr: parseTimeString(query.data.prayerTimes.timings.Asr, date),
        maghrib: parseTimeString(query.data.prayerTimes.timings.Maghrib, date),
        isha: parseTimeString(query.data.prayerTimes.timings.Isha, date),
        midnight: parseTimeString(
          query.data.prayerTimes.timings.Midnight,
          date
        ),
        imsak: parseTimeString(query.data.prayerTimes.timings.Imsak, date),
      }
    : null

  return {
    ...query,
    prayerTimes: transformedPrayerTimes,
    hijriDate: query.data?.prayerTimes.date.hijri || null,
    gregorianDate: query.data?.prayerTimes.date.gregorian || null,
    meta: query.data?.prayerTimes.meta || null,
    date,
    setDate,
    isLoading: query.isLoading || loading,
  }
}

// Helper function to parse time strings from the API (format: "HH:MM")
function parseTimeString(timeString: string, baseDate?: Date): Date | null {
  if (!timeString) return null

  const [hours, minutes] = timeString.split(":").map(Number)
  if (isNaN(hours) || isNaN(minutes)) return null

  const date = baseDate ? new Date(baseDate) : new Date()
  date.setHours(hours, minutes, 0, 0)

  return date
}

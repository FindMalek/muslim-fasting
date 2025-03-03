"use client"

import { useEffect, useState } from "react"

import type { PrayerTimes } from "@/types"

export function usePrayerTimes(timezone: string, initialDate?: Date) {
  const [date, setDate] = useState<Date>(initialDate || new Date())
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!timezone) return

    const calculatePrayerTimes = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would use a proper prayer times calculation library
        // like adhan-js or make an API call to a prayer times service
        // For this demo, we'll create mock prayer times

        // Create a date object for the selected date in the specified timezone
        const dateInTimezone = new Date(
          date.toLocaleString("en-US", { timeZone: timezone })
        )

        // Generate mock prayer times (in a real app, these would be calculated properly)
        const fajrTime = new Date(dateInTimezone)
        fajrTime.setHours(4, 30, 0)

        const dhuhrTime = new Date(dateInTimezone)
        dhuhrTime.setHours(12, 15, 0)

        const asrTime = new Date(dateInTimezone)
        asrTime.setHours(15, 45, 0)

        const maghribTime = new Date(dateInTimezone)
        maghribTime.setHours(19, 0, 0)

        const ishaTime = new Date(dateInTimezone)
        ishaTime.setHours(20, 30, 0)

        setPrayerTimes({
          fajr: fajrTime,
          sunrise: null, // Not needed for this app
          dhuhr: dhuhrTime,
          asr: asrTime,
          maghrib: maghribTime,
          isha: ishaTime,
          midnight: null, // Not needed for this app
        })
      } catch (error) {
        console.error("Error calculating prayer times:", error)
        setPrayerTimes(null)
      } finally {
        setIsLoading(false)
      }
    }

    calculatePrayerTimes()
  }, [timezone, date])

  return {
    prayerTimes,
    date,
    setDate,
    isLoading,
  }
}

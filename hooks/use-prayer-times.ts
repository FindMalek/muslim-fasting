"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"

import type { PrayerTimingsData } from "@/types"

import { useGeolocation } from "@/hooks/use-geolocation"
import { usePrayerMethod } from "@/hooks/use-prayer-method"

import { fetchPrayerTimes } from "@/actions/prayer-times"

// Define interface for formatted prayer times
interface FormattedPrayerTimes {
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  midnight: string
}

const defaultCity = "Monastir"
const defaultCountry = "TN"

export function usePrayerTimes() {
  const {
    prayerCalculationMethod,
    error: methodError,
    loading: methodLoading,
    updatePrayerCalculationMethod,
  } = usePrayerMethod()

  const {
    city,
    country,
    error: geoError,
    loading: geoLoading,
    updateLocation,
  } = useGeolocation()

  const [prayerTimes, setPrayerTimes] = useState<FormattedPrayerTimes | null>(
    null
  )
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null)
  const [nextPrayer, setNextPrayer] = useState<string | null>(null)
  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState<string | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrayerTimesData = async (method: number) => {
      setIsLoading(true)
      try {
        // Use city and country from geolocation hook
        // Default to Mecca, Saudi Arabia if not available
        const locationCity = city || defaultCity
        const locationCountry = country || defaultCountry

        const response = await fetchPrayerTimes(
          method,
          locationCity,
          locationCountry
        )

        if ("message" in response) {
          setError(response.message)
          setPrayerTimes(null)
        } else {
          // Format the prayer times
          const formattedTimes: FormattedPrayerTimes = {
            fajr: formatTimeString(response.prayerTimes.timings.Fajr),
            sunrise: formatTimeString(response.prayerTimes.timings.Sunrise),
            dhuhr: formatTimeString(response.prayerTimes.timings.Dhuhr),
            asr: formatTimeString(response.prayerTimes.timings.Asr),
            maghrib: formatTimeString(response.prayerTimes.timings.Maghrib),
            isha: formatTimeString(response.prayerTimes.timings.Isha),
            midnight: formatTimeString(response.prayerTimes.timings.Midnight),
          }

          setPrayerTimes(formattedTimes)
          calculateCurrentAndNextPrayer(response.prayerTimes.timings)
          setError(null)
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch prayer times"
        )
        setPrayerTimes(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (prayerCalculationMethod !== null) {
      fetchPrayerTimesData(prayerCalculationMethod)
    }
  }, [prayerCalculationMethod, city, country])

  // Helper function to format time strings from API (HH:MM format)
  const formatTimeString = (timeString: string): string => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0)
    return format(date, "h:mm a")
  }

  // Calculate current and next prayer times
  const calculateCurrentAndNextPrayer = (timings: PrayerTimingsData) => {
    const prayers = [
      { name: "Fajr", time: timings.Fajr },
      { name: "Sunrise", time: timings.Sunrise },
      { name: "Dhuhr", time: timings.Dhuhr },
      { name: "Asr", time: timings.Asr },
      { name: "Maghrib", time: timings.Maghrib },
      { name: "Isha", time: timings.Isha },
    ]

    const now = new Date()
    const today = format(now, "yyyy-MM-dd")

    // Convert prayer times to Date objects for comparison
    const prayerDates = prayers.map((prayer) => {
      const [hours, minutes] = prayer.time.split(":")
      const date = new Date(today)
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0)
      return { name: prayer.name, date }
    })

    // Find current and next prayer
    let currentPrayerName = "Isha" // Default to Isha if none found
    let nextPrayerName = "Fajr" // Default to Fajr if none found
    let nextPrayerDate = new Date(today)
    nextPrayerDate.setDate(nextPrayerDate.getDate() + 1) // Tomorrow's Fajr

    for (let i = 0; i < prayerDates.length; i++) {
      if (now < prayerDates[i].date) {
        // Found the next prayer
        nextPrayerName = prayerDates[i].name
        nextPrayerDate = prayerDates[i].date

        // Current prayer is the previous one
        currentPrayerName = i === 0 ? "Isha" : prayerDates[i - 1].name
        break
      }
    }

    setCurrentPrayer(currentPrayerName)
    setNextPrayer(nextPrayerName)

    // Calculate time until next prayer
    const diffMs = nextPrayerDate.getTime() - now.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    setTimeUntilNextPrayer(`${diffHrs}h ${diffMins}m`)
  }

  // Function to manually update prayer calculation method
  const updateMethod = (newMethod: number) => {
    updatePrayerCalculationMethod(newMethod)
  }

  // Functions to update city and country
  const updateCity = (newCity: string) => {
    updateLocation(newCity, country || defaultCountry)
  }

  const updateCountry = (newCountry: string) => {
    updateLocation(city || defaultCity, newCountry)
  }

  return {
    prayerTimes,
    currentPrayer,
    nextPrayer,
    timeUntilNextPrayer,
    isLoading: isLoading || methodLoading || geoLoading,
    error: error || methodError || geoError,
    prayerCalculationMethod,
    updatePrayerCalculationMethod: updateMethod,
    city: city || defaultCity,
    country: country || defaultCountry,
    updateCity,
    updateCountry,
  }
}

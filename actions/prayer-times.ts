"use server"

import { cache } from "react"

import type { PrayerTimesResponse, PrayerTimingsData } from "@/types"

interface ErrorResponse {
  message: string
  status: "error"
}

// Cache the fetch request for 30 minutes
export const fetchPrayerTimes = cache(
  async (
    calculationMethod: number,
    city: string,
    country: string,
    date?: string
  ): Promise<PrayerTimesResponse | ErrorResponse> => {
    try {
      // Use timingsByCoordinates endpoint for coordinate-based requests
      const url = new URL("https://api.aladhan.com/v1/timingsByCity")

      // Set parameters for the API call
      url.searchParams.append("method", calculationMethod.toString())
      url.searchParams.append("city", city)
      url.searchParams.append("country", country)

      // Add date parameter if provided
      if (date) {
        url.searchParams.append("date", date)
      }

      const response = await fetch(url.toString(), {
        next: { revalidate: 1800 }, // 30 minutes
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.data) {
        throw new Error("No prayer times found")
      }

      // Format the response
      return {
        code: data.code,
        status: data.status,
        prayerTimes: {
          timings: data.data.timings as PrayerTimingsData,
          date: {
            readable: data.data.date.readable,
            timestamp: data.data.date.timestamp,
            gregorian: data.data.date.gregorian,
            hijri: data.data.date.hijri,
          },
          meta: data.data.meta,
        },
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error)
      return {
        message: error instanceof Error ? error.message : "Unknown error",
        status: "error",
      }
    }
  }
)

"use server"

import type { PrayerTimesResponse } from "@/types"

export type PrayerTimesError = {
  message: string
  code?: number
}

export async function fetchPrayerTimes(
  latitude: number,
  longitude: number,
  date?: string
): Promise<PrayerTimesResponse | PrayerTimesError> {
  try {
    // Format date as DD-MM-YYYY if provided
    const formattedDate = date
      ? new Date(date)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .split("/")
          .join("-")
      : new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .split("/")
          .join("-")

    // Since the API provides timingsByCity, we'll use timingsByCoordinates instead
    const url = new URL(
      `https://api.aladhan.com/v1/timingsByCoordinates/${formattedDate}`
    )

    // Add query parameters
    url.searchParams.append("latitude", latitude.toString())
    url.searchParams.append("longitude", longitude.toString())
    url.searchParams.append("method", "3") // Muslim World League method
    url.searchParams.append("shafaq", "general")

    const response = await fetch(url.toString())

    if (!response.ok) {
      return {
        message: `API error: ${response.status} ${response.statusText}`,
      }
    }

    const data = await response.json()

    if (data.code !== 200 || data.status !== "OK") {
      return {
        message: `API returned error: ${data.code} ${data.status}`,
        code: data.code,
      }
    }

    return {
      code: data.code,
      status: data.status,
      prayerTimes: data.data,
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error)
    return {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

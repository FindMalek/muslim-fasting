"use server"

import { z } from "zod"

// Type definitions
export type PrayerTime = {
  name: string
  time: string
}

export type PrayerTimesResponse = {
  date: string
  timezone: string
  prayerTimes: PrayerTime[]
}

// Validation schema
const prayerTimeSchema = z.object({
  name: z.string(),
  time: z.string(),
})

const prayerTimesResponseSchema = z.object({
  date: z.string(),
  timezone: z.string(),
  prayerTimes: z.array(prayerTimeSchema),
})

// API error type
export type ApiError = {
  message: string
  status: number
}

// Server action to fetch prayer times
export async function fetchPrayerTimes(
  latitude: number,
  longitude: number,
  date: string = new Date().toISOString().split("T")[0]
): Promise<PrayerTimesResponse | ApiError> {
  try {
    // Replace with your actual prayer times API
    const response = await fetch(
      `https://api.prayertimes.example/v1/times?lat=${latitude}&lng=${longitude}&date=${date}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!response.ok) {
      return {
        message: `Failed to fetch prayer times: ${response.statusText}`,
        status: response.status,
      }
    }

    const data = await response.json()

    // Validate the response data
    const validatedData = prayerTimesResponseSchema.parse(data)
    return validatedData
  } catch (error) {
    console.error("Error fetching prayer times:", error)
    return {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      status: 500,
    }
  }
}

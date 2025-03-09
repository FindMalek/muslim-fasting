import { NextRequest } from "next/server"

import { PrayerTimesResponse } from "@/types"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl)
  // format the date to DD-MM-YYYY
  const defaultDate = new Date()
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-")
  const date = searchParams.get("date") || defaultDate
  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")

  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}`
  )
  const json: PrayerTimesResponse = await response.json()

  return new Response(JSON.stringify(json), {
    headers: { "Content-Type": "application/json" },
  })
}

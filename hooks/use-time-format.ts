"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { useTimeFormatStore } from "./use-time-format-store"

const useTimeFormat = () => {
  const searchParams = useSearchParams()
  const { is24hrFormat, setIs24hrFormat } = useTimeFormatStore()

  useEffect(() => {
    const format = searchParams.get("time_format") as "12h" | "24h"
    if (format) {
      setIs24hrFormat(format === "24h")
    }
  }, [searchParams, setIs24hrFormat])

  const formatToSelectedTimeFormat = (time: string) => {
    const [hours, minutes, period] = time.split(/[:\s]/)
    let formattedTime: string

    if (is24hrFormat) {
      let hour = parseInt(hours, 10)
      if (period && period.toLowerCase() === "pm" && hour < 12) {
        hour += 12
      }
      if (period && period.toLowerCase() === "am" && hour === 12) {
        hour = 0
      }
      formattedTime = `${String(hour).padStart(2, "0")}:${minutes}`
    } else {
      let hour = parseInt(hours, 10)
      const isPM = hour >= 12

      if (isPM) {
        hour -= 12
      }
      if (hour === 0) {
        hour = 12
      }
      formattedTime = `${String(hour)}:${minutes} ${isPM ? "PM" : "AM"}`
    }

    return formattedTime
  }

  return { is24hrFormat, setIs24hrFormat, formatToSelectedTimeFormat }
}

export default useTimeFormat

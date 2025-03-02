"use client"

import { useEffect, useState } from "react"

export function useTimezone() {
  const [timezone, setTimezone] = useState<string>("")

  useEffect(() => {
    // Try to get timezone from localStorage first
    const savedTimezone = localStorage.getItem("timezone")

    if (savedTimezone) {
      setTimezone(savedTimezone)
    } else {
      // Detect user's timezone
      try {
        const detectedTimezone =
          Intl.DateTimeFormat().resolvedOptions().timeZone
        setTimezone(detectedTimezone)
        localStorage.setItem("timezone", detectedTimezone)
      } catch (error) {
        // Fallback to a default timezone if detection fails
        setTimezone("UTC")
        localStorage.setItem("timezone", "UTC")
      }
    }
  }, [])

  const updateTimezone = (newTimezone: string) => {
    setTimezone(newTimezone)
    localStorage.setItem("timezone", newTimezone)
  }

  return {
    timezone,
    setTimezone: updateTimezone,
  }
}

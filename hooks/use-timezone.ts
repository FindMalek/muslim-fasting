"use client"

import { useEffect, useState } from "react"

import { timezoneOptions } from "@/config/consts"

export function useTimezone() {
  const [timezone, setTimezone] = useState<string>("")

  useEffect(() => {
    const savedTimezone = localStorage.getItem("timezone")

    if (savedTimezone) {
      setTimezone(savedTimezone)
    } else {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      setTimezone(detectedTimezone)
      localStorage.setItem("timezone", detectedTimezone)
    }
  }, [])

  const updateTimezone = (newTimezone: string) => {
    setTimezone(newTimezone)
    localStorage.setItem("timezone", newTimezone)
  }

  // Helper to find timezone display name
  const getTimezoneDisplayName = () => {
    const option = timezoneOptions.find((option) => option.value === timezone)
    return option ? option.name : timezone
  }

  return {
    timezone,
    updateTimezone,
    timezoneName: getTimezoneDisplayName(),
  }
}

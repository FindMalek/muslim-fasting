"use client"

import { useEffect, useState } from "react"

import { prayerCalculationMethods } from "@/config/consts"

interface PrayerMethodState {
  error: string | null
  loading: boolean
  prayerCalculationMethod: number | null
}

const defaultPrayerMethod = 18 // Tunisia method as default

function findClosestPrayerMethod() {
  try {
    // Get user's timezone from browser
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Find matching or similar timezone in prayer methods
    // First try to find an exact match
    const exactMatch = prayerCalculationMethods.find(
      (method) => method.timezone === userTimezone
    )
    if (exactMatch) {
      return exactMatch.value
    }

    // If no exact match, try to match the region
    const userRegion = userTimezone.split("/")[0]
    const regionMatch = prayerCalculationMethods.find((method) =>
      method.timezone.startsWith(userRegion + "/")
    )
    if (regionMatch) {
      return regionMatch.value
    }

    return defaultPrayerMethod
  } catch (error) {
    console.error("Error determining prayer method:", error)
    return defaultPrayerMethod
  }
}

export function usePrayerMethod() {
  const [state, setState] = useState<PrayerMethodState>({
    error: null,
    loading: true,
    prayerCalculationMethod: null,
  })

  useEffect(() => {
    // Check localStorage first
    const savedMethod = localStorage.getItem("prayerCalculationMethod")

    if (savedMethod) {
      setState({
        error: null,
        loading: false,
        prayerCalculationMethod: parseInt(savedMethod),
      })
      return
    }

    // Otherwise, try to get current position to find method
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Location permission granted, find method based on timezone
          const prayerMethod = findClosestPrayerMethod()

          // Save to localStorage
          localStorage.setItem(
            "prayerCalculationMethod",
            prayerMethod.toString()
          )

          setState({
            error: null,
            loading: false,
            prayerCalculationMethod: prayerMethod,
          })
        },
        (error) => {
          // Location permission denied, still try to find method by timezone
          const prayerMethod = findClosestPrayerMethod()

          localStorage.setItem(
            "prayerCalculationMethod",
            prayerMethod.toString()
          )

          setState({
            error: error.message,
            loading: false,
            prayerCalculationMethod: prayerMethod,
          })
        }
      )
    } else {
      // Geolocation not supported, still try to find method by timezone
      const prayerMethod = findClosestPrayerMethod()

      localStorage.setItem("prayerCalculationMethod", prayerMethod.toString())

      setState({
        error: "Geolocation is not supported by this browser.",
        loading: false,
        prayerCalculationMethod: prayerMethod,
      })
    }
  }, [])

  const updateMethod = (methodValue: number) => {
    localStorage.setItem("prayerCalculationMethod", methodValue.toString())

    setState((prevState) => ({
      ...prevState,
      prayerCalculationMethod: methodValue,
    }))
  }

  return {
    ...state,
    updatePrayerCalculationMethod: updateMethod,
  }
}

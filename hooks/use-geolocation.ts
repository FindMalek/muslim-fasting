"use client"

import { useEffect, useState } from "react"

import { prayerCalculationMethods } from "@/config/consts"

const BIGDATACLOUD_BASE_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client"

interface GeolocationState {
  error: string | null
  loading: boolean
  prayerCalculationMethod: number | null
  latitude: number | null
  longitude: number | null
  city: string | null
  country: string | null
}

const defaultPrayerMethod = 18

function findClosestPrayerMethod() {
  try {
    // Get user's timezone from browser
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Find matching or similar timezone in prayer methods
    let closestMethod = defaultPrayerMethod // Default to ISNA (North America) if no match

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

    return closestMethod
  } catch (error) {
    console.error("Error determining prayer method:", error)
    return defaultPrayerMethod
  }
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    error: null,
    loading: true,
    prayerCalculationMethod: null,
    latitude: null,
    longitude: null,
    city: null,
    country: null,
  })

  useEffect(() => {
    // Check localStorage first
    const savedLat = localStorage.getItem("latitude")
    const savedLng = localStorage.getItem("longitude")
    const savedMethod = localStorage.getItem("prayerCalculationMethod")
    const savedCity = localStorage.getItem("city")
    const savedCountry = localStorage.getItem("country")

    if (savedLat && savedLng && savedMethod) {
      setState({
        error: null,
        loading: false,
        prayerCalculationMethod: parseInt(savedMethod),
        latitude: parseFloat(savedLat),
        longitude: parseFloat(savedLng),
        city: savedCity,
        country: savedCountry,
      })
      return
    }

    // Otherwise, try to get current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          // Determine closest prayer calculation method
          const prayerMethod = findClosestPrayerMethod()

          // Save coordinates to localStorage
          localStorage.setItem("latitude", latitude.toString())
          localStorage.setItem("longitude", longitude.toString())
          localStorage.setItem(
            "prayerCalculationMethod",
            prayerMethod.toString()
          )

          // Get city and country from coordinates using BIGDATACLOUD
          fetchLocationInfo(latitude, longitude, prayerMethod)
        },
        (error) => {
          setState({
            error: error.message,
            loading: false,
            prayerCalculationMethod: null,
            latitude: null,
            longitude: null,
            city: null,
            country: null,
          })
        }
      )
    } else {
      setState({
        error: "Geolocation is not supported by this browser.",
        loading: false,
        prayerCalculationMethod: null,
        latitude: null,
        longitude: null,
        city: null,
        country: null,
      })
    }
  }, [])

  const fetchLocationInfo = async (
    latitude: number,
    longitude: number,
    prayerMethod: number
  ) => {
    try {
      const url = new URL(BIGDATACLOUD_BASE_URL)
      url.searchParams.append("latitude", latitude.toString())
      url.searchParams.append("longitude", longitude.toString())
      url.searchParams.append("localityLanguage", "en")

      const response = await fetch(url.toString())

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`)
      }

      const data = await response.json()
      const { city, countryName } = data

      // Save to localStorage
      localStorage.setItem("city", city)
      localStorage.setItem("country", countryName)

      setState({
        error: null,
        loading: false,
        prayerCalculationMethod: prayerMethod,
        latitude,
        longitude,
        city,
        country: countryName,
      })
    } catch (error) {
      console.error("Error fetching location info:", error)

      // Still set coordinates even if we can't get city/country
      setState({
        error: null,
        loading: false,
        prayerCalculationMethod: prayerMethod,
        latitude,
        longitude,
        city: null,
        country: null,
      })
    }
  }

  const updateCoordinates = (latitude: number, longitude: number) => {
    // Determine closest prayer calculation method for new coordinates
    const prayerMethod = findClosestPrayerMethod()

    localStorage.setItem("latitude", latitude.toString())
    localStorage.setItem("longitude", longitude.toString())
    localStorage.setItem("prayerCalculationMethod", prayerMethod.toString())

    // Get city and country from new coordinates
    fetchLocationInfo(latitude, longitude, prayerMethod)
  }

  const updatePrayerCalculationMethod = (methodValue: number) => {
    localStorage.setItem("prayerCalculationMethod", methodValue.toString())

    setState((prevState) => ({
      ...prevState,
      prayerCalculationMethod: methodValue,
    }))
  }

  const updateLocation = (city: string, country: string) => {
    localStorage.setItem("city", city)
    localStorage.setItem("country", country)

    setState((prevState) => ({
      ...prevState,
      city,
      country,
    }))
  }

  return {
    ...state,
    updateCoordinates,
    updatePrayerCalculationMethod,
    updateLocation,
  }
}

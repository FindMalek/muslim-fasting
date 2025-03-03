"use client"

import { useEffect, useState } from "react"

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    // Check localStorage first
    const savedLat = localStorage.getItem("latitude")
    const savedLng = localStorage.getItem("longitude")

    if (savedLat && savedLng) {
      setState({
        latitude: parseFloat(savedLat),
        longitude: parseFloat(savedLng),
        error: null,
        loading: false,
      })
      return
    }

    // Otherwise, try to get current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          // Save to localStorage
          localStorage.setItem("latitude", latitude.toString())
          localStorage.setItem("longitude", longitude.toString())

          setState({
            latitude,
            longitude,
            error: null,
            loading: false,
          })
        },
        (error) => {
          setState({
            latitude: null,
            longitude: null,
            error: error.message,
            loading: false,
          })
        }
      )
    } else {
      setState({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
        loading: false,
      })
    }
  }, [])

  const updateCoordinates = (latitude: number, longitude: number) => {
    localStorage.setItem("latitude", latitude.toString())
    localStorage.setItem("longitude", longitude.toString())

    setState({
      latitude,
      longitude,
      error: null,
      loading: false,
    })
  }

  return {
    ...state,
    updateCoordinates,
  }
}

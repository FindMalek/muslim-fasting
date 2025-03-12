"use client"

import { useEffect, useState } from "react"

import { useLatLongStore } from "./use-lat-long-store"

export const useGeolocation = () => {
  const [isGeolocationLoading, setIsGeolocationLoading] =
    useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { latitude, longitude, setLatitude, setLongitude } = useLatLongStore()

  useEffect(() => {
    if (latitude && longitude) {
      setIsGeolocationLoading(false)
      return
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setIsGeolocationLoading(false)
      return
    }

    const success = (position: GeolocationPosition) => {
      const lat = parseFloat(position.coords.latitude.toFixed(5))
      const long = parseFloat(position.coords.longitude.toFixed(5))
      setIsGeolocationLoading(false)
      setLatitude(lat)
      setLongitude(long)
    }

    const error = () => {
      setError("Unable to retrieve your location")
      setIsGeolocationLoading(false)
    }

    navigator.geolocation.getCurrentPosition(success, error)
  }, [latitude, longitude, setLatitude, setLongitude])

  return { location: { latitude, longitude }, isGeolocationLoading, error }
}

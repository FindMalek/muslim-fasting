"use client"

import { useCallback, useEffect, useState } from "react"

import { useLatLongStore } from "./use-lat-long-store"

export const useGeolocation = () => {
  const [isGeolocationLoading, setIsGeolocationLoading] =
    useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { latitude, longitude, source, setLatitude, setLongitude, setSource } =
    useLatLongStore()

  const refetchLocation = useCallback(() => {
    setError(null)
    setSource("auto")
    setLatitude(0)
    setLongitude(0)
    setIsGeolocationLoading(true)

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
      setSource("auto")
    }

    const onError = () => {
      setError("Unable to retrieve your location")
      setIsGeolocationLoading(false)
    }

    navigator.geolocation.getCurrentPosition(success, onError)
  }, [setLatitude, setLongitude, setSource])

  useEffect(() => {
    if (source === "manual") {
      setIsGeolocationLoading(false)
      return
    }

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
      if (useLatLongStore.getState().source === "manual") {
        setIsGeolocationLoading(false)
        return
      }
      const lat = parseFloat(position.coords.latitude.toFixed(5))
      const long = parseFloat(position.coords.longitude.toFixed(5))
      setIsGeolocationLoading(false)
      setLatitude(lat)
      setLongitude(long)
      setSource("auto")
    }

    const onError = () => {
      setError("Unable to retrieve your location")
      setIsGeolocationLoading(false)
    }

    navigator.geolocation.getCurrentPosition(success, onError)
  }, [latitude, longitude, source, setLatitude, setLongitude, setSource])

  return {
    location: { latitude, longitude },
    isGeolocationLoading,
    error,
    refetchLocation,
  }
}

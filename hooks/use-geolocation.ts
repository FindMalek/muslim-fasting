import { useEffect, useState } from "react"

export const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number | null
    longitude: number | null
  }>({
    latitude: null,
    longitude: null,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }

    const error = () => {
      setError("Unable to retrieve your location")
    }

    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  return { location, error }
}

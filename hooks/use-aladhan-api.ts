import { useQuery } from "@tanstack/react-query"

import { AladhanApiV1TimingsEndpointResponse } from "@/types"

import { formatForAladhanApi } from "@/lib/utils"

import { useGeolocation } from "./use-geolocation"

const fetchTimings = async (
  date: string,
  latitude: number | null,
  longitude: number | null
): Promise<AladhanApiV1TimingsEndpointResponse> => {
  if (!date) {
    throw new Error("Date is required")
  }
  if (!latitude) {
    throw new Error("Latitude is required")
  }
  if (!longitude) {
    throw new Error("Longitude is required")
  }

  const response = await fetch(
    `/api/timings?date=${date}&latitude=${latitude}&longitude=${longitude}`
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export const useAladhanApi = (date: Date = new Date()) => {
  // called to get the user's location and store it in the latLongStore
  const {
    location: { latitude, longitude },
  } = useGeolocation()
  const formattedDate = formatForAladhanApi(date)
  return useQuery({
    enabled: !!latitude && !!longitude,
    queryKey: ["timings", formattedDate, latitude, longitude],
    queryFn: () => fetchTimings(formattedDate, latitude, longitude),
  })
}

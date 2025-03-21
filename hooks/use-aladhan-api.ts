import { useQuery } from "@tanstack/react-query"

import { AladhanApiV1TimingsEndpointResponse } from "@/types"

import { formatForAladhanApi } from "@/lib/utils"
import { useSelectedDateStore } from "@/hooks/use-selected-date-store"

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

export const useAladhanApi = () => {
  const {
    location: { latitude, longitude },
    isGeolocationLoading,
    error,
  } = useGeolocation()
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const formattedDate = formatForAladhanApi(selectedDate)
  const query = useQuery({
    enabled: !!latitude && !!longitude,
    queryKey: ["timings", formattedDate, latitude, longitude],
    queryFn: () => fetchTimings(formattedDate, latitude, longitude),
  })

  return { ...query, isGeolocationLoading, error }
}

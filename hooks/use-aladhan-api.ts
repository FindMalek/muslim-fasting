import { useQuery } from "@tanstack/react-query"

import { AladhanApiV1TimingsEndpointResponse } from "@/types"

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

export const useAladhanApi = (
  date: Date,
  latitude: number | null,
  longitude: number | null
) => {
  // format today's date from DD/MM/YYYY to YYYY-MM-DD
  const formattedDate = date.toLocaleDateString("en-GB").split("/").join("-")
  return useQuery({
    queryKey: ["timings", formattedDate, latitude, longitude],
    queryFn: () => fetchTimings(formattedDate, latitude, longitude),
  })
}

"use client"

import { useQuery } from "@tanstack/react-query"

export type NominatimResult = {
  display_name: string
  lat: string
  lon: string
}

const NOMINATIM_USER_AGENT = "MuslimFastingApp/1.0"

async function searchNominatim(query: string): Promise<NominatimResult[]> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
    {
      headers: {
        "User-Agent": NOMINATIM_USER_AGENT,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to search location")
  }

  return response.json()
}

export function useNominatimSearch(query: string) {
  const trimmedQuery = query.trim()
  const shouldFetch = trimmedQuery.length >= 2

  const queryResult = useQuery({
    queryKey: ["nominatim", trimmedQuery],
    queryFn: () => searchNominatim(trimmedQuery),
    enabled: shouldFetch,
    staleTime: 60_000,
  })

  return {
    results: queryResult.data ?? [],
    isLoading: queryResult.isPending && shouldFetch,
    error: queryResult.error,
  }
}

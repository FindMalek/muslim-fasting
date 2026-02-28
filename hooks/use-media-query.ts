"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [query])

  return matches
}

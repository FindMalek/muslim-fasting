"use client"

import { useState } from "react"
import { MapPin, Search } from "lucide-react"

import { useGeolocation } from "@/hooks/use-geolocation"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function LocationSelector() {
  const { location, error } = useGeolocation()
  const [city, setCity] = useState("")
  const [searchError, setSearchError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!city.trim()) return

    setIsSearching(true)
    setSearchError(null)

    try {
      // Using OpenStreetMap's Nominatim for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      )

      if (!response.ok) {
        throw new Error("Failed to search location")
      }

      const data = await response.json()

      if (data.length === 0) {
        setSearchError(
          "Location not found. Please try a different search term."
        )
      } else {
        // Use the first result
        const { lat, lon } = data[0]
        // updateCoordinates(parseFloat(lat), parseFloat(lon))
        setSearchError(null)
      }
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            <Button disabled={isSearching} onClick={handleSearch}>
              {isSearching ? "Searching..." : <Search className="size-4" />}
            </Button>
          </div>

          {searchError && (
            <p className="text-sm text-destructive">{searchError}</p>
          )}

          {/*{latitude && longitude && (*/}
          {/*  <div className="text-sm text-muted-foreground">*/}
          {/*    Current coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Coordinates are used to calculate accurate prayer times
      </CardFooter>
    </Card>
  )
}

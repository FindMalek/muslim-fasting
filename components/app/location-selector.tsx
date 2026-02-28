"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useLatLongStore } from "@/hooks/use-lat-long-store"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useNominatimSearch } from "@/hooks/use-nominatim-search"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function LocationSearchContent({
  searchQuery,
  setSearchQuery,
  results,
  isLoading,
  selectedLocationName,
  onSelectLocation,
  getEmptyMessage,
}: {
  searchQuery: string
  setSearchQuery: (q: string) => void
  results: { display_name: string; lat: string; lon: string }[]
  isLoading: boolean
  selectedLocationName: string | null
  onSelectLocation: (name: string, lat: string, lon: string) => void
  getEmptyMessage: () => string
}) {
  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search city..."
        value={searchQuery}
        onValueChange={setSearchQuery}
        className="min-h-11 sm:min-h-10"
      />
      <CommandList className="max-h-[min(50vh,20rem)] sm:max-h-60">
        <CommandEmpty>{getEmptyMessage()}</CommandEmpty>
        <CommandGroup className="overflow-y-auto">
          {results.map((result) => (
            <CommandItem
              key={`${result.lat}-${result.lon}`}
              value={result.display_name}
              onSelect={() =>
                onSelectLocation(result.display_name, result.lat, result.lon)
              }
            >
              <Check
                className={cn(
                  "mr-2 size-4 shrink-0",
                  selectedLocationName === result.display_name
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
              <span className="truncate">{result.display_name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export function LocationSelector() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = !useMediaQuery("(min-width: 640px)")

  const debouncedQuery = useDebounce(searchQuery, 400)
  const { results, isLoading } = useNominatimSearch(debouncedQuery)

  const { isGeolocationLoading, error, refetchLocation } = useGeolocation()

  const {
    selectedLocationName,
    setCoordinates,
    setSelectedLocationName,
    setSource,
  } = useLatLongStore()

  const handleSelectLocation = (
    displayName: string,
    lat: string,
    lon: string
  ) => {
    setCoordinates(parseFloat(lat), parseFloat(lon))
    setSelectedLocationName(displayName)
    setSource("manual")
    setOpen(false)
    setSearchQuery("")
  }

  const handleUseMyLocation = () => {
    refetchLocation()
  }

  const getEmptyMessage = () => {
    if (debouncedQuery.trim().length < 2) {
      return "Type at least 2 characters to search"
    }
    if (isLoading) {
      return "Searching..."
    }
    return "No location found."
  }

  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="min-h-11 w-full min-w-0 shrink justify-between gap-2 overflow-hidden sm:min-h-9"
    >
      <span className="min-w-0 flex-1 truncate text-left">
        {isGeolocationLoading && !selectedLocationName
          ? "Detecting location..."
          : selectedLocationName || "Search for a city..."}
      </span>
      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
    </Button>
  )

  const searchContent = (
    <LocationSearchContent
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      results={results}
      isLoading={isLoading}
      selectedLocationName={selectedLocationName}
      onSelectLocation={handleSelectLocation}
      getEmptyMessage={getEmptyMessage}
    />
  )

  return (
    <Card className="min-w-0 overflow-hidden py-4 sm:py-6">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <MapPin className="size-4 sm:size-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertDescription>
                {error} Search for your city above to set it manually.
              </AlertDescription>
            </Alert>
          )}

          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>{triggerButton}</SheetTrigger>
              <SheetContent
                side="bottom"
                className="max-h-[85dvh] rounded-t-xl border-t p-0"
              >
                <SheetHeader className="border-b px-4 py-3 text-left">
                  <SheetTitle>Search for a city</SheetTitle>
                </SheetHeader>
                <div className="overflow-hidden p-2">{searchContent}</div>
              </SheetContent>
            </Sheet>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-2rem)] p-0 sm:max-w-none"
                align="start"
                sideOffset={8}
              >
                {searchContent}
              </PopoverContent>
            </Popover>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="min-h-11 w-full sm:min-h-9"
            onClick={handleUseMyLocation}
            disabled={isGeolocationLoading}
          >
            Use my location
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground px-4 text-xs sm:px-6">
        Coordinates are used to calculate accurate prayer times
      </CardFooter>
    </Card>
  )
}

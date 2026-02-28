"use client"

import { useMemo } from "react"
import { Loader2 } from "lucide-react"

import { timezoneOptions } from "@/config/consts"
import { useLatLongStore } from "@/hooks/use-lat-long-store"
import { useTimezone } from "@/hooks/use-timezone"

import { Icons } from "@/components/shared/icons"

export function TimezoneName() {
  const { timezone, isGeolocationLoading } = useTimezone()
  const selectedLocationName = useLatLongStore(
    (state) => state.selectedLocationName
  )

  const readableTimezone = useMemo(
    () => timezoneOptions.find((timezoneX) => timezoneX.value === timezone),
    [timezone]
  )

  if (isGeolocationLoading) {
    return (
      <div className="text-muted-foreground mt-2 flex items-center justify-center gap-x-6 p-0.5 text-sm">
        <Icons.location className="mr-1 size-4 shrink-0" />
        <Loader2 className="mr-1 size-4 shrink-0 animate-spin" />
      </div>
    )
  }

  const displayName =
    selectedLocationName ?? readableTimezone?.name ?? "Unknown"

  return (
    <div className="text-muted-foreground mt-2 flex items-center justify-center gap-x-2 p-0.5 text-sm">
      <Icons.location className="size-4 shrink-0" />
      <span className="truncate">{displayName}</span>
    </div>
  )
}

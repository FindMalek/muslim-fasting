"use client"

import { useMemo } from "react"
import { Loader2 } from "lucide-react"

import { timezoneOptions } from "@/config/consts"
import { useTimezone } from "@/hooks/use-timezone"

import { Icons } from "@/components/shared/icons"

export function TimezoneName() {
  const { timezone, isGeolocationLoading } = useTimezone()

  const readableTimezone = useMemo(
    () => timezoneOptions.find((timezoneX) => timezoneX.value === timezone),
    [timezone]
  )

  if (isGeolocationLoading) {
    return (
      <div className="text-muted-foreground mt-2 flex items-center justify-center gap-x-6 p-0.5 text-sm">
        <Icons.location className="mr-1 size-4" />
        <Loader2 className="mr-1 size-4 animate-spin" />
      </div>
    )
  }

  return (
    <div className="text-muted-foreground mt-2 flex items-center justify-center text-sm">
      <Icons.location className="mr-1 size-4" />
      <span>{readableTimezone?.name ?? "Unknown"}</span>
    </div>
  )
}

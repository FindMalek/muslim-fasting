"use client"

import { timezoneOptions } from "@/config/consts"
import { useAladhanApi } from "@/hooks/use-aladhan-api"
import { useGeolocation } from "@/hooks/use-geolocation"

import { Skeleton } from "@/components/ui/skeleton"

export function TimezoneName() {
  const { location } = useGeolocation()
  const { data, isPending } = useAladhanApi(
    new Date(),
    location.latitude,
    location.longitude
  )

  if (isPending || data === null) {
    return <Skeleton className="h-4 w-20" />
  }

  const timezone = timezoneOptions.find(
    (timezone) => timezone.value === data?.data.meta.timezone
  )

  return <span>{timezone?.name ?? "Unknown"}</span>
}

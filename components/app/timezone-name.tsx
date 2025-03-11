"use client"

import { timezoneOptions } from "@/config/consts"
import { useAladhanApi } from "@/hooks/use-aladhan-api"

import { Skeleton } from "@/components/ui/skeleton"

export function TimezoneName() {
  const { data, isPending } = useAladhanApi()

  if (isPending || data === null) {
    return <Skeleton className="h-5 w-32" />
  }

  const timezone = timezoneOptions.find(
    (timezone) => timezone.value === data?.data.meta.timezone
  )

  return <span>{timezone?.name ?? "Unknown"}</span>
}

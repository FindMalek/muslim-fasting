"use client"

import { useMemo } from "react"
import { Loader2 } from "lucide-react"

import { timezoneOptions } from "@/config/consts"
import { useAladhanApi } from "@/hooks/use-aladhan-api"

import { Icons } from "@/components/shared/icons"

export function TimezoneName() {
  const { data, isPending, isSuccess, isLoading, isGeolocationLoading } =
    useAladhanApi()

  const timezone = useMemo(
    () =>
      timezoneOptions.find(
        (timezone) => timezone.value === data?.data.meta.timezone
      ),
    [data]
  )

  if (isLoading || isPending || isGeolocationLoading) {
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
      {isSuccess && timezone && <span>{timezone.name ?? "Unknown"}</span>}
    </div>
  )
}

"use client"

import { useMemo } from "react"
import { Loader2 } from "lucide-react"

import { timezoneOptions } from "@/config/consts"
import { useAladhanApi } from "@/hooks/use-aladhan-api"

import { Icons } from "@/components/shared/icons"
import { Skeleton } from "@/components/ui/skeleton"

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
  return (
    <div className="text-muted-foreground mt-2 flex items-center justify-center text-sm">
      <Icons.location className="mr-1 size-4" />
      {isGeolocationLoading && <Loader2 className="mr-1 size-4 animate-spin" />}
      {(isLoading || isPending) && !isGeolocationLoading && (
        <Skeleton className="h-5 w-32" />
      )}
      {isSuccess && <span>{timezone?.name ?? "Unknown"}</span>}
    </div>
  )
}

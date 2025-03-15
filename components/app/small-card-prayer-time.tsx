"use client"

import { useMemo } from "react"

import { useAladhanApi } from "@/hooks/use-aladhan-api"
import useTimeFormat from "@/hooks/use-time-format"

import { SmallCardPrayerTimeSkeleton } from "@/components/app/small-card-prayer-time-skeleton"

export function SmallCardPrayerTime({
  prayerName,
}: {
  prayerName: "Fajr" | "Dhuhr" | "Asr" | "Isha"
}) {
  const { formatToSelectedTimeFormat } = useTimeFormat()
  const { data, isLoading, isPending, isSuccess } = useAladhanApi()

  const prayerTimes = useMemo(() => {
    if (isSuccess && data) {
      return {
        [prayerName]: data.data.timings[prayerName],
      }
    }
  }, [data, isSuccess, prayerName])

  if (isLoading || isPending) {
    return <SmallCardPrayerTimeSkeleton />
  }

  if (isSuccess && prayerTimes) {
    return (
      <p className="text-lg font-semibold">
        {formatToSelectedTimeFormat(prayerTimes[prayerName])}
      </p>
    )
  }
}

"use client"

import { useMemo } from "react"

import { useAladhanApi } from "@/hooks/use-aladhan-api"
import useTimeFormat from "@/hooks/use-time-format"

import { BigCardPrayerTimeSkeleton } from "@/components/app/big-card-prayer-time-skeleton"

export function BigCardPrayerTime({
  prayerName,
}: {
  prayerName: "Imsak" | "Maghrib"
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
    return <BigCardPrayerTimeSkeleton />
  }

  if (isSuccess && prayerTimes) {
    return (
      <p className="text-2xl font-bold">
        {formatToSelectedTimeFormat(prayerTimes[prayerName])}
      </p>
    )
  }
}

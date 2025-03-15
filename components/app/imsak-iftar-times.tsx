import { useMemo } from "react"

import { useAladhanApi } from "@/hooks/use-aladhan-api"
import useTimeFormat from "@/hooks/use-time-format"

import { ImsakIftarTimesSkeleton } from "@/components/app/imsak-iftar-times-skeleton"

export function ImsakIftarTimes() {
  const { formatToSelectedTimeFormat } = useTimeFormat()
  const { data, isLoading, isPending, isSuccess } = useAladhanApi()

  const prayerTimes = useMemo(() => {
    if (isSuccess) {
      return {
        Imsak: data.data.timings.Imsak,
        Maghrib: data.data.timings.Maghrib,
      }
    }
  }, [data, isSuccess])
  if (isLoading || isPending || !prayerTimes) {
    return <ImsakIftarTimesSkeleton />
  }
  return (
    <>
      <div>
        <p className="text-muted-foreground">Suhur ends (Imsak):</p>
        <p className="font-medium">
          {formatToSelectedTimeFormat(prayerTimes.Imsak)}
        </p>
      </div>
      <div>
        <p className="text-muted-foreground">Iftar starts:</p>
        <p className="font-medium">
          {formatToSelectedTimeFormat(prayerTimes.Maghrib)}
        </p>
      </div>
    </>
  )
}

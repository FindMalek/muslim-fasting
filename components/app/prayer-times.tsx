"use client"

import { useMemo } from "react"
import { Sunrise, Sunset } from "lucide-react"

import { useAladhanApi } from "@/hooks/use-aladhan-api"
import { useSelectedDateStore } from "@/hooks/use-selected-date-store"

import { PrayerTimesSkeleton } from "@/components/app/prayer-times-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function PrayerTimes() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const { data, isLoading, isPending, isSuccess } = useAladhanApi(selectedDate)

  const prayerTimes = useMemo(() => {
    if (isSuccess) {
      return {
        Imsak: data.data.timings.Imsak,
        Fajr: data.data.timings.Fajr,
        Dhuhr: data.data.timings.Dhuhr,
        Asr: data.data.timings.Asr,
        Maghrib: data.data.timings.Maghrib,
        Isha: data.data.timings.Isha,
      }
    }
  }, [data, isSuccess])

  if (isLoading || isPending) {
    return <PrayerTimesSkeleton />
  }

  return (
    isSuccess &&
    prayerTimes && (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="bg-primary/5">
            <CardContent className="flex items-center">
              <div className="bg-primary/10 mr-4 rounded-full p-4">
                <Sunrise className="text-primary size-6" />
              </div>
              <div>
                <p className="text-sm font-medium">Suhur Ends (Imsak)</p>
                <p className="text-2xl font-bold">{prayerTimes.Imsak}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardContent className="flex items-center">
              <div className="bg-primary/10 mr-4 rounded-full p-4">
                <Sunset className="text-primary size-6" />
              </div>
              <div>
                <p className="text-sm font-medium">Iftar (Maghrib)</p>
                <p className="text-2xl font-bold">{prayerTimes.Maghrib}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            <CardContent>
              <p className="text-sm font-medium">Fajr</p>
              <p className="text-lg font-semibold">{prayerTimes.Fajr}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm font-medium">Dhuhr</p>
              <p className="text-lg font-semibold">{prayerTimes.Dhuhr}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="text-sm font-medium">Asr</p>
              <p className="text-lg font-semibold">{prayerTimes.Asr}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="text-sm font-medium">Isha</p>
              <p className="text-lg font-semibold">{prayerTimes.Isha}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  )
}

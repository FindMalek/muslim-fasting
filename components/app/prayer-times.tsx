"use client"

import { Sunrise, Sunset } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { useAladhanApi } from "@/hooks/use-aladhan-api"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useSelectedDateStore } from "@/hooks/use-selected-date-store"

import { PrayerTimesSkeleton } from "@/components/app/prayer-times-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function PrayerTimes() {
  const { location } = useGeolocation()
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const { data, isLoading } = useAladhanApi(
    selectedDate,
    location.latitude,
    location.longitude
  )
  if (isLoading || !data) {
    return <PrayerTimesSkeleton />
  }
  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold">
        {formatDate(selectedDate)}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-primary/5">
          <CardContent className="flex items-center p-4">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <Sunrise className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Suhur Ends (Imsak)</p>
              <p className="text-2xl font-bold">{data.data.timings.Imsak}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardContent className="flex items-center p-4">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <Sunset className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Iftar (Maghrib)</p>
              <p className="text-2xl font-bold">{data.data.timings.Maghrib}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Fajr</p>
            <p className="text-lg font-semibold">{data.data.timings.Fajr}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Dhuhr</p>
            <p className="text-lg font-semibold">{data.data.timings.Dhuhr}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Asr</p>
            <p className="text-lg font-semibold">{data.data.timings.Asr}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Isha</p>
            <p className="text-lg font-semibold">{data.data.timings.Isha}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

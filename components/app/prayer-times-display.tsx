"use client"

import { Sunrise, Sunset } from "lucide-react"

import { PrayerTimesSkeleton } from "@/components/app/prayer-times-skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface PrayerTimesDisplayProps {
  prayerTimes: { 
    fajr: string
    sunrise: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
    midnight: string
  } | null
  date: Date
}

export function PrayerTimesDisplay({
  prayerTimes,
  date,
}: PrayerTimesDisplayProps) {
  if (!prayerTimes) {
    return <PrayerTimesSkeleton />
  }

  const formatPrayerTime = (time: string | null) => {
    if (!time) return "N/A"
    return time
  }

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-primary/5">
          <CardContent className="flex items-center p-4">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <Sunrise className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Suhur Ends (Fajr)</p>
              <p className="text-2xl font-bold">
                {formatPrayerTime(prayerTimes.fajr)}
              </p>
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
              <p className="text-2xl font-bold">
                {formatPrayerTime(prayerTimes.maghrib)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Dhuhr</p>
            <p className="text-lg font-semibold">
              {formatPrayerTime(prayerTimes.dhuhr)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Asr</p>
            <p className="text-lg font-semibold">
              {formatPrayerTime(prayerTimes.asr)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Isha</p>
            <p className="text-lg font-semibold">
              {formatPrayerTime(prayerTimes.isha)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Sunrise, Sunset } from "lucide-react"

import type { PrayerTimes } from "@/types/prayer-times"

import { formatDate } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"

interface PrayerTimesDisplayProps {
  prayerTimes: PrayerTimes | null
  date: Date
}

export function PrayerTimesDisplay({
  prayerTimes,
  date,
}: PrayerTimesDisplayProps) {
  if (!prayerTimes) {
    return (
      <div className="p-8 text-center">
        <p>Loading prayer times...</p>
      </div>
    )
  }

  const formatPrayerTime = (time: Date | null) => {
    if (!time) return "N/A"
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold">{formatDate(date)}</h2>

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

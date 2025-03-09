"use client"

import { useState } from "react"
import { useOldGeolocation } from "@/hooks-old/use-old-geolocation"
import { usePrayerTimes } from "@/hooks-old/use-prayer-times"

import { CountdownTimer } from "@/components/app/countdown-timer"
import { DailyDua } from "@/components/app/daily-dua"
import { LocationSelector } from "@/components/app/location-selector"
import { OldRamadanCalendar } from "@/components/app/old-ramadan-calendar"
import { PrayerTimes } from "@/components/app/prayer-times"

export function RamadanDashboard() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<Date>(today)

  const { prayerTimes, isLoading: prayerTimesLoading } = usePrayerTimes()

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const { loading: locationLoading } = useOldGeolocation()

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Ramadan Dashboard</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <CountdownTimer />

          <PrayerTimes />

          <DailyDua date={selectedDate} />
        </div>

        <div className="space-y-6 lg:col-span-4">
          <LocationSelector />

          <OldRamadanCalendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>
      </div>
    </div>
  )
}

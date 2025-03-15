import { Calendar } from "@/components/app/calendar"
import { CountdownTimer } from "@/components/app/countdown-timer"
import { DailyDua } from "@/components/app/daily-dua"
import { LocationSelector } from "@/components/app/location-selector"
import { PrayerTimes } from "@/components/app/prayer-times"

export function RamadanDashboard() {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Ramadan Dashboard</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <CountdownTimer />

          <PrayerTimes />

          <DailyDua />
        </div>

        <div className="space-y-6 lg:col-span-4">
          <LocationSelector />

          <Calendar />
        </div>
      </div>
    </div>
  )
}

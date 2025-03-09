"use client"

import { useState } from "react"
import { useOldGeolocation } from "@/hooks-old/use-old-geolocation"
import { usePrayerTimes } from "@/hooks-old/use-prayer-times"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { formatDateShort } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface RamadanCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export function OldRamadanCalendar({
  selectedDate,
  onDateSelect,
}: RamadanCalendarProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const { loading: locationLoading } = useOldGeolocation()

  const { prayerTimes, isLoading: prayerTimesLoading } = usePrayerTimes()

  const isLoading = locationLoading || prayerTimesLoading

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isToday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date.toDateString() === selectedDate.toDateString()
  }

  const selectDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    onDateSelect(date)
  }

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  )

  // Generate calendar days
  const calendarDays = []
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`}></div>)
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <div key={day}>
        <Button
          variant="ghost"
          className={`size-10 p-0 ${isToday(day) ? "bg-primary/10 text-primary" : ""} ${isSelected(day) ? "bg-primary text-primary-foreground hover:bg-primary/70" : ""}`}
          onClick={() => selectDate(day)}
        >
          {day}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {monthName} {currentYear}
        </h2>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-sm font-medium">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>

      {isLoading ? (
        <Card className="mt-6">
          <CardContent className="p-4">
            <Skeleton className="mb-2 h-5 w-36" />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div>
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : prayerTimes ? (
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="mb-2 font-medium">
              {formatDateShort(selectedDate)}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Suhur ends:</p>
                <p className="font-medium">{prayerTimes.fajr || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Iftar:</p>
                <p className="font-medium">{prayerTimes.maghrib || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-6">
          <CardContent className="p-4">
            <p className="text-center text-muted-foreground">
              Unable to load prayer times
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

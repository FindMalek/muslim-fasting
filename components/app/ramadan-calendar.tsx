"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { formatDateShort } from "@/lib/utils"
import { usePrayerTimes } from "@/hooks/use-prayer-times"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface RamadanCalendarProps {
  timezone: string
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export function RamadanCalendar({
  timezone,
  selectedDate,
  onDateSelect,
}: RamadanCalendarProps) {
  // For a real app, you would calculate the actual Ramadan dates
  // This is a simplified example using the current month
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const { prayerTimes } = usePrayerTimes(timezone, selectedDate)

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
    calendarDays.push(<div key={`empty-${i}`} className="size-10"></div>)
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <Button
        key={day}
        variant="ghost"
        className={`size-10 p-0 ${isToday(day) ? "bg-primary/10 text-primary" : ""} ${isSelected(day) ? "bg-primary text-primary-foreground hover:bg-primary/70" : ""}`}
        onClick={() => selectDate(day)}
      >
        {day}
      </Button>
    )
  }

  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-7 gap-1 text-center ">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex h-10 items-center justify-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
        {calendarDays}
      </div>

      {prayerTimes && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="mb-2 font-medium">
              {formatDateShort(selectedDate)}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Suhur ends:</p>
                <p className="font-medium">
                  {prayerTimes.fajr?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Iftar:</p>
                <p className="font-medium">
                  {prayerTimes.maghrib?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

"use client"

import { useCallback, useMemo } from "react"

import { useSelectedDateStore } from "@/hooks/use-selected-date-store"

import { Button } from "@/components/ui/button"

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function CalendarContent() {
  const { selectedDate, setSelectedDate } = useSelectedDateStore()

  const selectedDateMonth = useMemo(
    () => selectedDate.getMonth(),
    [selectedDate]
  )
  const selectedDateYear = useMemo(
    () => selectedDate.getFullYear(),
    [selectedDate]
  )
  const daysInShownCalendarMonth = useMemo(
    () => new Date(selectedDateYear, selectedDateMonth + 1, 0).getDate(),
    [selectedDateYear, selectedDateMonth]
  )

  const firstDayOfShownCalendarMonth = useMemo(
    () => new Date(selectedDateYear, selectedDateMonth, 1).getDay(),
    [selectedDateYear, selectedDateMonth]
  )

  const isDateInCalendarSelected = useCallback(
    (day: number) => {
      const date = new Date(selectedDateYear, selectedDateMonth, day)
      return date.toDateString() === selectedDate.toDateString()
    },
    [selectedDateYear, selectedDateMonth, selectedDate]
  )

  const isToday = useCallback(
    (day: number) => {
      const date = new Date(selectedDateYear, selectedDateMonth, day)
      return date.toDateString() === new Date().toDateString()
    },
    [selectedDateYear, selectedDateMonth]
  )
  const setSelectedDateToCalendar = useCallback(
    (day: number) => {
      if (isDateInCalendarSelected(day)) return
      setSelectedDate((prevDate) => {
        let newDate = new Date(prevDate)
        newDate.setDate(day)
        return newDate
      })
    },
    [isDateInCalendarSelected, setSelectedDate]
  )

  return (
    <div className="grid grid-cols-7 gap-3 text-center">
      {daysOfWeek.map((day) => (
        <div key={day} className="text-muted-foreground truncate font-medium">
          {day}
        </div>
      ))}
      {Array.from({ length: firstDayOfShownCalendarMonth }, (_, i) => (
        <div key={`empty-${i}`}></div>
      ))}
      {Array.from({ length: daysInShownCalendarMonth }, (_, index) => {
        const day = index + 1
        return (
          <div key={day}>
            <Button
              variant="ghost"
              className={`${isToday(day) ? "bg-primary/10 text-primary" : ""} ${isDateInCalendarSelected(day) ? "bg-primary text-primary-foreground hover:bg-primary/70" : ""}`}
              onClick={setSelectedDateToCalendar.bind(null, day)}
            >
              {day}
            </Button>
          </div>
        )
      })}
    </div>
  )
}

"use client"

import { useCallback, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { formatDateShort } from "@/lib/utils"
import { useAladhanApi } from "@/hooks/use-aladhan-api"
import { useSelectedDateStore } from "@/hooks/use-selected-date-store"
import useTimeFormat from "@/hooks/use-time-format"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function Calendar() {
  const { selectedDate, setSelectedDate } = useSelectedDateStore()
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

  const today = useMemo(() => new Date(), [])
  const [shownCalendarMonth, setShownCalendarMonth] = useState(today.getMonth())
  const [shownCalendarYear, setShownCalendarYear] = useState(
    today.getFullYear()
  )

  const daysInShownCalendarMonth = useMemo(
    () => new Date(shownCalendarYear, shownCalendarMonth + 1, 0).getDate(),
    [shownCalendarYear, shownCalendarMonth]
  )

  const firstDayOfShownCalendarMonth = useMemo(
    () => new Date(shownCalendarYear, shownCalendarMonth, 1).getDay(),
    [shownCalendarYear, shownCalendarMonth]
  )

  const showPreviousMonthInCalendar = useCallback(() => {
    if (shownCalendarMonth === 0) {
      setShownCalendarMonth(11)
      setShownCalendarYear(shownCalendarYear - 1)
    } else {
      setShownCalendarMonth(shownCalendarMonth - 1)
    }
  }, [shownCalendarMonth, shownCalendarYear])

  const showNextMonthInCalendar = useCallback(() => {
    if (shownCalendarMonth === 11) {
      setShownCalendarMonth(0)
      setShownCalendarYear(shownCalendarYear + 1)
    } else {
      setShownCalendarMonth(shownCalendarMonth + 1)
    }
  }, [shownCalendarMonth, shownCalendarYear])

  const isToday = useCallback(
    (day: number) => {
      const date = new Date(shownCalendarYear, shownCalendarMonth, day)
      return date.toDateString() === today.toDateString()
    },
    [shownCalendarYear, shownCalendarMonth, today]
  )

  const isDateInCalendarSelected = useCallback(
    (day: number) => {
      const date = new Date(shownCalendarYear, shownCalendarMonth, day)
      return date.toDateString() === selectedDate.toDateString()
    },
    [shownCalendarYear, shownCalendarMonth, selectedDate]
  )

  const selectDate = useCallback(
    (day: number) => {
      const date = new Date(shownCalendarYear, shownCalendarMonth, day)
      setSelectedDate(date)
    },
    [shownCalendarYear, shownCalendarMonth, setSelectedDate]
  )

  const shownCalendarMonthName = useMemo(
    () =>
      new Date(shownCalendarYear, shownCalendarMonth).toLocaleString(
        "default",
        {
          month: "long",
        }
      ),
    [shownCalendarYear, shownCalendarMonth]
  )

  // Generate calendar days
  const daysOfWeek = useMemo(
    () => [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    []
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {shownCalendarMonthName} {shownCalendarYear}
        </h2>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={showPreviousMonthInCalendar}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={showNextMonthInCalendar}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
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
      {(isLoading || isPending) && (
        <Card className="mt-6">
          <CardContent>
            <Skeleton className="mb-3 h-6 w-24" />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <Skeleton className="mb-1 h-4 w-32" />
                <Skeleton className="h-4 w-10" />
              </div>
              <div>
                <Skeleton className="mb-1 h-4 w-16" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {isSuccess && prayerTimes && (
        <Card className="mt-6">
          <CardContent>
            <h3 className="mb-2 font-medium">
              {formatDateShort(selectedDate)}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Suhur ends (Imsak):</p>
                <p className="font-medium">
                  {formatToSelectedTimeFormat(prayerTimes.Imsak) || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Iftar time:</p>
                <p className="font-medium">
                  {formatToSelectedTimeFormat(prayerTimes.Maghrib) || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

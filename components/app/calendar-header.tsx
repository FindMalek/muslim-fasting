"use client"

import { useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { useSelectedDateStore } from "@/hooks/use-selected-date-store"

import { Button } from "@/components/ui/button"

export function CalendarHeader() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate)

  const selectedDateMonth = useMemo(
    () => selectedDate.getMonth(),
    [selectedDate]
  )

  const selectedDateYear = useMemo(
    () => selectedDate.getFullYear(),
    [selectedDate]
  )

  const navigateToNextMonth = useCallback(() => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + 1)
      newDate.setDate(1)
      return newDate
    })
  }, [setSelectedDate])

  const navigateToPreviousMonth = useCallback(() => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() - 1)
      newDate.setDate(1)
      return newDate
    })
  }, [setSelectedDate])

  const selectedDateMonthName = useMemo(
    () =>
      new Date(selectedDateYear, selectedDateMonth).toLocaleString("default", {
        month: "long",
      }),
    [selectedDateYear, selectedDateMonth]
  )

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">
        {selectedDateMonthName} {selectedDateYear}
      </h2>
      <div className="flex gap-1">
        <Button variant="outline" size="icon" onClick={navigateToPreviousMonth}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={navigateToNextMonth}>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

"use client"

import { formatDate } from "@/lib/utils"
import { useSelectedDateStore } from "@/hooks/use-selected-date-store"

export function SelectedDateLongFormat() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)

  return (
    <h2 className="text-center text-xl font-semibold">
      {formatDate(selectedDate)}
    </h2>
  )
}

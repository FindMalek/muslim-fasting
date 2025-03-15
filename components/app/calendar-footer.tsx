"use client"

import { Suspense } from "react"

import { formatDateShort } from "@/lib/utils"
import { useSelectedDateStore } from "@/hooks/use-selected-date-store"

import { ImsakIftarTimes } from "@/components/app/imsak-iftar-times"
import { ImsakIftarTimesSkeleton } from "@/components/app/imsak-iftar-times-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function CalendarFooter() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)

  return (
    <Card className="mt-6">
      <CardContent>
        <h3 className="mb-2 font-medium">{formatDateShort(selectedDate)}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Suspense fallback={<ImsakIftarTimesSkeleton />}>
            <ImsakIftarTimes />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  )
}

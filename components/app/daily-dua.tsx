"use client"

import { useCallback, useMemo, useState } from "react"

import { ramadanDuas } from "@/config/consts"
import { useSelectedDateStore } from "@/hooks/use-selected-date-store"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"

export function DailyDua() {
  const [copied, setCopied] = useState(false)
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const dayOfYear = useMemo(
    () =>
      Math.floor(
        (selectedDate.getTime() -
          new Date(selectedDate.getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    [selectedDate]
  )
  const duaIndex = useMemo(() => dayOfYear % ramadanDuas.length, [dayOfYear])
  const dua = useMemo(() => ramadanDuas[duaIndex], [duaIndex])

  const handleCopy = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(
          `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`
        )
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
    } else {
      alert(
        "Your browser does not support copying to clipboard. Please copy the text manually." +
          "\n\n" +
          "This could be due to your browser's privacy settings."
      )
    }
  }, [dua])

  return (
    <div className="bg-card text-card-foreground rounded-lg">
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-none font-semibold tracking-tight">
            Daily Dua
          </h3>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            {copied ? (
              <Icons.check className="size-4" />
            ) : (
              <Icons.copy className="size-4" />
            )}
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">{dua.title}</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <p className="font-arabic text-right text-xl leading-loose">
            {dua.arabic}
          </p>
          <p className="text-sm italic">{dua.transliteration}</p>
          <p className="text-sm">{dua.translation}</p>
          <p className="text-muted-foreground text-xs">Source: {dua.source}</p>
        </div>
      </div>
    </div>
  )
}

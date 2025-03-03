"use client"

import { useState } from "react"

import { ramadanDuas } from "@/config/consts"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"

interface DailyDuaProps {
  date: Date
}

export function DailyDua({ date }: DailyDuaProps) {
  const [copied, setCopied] = useState(false)

  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const duaIndex = dayOfYear % ramadanDuas.length
  const dua = ramadanDuas[duaIndex]

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg bg-card text-card-foreground">
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
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
        <p className="text-sm text-muted-foreground">{dua.title}</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <p className="font-arabic text-right text-xl leading-loose">
            {dua.arabic}
          </p>
          <p className="text-sm italic">{dua.transliteration}</p>
          <p className="text-sm">{dua.translation}</p>
          <p className="text-xs text-muted-foreground">Source: {dua.source}</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Sunrise, Sunset } from "lucide-react"

import type { PrayerTimes } from "@/types/prayer-times"

import { formatTime } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CountdownTimerProps {
  prayerTimes: PrayerTimes | null
  timezone: string
}

export function CountdownTimer({ prayerTimes, timezone }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [targetTime, setTargetTime] = useState<Date | null>(null)
  const [targetName, setTargetName] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)
  const [icon, setIcon] = useState<"sunrise" | "sunset">("sunset")

  useEffect(() => {
    if (!prayerTimes) return

    const calculateNextPrayer = () => {
      const now = new Date()

      // Check if we're in Ramadan fasting hours (between Fajr and Maghrib)
      if (
        prayerTimes.fajr &&
        prayerTimes.maghrib &&
        now >= prayerTimes.fajr &&
        now < prayerTimes.maghrib
      ) {
        // Counting down to Iftar (Maghrib)
        setTargetTime(prayerTimes.maghrib)
        setTargetName("Iftar")
        setIcon("sunset")

        // Calculate total fasting duration and progress
        const fastingDuration =
          prayerTimes.maghrib.getTime() - prayerTimes.fajr.getTime()
        const elapsed = now.getTime() - prayerTimes.fajr.getTime()
        const progressPercent = Math.min(100, (elapsed / fastingDuration) * 100)
        setProgress(progressPercent)
      } else {
        // We're after Maghrib or before Fajr, counting down to Suhur end (Fajr)
        // Get tomorrow's Fajr if needed
        let nextFajr = prayerTimes.fajr

        if (!nextFajr || now >= nextFajr) {
          // We need tomorrow's Fajr time
          const tomorrow = new Date(now)
          tomorrow.setDate(tomorrow.getDate() + 1)
          // This is a placeholder - in a real app, you'd calculate tomorrow's prayer times
          // For this demo, we'll just add 24 hours to today's Fajr
          if (prayerTimes.fajr) {
            nextFajr = new Date(prayerTimes.fajr)
            nextFajr.setDate(nextFajr.getDate() + 1)
          }
        }

        if (nextFajr) {
          setTargetTime(nextFajr)
          setTargetName("Suhur Ends")
          setIcon("sunrise")

          // Calculate progress for night hours
          let nightDuration = 0
          if (prayerTimes.maghrib) {
            if (now >= prayerTimes.maghrib) {
              // From Maghrib to next Fajr
              nightDuration = nextFajr.getTime() - prayerTimes.maghrib.getTime()
              const elapsed = now.getTime() - prayerTimes.maghrib.getTime()
              const progressPercent = Math.min(
                100,
                (elapsed / nightDuration) * 100
              )
              setProgress(progressPercent)
            } else {
              // From midnight to Fajr
              const midnight = new Date(now)
              midnight.setHours(0, 0, 0, 0)
              nightDuration = nextFajr.getTime() - midnight.getTime()
              const elapsed = now.getTime() - midnight.getTime()
              const progressPercent = Math.min(
                100,
                (elapsed / nightDuration) * 100
              )
              setProgress(progressPercent)
            }
          }
        }
      }
    }

    calculateNextPrayer()

    const interval = setInterval(() => {
      const now = new Date()

      if (targetTime) {
        const diff = targetTime.getTime() - now.getTime()

        if (diff <= 0) {
          // Time's up, recalculate next target
          calculateNextPrayer()
        } else {
          setTimeRemaining(Math.floor(diff / 1000))
        }
      } else {
        calculateNextPrayer()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [prayerTimes, targetTime])

  if (!prayerTimes) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center">Loading countdown...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Time until {targetName}</h3>
          {icon === "sunset" ? (
            <Sunset className="size-5 text-primary" />
          ) : (
            <Sunrise className="size-5 text-primary" />
          )}
        </div>

        <div className="my-6 text-center text-4xl font-bold">
          {formatTime(timeRemaining)}
        </div>

        <Progress value={progress} className="h-2" />

        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {icon === "sunset" ? (
            <>
              <span>Fajr</span>
              <span>Maghrib</span>
            </>
          ) : (
            <>
              <span>Maghrib</span>
              <span>Fajr</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

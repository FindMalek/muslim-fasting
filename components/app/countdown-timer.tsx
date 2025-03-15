/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useMemo, useState } from "react"
import { Sunrise, Sunset } from "lucide-react"

import { formatTime } from "@/lib/utils"
import { useAladhanApi } from "@/hooks/use-aladhan-api"

import { CountdownTimerSkeleton } from "@/components/app/countdown-timer-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type TimerState = {
  timeRemaining: number
  targetTime: Date | null
  targetName: "Imsak" | "Iftar"
  progress: number
  icon: "sunrise" | "sunset"
}

export function CountdownTimer() {
  const { data, isLoading, isPending, isSuccess } = useAladhanApi()

  const prayerTimes = useMemo(() => {
    if (isLoading || !data) return null
    return data.data.timings
  }, [data, isLoading])

  const [timerState, setTimerState] = useState<TimerState>({
    timeRemaining: 0,
    targetTime: null,
    targetName: "Iftar",
    progress: 0,
    icon: "sunset",
  })

  useEffect(() => {
    if (!prayerTimes) return

    const calculateNextPrayer = () => {
      const now = new Date()

      // Convert prayer times to Date objects
      const imsakTime = convertTimeToDate(prayerTimes.Imsak)
      const iftarTime = convertTimeToDate(prayerTimes.Maghrib)

      if (!imsakTime || !iftarTime) return

      let newState: TimerState = { ...timerState }

      // Check if we're in Ramadan fasting hours (between Imsak and Iftar)
      if (now >= imsakTime && now < iftarTime) {
        // Counting down to Iftar
        newState = {
          targetTime: iftarTime,
          targetName: "Iftar",
          icon: "sunset",
          timeRemaining: Math.floor(
            (iftarTime.getTime() - now.getTime()) / 1000
          ),
          progress: calculateProgressPercentage(now, imsakTime, iftarTime),
        }
      } else {
        // We're after Iftar or before Imsak, counting down to Imsak
        const nextImsak = getNextImsak(imsakTime, now)

        if (nextImsak) {
          newState = {
            targetTime: nextImsak,
            targetName: "Imsak",
            icon: "sunrise",
            timeRemaining: Math.floor(
              (nextImsak.getTime() - now.getTime()) / 1000
            ),
            progress: calculateNightProgress(now, iftarTime, nextImsak),
          }
        }
      }

      setTimerState(newState)
    }

    // Initial calculation
    calculateNextPrayer()

    // Set up interval for countdown
    const interval = setInterval(() => {
      const now = new Date()

      if (timerState.targetTime) {
        const diff = timerState.targetTime.getTime() - now.getTime()

        if (diff <= 0) {
          // Time's up, recalculate next target
          calculateNextPrayer()
        } else {
          // Just update time remaining
          setTimerState((prev) => ({
            ...prev,
            timeRemaining: Math.floor(diff / 1000),
          }))
        }
      } else {
        calculateNextPrayer()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [prayerTimes]) // Only depend on prayerTimes to only recalculate when it changes, also to avoid infinite loop

  if (isLoading || isPending) {
    return <CountdownTimerSkeleton />
  }

  return (
    isSuccess &&
    prayerTimes && (
      <Card className="overflow-hidden">
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Time until {timerState.targetName}
            </h3>
            {timerState.icon === "sunset" ? (
              <Sunset className="text-primary size-5" />
            ) : (
              <Sunrise className="text-primary size-5" />
            )}
          </div>

          <div className="my-6 text-center text-4xl font-bold">
            {formatTime(timerState.timeRemaining)}
          </div>

          <Progress value={timerState.progress} className="h-2" />

          <div className="text-muted-foreground mt-2 flex justify-between text-xs">
            {timerState.icon === "sunset" ? (
              <>
                <span>Imsak</span>
                <span>Iftar</span>
              </>
            ) : (
              <>
                <span>Iftar</span>
                <span>Imsak</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    )
  )
}

function convertTimeToDate(timeStr: string | null): Date | null {
  if (!timeStr) return null

  const [time, period] = timeStr.split(" ")
  const [hourStr, minuteStr] = time.split(":")

  let hour = parseInt(hourStr, 10)
  const minute = parseInt(minuteStr, 10)

  // Convert from 12-hour to 24-hour format
  if (period && period.toLowerCase() === "pm" && hour < 12) {
    hour += 12
  } else if (period && period.toLowerCase() === "am" && hour === 12) {
    hour = 0
  }

  const dateObj = new Date()
  dateObj.setHours(hour, minute, 0, 0)
  return dateObj
}

function getNextImsak(imsakTime: Date, now: Date): Date {
  // If we're past today's Imsak, get tomorrow's
  if (now >= imsakTime) {
    const nextImsak = new Date(imsakTime)
    nextImsak.setDate(nextImsak.getDate() + 1)
    return nextImsak
  }
  return imsakTime
}

function calculateProgressPercentage(
  now: Date,
  startTime: Date,
  endTime: Date
): number {
  const totalDuration = endTime.getTime() - startTime.getTime()
  const elapsed = now.getTime() - startTime.getTime()
  return Math.min(100, (elapsed / totalDuration) * 100)
}

function calculateNightProgress(
  now: Date,
  iftarTime: Date,
  nextImsak: Date
): number {
  // If after Iftar, calculate progress between Iftar and next Imsak
  if (now >= iftarTime) {
    const nightDuration = nextImsak.getTime() - iftarTime.getTime()
    const elapsed = now.getTime() - iftarTime.getTime()
    return Math.min(100, (elapsed / nightDuration) * 100)
  }

  // Otherwise calculate from midnight to Imsak
  const midnight = new Date(now)
  midnight.setHours(0, 0, 0, 0)
  const nightDuration = nextImsak.getTime() - midnight.getTime()
  const elapsed = Math.max(1000, now.getTime() - midnight.getTime())
  return Math.min(100, (elapsed / nightDuration) * 100)
}

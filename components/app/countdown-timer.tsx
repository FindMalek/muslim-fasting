"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Sunrise, Sunset } from "lucide-react"

import { formatTime } from "@/lib/utils"
import { useAladhanApi } from "@/hooks/use-aladhan-api"

import { CountdownSkeleton } from "@/components/app/countdown-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function CountdownTimer() {
  const { data, isLoading, isPending, isSuccess } = useAladhanApi()

  const prayerTimes = useMemo(() => {
    if (isLoading || !data) return null

    return data.data.timings
  }, [data, isLoading])
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [targetTime, setTargetTime] = useState<Date | null>(null)
  const [targetName, setTargetName] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)
  const [icon, setIcon] = useState<"sunrise" | "sunset">("sunset")

  // Use refs to track current state values without triggering re-renders
  const targetTimeRef = useRef<Date | null>(null)
  const targetNameRef = useRef<string>("")
  const iconRef = useRef<"sunrise" | "sunset">("sunset")
  const progressRef = useRef<number>(0)

  useEffect(() => {
    if (!prayerTimes) return

    const calculateNextPrayer = () => {
      const now = new Date()

      // Convert string times to Date objects for comparison
      const convertTimeToDate = (timeStr: string | null): Date | null => {
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

      const imsakTime = convertTimeToDate(prayerTimes.Imsak)
      const iftarTime = convertTimeToDate(prayerTimes.Maghrib)

      if (!imsakTime || !iftarTime) return

      // Store the current values to check if we need to update
      let newTargetTime: Date | null = null
      let newTargetName: string = ""
      let newIcon: "sunrise" | "sunset" = "sunset"
      let newProgress: number = 0

      // Check if we're in Ramadan fasting hours (between Imsak and Iftar)
      if (now >= imsakTime && now < iftarTime) {
        // Counting down to Iftar
        newTargetTime = iftarTime
        newTargetName = "Iftar"
        newIcon = "sunset"

        // Calculate total fasting duration and progress
        const fastingDuration = iftarTime.getTime() - imsakTime.getTime()
        const elapsed = now.getTime() - imsakTime.getTime()
        newProgress = Math.min(100, (elapsed / fastingDuration) * 100)
      } else {
        // We're after Iftar or before Imsak, counting down to Imsak
        // Get tomorrow's Imsak if needed
        let nextImsak = imsakTime

        if (!nextImsak || now >= nextImsak) {
          // We need tomorrow's Imsak time
          const tomorrow = new Date(now)
          tomorrow.setDate(tomorrow.getDate() + 1)
          // For this demo, we'll just add 24 hours to today's Imsak
          if (imsakTime) {
            nextImsak = new Date(imsakTime)
            nextImsak.setDate(nextImsak.getDate() + 1)
          }
        }

        if (nextImsak) {
          newTargetTime = nextImsak
          newTargetName = "Imsak"
          newIcon = "sunrise"

          // Calculate progress for night hours
          let nightDuration = 0
          if (iftarTime) {
            if (now >= iftarTime) {
              // From Iftar to next Imsak
              nightDuration = nextImsak.getTime() - iftarTime.getTime()
              const elapsed = now.getTime() - iftarTime.getTime()
              newProgress = Math.min(100, (elapsed / nightDuration) * 100)
            } else {
              // From midnight to Imsak
              const midnight = new Date(now)
              midnight.setHours(0, 0, 0, 0)
              nightDuration = nextImsak.getTime() - midnight.getTime()

              // Calculate elapsed time, ensuring it's not zero at exactly midnight
              const elapsed = Math.max(1000, now.getTime() - midnight.getTime())

              // Handle the case where elapsed time is 0 (exactly midnight)
              newProgress = Math.min(100, (elapsed / nightDuration) * 100)
            }
          }
        }
      }

      // Update state and refs
      if (newTargetTime) {
        targetTimeRef.current = newTargetTime
        setTargetTime(newTargetTime)

        // Calculate time remaining right away
        const diff = newTargetTime.getTime() - now.getTime()
        if (diff > 0) {
          setTimeRemaining(Math.floor(diff / 1000))
        }
      }

      if (newTargetName) {
        targetNameRef.current = newTargetName
        setTargetName(newTargetName)
      }

      iconRef.current = newIcon
      setIcon(newIcon)

      progressRef.current = newProgress
      setProgress(newProgress)
    }

    calculateNextPrayer()

    const interval = setInterval(() => {
      const now = new Date()

      if (targetTimeRef.current) {
        const diff = targetTimeRef.current.getTime() - now.getTime()

        if (diff <= 0) {
          // Time's up, recalculate next target
          calculateNextPrayer()
        } else {
          // Update time remaining without causing re-renders in the useEffect
          setTimeRemaining(Math.floor(diff / 1000))
        }
      } else {
        calculateNextPrayer()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [prayerTimes]) // Only depend on prayerTimes

  if (isLoading || isPending) {
    return <CountdownSkeleton />
  }

  return (
    isSuccess &&
    prayerTimes && (
      <Card className="overflow-hidden">
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Time until {targetName}</h3>
            {icon === "sunset" ? (
              <Sunset className="text-primary size-5" />
            ) : (
              <Sunrise className="text-primary size-5" />
            )}
          </div>

          <div className="my-6 text-center text-4xl font-bold">
            {formatTime(timeRemaining)}
          </div>

          <Progress value={progress} className="h-2" />

          <div className="text-muted-foreground mt-2 flex justify-between text-xs">
            {icon === "sunset" ? (
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

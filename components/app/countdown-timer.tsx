"use client"

import { useEffect, useState, useRef } from "react"
import { Sunrise, Sunset } from "lucide-react"

import { formatTime } from "@/lib/utils"

import { CountdownSkeleton } from "@/components/app/countdown-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CountdownTimerProps {
  prayerTimes: { 
    fajr: string
    sunrise: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
    midnight: string
  } | null
  isLoading: boolean
}

export function CountdownTimer({
  prayerTimes,
  isLoading,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [targetTime, setTargetTime] = useState<Date | null>(null)
  const [targetName, setTargetName] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)
  const [icon, setIcon] = useState<"sunrise" | "sunset">("sunset")
  
  // Use refs to track current state values without triggering re-renders
  const targetTimeRef = useRef<Date | null>(null);
  const targetNameRef = useRef<string>("");
  const iconRef = useRef<"sunrise" | "sunset">("sunset");
  const progressRef = useRef<number>(0);

  useEffect(() => {
    if (!prayerTimes) return

    const calculateNextPrayer = () => {
      const now = new Date()

      // Convert string times to Date objects for comparison
      const convertTimeToDate = (timeStr: string | null): Date | null => {
        if (!timeStr) return null;
        
        const [time, period] = timeStr.split(" ");
        const [hourStr, minuteStr] = time.split(":");
        
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        
        // Convert from 12-hour to 24-hour format
        if (period && period.toLowerCase() === "pm" && hour < 12) {
          hour += 12;
        } else if (period && period.toLowerCase() === "am" && hour === 12) {
          hour = 0;
        }
        
        const dateObj = new Date();
        dateObj.setHours(hour, minute, 0, 0);
        return dateObj;
      };

      const fajrTime = convertTimeToDate(prayerTimes.fajr);
      const maghribTime = convertTimeToDate(prayerTimes.maghrib);

      if (!fajrTime || !maghribTime) return;
    
      // Store the current values to check if we need to update
      let newTargetTime: Date | null = null;
      let newTargetName: string = "";
      let newIcon: "sunrise" | "sunset" = "sunset";
      let newProgress: number = 0;

      // Check if we're in Ramadan fasting hours (between Fajr and Maghrib)
      if (now >= fajrTime && now < maghribTime) {
        // Counting down to Iftar (Maghrib)
        newTargetTime = maghribTime;
        newTargetName = "Iftar";
        newIcon = "sunset";

        // Calculate total fasting duration and progress
        const fastingDuration = maghribTime.getTime() - fajrTime.getTime();
        const elapsed = now.getTime() - fajrTime.getTime();
        newProgress = Math.min(100, (elapsed / fastingDuration) * 100);
      } else {
        // We're after Maghrib or before Fajr, counting down to Suhur end (Fajr)
        // Get tomorrow's Fajr if needed
        let nextFajr = fajrTime;

        if (!nextFajr || now >= nextFajr) {
          // We need tomorrow's Fajr time
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          // For this demo, we'll just add 24 hours to today's Fajr
          if (fajrTime) {
            nextFajr = new Date(fajrTime);
            nextFajr.setDate(nextFajr.getDate() + 1);
          }
        }

        if (nextFajr) {
          newTargetTime = nextFajr;
          newTargetName = "Suhur Ends";
          newIcon = "sunrise";

          // Calculate progress for night hours
          let nightDuration = 0;
          if (maghribTime) {
            if (now >= maghribTime) {
              // From Maghrib to next Fajr
              nightDuration = nextFajr.getTime() - maghribTime.getTime();
              const elapsed = now.getTime() - maghribTime.getTime();
              newProgress = Math.min(100, (elapsed / nightDuration) * 100);
            } else {
              // From midnight to Fajr
              const midnight = new Date(now);
              midnight.setHours(0, 0, 0, 0);
              nightDuration = nextFajr.getTime() - midnight.getTime();
              
              // Calculate elapsed time, ensuring it's not zero at exactly midnight
              const elapsed = Math.max(1000, now.getTime() - midnight.getTime());
              
              // Handle the case where elapsed time is 0 (exactly midnight)
              newProgress = Math.min(100, (elapsed / nightDuration) * 100);
            }
          }
        }
      }

      // Update state and refs
      if (newTargetTime) {
        targetTimeRef.current = newTargetTime;
        setTargetTime(newTargetTime);
        
        // Calculate time remaining right away
        const diff = newTargetTime.getTime() - now.getTime();
        if (diff > 0) {
          setTimeRemaining(Math.floor(diff / 1000));
        }
      }
      
      if (newTargetName) {
        targetNameRef.current = newTargetName;
        setTargetName(newTargetName);
      }
      
      iconRef.current = newIcon;
      setIcon(newIcon);
      
      progressRef.current = newProgress;
      setProgress(newProgress);
    };

    calculateNextPrayer();

    const interval = setInterval(() => {
      const now = new Date();

      if (targetTimeRef.current) {
        const diff = targetTimeRef.current.getTime() - now.getTime();

        if (diff <= 0) {
          // Time's up, recalculate next target
          calculateNextPrayer();
        } else {
          // Update time remaining without causing re-renders in the useEffect
          setTimeRemaining(Math.floor(diff / 1000));
        }
      } else {
        calculateNextPrayer();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]); // Only depend on prayerTimes

  if (isLoading) {
    return <CountdownSkeleton />
  }

  if (!prayerTimes) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center">Unable to load prayer times</p>
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

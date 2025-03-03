"use client"

import { useState } from "react"

import { usePrayerTimes } from "@/hooks/use-prayer-times"
import { useTimezone } from "@/hooks/use-timezone"

import { CountdownSkeleton } from "@/components/app/countdown-skeleton"
import { CountdownTimer } from "@/components/app/countdown-timer"
import { DailyDua } from "@/components/app/daily-dua"
import { PrayerTimesDisplay } from "@/components/app/prayer-times-display"
import { RamadanCalendar } from "@/components/app/ramadan-calendar"
import { Icons } from "@/components/shared/icons"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const { timezone, setTimezone } = useTimezone()
  const { prayerTimes, date, setDate, isLoading } = usePrayerTimes(timezone)
  const [activeTab, setActiveTab] = useState("times")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Muslim Fasting Friend</h1>
        <p className="text-muted-foreground">
          Your companion for Ramadan with accurate prayer times
        </p>
        <div className="mt-2 flex items-center justify-center text-sm text-muted-foreground">
          <Icons.location className="mr-1 size-4" />
          <span>{timezone}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="times" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="times">
                  <Icons.clock className="mr-2 size-4" />
                  Prayer Times
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <Icons.calendar className="mr-2 size-4" />
                  Calendar
                </TabsTrigger>
              </TabsList>
              <TabsContent value="times" className="mt-6">
                <PrayerTimesDisplay prayerTimes={prayerTimes} date={date} />
                <div className="mt-8">
                  {isLoading ? (
                    <CountdownSkeleton />
                  ) : (
                    <CountdownTimer
                      prayerTimes={prayerTimes}
                      timezone={timezone}
                    />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="calendar" className="mt-6">
                <RamadanCalendar
                  timezone={timezone}
                  selectedDate={date}
                  onDateSelect={setDate}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-1">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="mx-auto h-6 w-36" />
                <Card>
                  <CardContent className="space-y-2 p-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <DailyDua date={date} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

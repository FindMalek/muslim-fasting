import { Suspense } from "react"

import { CountdownTimer } from "@/components/app/countdown-timer"
import { DailyDua } from "@/components/app/daily-dua"
import { PrayerTimes } from "@/components/app/prayer-times"
import { RamadanCalendar } from "@/components/app/ramadan-calendar"
import { SelectedDateLongFormat } from "@/components/app/selected-date-long-format"
import { TimezoneName } from "@/components/app/timezone-name"
import { Icons } from "@/components/shared/icons"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">
          Your companion for Ramadan with accurate prayer times
        </h1>
        <TimezoneName />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardContent>
            <SelectedDateLongFormat />
            <Tabs className={"mt-6"} defaultValue="times">
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
                <Suspense>
                  <PrayerTimes />
                </Suspense>
                <div className="mt-8">
                  <CountdownTimer />
                </div>
              </TabsContent>
              <TabsContent value="calendar" className="mt-6">
                <Suspense>
                  <RamadanCalendar />
                </Suspense>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-1">
          <CardContent>
            <DailyDua />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

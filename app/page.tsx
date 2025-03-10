import { CountdownTimer } from "@/components/app/countdown-timer"
import { DailyDua } from "@/components/app/daily-dua"
import { PrayerTimes } from "@/components/app/prayer-times"
import { RamadanCalendar } from "@/components/app/ramadan-calendar"
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
        <div className="text-muted-foreground mt-2 flex items-center justify-center text-sm">
          <Icons.location className="mr-1 size-4" />
          <TimezoneName />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="times">
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
                <PrayerTimes />
                <div className="mt-8">
                  <CountdownTimer />
                </div>
              </TabsContent>
              <TabsContent value="calendar" className="mt-6">
                <RamadanCalendar />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-1">
          <CardContent className="p-6">
            <DailyDua />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

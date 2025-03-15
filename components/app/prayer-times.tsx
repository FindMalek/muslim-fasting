import { Suspense } from "react"
import { Sunrise, Sunset } from "lucide-react"

import { BigCardPrayerTime } from "@/components/app/big-card-prayer-time"
import { BigCardPrayerTimeSkeleton } from "@/components/app/big-card-prayer-time-skeleton"
import { SmallCardPrayerTime } from "@/components/app/small-card-prayer-time"
import { SmallCardPrayerTimeSkeleton } from "@/components/app/small-card-prayer-time-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function PrayerTimes() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-primary/5">
          <CardContent className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-4">
              <Sunrise className="text-primary size-6" />
            </div>
            <div>
              <p className="text-sm font-medium">Suhur ends (Imsak)</p>
              <Suspense fallback={<BigCardPrayerTimeSkeleton />}>
                <BigCardPrayerTime prayerName="Imsak" />
              </Suspense>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardContent className="flex items-center">
            <div className="bg-primary/10 mr-4 rounded-full p-4">
              <Sunset className="text-primary size-6" />
            </div>
            <div>
              <p className="text-sm font-medium">Iftar (Maghrib)</p>
              <Suspense fallback={<BigCardPrayerTimeSkeleton />}>
                <BigCardPrayerTime prayerName="Maghrib" />
              </Suspense>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent>
            <p className="text-sm font-medium">Fajr</p>
            <Suspense fallback={<SmallCardPrayerTimeSkeleton />}>
              <SmallCardPrayerTime prayerName="Fajr" />
            </Suspense>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm font-medium">Dhuhr</p>
            <Suspense fallback={<SmallCardPrayerTimeSkeleton />}>
              <SmallCardPrayerTime prayerName="Dhuhr" />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-sm font-medium">Asr</p>
            <Suspense fallback={<SmallCardPrayerTimeSkeleton />}>
              <SmallCardPrayerTime prayerName="Asr" />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-sm font-medium">Isha</p>
            <Suspense fallback={<SmallCardPrayerTimeSkeleton />}>
              <SmallCardPrayerTime prayerName="Isha" />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

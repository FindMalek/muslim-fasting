"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { prayerCalculationMethods } from "@/config/consts"
import { getDefaultCalculationMethod } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"

export function Settings() {
  const { theme, setTheme } = useTheme()
  const [timezone, setTimezone] = useState(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  })

  const [calculationMethod, setCalculationMethod] = useState(() => {
    return getDefaultCalculationMethod(
      Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
    )
  })

  const [notifications, setNotifications] = useState(false)
  const [use24HourFormat, setUse24HourFormat] = useState(false)

  useEffect(() => {
    setCalculationMethod(getDefaultCalculationMethod(timezone))
  }, [timezone])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Icons.settings className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Theme</h3>
            <Select
              value={theme}
              onValueChange={(value: string) => setTheme(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Timezone Setting */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Timezone</h3>
            <Select
              value={timezone}
              onValueChange={(value: string) => setTimezone(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {prayerCalculationMethods.map((method) => (
                  <SelectItem key={method.timezone} value={method.timezone}>
                    {method.timezone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Prayer Calculation Method</h3>
            <Select
              value={calculationMethod.toString()}
              onValueChange={(value: string) =>
                setCalculationMethod(parseInt(value))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select calculation method" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {prayerCalculationMethods.map((method) => (
                  <SelectItem
                    key={method.value}
                    value={method.value.toString()}
                  >
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="24h-format">24-Hour Format</Label>
              <p className="text-sm text-muted-foreground">
                Display time in 24-hour format (coming soon)
              </p>
            </div>
            <Switch
              id="24h-format"
              checked={use24HourFormat}
              onCheckedChange={setUse24HourFormat}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Prayer Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for prayer times (coming soon)
              </p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

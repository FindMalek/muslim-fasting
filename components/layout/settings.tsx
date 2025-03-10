"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useTheme } from "next-themes"

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"

export function Settings() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const searchParams = useSearchParams()

  const [timezone, setTimezone] = useState(() => {
    return (
      searchParams.get("timezone") ||
      Intl.DateTimeFormat().resolvedOptions().timeZone ||
      "UTC"
    )
  })

  const [use24HourFormat, setUse24HourFormat] = useState(() => {
    return searchParams.get("format") === "24h"
  })

  const [notifications, setNotifications] = useState(false)

  // Update URL when settings change
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  // Handle timezone change
  const handleTimezoneChange = (value: string) => {
    setTimezone(value)
    updateSearchParams("timezone", value)
  }

  // Handle time format change
  const handleFormatChange = (value: boolean) => {
    setUse24HourFormat(value)
    updateSearchParams("format", value ? "24h" : "12h")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Icons.settings className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              Adjust your preferences for a personalized experience.
            </SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
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
            <Select value={timezone} onValueChange={handleTimezoneChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {Intl.supportedValuesOf("timeZone").map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="24h-format">24-Hour Format</Label>
              <p className="text-muted-foreground text-sm">
                Display time in 24-hour format
              </p>
            </div>
            <Switch
              id="24h-format"
              checked={use24HourFormat}
              onCheckedChange={handleFormatChange}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">
                Prayer Notifications
                <span className="text-muted-foreground text-xs">
                  (coming soon)
                </span>
              </Label>
              <p className="text-muted-foreground text-sm">
                Receive notifications for prayer times
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

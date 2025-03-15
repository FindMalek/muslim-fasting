"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"

import useTimeFormat from "@/hooks/use-time-format"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function TimeFormatSetting() {
  const router = useRouter()
  const { is24hrFormat, setIs24hrFormat } = useTimeFormat()

  const handleFormatChange = useCallback(
    (checked: boolean) => {
      setIs24hrFormat(checked)
    },
    [setIs24hrFormat]
  )

  useEffect(() => {
    if (is24hrFormat) {
      router.push("?time_format=24h")
    } else {
      router.push("?time_format=12h")
    }
  }, [is24hrFormat, router])
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="24h-format">24-Hour Format</Label>
        <p className="text-muted-foreground text-sm">
          Display time in 24-hour format
        </p>
      </div>
      <Switch
        id="24h-format"
        checked={is24hrFormat}
        onCheckedChange={handleFormatChange}
      />
    </div>
  )
}

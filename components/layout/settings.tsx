import { Suspense } from "react"

import { TimeFormatSetting } from "@/components/layout/time-format-setting"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Settings() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Icons.settings className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Adjust your preferences for a personalized experience.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 p-6">
          {/*<div className="space-y-3">*/}
          {/*  <h3 className="text-sm font-medium">Theme</h3>*/}
          {/*  <Select*/}
          {/*    value={theme}*/}
          {/*    onValueChange={(value: string) => setTheme(value)}*/}
          {/*  >*/}
          {/*    <SelectTrigger className="w-full">*/}
          {/*      <SelectValue placeholder="Select a theme" />*/}
          {/*    </SelectTrigger>*/}
          {/*    <SelectContent>*/}
          {/*      <SelectItem value="light">*/}
          {/*        <Icons.sun className="mr-2 size-4" />*/}
          {/*        <span>Light</span>*/}
          {/*      </SelectItem>*/}
          {/*      <SelectItem value="dark">*/}
          {/*        <Icons.moon className="mr-2 size-4" />*/}
          {/*        <span>Dark</span>*/}
          {/*      </SelectItem>*/}
          {/*      <SelectItem value="system">*/}
          {/*        <Icons.sunMoon className="mr-2 size-4" />*/}
          {/*        <span>System</span>*/}
          {/*      </SelectItem>*/}
          {/*    </SelectContent>*/}
          {/*  </Select>*/}
          {/*</div>*/}

          {/*<Separator />*/}

          {/* Timezone Setting */}
          {/*<div className="space-y-3">*/}
          {/*  <h3 className="text-sm font-medium">Timezone</h3>*/}
          {/*  <Select value={timezone} onValueChange={handleTimezoneChange}>*/}
          {/*    <SelectTrigger className="w-full">*/}
          {/*      <SelectValue placeholder="Select your timezone" />*/}
          {/*    </SelectTrigger>*/}
          {/*    <SelectContent className="max-h-[200px]">*/}
          {/*      {Intl.supportedValuesOf("timeZone").map((tz) => (*/}
          {/*        <SelectItem key={tz} value={tz}>*/}
          {/*          {tz}*/}
          {/*        </SelectItem>*/}
          {/*      ))}*/}
          {/*    </SelectContent>*/}
          {/*  </Select>*/}
          {/*</div>*/}

          {/*<Separator />*/}
          <Suspense>
            <TimeFormatSetting />
          </Suspense>

          <Separator />

          {/*<div className="flex items-center justify-between">*/}
          {/*  <div className="space-y-0.5">*/}
          {/*    <Label htmlFor="notifications">*/}
          {/*      Prayer Notifications*/}
          {/*      <span className="text-muted-foreground text-xs">*/}
          {/*        (coming soon)*/}
          {/*      </span>*/}
          {/*    </Label>*/}
          {/*    <p className="text-muted-foreground text-sm">*/}
          {/*      Receive notifications for prayer times*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*  <Switch*/}
          {/*    id="notifications"*/}
          {/*    checked={notifications}*/}
          {/*    onCheckedChange={setNotifications}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </SheetContent>
    </Sheet>
  )
}

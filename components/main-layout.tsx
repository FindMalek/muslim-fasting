"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Bell, Home, Menu, Moon, Settings } from "lucide-react"

import { useTimezone } from "@/hooks/use-timezone"

import { ModeToggle } from "@/components/mode-toggle"
import { TimezoneSelector } from "@/components/timezone-selector"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { timezone, setTimezone } = useTimezone()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="mt-8 flex flex-col gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-medium"
                  >
                    <Home className="size-5" />
                    Home
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 text-lg font-medium"
                  >
                    <Settings className="size-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center text-xl font-bold">
              <Moon className="mr-2 size-5 text-primary" />
              Muslim Fasting Friend
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="size-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent>
          <div className="py-4">
            <h2 className="mb-4 text-lg font-semibold">Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Timezone</h3>
                <TimezoneSelector
                  value={timezone}
                  onChange={(value) => {
                    setTimezone(value)
                    setIsSettingsOpen(false)
                  }}
                />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium">Appearance</h3>
                <div className="flex items-center gap-2">
                  <ModeToggle />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium">Notifications</h3>
                <Button variant="outline" className="w-full">
                  <Bell className="mr-2 size-4" />
                  Configure Notifications
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Muslim Fasting Friend. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

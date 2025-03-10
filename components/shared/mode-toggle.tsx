"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 px-4">
          <Icons.sun className="absolute size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90" />
          <Icons.moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={"space-y-1"}>
        <DropdownMenuItem
          className={theme === "light" ? "bg-accent accent-foreground" : ""}
          onClick={() => setTheme("light")}
        >
          <span className="sr-only">Toggle light theme</span>
          <Icons.sun className="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={theme === "dark" ? "bg-accent accent-foreground" : ""}
          onClick={() => setTheme("dark")}
        >
          <span className="sr-only">Toggle dark theme</span>
          <Icons.moon className="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={theme === "system" ? "bg-accent accent-foreground" : ""}
          onClick={() => setTheme("system")}
        >
          <span className="sr-only">Toggle system theme</span>
          <Icons.sunMoon className="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

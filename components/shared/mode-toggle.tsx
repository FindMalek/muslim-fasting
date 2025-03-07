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
          <Icons.sun className="absolute size-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Icons.moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={
            theme === "light" ? "bg-primary text-primary-foreground" : ""
          }
          onClick={() => setTheme("light")}
        >
          <span className="sr-only">Toggle light theme</span>
          <Icons.sun className="mr-2 size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={theme === "dark" ? "bg-primary" : ""}
          onClick={() => setTheme("dark")}
        >
          <span className="sr-only">Toggle dark theme</span>
          <Icons.moon className="mr-2 size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            theme === "system" ? "bg-primary text-primary-foreground" : ""
          }
          onClick={() => setTheme("system")}
        >
          <span className="sr-only">Toggle system theme</span>
          <Icons.sunMoon className="mr-2 size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

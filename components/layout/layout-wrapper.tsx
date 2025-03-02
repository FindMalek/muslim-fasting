"use client"

import { ThemeProvider } from "@/components/layout/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </ThemeProvider>
  )
}

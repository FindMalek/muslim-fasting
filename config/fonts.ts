import { Amiri_Quran } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

const amiriQuran = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-amiri-quran",
})

export const fonts = cn(
  GeistSans.variable,
  GeistMono.variable,
  amiriQuran.variable,
  "touch-manipulation font-sans antialiased"
)

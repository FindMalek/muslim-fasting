import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

import { prayerCalculationMethods } from "@/config/consts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  if (seconds <= 0) return "00:00:00"

  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  return [
    hours.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":")
}

export function formatDate(date: Date): string {
  return format(date, "EEEE, MMMM d, yyyy")
}

export function formatDateShort(date: Date): string {
  return format(date, "MMM d, yyyy")
}

/**
 * Determines the appropriate prayer calculation method based on a timezone
 * @param timezone The timezone string (e.g., "America/New_York")
 * @returns The calculation method ID for the given timezone
 */
export const getDefaultCalculationMethod = (timezone: string): number => {
  // Default to Muslim World League (3)
  const defaultMethodId = 3

  // Map regions to their appropriate calculation method IDs
  const regionToMethodMap: Record<string, number> = {
    // North America
    "America/": 2, // Islamic Society of North America

    // Middle East
    "Asia/Riyadh": 4, // Umm Al-Qura University, Makkah
    "Asia/Jeddah": 4, // Umm Al-Qura University, Makkah
    "Asia/Dubai": 16, // Dubai
    "Asia/Kuwait": 9, // Kuwait
    "Asia/Qatar": 10, // Qatar
    "Asia/Istanbul": 13, // Diyanet İşleri Başkanlığı, Turkey
    "Asia/Tehran": 7, // Institute of Geophysics, University of Tehran

    // South Asia
    "Asia/Karachi": 1, // University of Islamic Sciences, Karachi
    "Asia/Kolkata": 1, // Similar to Pakistan for India
    "Asia/Dhaka": 1, // Similar to Pakistan for Bangladesh
    "Asia/Kuala_Lumpur": 17, // Jabatan Kemajuan Islam Malaysia
    "Asia/Singapore": 11, // Majlis Ugama Islam Singapura
    "Asia/Jakarta": 20, // KEMENAG Indonesia

    // Africa
    "Africa/Cairo": 5, // Egyptian General Authority of Survey
    "Africa/Tunis": 18, // Tunisia
    "Africa/Algiers": 19, // Algeria
    "Africa/Casablanca": 21, // Morocco
  }

  // Find the matching region in the timezone string
  for (const [region, methodId] of Object.entries(regionToMethodMap)) {
    if (timezone.includes(region)) {
      // Verify this method exists in our prayerCalculationMethods
      if (
        prayerCalculationMethods.some((method) => method.value === methodId)
      ) {
        return methodId
      }
    }
  }

  return defaultMethodId
}

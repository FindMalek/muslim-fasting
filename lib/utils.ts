import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

import type { PrayerTimes, PrayerTimesDto } from "@/types"

import { prayerCalculationMethods } from "@/config/consts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  // Handle zero or negative seconds properly
  if (seconds <= 0) {
    return "00:00:00";
  }

  // Ensure seconds is a positive integer
  seconds = Math.max(0, Math.floor(seconds));

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return [
    hours.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
}

export function formatDate(date: Date): string {
  return format(date, "EEEE, MMMM d, yyyy")
}

export function formatDateShort(date: Date): string {
  return format(date, "MMM d, yyyy")
}

export function formatForAladhanApi(date: Date): string {
  return format(date, "yyyy-MM-dd")
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

export function formatToPrayerTimes(
  formatted: PrayerTimesDto | null
): PrayerTimes | null {
  if (!formatted) return null

  const parseTime = (timeStr: string): Date | null => {
    if (!timeStr) return null

    const [time, period] = timeStr.split(" ")
    const [hoursStr, minutesStr] = time.split(":")

    let hours = parseInt(hoursStr, 10)
    const minutes = parseInt(minutesStr, 10)

    // Convert to 24-hour format
    if (period && period.toLowerCase() === "pm" && hours < 12) {
      hours += 12
    } else if (period && period.toLowerCase() === "am" && hours === 12) {
      hours = 0
    }

    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date
  }

  return {
    fajr: parseTime(formatted.fajr),
    sunrise: parseTime(formatted.sunrise),
    dhuhr: parseTime(formatted.dhuhr),
    asr: parseTime(formatted.asr),
    maghrib: parseTime(formatted.maghrib),
    isha: parseTime(formatted.isha),
    midnight: parseTime(formatted.midnight),
    imsak: null, // Not available in FormattedPrayerTimes
  }
}

// Convert Date-based prayer times to string format for components
export function formatToStringPrayerTimes(prayerTimes: PrayerTimes | null): { 
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  midnight: string
} | null {
  if (!prayerTimes) return null
  
  const formatTimeString = (time: Date | null): string => {
    if (!time) return "N/A"
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
  
  return {
    fajr: formatTimeString(prayerTimes.fajr),
    sunrise: formatTimeString(prayerTimes.sunrise),
    dhuhr: formatTimeString(prayerTimes.dhuhr),
    asr: formatTimeString(prayerTimes.asr),
    maghrib: formatTimeString(prayerTimes.maghrib),
    isha: formatTimeString(prayerTimes.isha),
    midnight: formatTimeString(prayerTimes.midnight),
  }
}

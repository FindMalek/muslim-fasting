import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  // Handle zero or negative seconds properly
  if (seconds <= 0) {
    return "00:00:00"
  }

  // Ensure seconds is a positive integer
  seconds = Math.max(0, Math.floor(seconds))

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

export function formatForAladhanApi(date: Date): string {
  return format(date, "dd-MM-yyyy")
}

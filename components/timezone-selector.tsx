"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface TimezoneSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  const [open, setOpen] = useState(false)
  const [timezones, setTimezones] = useState<string[]>([])

  useEffect(() => {
    // In a real app, you would fetch this from a more complete source
    // This is a simplified list of common timezones
    setTimezones([
      "Africa/Cairo",
      "Africa/Lagos",
      "America/Chicago",
      "America/Los_Angeles",
      "America/New_York",
      "America/Toronto",
      "Asia/Dubai",
      "Asia/Jakarta",
      "Asia/Karachi",
      "Asia/Kolkata",
      "Asia/Riyadh",
      "Asia/Singapore",
      "Asia/Tokyo",
      "Australia/Sydney",
      "Europe/Berlin",
      "Europe/London",
      "Europe/Moscow",
      "Europe/Paris",
      "Pacific/Auckland",
      "UTC",
    ])
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select timezone..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto">
              {timezones.map((timezone) => (
                <CommandItem
                  key={timezone}
                  value={timezone}
                  onSelect={() => {
                    onChange(timezone)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === timezone ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {timezone}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

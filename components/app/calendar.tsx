import { CalendarContent } from "@/components/app/calendar-content"
import { CalendarFooter } from "@/components/app/calendar-footer"
import { CalendarHeader } from "@/components/app/calendar-header"

export function Calendar() {
  return (
    <div className="space-y-6">
      <CalendarHeader />
      <CalendarContent />
      <CalendarFooter />
    </div>
  )
}

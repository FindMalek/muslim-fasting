import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type TimezoneStoreState = {
  timezone: string
}

type TimezoneStoreActions = {
  setTimezone: (timezone: string) => void
}

type TimezoneStore = TimezoneStoreState & TimezoneStoreActions

const useTimezoneStore = create(
  persist<TimezoneStore>(
    (set) => ({
      timezone: "",
      setTimezone: (timezone) => set({ timezone }),
    }),
    {
      name: "timezone",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useTimezoneStore }

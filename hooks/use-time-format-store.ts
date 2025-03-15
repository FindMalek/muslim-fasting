import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type TimeFormatStoreState = {
  is24hrFormat: boolean
}

type TimeFormatStoreActions = {
  setIs24hrFormat: (is24hrFormat: boolean) => void
}

type TimeFormatStore = TimeFormatStoreState & TimeFormatStoreActions

const useTimeFormatStore = create(
  persist<TimeFormatStore>(
    (set) => ({
      is24hrFormat: false,
      setIs24hrFormat: (is24hrFormat) => set({ is24hrFormat }),
    }),
    {
      name: "time-format",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useTimeFormatStore }

import { create } from "zustand"

type TimeFormatStoreState = {
  is24hrFormat: boolean
}

type TimeFormatStoreActions = {
  setIs24hrFormat: (is24hrFormat: boolean) => void
}

type TimeFormatStore = TimeFormatStoreState & TimeFormatStoreActions

const useTimeFormatStore = create<TimeFormatStore>((set) => ({
  is24hrFormat: false,
  setIs24hrFormat: (is24hrFormat) => set({ is24hrFormat }),
}))

export { useTimeFormatStore }

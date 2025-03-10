import { create } from "zustand"

type SelectedDateStoreState = {
  selectedDate: Date
}

type SelectedDateStoreActions = {
  setSelectedDate: (date: SelectedDateStoreState["selectedDate"]) => void
}

type SelectedDateStore = SelectedDateStoreState & SelectedDateStoreActions

const useSelectedDateStore = create<SelectedDateStore>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
}))

export { useSelectedDateStore }

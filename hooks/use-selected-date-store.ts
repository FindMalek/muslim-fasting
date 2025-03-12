import { create } from "zustand"

type SelectedDateStoreState = {
  selectedDate: Date
}

type SelectedDateStoreActions = {
  setSelectedDate: (
    newDate:
      | SelectedDateStoreState["selectedDate"]
      | ((
          prevDate: SelectedDateStoreState["selectedDate"]
        ) => SelectedDateStoreState["selectedDate"])
  ) => void
}

type SelectedDateStore = SelectedDateStoreState & SelectedDateStoreActions

const useSelectedDateStore = create<SelectedDateStore>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (newDate) => {
    set((state) => ({
      selectedDate:
        typeof newDate === "function" ? newDate(state.selectedDate) : newDate,
    }))
  },
}))

export { useSelectedDateStore }

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type LatLongStoreState = {
  latitude: number
  longitude: number
}

type LatLongStoreActions = {
  setLatitude: (latitude: number) => void
  setLongitude: (longitude: number) => void
}

type SelectedDateStore = LatLongStoreState & LatLongStoreActions

const useLatLongStore = create(
  persist<SelectedDateStore>(
    (set) => ({
      latitude: 0,
      longitude: 0,
      setLatitude: (latitude) => set({ latitude }),
      setLongitude: (longitude) => set({ longitude }),
    }),
    {
      name: "lat-long",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useLatLongStore }

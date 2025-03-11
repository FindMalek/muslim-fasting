import { create } from "zustand"

type LatLongStoreState = {
  latitude: number
  longitude: number
}

type LatLongStoreActions = {
  setLatitude: (latitude: number) => void
  setLongitude: (longitude: number) => void
}

type SelectedDateStore = LatLongStoreState & LatLongStoreActions

const useLatLongStore = create<SelectedDateStore>((set, get) => ({
  latitude: 0,
  longitude: 0,
  setLatitude: (latitude) => set({ latitude }),
  setLongitude: (longitude) => set({ longitude }),
}))

export { useLatLongStore }

import { create } from "zustand"
import { persist } from "zustand/middleware"

type LocationSource = "auto" | "manual" | null

type LatLongStoreState = {
  latitude: number
  longitude: number
  selectedLocationName: string | null
  source: LocationSource
}

type LatLongStoreActions = {
  setLatitude: (latitude: number) => void
  setLongitude: (longitude: number) => void
  setCoordinates: (latitude: number, longitude: number) => void
  setSelectedLocationName: (name: string | null) => void
  setSource: (source: LocationSource) => void
}

type LatLongStore = LatLongStoreState & LatLongStoreActions

const useLatLongStore = create<LatLongStore>()(
  persist(
    (set) => ({
      latitude: 0,
      longitude: 0,
      selectedLocationName: null,
      source: null,
      setLatitude: (latitude) => set({ latitude }),
      setLongitude: (longitude) => set({ longitude }),
      setCoordinates: (latitude, longitude) => set({ latitude, longitude }),
      setSelectedLocationName: (selectedLocationName) =>
        set({ selectedLocationName }),
      setSource: (source) => set({ source }),
    }),
    { name: "lat-long-store" }
  )
)

export { useLatLongStore }

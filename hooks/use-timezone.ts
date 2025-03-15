import { useEffect } from "react"

import { useAladhanApi } from "./use-aladhan-api"
import { useTimezoneStore } from "./use-timezone-store"

export const useTimezone = () => {
  const { setTimezone, timezone } = useTimezoneStore()
  const { data, isSuccess, isGeolocationLoading, isPending } = useAladhanApi()

  useEffect(() => {
    if (
      isSuccess &&
      data &&
      data.data &&
      data.data.meta &&
      data.data.meta.timezone
    ) {
      setTimezone(data.data.meta.timezone)
    }
  }, [isSuccess, data, setTimezone])

  return { timezone, isGeolocationLoading, isPending }
}

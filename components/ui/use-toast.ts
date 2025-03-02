"use client"

import type React from "react"
// Simplified version of the use-toast.ts file
import { useCallback, useState } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(
    ({
      title,
      description,
      action,
      duration = 5000,
    }: Omit<ToastProps, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((toasts) => [
        ...toasts,
        { id, title, description, action, duration },
      ])

      if (duration) {
        setTimeout(() => {
          setToasts((toasts) => toasts.filter((t) => t.id !== id))
        }, duration)
      }

      return { id }
    },
    []
  )

  const dismiss = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id))
  }, [])

  return { toast, dismiss, toasts }
}

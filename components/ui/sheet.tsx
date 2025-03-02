import * as React from "react"

import { cn } from "@/lib/utils"

const Sheet = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  return <div className="relative">{children}</div>
}

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return <Comp {...(asChild ? {} : { className, ...props, ref })} />
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    side?: "top" | "right" | "bottom" | "left"
  }
>(({ className, side = "right", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-y-0 z-50 h-full w-3/4 max-w-sm border-l bg-background p-6 shadow-lg",
      side === "left" && "left-0",
      side === "right" && "right-0",
      className
    )}
    {...props}
  />
))
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }

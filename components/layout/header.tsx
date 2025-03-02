import Link from "next/link"

import { Settings } from "@/components/layout/settings"
import { Icons } from "@/components/shared/icons"
import { ModeToggle } from "@/components/shared/mode-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-xl font-bold">
            <Icons.moonStar className="mr-2 size-5 text-primary" />
            Muslim Fasting Friend
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Settings />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

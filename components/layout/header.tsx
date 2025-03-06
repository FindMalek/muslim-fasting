import Link from "next/link"

import { Settings } from "@/components/layout/settings"
import { Icons } from "@/components/shared/icons"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { siteConfig } from "@/config/site"

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-xl font-bold">
            <Icons.moonStar className="mr-2 size-5 text-primary" />
            <span>Muslim Fasting Friend</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            <Icons.github className="size-5" />
          </Link>
          {/* <Settings /> */}
        </div>
      </div>
    </header>
  )
}

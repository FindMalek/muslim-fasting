import { Skeleton } from "@/components/ui/skeleton"

export function ImsakIftarTimesSkeleton() {
  return (
    <>
      <div>
        <p className="text-muted-foreground">Suhur ends (Imsak):</p>
        <Skeleton className="h-5 w-16" />
      </div>
      <div>
        <p className="text-muted-foreground">Iftar starts:</p>
        <Skeleton className="h-5 w-16" />
      </div>
    </>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CountdownSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className={"h-7 w-32"} />
          <Skeleton className="size-7 rounded-full" />
        </div>

        <div className="my-6 flex justify-center text-4xl font-bold">
          <Skeleton className={"h-10 w-36"} />
        </div>

        <Skeleton className="h-2" />

        <div className="text-muted-foreground mt-2 flex justify-between text-xs">
          <Skeleton className={"h-4 w-8"} />
          <Skeleton className={"h-4 w-8"} />
        </div>
      </CardContent>
    </Card>
  )
}

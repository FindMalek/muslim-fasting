import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CountdownSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-5 w-44" />
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center">
              <Skeleton className="h-10 w-14" />
              <Skeleton className="mt-1 h-4 w-10" />
            </div>
            <Skeleton className="h-8 w-4" />
            <div className="flex flex-col items-center">
              <Skeleton className="h-10 w-14" />
              <Skeleton className="mt-1 h-4 w-10" />
            </div>
            <Skeleton className="h-8 w-4" />
            <div className="flex flex-col items-center">
              <Skeleton className="h-10 w-14" />
              <Skeleton className="mt-1 h-4 w-10" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

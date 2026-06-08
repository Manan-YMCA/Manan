import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MemberSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[3/1] w-full" />
      <CardContent className="px-4 pt-0">
        <div className="flex items-end justify-between -mt-8 mb-3">
          <Skeleton className="size-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-24 mb-4" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-3/4" />
      </CardContent>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5 space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </Card>
  );
}

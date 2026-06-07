import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/api";
import { EventCard } from "@/components/EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

type ApiEvent = {
  id: string;
  name: string;
  desc: string;
  eventDate: string;
  eventImage: string;
  eventlinks: { activityReport: string; eventReport: string };
  timestamp: string;
};

function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/events?limit=100`)
        .catch(() => { throw new Error("Network error"); });
      const json = await res.json()
        .catch(() => { throw new Error(`Request failed with status ${res.status}`); });
      if (!res.ok) throw new Error(json.message ?? "Request failed");
      return json.data.data as ApiEvent[];
    },
  });
}

function EventSkeleton() {
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

export function Events() {
  const { data: events = [], isLoading } = useEvents();

  const years = [...new Set(
    events.map((e) => new Date(e.timestamp).getFullYear().toString())
  )].sort().reverse();

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 pb-32">
      <h1 className="text-4xl font-bold mb-2">Events</h1>
      <p className="text-muted-foreground mb-12">What we've been up to.</p>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 4 }).map((_, i) => <EventSkeleton key={i} />)}
        </div>
      ) : events.length === 0 ? (
        <p className="text-muted-foreground">No events yet.</p>
      ) : (
        years.map((year) => (
          <div key={year} className="mb-16">
            <div className="flex items-center gap-3 pl-4 border-l-4 border-[#FB5343] mb-8">
              <span className="text-3xl font-bold text-[#FB5343]">{year}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events
                .filter((e) => new Date(e.timestamp).getFullYear().toString() === year)
                .map((event) => (
                  <EventCard
                    key={event.id}
                    event={{
                      name: event.name,
                      date: event.eventDate,
                      description: event.desc,
                      banner: event.eventImage,
                      activityReport: event.eventlinks.activityReport,
                      eventReport: event.eventlinks.eventReport,
                    }}
                  />
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

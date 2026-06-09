import { useEvents } from "@/hooks/use-events";
import { EventCard } from "@/components/events/EventCard";
import { EventSkeleton } from "@/components/events/EventSkeleton";

export function Events() {
  const { data: events = [], isLoading } = useEvents();

  const years = [
    ...new Set(
      events.map((e) => new Date(e.timestamp).getFullYear().toString()),
    ),
  ]
    .sort()
    .reverse();

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 pb-32">
      <h1 className="text-4xl font-bold mb-2">Events</h1>
      <p className="text-muted-foreground mb-12">What we've been up to.</p>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <EventSkeleton key={i} />
          ))}
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
                .filter(
                  (e) =>
                    new Date(e.timestamp).getFullYear().toString() === year,
                )
                .map((event) => (
                  <EventCard
                    key={event.id}
                    event={{
                      name: event.name,
                      date: event.date,
                      description: event.description,
                      banner: event.imageUrl,
                      activityReport: event.activityReportUrl,
                      eventReport: event.eventReportUrl,
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

export default Events;

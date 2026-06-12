import { useEvents } from "@/hooks/use-events";
import { EventCard } from "@/components/events/EventCard";
import { formatEventDate } from "@/lib/events";

export function UpcomingEvents() {
  const { data: events = [], isLoading } = useEvents();

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events
    .filter((e) => e.toDate >= today)
    .sort((a, b) => a.fromDate.localeCompare(b.fromDate));

  return (
    <section className="p-5 space-y-6 border-b">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white tracking-tight" style={{ fontFamily: "Orbitron, sans-serif" }}>
          Upcoming Events
        </h2>
        <a href="/events" className="text-sm text-[#FB5343] hover:underline font-medium">
          View all →
        </a>
      </div>
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 backdrop-blur-sm animate-pulse">
              <div className="h-3 w-20 bg-black/10 dark:bg-white/10 rounded" />
              <div className="mt-3 h-5 w-40 bg-black/10 dark:bg-white/10 rounded" />
              <div className="mt-2 h-4 w-full bg-black/10 dark:bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ) : upcoming.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcoming.slice(0, 3).map((event) => (
            <EventCard
              key={event.id}
              event={{
                name: event.name,
                venue: event.venue,
                date: formatEventDate(event.fromDate, event.toDate),
                description: event.description,
                banner: event.imageUrl,
                activityReport: event.activityReportUrl,
                eventReport: event.eventReportUrl,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No upcoming events at the moment. Stay tuned!</p>
        </div>
      )}
    </section>
  );
}

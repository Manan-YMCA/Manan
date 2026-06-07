import { EventCard, type Event } from "@/components/EventCard";

export type EventWithYear = Event & { year: string };

const events: EventWithYear[] = [];

const years = [...new Set(events.map((e) => e.year))].sort().reverse();

export function Events() {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 pb-32">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Events</h1>
      <p className="text-black/50 dark:text-white/50 mb-12">What we've been up to.</p>

      {years.map((year) => (
        <div key={year} className="mb-16">
          <div className="flex items-center gap-3 pl-4 border-l-4 border-[#FB5343] mb-8">
            <span className="text-3xl font-bold text-[#FB5343]">{year}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events
              .filter((e) => e.year === year)
              .map((event) => (
                <EventCard key={event.name} event={event} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

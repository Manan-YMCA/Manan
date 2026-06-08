import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/events";

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 backdrop-blur-sm flex flex-col">
      <div className="aspect-video w-full overflow-hidden bg-slate-300 dark:bg-slate-700">
        <img src={event.banner} alt={event.name} className="h-full w-full object-cover object-top" />
      </div>

      <div className="flex flex-col flex-1 px-5 py-4 gap-3">
        <div>
          <h2 className="text-lg font-semibold text-black dark:text-white leading-tight">{event.name}</h2>
          <p className="text-sm text-[#FB5343] mt-0.5">{event.date}</p>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{event.description}</p>

        <div className="flex gap-2 pt-1 border-t border-black/10 dark:border-white/10">
          {event.eventReport && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={event.eventReport} target="_blank" rel="noopener noreferrer">Event Report</a>
            </Button>
          )}
          {event.activityReport && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={event.activityReport} target="_blank" rel="noopener noreferrer">Activity Report</a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

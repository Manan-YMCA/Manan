import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Event } from "@/types/events";

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="overflow-hidden flex flex-col py-0">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="aspect-video w-full overflow-hidden text-left"
            aria-label={`View ${event.name} poster`}
          >
            <img
              src={event.banner}
              alt={event.name}
              className="h-full w-full object-cover object-top cursor-pointer"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[calc(100%-2rem)] p-2 sm:max-w-4xl">
          <DialogTitle className="sr-only">{event.name} poster</DialogTitle>
          <DialogDescription className="sr-only">
            Full-size poster image for {event.name}
          </DialogDescription>
          <img
            src={event.banner}
            alt={event.name}
            className="max-h-[85vh] w-full rounded-sm object-contain"
          />
        </DialogContent>
      </Dialog>

      <div className="flex flex-col flex-1 px-5 py-4 gap-3">
        <div>
          <h2 className="text-lg font-semibold text-black dark:text-white leading-tight">
            {event.name}
          </h2>
          <p className="text-sm text-[#FB5343] mt-0.5">{event.date}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {event.venue}
          </p>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
          {event.description}
        </p>

        {(event.eventReport || event.activityReport) && (
          <div className="flex gap-2 pt-1 border-t border-black/10 dark:border-white/10">
            {event.eventReport && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a
                  href={event.eventReport}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Event Report
                </a>
              </Button>
            )}
            {event.activityReport && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a
                  href={event.activityReport}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Activity Report
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

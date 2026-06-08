import { DotsThreeIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import type { AdminEvent } from "@/types/events";
import { useDeleteEvent } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function EventCard({ event }: { event: AdminEvent }) {
  const remove = useDeleteEvent();

  return (
    <Card className="overflow-hidden">
      <NavLink to={`/admin/events/${event.id}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={event.eventImage}
            alt={event.name}
            className="size-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </NavLink>
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-1">
        <CardTitle className="text-sm font-semibold leading-snug">
          {event.name}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={remove.isPending}
              className="size-7 shrink-0"
            >
              <DotsThreeIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              variant="destructive"
              onClick={() =>
                remove
                  .mutateAsync(event.id)
                  .then(() => toast.success("Event deleted"))
                  .catch((e: Error) => toast.error(e.message))
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-xs text-muted-foreground line-clamp-2">{event.desc}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {event.eventDate}
      </CardFooter>
    </Card>
  );
}

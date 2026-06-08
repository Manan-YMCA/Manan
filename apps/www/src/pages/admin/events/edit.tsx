import { useParams } from "react-router";
import { useEvent } from "@/hooks/admin";
import { EditEventForm } from "@/components/events/EditEventForm";

export function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading } = useEvent(id!);

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Edit Event</h1>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !event ? (
        <p className="text-sm text-muted-foreground">Event not found.</p>
      ) : (
        <EditEventForm event={event} />
      )}
    </div>
  );
}

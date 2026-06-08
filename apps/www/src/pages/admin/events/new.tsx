import { NewEventForm } from "@/components/events/NewEventForm";

export function NewEvent() {
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">New Event</h1>
      <NewEventForm />
    </div>
  );
}

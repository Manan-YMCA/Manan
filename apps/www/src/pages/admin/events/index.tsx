import { useState } from "react";
import { NavLink } from "react-router";
import { PlusIcon } from "@phosphor-icons/react";
import { useAdminEvents } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { EventCard } from "@/components/admin/events/card";
import { EventCardSkeleton } from "@/components/admin/events/EventCardSkeleton";

export function AdminEvents() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminEvents(page);
  const events = data?.data || [];
  const total = data?.total || 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Button asChild size="sm">
          <NavLink to="/admin/events/new">
            <PlusIcon size={14} />
            New event
          </NavLink>
        </Button>
      </div>
      <div className="space-y-4">
      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground">No events found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <AdminPagination page={page} total={total} onPageChange={setPage} />
        </>
      )}
      </div>
    </div>
  );
}

export default AdminEvents;

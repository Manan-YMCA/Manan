import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiDelete, apiPost, apiPut } from "@/hooks/admin/api";
import type { AdminEvent, CreateEventInput, EventsPage } from "@/types/events";

export function useAdminEvents(page = 1) {
  return useQuery({
    queryKey: ["admin", "events", page],
    queryFn: () => apiFetch<EventsPage>(`/api/events?page=${page}`),
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["admin", "events", id],
    queryFn: () => apiFetch<AdminEvent>(`/api/events/${id}`),
  });
}

export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...input }: CreateEventInput & { id: string }) =>
      apiPut<AdminEvent>(`/api/events/${id}`, input),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["admin", "events"] });
      qc.invalidateQueries({ queryKey: ["admin", "events", id] });
    },
  });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateEventInput) => apiPost<AdminEvent>("/api/events", input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "events"] });
      qc.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/api/events/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "events"] });
      qc.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
  });
}

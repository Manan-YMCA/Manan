import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./api";
import type { AdminSummary } from "@/types/admin";

export function useAdminSummary() {
  return useQuery({
    queryKey: ["admin", "summary"],
    queryFn: () => apiFetch<AdminSummary>("/api/admin/summary"),
  });
}

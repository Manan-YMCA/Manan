import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/api";
import type { ApiEvent } from "@/types/events";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () =>
      fetch(`${API_URL}/api/events?limit=100`)
        .catch(() => { throw new Error("Network error"); })
        .then((res) =>
          res.json()
            .catch(() => { throw new Error(`Request failed with status ${res.status}`); })
            .then((json) => {
              if (!res.ok) throw new Error(json.message ?? "Request failed");
              return json.data.data as ApiEvent[];
            })
        ),
  });
}

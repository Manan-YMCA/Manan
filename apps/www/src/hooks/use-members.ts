import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/api";
import type { PublicMember } from "@/types/members";

export function usePublicMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: () =>
      fetch(`${API_URL}/api/admin/members/public`)
        .catch(() => {
          throw new Error("Network error");
        })
        .then((res) =>
          res
            .json()
            .catch(() => {
              throw new Error(`Request failed with status ${res.status}`);
            })
            .then((json) => {
              if (!res.ok) {
                throw Object.assign(new Error(json.message ?? "Request failed"), {
                  status: res.status,
                });
              }
              return json.data as PublicMember[];
            }),
        ),
  });
}

export function useMemberPrivateDetails(id: string) {
  return useQuery({
    queryKey: ["members", id, "private-details"],
    queryFn: () =>
      fetch(`${API_URL}/api/admin/members/${id}/private-details`, { credentials: "include" })
        .catch(() => {
          throw new Error("Network error");
        })
        .then((res) =>
          res
            .json()
            .catch(() => {
              throw new Error(`Request failed with status ${res.status}`);
            })
            .then((json) => {
              if (!res.ok) {
                throw Object.assign(new Error(json.message ?? "Request failed"), {
                  status: res.status,
                });
              }
              return json.data as { phone: string | null; statusType: string | null; statusDetail: string | null };
            }),
        ),
    enabled: false,
  });
}

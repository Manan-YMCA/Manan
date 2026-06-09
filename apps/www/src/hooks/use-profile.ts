import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/lib/api";
import type { Profile } from "@manan/validations";

async function fetchProfile(): Promise<Profile> {
  return fetch(`${API_URL}/api/profile`, { credentials: "include" })
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
          if (!res.ok) throw new Error(json.message ?? "Request failed");
          return json.data as Profile;
        }),
    );
}

async function saveProfile(data: Profile): Promise<void> {
  return fetch(`${API_URL}/api/profile`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
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
          if (!res.ok) throw new Error(json.message ?? "Request failed");
        }),
    );
}

export function useProfile() {
  return useQuery({ queryKey: ["profile"], queryFn: fetchProfile });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: saveProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}

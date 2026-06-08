import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { apiFetch, apiPatch } from "@/hooks/admin/api";
import type { CreateMemberInput, MembersPage } from "@/types/members";

export function useMembers(page = 1) {
  return useQuery({
    queryKey: ["admin", "members", page],
    queryFn: () => apiFetch<MembersPage>(`/api/admin/members?page=${page}`),
    initialData: { data: [], total: 0 },
  });
}

export function useUpdateMemberEmail() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, email }: { id: string; email: string }) =>
      apiPatch(`/api/admin/members/${id}/email`, { email }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "members"] }),
  });
}

export function useCreateMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ name, email }: CreateMemberInput) =>
      authClient.admin.createUser({ name, email, role: "user", password: crypto.randomUUID() }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "members"] });
      qc.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
  });
}

export function useBanMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => authClient.admin.banUser({ userId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "members"] }),
  });
}

export function useUnbanMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => authClient.admin.unbanUser({ userId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "members"] }),
  });
}

export function useRemoveMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => authClient.admin.removeUser({ userId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "members"] });
      qc.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
  });
}

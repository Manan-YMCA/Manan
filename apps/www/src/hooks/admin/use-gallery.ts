import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiDelete, apiPost } from "@/hooks/admin/api";
import type { GalleryPayload } from "@manan/validations";
import type { GalleryItem, GalleryPage } from "@/types/gallery";

export function useAdminGallery(page = 1) {
  return useQuery({
    queryKey: ["admin", "gallery", page],
    queryFn: () => apiFetch<GalleryPage>(`/api/gallery?page=${page}`),
  });
}

export function useCreateGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: GalleryPayload) =>
      apiPost<GalleryItem>("/api/gallery", input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "gallery"] });
      qc.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
  });
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/api/gallery/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "gallery"] });
      qc.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
  });
}

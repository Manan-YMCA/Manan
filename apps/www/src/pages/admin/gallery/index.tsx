import { useState } from "react";
import { NavLink } from "react-router";
import { PlusIcon } from "@phosphor-icons/react";
import { useAdminGallery } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { GalleryCard } from "@/components/admin/gallery/GalleryCard";
import { GalleryCardSkeleton } from "@/components/admin/gallery/GalleryCardSkeleton";

export function AdminGallery() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminGallery(page);
  const items = data?.data || [];
  const total = data?.total || 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <GalleryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button asChild size="sm">
          <NavLink to="/admin/gallery/new" prefetch="intent">
            <PlusIcon size={14} />
            Add image
          </NavLink>
        </Button>
      </div>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No gallery items found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>
            <AdminPagination page={page} total={total} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}

export default AdminGallery;

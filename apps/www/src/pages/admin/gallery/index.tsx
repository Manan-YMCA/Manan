import { useState } from "react";
import { DotsThreeIcon, PlusIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { useAdminGallery, useDeleteGalleryItem, type GalleryItem } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminPagination } from "@/components/admin-pagination";

function GalleryCard({ item }: { item: GalleryItem }) {
  const remove = useDeleteGalleryItem();

  return (
    <div className="group relative overflow-hidden rounded-md">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full aspect-square object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={remove.isPending}
                className="size-7 bg-background/40 hover:bg-background/60 text-foreground"
              >
                <DotsThreeIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  remove
                    .mutateAsync(item.id)
                    .then(() => toast.success("Image deleted"))
                    .catch((e: Error) => toast.error(e.message))
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <p className="text-xs font-medium text-white truncate">{item.name}</p>
          {item.desc && (
            <p className="text-xs text-white/70 truncate">{item.desc}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminGallery() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminGallery(page);
  const items = data?.data || [];
  const total = data?.total || 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-md bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button asChild size="sm">
          <NavLink to="/admin/gallery/new">
            <PlusIcon size={14} />
            Add image
          </NavLink>
        </Button>
      </div>
      <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No gallery items found.</p>
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

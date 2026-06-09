import { DotsThreeIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { GalleryItem } from "@/types/gallery";
import { useDeleteGalleryItem } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function GalleryCard({ item }: { item: GalleryItem }) {
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
          {item.description && (
            <p className="text-xs text-white/70 truncate">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

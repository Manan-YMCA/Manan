import { DotsThreeIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { AdminEvent } from "@/hooks/admin";
import { useDeleteEvent } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ActionsCell({ event }: { event: AdminEvent }) {
  const remove = useDeleteEvent();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={remove.isPending} className="size-7">
          <DotsThreeIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          variant="destructive"
          onClick={() =>
            remove
              .mutateAsync(event.id)
              .then(() => toast.success("Event deleted"))
              .catch((e: Error) => toast.error(e.message))
          }
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

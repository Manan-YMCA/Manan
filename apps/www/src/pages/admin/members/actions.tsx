import { useState } from "react";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { Member } from "@/hooks/admin";
import { useBanMember, useRemoveMember, useUnbanMember } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditEmailDialog } from "./EditEmailDialog";

function wrap(fn: () => Promise<unknown>, successMsg: string) {
  fn()
    .then(() => toast.success(successMsg))
    .catch((e: Error) => toast.error(e.message));
}

export function ActionsCell({ member }: { member: Member }) {
  const ban = useBanMember();
  const unban = useUnbanMember();
  const remove = useRemoveMember();

  const [dialogOpen, setDialogOpen] = useState(false);

  const isPending = ban.isPending || unban.isPending || remove.isPending;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending} className="size-7">
            <DotsThreeIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            Edit email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {member.banned ? (
            <DropdownMenuItem
              onClick={() => wrap(() => unban.mutateAsync(member.id), "Member unbanned")}
            >
              Unban
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => wrap(() => ban.mutateAsync(member.id), "Member banned")}
            >
              Ban
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => wrap(() => remove.mutateAsync(member.id), "Member removed")}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditEmailDialog member={member} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

import { useState } from "react";
import { toast } from "sonner";
import type { Member } from "@/hooks/admin";
import { useUpdateMemberEmail } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

interface EditEmailDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditEmailDialog({ member, open, onOpenChange }: EditEmailDialogProps) {
  const updateEmail = useUpdateMemberEmail();
  const [email, setEmail] = useState(member.email);

  const handleSave = () => {
    updateEmail.mutate(
      { id: member.id, email },
      {
        onSuccess: () => { toast.success("Email updated"); onOpenChange(false); },
        onError: (e) => toast.error(e.message),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit email</DialogTitle>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="edit-email">Email</FieldLabel>
          <Input
            id="edit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updateEmail.isPending}>
            {updateEmail.isPending ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

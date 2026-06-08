import { NewMemberForm } from "@/components/members/NewMemberForm";

export function NewMember() {
  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold">New Member</h1>
      <NewMemberForm />
    </div>
  );
}

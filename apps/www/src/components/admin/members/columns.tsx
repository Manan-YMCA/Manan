import { createColumnHelper } from "@tanstack/react-table";
import type { Member } from "@/types/members";
import { ActionsCell } from "@/components/admin/members/actions";

const col = createColumnHelper<Member>();

export const columns = [
  col.display({
    id: "avatar",
    cell: ({ row }) => {
      const { image, name } = row.original;
      const src = image || `https://avatar.vercel.sh/${encodeURIComponent(name)}`;
      return <img src={src} alt={name} className="size-7 rounded-full object-cover" />;
    },
  }),
  col.accessor("name", { header: "Name" }),
  col.accessor("email", { header: "Email" }),
  col.accessor("role", {
    header: "Role",
    cell: ({ row }) => <span className="capitalize">{row.original.role}</span>,
  }),
  col.accessor("banned", {
    header: "Status",
    cell: ({ row }) =>
      row.original.banned ? (
        <span className="text-destructive">Banned</span>
      ) : (
        <span className="text-green-500">Active</span>
      ),
  }),
  col.accessor("createdAt", {
    header: "Joined",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  }),
  col.display({
    id: "actions",
    cell: ({ row }) => <ActionsCell member={row.original} />,
  }),
];

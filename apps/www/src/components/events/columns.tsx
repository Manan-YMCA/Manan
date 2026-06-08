import type { ColumnDef } from "@tanstack/react-table";
import type { AdminEvent } from "@/hooks/admin";
import { ActionsCell } from "./actions";

export const columns: ColumnDef<AdminEvent>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "desc",
    header: "Description",
    cell: ({ row }) => (
      <span className="max-w-64 truncate block">{row.original.desc}</span>
    ),
  },
  {
    accessorKey: "eventDate",
    header: "Event Date",
    cell: ({ row }) => row.original.eventDate,
  },
  {
    accessorKey: "timestamp",
    header: "Created",
    cell: ({ row }) => new Date(row.original.timestamp).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell event={row.original} />,
  },
];

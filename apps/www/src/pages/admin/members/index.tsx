import { useState } from "react";
import { NavLink } from "react-router";
import { PlusIcon } from "@phosphor-icons/react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMembers } from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { columns } from "@/components/admin/members/columns";

export function AdminMembers() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMembers(page);
  const members = data.data;
  const total = data.total;

  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
        <Button asChild size="sm">
          <NavLink to="/admin/members/new">
            <PlusIcon size={14} />
            New member
          </NavLink>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    Loading…
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No members found.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <AdminPagination page={page} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
}

export default AdminMembers;

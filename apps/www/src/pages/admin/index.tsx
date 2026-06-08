import { NavLink } from "react-router";
import { CalendarIcon, ImagesIcon, UsersIcon } from "@phosphor-icons/react";
import { useAdminSummary } from "@/hooks/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const statCards = [
  { key: "members" as const, label: "Members", icon: UsersIcon, to: "/admin/members" },
  { key: "events" as const, label: "Events", icon: CalendarIcon, to: "/admin/events" },
  { key: "gallery" as const, label: "Gallery", icon: ImagesIcon, to: "/admin/gallery" },
];

export function AdminDashboard() {
  const { data, isLoading } = useAdminSummary();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map(({ key, label, icon: Icon, to }) => (
          <NavLink key={key} to={to}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon size={18} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <span className="text-3xl font-bold">
                    {data?.counts[key] || 0}
                  </span>
                )}
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

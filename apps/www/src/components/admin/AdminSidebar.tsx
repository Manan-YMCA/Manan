import { NavLink } from "react-router";
import {
  CalendarIcon,
  ChartBarIcon,
  ImagesIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import mananLogo from "@/assets/manan.svg";

const navItems = [
  { to: "/admin", label: "Overview", icon: ChartBarIcon, end: true },
  { to: "/admin/members", label: "Members", icon: UsersIcon },
  { to: "/admin/events", label: "Events", icon: CalendarIcon },
  { to: "/admin/gallery", label: "Gallery", icon: ImagesIcon },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <NavLink to="/" prefetch="intent" className="flex items-center gap-2 font-semibold">
          <img src={mananLogo} alt="Manan logo" className="size-6" />
          <span>Manan</span>
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={to}
                      end={end}
                      prefetch="intent"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : ""
                      }
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

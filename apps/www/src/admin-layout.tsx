import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminNavbar } from "@/components/admin/AdminNavbar";

export function AdminLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background text-foreground">
          <AdminSidebar />
          <SidebarInset className="flex flex-col bg-background">
            <AdminNavbar />
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
        <Toaster richColors position="top-right" />
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default AdminLayout;

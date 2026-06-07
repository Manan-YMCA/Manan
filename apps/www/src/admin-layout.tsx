import { Outlet } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AdminLayout() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black text-white">
        <Outlet />
      </div>
    </TooltipProvider>
  );
}

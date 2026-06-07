import { Outlet } from "react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Layout() {
  return (
    <TooltipProvider>
      <div className="bg-radial-theme min-h-screen text-black dark:text-white flex flex-col">
        <Navbar />
        <main className="pt-16 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

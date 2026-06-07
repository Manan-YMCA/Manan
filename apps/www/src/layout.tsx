import { Outlet } from "react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Layout() {
  return (
    <TooltipProvider>
      <div className="bg-radial-theme min-h-screen text-black dark:text-white">
        <Navbar />
        <main className="pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

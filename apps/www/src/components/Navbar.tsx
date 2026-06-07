import { useState } from "react";
import { NavLink } from "react-router";
import { ListIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { to: "/members", label: "Members" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-black/5 dark:bg-white/5 backdrop-blur-sm border-b border-black/10 dark:border-white/10">
      <NavLink to="/" className="text-black dark:text-white font-bold text-xl tracking-tight">
        Manan
      </NavLink>

      <ul className="hidden md:flex items-center gap-6">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-black dark:text-white font-medium" : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
          <NavLink to="/login">Login</NavLink>
        </Button>

        <button
          className="md:hidden text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <ListIcon size={22} />
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-64 bg-white/70 dark:bg-black/70 backdrop-blur-md border-black/10 dark:border-white/10 text-black dark:text-white">
          <SheetHeader className="border-b border-black/10 dark:border-white/10 pb-4">
            <SheetTitle className="text-black dark:text-white font-bold text-lg">Manan</SheetTitle>
          </SheetHeader>
          <ul className="mt-4 flex flex-col gap-1 px-2">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-black/5 dark:bg-white/10 text-black dark:text-white font-medium" : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-6 left-4 right-4">
            <Button variant="outline" size="sm" asChild className="w-full">
              <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

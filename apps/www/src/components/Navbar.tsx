import { useState } from "react";
import { NavLink } from "react-router";
import mananLogo from "@/assets/manan.svg";
import { ListIcon } from "@phosphor-icons/react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";

const links = [
  { to: "/members", label: "Members" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-white/40 dark:bg-black/50 backdrop-blur-lg border-b border-black/10 dark:border-white/10">
      <NavLink
        to="/"
        prefetch="intent"
        className="flex items-center gap-2 text-black dark:text-white font-bold text-xl tracking-tight"
      >
        <img src={mananLogo} alt="Manan logo" className="size-7" />
        Manan
      </NavLink>

      <ul className="hidden md:flex items-center gap-6">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              prefetch="intent"
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
        <div className="hidden md:block">
          <UserMenu />
        </div>
        <button
          className="md:hidden text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <ListIcon size={22} />
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-64 bg-white/70 dark:bg-black/70 backdrop-blur-md border-black/10 dark:border-white/10 text-black dark:text-white"
        >
          <SheetHeader className="border-b border-black/10 dark:border-white/10 pb-4">
            {session ? (
              <div className="flex items-center gap-2">
                <Avatar className="size-7">
                  <AvatarImage
                    src={
                      session.user.image ||
                      `https://avatar.vercel.sh/${encodeURIComponent(session.user.name)}`
                    }
                  />
                </Avatar>
                <span className="text-sm font-medium truncate">
                  {session.user.name}
                </span>
              </div>
            ) : (
              <SheetTitle className="flex items-center gap-2 text-black dark:text-white font-bold text-lg">
                <img src={mananLogo} alt="Manan logo" className="size-6" />
                Manan
              </SheetTitle>
            )}
          </SheetHeader>
          <ul className="mt-4 flex flex-col gap-1 px-2">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  prefetch="intent"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-black/5 dark:bg-white/10 text-black dark:text-white font-medium" : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {session && (
              <li>
                <NavLink
                  to="/profile"
                  end
                  prefetch="intent"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-black/5 dark:bg-white/10 text-black dark:text-white font-medium" : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"}`
                  }
                >
                  Edit profile
                </NavLink>
              </li>
            )}
          </ul>
          <div className="absolute bottom-6 left-4 right-4">
            {session ? (
              <div className="space-y-2">
                {session.user.role === "admin" && (
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <NavLink to="/admin" prefetch="intent" onClick={() => setOpen(false)}>
                      Admin page
                    </NavLink>
                  </Button>
                )}
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild className="w-full">
                <NavLink to="/login" prefetch="intent" onClick={() => setOpen(false)}>
                  Login
                </NavLink>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

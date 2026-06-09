import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authClient
      .signOut()
      .then(() => navigate("/login"))
      .catch(() => toast.error("Failed to sign out"));
  };

  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-border bg-background px-4">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}

import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    authClient.signOut()
      .then(() => navigate("/login"))
      .catch(() => toast.error("Failed to sign out"));
  };

  if (!session) {
    return (
      <Button variant="outline" size="sm" asChild>
        <NavLink to="/login">Login</NavLink>
      </Button>
    );
  }

  const { user } = session;
  const isAdmin = user.role === "admin";
  const avatarUrl = user.image || `https://avatar.vercel.sh/${encodeURIComponent(user.name)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage src={avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
        <DropdownMenuSeparator />
        {isAdmin ? (
          <DropdownMenuItem asChild>
            <NavLink to="/admin">Admin page</NavLink>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <NavLink to="/profile">Edit profile</NavLink>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Link } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import type { User } from "@/contexts/AuthContext";
import { SidebarTrigger } from "./ui/sidebar";
import { Bell, Currency, MessageCircle, Search, Settings } from "lucide-react";

interface Props {
  user?: User;
  handleOpenDialog?: (v:boolean) => void;
}

export function AppHeader({ user }: Props) {
  return (
    <header className="bg-white border-b flex items-center justify-between p-4 shadow-sm sticky top-0 z-30">
      <div className="flex items-center">
        <div className="flex gap-1">
          <SidebarTrigger />
        </div>
        <div className="relative mr-4 w-80">
          <Input
            placeholder="Search"
            className="pl-4 bg-gray-50 border-gray-200 py-6 rounded-full"
          />
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to={"/module/message"}
          className="border-1 border-gray-500 rounded-full"
        >
          <Button variant="ghost" size="icon">
            <Settings size={24} />
          </Button>
        </Link>

        <Link
          to={"/module/message"}
          className="border-1 border-gray-500 rounded-full"
        >
          <Button variant="ghost" size="icon">
            <Currency size={24} />
          </Button>
        </Link>

        <Link
          to={"/module/message"}
          className="border-1 border-gray-500 rounded-full"
        >
          <Button variant="ghost" size="icon">
            <MessageCircle size={24} />
          </Button>
        </Link>

        <Link
          to={"/module/message"}
          className="border-1 border-gray-500 rounded-full"
        >
          <Button variant="ghost" size="icon">
            <Bell size={24} />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <div className="h-11 w-11 rounded-full bg-gray-200 overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center pt-3.5 text-[12px]">
                    <span className="mr-1">{user?.name.charAt(0)}</span>
                    <span> {user?.name.split(" ")[1].charAt(0)}</span>
                  </div>
                )}
              </div>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </header>
  );
}
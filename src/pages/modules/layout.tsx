import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { User } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
;
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function Layout() {
    const {  user } = useAuth();
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gray-100 h-svh">
          <div className="flex h-full flex-1 flex-col">
            <div className="sticky top-0 z-30 border-b border-gray-200 bg-gray-100/95 backdrop-blur">
              <AppHeader user={user as User} />
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6 sm:px-6">
              <div className="mx-auto w-full">
                <Outlet />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: false,
          classNames: {
            error: "bg-red-400",
            success: "text-green-400",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
      />
    </>
  );
}

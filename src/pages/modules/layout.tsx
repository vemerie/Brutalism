import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
// import { AlertDialog } from "@/components/ui/alert-dialog";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { User } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
// import { useAuth } from "@/hooks/useAuth";
// import { useCallback, useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function Layout() {
    // const [isDialogOpen, setIsDialogOpen] = useState(false);

    // const navigate = useNavigate();

    const {  user } = useAuth();

    // const handleOpenDialog = useCallback(() => {
    //   setIsDialogOpen(true);
    // }, []);

    // const handleOpenChange = useCallback((open: boolean) => {
    //   setIsDialogOpen(open);
    // }, []);

    // const confirmLogoutUser = () => {
    //   logout();
    //   navigate("/auth/login", { replace: true });
    // };

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
      {/* <AlertDialog
        title="Sign Out User"
        description=""
        content={
          <div className="flex flex-col gap-4 px-4">
            <div className=" gap-2 justify-center items-center">
              <div className="flex flex-col gap-8 justify-center items-center ">
                <h2 className="text-[#0C2724] font-bold text-[16px]">Logout</h2>
                <div>
                  <p className="text-[16px] text-[#0C2724] text-center">
                    Are you sure you want to Logout?
                  </p>
                </div>
                <div className="flex gap-2">
                  <div
                    className="text-[#0FBA3A] bg-[#F3F4F6] py-3 px-6 rounded-2xl"
                    onClick={() => handleOpenChange(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className="py-3 text-[#EC534A] bg-[#FEF3F2] px-6 rounded-2xl"
                    onClick={confirmLogoutUser}
                  >
                    Yes, Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        footer={""}
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        width=""
      /> */}
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

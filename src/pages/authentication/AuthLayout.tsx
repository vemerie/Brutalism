import { Outlet } from "react-router";
import authbackground from "../../assets/images/auth-background.jpeg";
import logo from "../../assets/react.svg";
import { Toaster } from "@/components/ui/sonner";

const AuthLayout = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row bg-green-100">
      {/* Left section with green background */}
      <div className="relative  p-3 md:p-6 overflow-hidden w-full md:w-1/2 ">
        <div className=" mx-auto h-72 w-72 md:h-full md:w-full rounded-lg hidden lg:block">
          <img
            src={authbackground}
            alt=" Christmas Three"
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>

      {/* Right section with login form */}
      <div className="flex flex-1 items-center justify-center p-3 md:p-6 w-full md:w-1/2">
        <div className=" w-full md:w-3/5">
          {/* Logo */}
          <div className="mb-10 text-center">
            <img
              src={logo}
              alt="brutalism logo"
              className="object-contain w-48 mx-auto"
            />
          </div>
          {/* Main */}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
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
    </div>
  );
};

export default AuthLayout;

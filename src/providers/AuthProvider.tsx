import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AuthContext, type AuthContextType } from "../contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useLoginMutation } from "@/pages/authentication/queries/authentications.query";
import type { ILoginResponse } from "@/pages/authentication/interfaces/auth.interface";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {

  const [user, setUser] = useState<ILoginResponse["data"]["user"] | undefined>(
    undefined
  );
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const queryClient = useQueryClient();

  // Simulated login mutation hook (you'll need to implement this)
  const { mutate: login, isSuccess, data } = useLoginMutation();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("user");
    setUser(undefined);
    queryClient.clear();
  };

  useEffect(() => {
    // Check for existing auth data on mount
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      // Defer updates to avoid calling setState synchronously within the effect
      queueMicrotask(() => {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        setIsAuthenticating(false);
      });
      return;
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data?.success) {
      const { user, token, sessionId } = data.data;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("user", JSON.stringify(user));
      // Defer the state update to avoid calling setState synchronously within the effect
      queueMicrotask(() => {
        setUser(user);
        setIsAuthenticated(true);
      });
    }
  }, [isSuccess, data]);

  const value: AuthContextType = {
    user,
    isAuthenticating,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

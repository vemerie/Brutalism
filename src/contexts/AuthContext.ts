// src/contexts/AuthContext.tsx
import type { UseMutateFunction } from "@tanstack/react-query";
import { createContext } from "react";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  name:string;

}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthContextType {
  user?: User;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  login: UseMutateFunction<
    {
      success: boolean;
      data: {
        user: User;
        sessionId: string;
        token: string;
      };
      message: string;
    },
    Error,
    LoginRequest,
    unknown
  >;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

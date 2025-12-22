import type { User } from "@/contexts/AuthContext";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  data: {
    user: User;
    sessionId: string;
    token: string;
  };
  message: string;
}

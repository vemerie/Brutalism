export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      avatar: null;
      name: string;
    };
    sessionId: string;
    token: string;
  };
  message: string;
}

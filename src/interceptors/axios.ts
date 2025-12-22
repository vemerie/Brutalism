import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
// import { useNavigate } from "react-router";

// Define an interface for error response
interface FetchResponseError {
  message?: string;
  code?: string;
  details?: unknown;
}

// Create Axios instance
const apiClient = axios.create({
  baseURL: "https://test-api.squadinc.co/email-list/v1/api",

  // baseURL: "http://127.0.0.1:3000/api", // Change this to your actual API base URL
  timeout: 10000,
  // headers: { "Content-Type": "application/json" },
  xsrfHeaderName: "X-XSRF-TOKEN",
  xsrfCookieName: "XSRF-TOKEN",
});

export type AxiosResponseWithData<T> = AxiosResponse<T> & {
  data: T;
};

// Function to get the auth token (e.g., from localStorage)
const getAuthToken = (): string | null => {
  // Replace with your actual token retrieval logic
  // Example: localStorage, Redux, or a secure storage mechanism
  return localStorage.getItem("accessToken");
};

// Define a generic API function with error handling and authorization
export const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown,
  params?: unknown
): Promise<T> => {
  try {
    // Get the auth token
    const token = getAuthToken();
    // Prepare headers
    const headers: Record<string, string> = {};

    // Add Authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response: AxiosResponse<T> = await apiClient({
      method,
      url,
      data,
      params,
      headers, // Pass headers to the request
    });

    return response.data;
  } catch (error) {
    // Type the error as AxiosError with optional custom error response
    const axiosError = error as AxiosError<FetchResponseError>;

    // Handle specific error cases
    if (axiosError.response) {
      // Server responded with a status code outside 2xx
      const { status, data } = axiosError.response;

      // Handle specific cases like 401 Unauthorized
      if (status === 401) {
        // Optionally: Clear token and redirect to login
        localStorage.removeItem("authToken");
        location.href = "/auth/login";
        // navigate("/auth/login", { replace: true });
        // You might want to trigger a redirect or dispatch a logout action
        throw new Error("Unauthorized: Please log in again.");
      }

      throw new Error(
        `Request failed with status ${status}: ${
          data.message || "Unknown error"
        }`
      );
    } else if (axiosError.request) {
      // Request was made but no response received (e.g., network error, timeout)
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      // Other errors (e.g., request setup error)
      throw new Error(`Request error: ${axiosError.message}`);
    }
  }
};
